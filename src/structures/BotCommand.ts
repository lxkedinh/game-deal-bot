import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default interface BotCommand {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): void;
}
