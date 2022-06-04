import { CommandInteraction } from 'discord.js';
import fs = require('fs');
import path = require('path');

const { ExtendedClient } = require('./structures/Client');
require('dotenv').config();

const client = new ExtendedClient();

client.updateCommands();

// add commands to bot instance
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction: CommandInteraction) => {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content:
                'There was an error while executing this command. Please try again later!',
            ephemeral: true,
        });
    }
});

client.login(process.env.TOKEN);
