import fs = require('fs');
import path = require('path');
import { Client, Collection, CommandInteraction, Intents } from 'discord.js';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

export class ExtendedClient extends Client {
    // commands property to easily access commands in other files
    commands: Collection<string, CommandInteraction> = new Collection();

    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
            ],
        });
    }

    // register and update commands for bot
    updateCommands(): void {
        const commands = [];
        const commandsPath = path.join(__dirname, '../commands');
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commands.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.TEST_SERVER_ID
            ),
            { body: commands }
        )
            .then(() =>
                console.log('Successfully registered application commands.')
            )
            .catch(console.error);
    }
}
