import { Client, Collection, Intents } from 'discord.js';
import BotCommand from './BotCommand';

export default class ExtendedClient extends Client {
    // commands property to easily access commands in other files
    commands: Collection<string, BotCommand> = new Collection();

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
            partials: ['MESSAGE', 'CHANNEL', 'USER'],
        });
    }
}
