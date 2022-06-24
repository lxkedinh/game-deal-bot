import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { linkRow } from '../structures/buttons';
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

        const arrow = '<:arrowneon:989995518350487673>';
        const apiCredit =
            'Game deal data provided by [IsThereAnyDeal.com](https://isthereanydeal.com) API';
        const avatarCredit =
            'Bot profile picture made by Freepik from [Flaticon](https://www.flaticon.com)';

        const creditsEmbed = new MessageEmbed().setColor(embedColor).setAuthor({
            name: 'Game Deal Bot | Credits',
            iconURL: client.user?.avatarURL() as string,
        }).setDescription(`${arrow} ${apiCredit}
        ${arrow} ${avatarCredit}`);

        interaction.reply({ embeds: [creditsEmbed] });
    },
};
