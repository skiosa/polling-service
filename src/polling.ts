import { Feed } from "skiosa-orm";
import Parser from 'rss-parser';

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
export async function pollFeed (feed: Feed): Promise<[
    {[key: string]: any;} & Parser.Output<{[key: string]: any;}>, 
    Feed]> {

    return new Promise<[
        {[key: string]: any;} & Parser.Output<{[key: string]: any;}>, 
        Feed]> (async (resolve, reject) => {

        const rss = await parser.parseURL(feed.link).catch(err => reject(err));
        resolve([rss, feed]);
    });
}
