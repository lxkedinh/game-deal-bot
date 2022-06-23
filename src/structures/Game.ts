/**
 * A game search result after fetching from IsThereAnyDeal API
 * @property {number} id - game ID in IsThereAnyDeal API database
 * @property {string} plain - plaintext of game stored in API database
 * @property {string} title - title of the game
 */
export interface Game {
    id: number;
    plain: string;
    title: string;
}

// API response type for array of game search results
export interface GameSearchResponse {
    data: GameSearchResults;
}

export interface GameSearchResults {
    results: Game[];
}
