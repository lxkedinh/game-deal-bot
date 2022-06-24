import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import ExtendedClient from './ExtendedClient';

export default interface BotCommand {
    data: SlashCommandBuilder;
    needsClient: boolean;
    execute(interaction: CommandInteraction, client?: ExtendedClient): void;
}
