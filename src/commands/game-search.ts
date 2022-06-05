import { SlashCommandStringOption } from '@discordjs/builders';
import {
    MessageSelectOptionData,
    CommandInteraction,
    MessageActionRow,
    MessageSelectMenu,
} from 'discord.js';
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

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
        const gameName = interaction.options.get('name')?.value as string;

        try {
            // search CheapShark API for game provided as command argument
            const gamesQuery = await axios.get(
                `https://www.cheapshark.com/api/1.0/games?title=${gameName}`
            );
            const gamesData = await gamesQuery.data;
            let gameOptions: MessageSelectOptionData[] = [];

            // Discord select menus can only have a maximum of 25 options.
            // Get only first 25 entries from query if query returns more
            if (gamesData.length > 25) {
                for (let i = 0; i < 25; i++) {
                    gameOptions.push({
                        label: gamesData[i].external,
                        value: gamesData[i].external,
                    });
                }
            } else {
                gameOptions = gamesData.map((game: any) => ({
                    label: game.external,
                    value: game.external,
                }));
            }

            // create a select menu for user to choose their desired game
            let gameList = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId('gameSelect')
                    .setPlaceholder('Choose your desired game')
                    .addOptions(gameOptions)
            );

            await interaction.reply({
                content: 'Your search brought up these games.',
                components: [gameList],
            });
        } catch (e) {
            console.log(e);
            await interaction.reply(
                'Something went wrong with the search. Please try again.'
            );
        }
    },
};
