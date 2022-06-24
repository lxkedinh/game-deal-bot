import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { linkRow } from '../structures/buttons';
import { embedColor } from '../structures/Embed';
import ExtendedClient from '../structures/ExtendedClient';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Displays Game Deal Bot's help menu"),
    needsClient: true,
    async execute(interaction: CommandInteraction, client: ExtendedClient) {
        if (!interaction.isCommand()) return;

        const helpEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setAuthor({
                name: 'Game Deal Bot | Help',
                iconURL: client.user?.avatarURL() as string,
            })
            .setDescription(
                "Welcome to Game Deal Bot's help menu. All commands available are found in this menu."
            )
            .addFields(
                { name: 'Game Deals', value: '`gamedeal`' },
                { name: 'Utility', value: '`help`, `credits`' },
                {
                    name: 'Disclaimer',
                    value: 'This Discord bot is in no way affiliated with IsThereAnyDeal.com',
                },
                {
                    name: '\u200B',
                    value: 'This Discord bot was made by [Luke Dinh](https://github.com/lxkedinh).',
                }
            );

        interaction.reply({ embeds: [helpEmbed], components: [linkRow] });
    },
};
