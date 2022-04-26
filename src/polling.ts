import { Feed } from "skiosa-orm";
import Parser from 'rss-parser';
import { rssType } from "./types";

// initialize rss-parser with additional 'description' field in items (this should have been standard???)
const parser = new Parser({
    customFields: {
        item: ['description'],
    }
});

/**
 * polls a RSS-Feed.
 * 
 * @param feed RSS-Feed to poll
 * @returns RSS-Feed-Object and given RSS-Feed.
 */
export async function pollFeed (feed: Feed): Promise<[rssType, Feed]> {

    return new Promise<[rssType, Feed]> (async (resolve, reject) => {
        const rss = await parser.parseURL(feed.link).catch(err => reject(err));
        let rssObj = new rssType(rss);

        resolve([rssObj, feed]);
    });
}
