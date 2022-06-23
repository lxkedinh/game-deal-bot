import { MessageActionRow, MessageButton } from 'discord.js';

// discord buttons to navigate between pages of game search results
const buttons: MessageButton[] = [
    new MessageButton()
        .setLabel('First')
        .setCustomId('First')
        .setEmoji('⏪')
        .setStyle('SECONDARY'),
    new MessageButton()
        .setLabel('Previous')
        .setCustomId('Previous')
        .setStyle('PRIMARY'),
    new MessageButton()
        .setLabel('Next')
        .setCustomId('Next')
        .setStyle('PRIMARY'),
    new MessageButton()
        .setLabel('Last')
        .setCustomId('Last')
        .setEmoji('⏩')
        .setStyle('SECONDARY'),
] as Array<MessageButton>;

const row = new MessageActionRow().addComponents(buttons);

export default row;
