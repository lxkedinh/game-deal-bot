import fs = require('fs');
import path = require('path');

const { ExtendedClient } = require('./structures/Client');
require('dotenv').config();

const client = new ExtendedClient();

// add commands to bot instance
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// add events to bot instance
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args: any) =>
            event.execute(...args, client)
        );
    } else {
        client.on(event.name, (...args: any) => event.execute(...args, client));
    }
}

client.login(process.env.TOKEN);
