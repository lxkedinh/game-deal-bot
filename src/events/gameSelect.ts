import { SelectMenuInteraction } from 'discord.js';

// handling selected game option to look up deals for
module.exports = {
    name: 'interactionCreate',
    async execute(interaction: SelectMenuInteraction) {
        if (interaction.customId === 'gameSelect') {
            await interaction.update({
                content: `${interaction.values[0]} was selected!`,
                components: [],
            });
        }
    },
};
