import {
    SlashCommandStringOption,
    SlashCommandBuilder,
} from '@discordjs/builders';
import {
    CommandInteraction,
    MessageEmbed,
    ColorResolvable,
    Message,
} from 'discord.js';
import row from '../structures/buttons';
import { embedColor } from '../structures/Embed';
import { fetchGameImg, searchDeals, searchGame } from '../requests';
import { Paginator } from '../structures/Paginator';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamedeal')
        .setDescription('Looks up cheapest sale price for a game.')
        .addStringOption((option: SlashCommandStringOption) =>
            option
                .setName('name')
                .setDescription('The name of the game to search')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isCommand()) return;

        const gameName = interaction.options.get('name')?.value as string;
        try {
            // search CheapShark API for game provided as command argument
            const gameSearchData = await searchGame(gameName);

            // tell user if search came up empty
            if (gameSearchData.length == 0) {
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(embedColor)
                            .setDescription(
                                `Your search for **${gameName}** came up empty. Try again.`
                            ),
                    ],
                });
                return;
            }

            // create message embeds for pages
            const paginator = new Paginator();
            paginator.generateSearchPages(gameSearchData, embedColor);

            interaction.reply({
                embeds: [paginator.getCurrentPage()],
                components: [row],
            });

            // Collect button input to navigate between pages
            const reply = (await interaction.fetchReply()) as Message;
            const btnCollector = paginator.buttonHandler(
                reply,
                interaction.user.id
            );

            // Collect message input for index number of game to search for
            const filter = (m: Message) => m.author.id === interaction.user.id;
            const msgCollector = interaction.channel?.createMessageCollector({
                filter,
                time: 30000,
            });

            msgCollector?.on('collect', async (m) => {
                const gameSelectedIndex = parseInt(m.content);
                const gameSelected = gameSearchData[gameSelectedIndex - 1];
                // input invalid if user did not input a number or a number outside of search result indices
                if (
                    isNaN(gameSelectedIndex) ||
                    gameSelectedIndex < 0 ||
                    gameSelectedIndex > gameSearchData.length
                ) {
                    m.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(embedColor)
                                .setDescription(
                                    'You did not input a valid number. Please try again.'
                                ),
                        ],
                    });

                    // user chooses valid number index for a game to search
                    // deals for
                } else {
                    // destroy initial button collector on search results pages becauser user already chose a desired game
                    btnCollector.stop();

                    // fetch thumbnail image of the game to display
                    const gameImg = await fetchGameImg(gameSelected.plain);

                    // fetch current prices for selected game from API
                    const priceList = await searchDeals(gameSelected.plain);

                    paginator.generateDealPages(
                        priceList,
                        gameSelected.title,
                        embedColor,
                        gameImg
                    );

                    const dealReply = await m.reply({
                        embeds: [paginator.getCurrentPage()],
                        components: [row],
                    });

                    // Collect button input to navigate between pages
                    paginator.buttonHandler(dealReply, interaction.user.id);

                    // dispose of collector, only allow 1 game deal search per
                    // command interaction
                    msgCollector.stop();
                }
            });
        } catch (e) {
            console.log(e);
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(embedColor)
                        .setDescription(
                            'Something went wrong with the search. Please try again.'
                        ),
                ],
            });
        }
    },
};
