import { CommandInteraction } from 'discord.js';
const { ExtendedClient } = require('../structures/Client');

module.exports = {
    name: 'interactionCreate',
    async execute(
        interaction: CommandInteraction,
        client: typeof ExtendedClient
    ) {
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
    },
};
