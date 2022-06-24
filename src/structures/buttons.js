"use strict";
exports.__esModule = true;
exports.linkRow = exports.row = void 0;
var discord_js_1 = require("discord.js");
// Discord embed buttons to navigate between pages of game search results
var buttons = [
    new discord_js_1.MessageButton()
        .setLabel('First')
        .setCustomId('First')
        .setEmoji('⏪')
        .setStyle('SECONDARY'),
    new discord_js_1.MessageButton()
        .setLabel('Previous')
        .setCustomId('Previous')
        .setStyle('PRIMARY'),
    new discord_js_1.MessageButton()
        .setLabel('Next')
        .setCustomId('Next')
        .setStyle('PRIMARY'),
    new discord_js_1.MessageButton()
        .setLabel('Last')
        .setCustomId('Last')
        .setEmoji('⏩')
        .setStyle('SECONDARY'),
];
exports.row = new discord_js_1.MessageActionRow().addComponents(buttons);
// Link embed buttons to display on bot help menu
var linkButtons = [
    new discord_js_1.MessageButton()
        .setLabel('GitHub')
        .setStyle('LINK')
        .setURL('https://github.com/lxkedinh/game-deal-bot')
        .setEmoji('989742914873745448>'),
];
exports.linkRow = new discord_js_1.MessageActionRow().addComponents(linkButtons);
