import { MessageEmbed, ColorResolvable, Message, User } from 'discord.js';
import { Game } from './Game';
import row from './buttons';

export class Paginator {
    pages: MessageEmbed[] = [];
    currentPage: number = 0;
    numPages: number = 0;

    /**
     * generates embed pages to display a list of games for the user to choose
     * to search deals from
     * @param games list of games fetched from IsThereAnyDeal.com API to
     * generate embed pages from
     * @param color hex color code to set the embed color as
     */
    generateSearchPages(games: Game[], color: ColorResolvable) {
        let embeds: MessageEmbed[] = [];
        let currentEmbed = 0;
        let searchResults = 'Select a game to find deals for!\n\n';

        games.forEach((game: Game, index: number) => {
            let overTenLimit = index + 1 > (currentEmbed + 1) * 10;

            // create embed when current embed has 10 search results or last game
            // in list
            if (overTenLimit || index == games.length - 1) {
                embeds[currentEmbed] = new MessageEmbed()
                    .setTitle('Game Search Results')
                    .setDescription(searchResults)
                    .setColor(color);
                searchResults = 'Select a game to find deals for!\n\n';
                currentEmbed++;
            }

            // for some reason, game title strings in the API are sometimes
            // duplicated with a newline in between ie. DOOM\nDOOM, trim after
            // newline if it is found
            const newlinePosition = game.title.search('\n');
            let gameTitle =
                newlinePosition != -1
                    ? game.title.substring(0, newlinePosition)
                    : game.title;

            searchResults += `\`${index + 1}.\` ${gameTitle}\n`;
        });

        // add page numbers to footers of embeds
        embeds.forEach((embed: MessageEmbed, index: number) => {
            embed.setFooter({ text: `Page ${index + 1}/${embeds.length}` });
        });

        this.pages = embeds;
        this.currentPage = 0;
        this.numPages = embeds.length;
    }

    /**
     * generates embed pages to display a list of current deals for a user's
     * chosen game
     * @param prices list of current prices for the chosen game fetched from IsThereAnyDeal.com API
     * @param name of the game to list current prices for
     * @param color hex color code to set the embed color as
     * @param image url to a thumbnail image of the game
     */
    generateDealPages(
        prices: any,
        name: string,
        color: ColorResolvable,
        image: string
    ) {
        let embeds: MessageEmbed[] = [];
        let currentEmbed = 0;
        let deals = '';

        prices.forEach((price: any, index: number) => {
            let storeDeal = `[${price.shop.name}](${
                price.url
            }) - $${price.price_new.toFixed(2)}\n`;

            // message embeds can only have 4096 characters max
            let embedLimit = deals.length + storeDeal.length > 4096;

            // embed character limit hit and last item
            if (embedLimit && index == prices.length - 1) {
                embeds[currentEmbed++] = new MessageEmbed()
                    .setTitle(name)
                    .setDescription(deals)
                    .setColor(color)
                    .setThumbnail(image);
                embeds[currentEmbed] = new MessageEmbed()
                    .setTitle(name)
                    .setDescription(storeDeal)
                    .setColor(color);
            }
            // embed character limit hit and not last item
            else if (embedLimit) {
                embeds[currentEmbed++] = new MessageEmbed()
                    .setTitle(name)
                    .setDescription(deals)
                    .setColor(color)
                    .setThumbnail(image);
                deals = storeDeal;
            }
            // embed character limit not hit and last item
            else if (index == prices.length - 1) {
                embeds[currentEmbed++] = new MessageEmbed()
                    .setTitle(name)
                    .setDescription(deals + storeDeal)
                    .setColor(color)
                    .setThumbnail(image);
            }
            // embed character limit not hit and not last item
            else deals += storeDeal;
        });

        // add page numbers to embeds after they have been populated with game data
        embeds.forEach((embed: MessageEmbed, index: number) => {
            embed.setFooter({
                text: `Page ${index + 1}/${embeds.length}`,
            });
        });

        this.pages = embeds;
        this.currentPage = 0;
        this.numPages = embeds.length;
    }

    buttonHandler(msg: Message, userId: string) {
        const btnCollector = msg.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 15000,
        });
        btnCollector.on('collect', (i) => {
            if (i.user.id !== userId) {
                i.deferUpdate();
                return;
            }

            this.updatePage(i.customId);

            i.deferUpdate();
            msg.edit({
                embeds: [this.getCurrentPage()],
                components: [row],
            });
        });

        return btnCollector;
    }

    /**
     * handle button press on Discord embed to update embed page
     * @param customId - id of the button to handle embed pagination accordingly
     */
    updatePage(customId: string) {
        switch (customId) {
            case 'First':
                this.currentPage = 0;
                break;
            case 'Previous':
                this.currentPage--;
                if (this.currentPage < 0) this.currentPage = this.numPages - 1;
                break;
            case 'Next':
                this.currentPage++;
                if (this.currentPage >= this.numPages)
                    this.currentPage %= this.numPages;
                break;
            case 'Last':
                this.currentPage = this.numPages - 1;
                break;
        }
    }

    /**
     * @returns current Discord embed page
     */
    getCurrentPage(): MessageEmbed {
        return this.pages[this.currentPage];
    }
}
