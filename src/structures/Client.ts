import { Client, Collection, CommandInteraction, Intents } from 'discord.js';

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
}
