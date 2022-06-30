import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import ExtendedClient from './ExtendedClient';

/**
 * represents a command for my Discord bot
 * @type {SlashCommandBuilder} data - meta information about the command such
 * as its name, description, and required arguments
 * @type {boolean} needsClient - whether or not a bot command needs to access
 * the Discord bot client
 * @type {void} execute - function to execute when command is called by users
 */
export default interface BotCommand {
    data: SlashCommandBuilder;
    needsClient: boolean;
    execute(interaction: CommandInteraction, client?: ExtendedClient): void;
}
