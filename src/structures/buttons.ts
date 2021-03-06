import { MessageActionRow, MessageButton } from 'discord.js';

// Discord embed buttons to navigate between pages of game search results
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

export const row = new MessageActionRow().addComponents(buttons);

// Link embed buttons to display on bot help menu
const linkButtons: MessageButton[] = [
    new MessageButton()
        .setLabel('GitHub')
        .setStyle('LINK')
        .setURL('https://github.com/lxkedinh/game-deal-bot')
        .setEmoji('<:github:989742864424656958>'),
] as Array<MessageButton>;

export const linkRow = new MessageActionRow().addComponents(linkButtons);
