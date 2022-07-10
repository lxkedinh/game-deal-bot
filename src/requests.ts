import axios from 'axios';
import { Game, GameSearchResponse } from './structures/Game';
import ssmClient from './structures/SSMClient';

/**
 * fetches a list of games matching user's query from IsThereAnyDeal.com API
 * @param name of the game to search
 * @returns list of games for the user to choose to get deals from
 */
export async function searchGame(name: string) {
    try {
        const apiToken = await ssmClient.getParameter('/Bot/API_Token');

        const {
            data: {
                data: { results },
            },
        } = await axios.get(
            `https://api.isthereanydeal.com/v02/search/search/?key=${apiToken}&q=${name}`
        );
        return results;
    } catch (error) {
        return error;
    }
}

/**
 * fetches a list of current prices from video game retailers through
 * IsThereAnyDeal.com API
 * @param name of the game to find current deals for
 * @returns list of the current deals for game chosen by user
 */
export async function searchDeals(name: string) {
    try {
        const apiToken = await ssmClient.getParameter('/Bot/API_Token');

        const {
            data: { data: priceData },
        } = await axios.get(
            `https://api.isthereanydeal.com/v01/game/prices/?key=${apiToken}&plains=${name}`
        );
        return priceData[name].list;
    } catch (error) {
        return error;
    }
}

/**
 * fetches a thumbnail image of the game to display in Discord message embed
 * @param name of the game to find an image for
 * @returns a url to a thumbnail image of the game
 */
export async function fetchGameImg(name: string) {
    try {
        const apiToken = await ssmClient.getParameter('/Bot/API_Token');

        const {
            data: { data: gameInfo },
        } = await axios.get(
            `https://api.isthereanydeal.com/v01/game/info/?key=${apiToken}&plains=${name}`
        );

        return gameInfo[name].image;
    } catch (error) {
        return error;
    }
}
