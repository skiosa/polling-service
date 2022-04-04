import { parsedRSS, rawRSS } from "./types";

/**
 * parses raw data from a RSS-Feed.
 * 
 * @param feed raw feed-data to parse.
 * @returns parsed article data.
 */
export async function parseFeed (feed: rawRSS): Promise<parsedRSS> {
    return new Promise<parsedRSS> ((resolve, reject) => {
        let parsed: parsedRSS = new parsedRSS();
        parsed.article = feed.content;

        resolve(parsed);
    });
}
