import { parsedRSS, rawRSS } from "./types";

export async function parseFeed (feed: rawRSS): Promise<parsedRSS> {
    return new Promise<parsedRSS> ((resolve, reject) => {
        let parsed: parsedRSS = new parsedRSS();
        parsed.article = feed.content;

        resolve(parsed);
    });
}