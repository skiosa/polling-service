import { rawRSS } from "./types";

/**
 * polls a RSS-Feed specified by the link.
 * 
 * @param link link to poll from.
 * @returns raw RSS-Feed data.
 */
export async function pollFeed (link: string): Promise<rawRSS> {
    return new Promise<rawRSS> ((resolve, reject) => {
        let raw: rawRSS = new rawRSS();
        raw.content = link

        resolve(raw);
    });
}
