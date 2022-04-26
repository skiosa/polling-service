import { Feed } from "skiosa-orm";
import Parser from 'rss-parser';
import { rssType } from "./types";

const parser = new Parser({
    customFields: {
        item: ['description'],
    }
});

/**
 * polls a RSS-Feed specified by the link.
 * 
 * @param link link to poll from.
 * @returns RSS-Feed parsed into Document.
 */
export async function pollFeed (feed: Feed): Promise<[rssType, Feed]> {

    return new Promise<[rssType, Feed]> (async (resolve, reject) => {
        const rss = await parser.parseURL(feed.link).catch(err => reject(err));
        let rssObj = new rssType(rss);

        resolve([rssObj, feed]);
    });
}
