import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js';
import { embedColor } from '../structures/Embed';
import ExtendedClient from '../structures/ExtendedClient';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription(
            'Shows information of credits to resources used for the bot.'
        ),
    needsClient: true,
    async execute(interaction: CommandInteraction, client: ExtendedClient) {
        if (!interaction.isCommand()) return;

        // check for permission to use external emojis for bullet points in
        // guild channel, otherwise use hyphen '-'
        // (also need to take into account text channel overwrites for bot
        // permissions to send external emojis)
        let bulletPoint = '<:arrowneon:989995518350487673>';
        if (interaction.channel && interaction.guild && interaction.guild.me) {
            const botPermsInChannel = interaction.guild.me.permissionsIn(
                interaction.channel as TextChannel
            );

            bulletPoint = botPermsInChannel.has('USE_EXTERNAL_EMOJIS')
                ? '<:arrowneon:989995518350487673>'
                : '-';
        }

        const apiCredit =
            'Game deal data provided by [IsThereAnyDeal.com](https://isthereanydeal.com) API';
        const avatarCredit =
            'Bot profile picture made by Freepik from [Flaticon](https://www.flaticon.com)';

        const creditsEmbed = new MessageEmbed().setColor(embedColor).setAuthor({
            name: 'Game Deal Bot | Credits',
            iconURL: client.user?.avatarURL() as string,
        }).setDescription(`${bulletPoint} ${apiCredit}
        ${bulletPoint} ${avatarCredit}`);

        interaction.reply({ embeds: [creditsEmbed] });
    },
};
