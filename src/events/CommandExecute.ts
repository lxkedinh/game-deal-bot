import { CommandInteraction } from 'discord.js';
import ExtendedClient from '../structures/ExtendedClient';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: CommandInteraction, client: ExtendedClient) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            if (command.needsClient) command.execute(interaction, client);
            else command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content:
                    'There was an error while executing this command. Please try again later!',
                ephemeral: true,
            });
        }
    },
};
