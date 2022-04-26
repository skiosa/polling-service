import { Article, Feed } from "skiosa-orm";
import fetch from "node-fetch";
import { RssType } from "./types";

/**
 * parses raw data from a RSS-Feed.
 * 
 * @param rss RSS-Feed-Object to parse.
 * @param feed RSS-Feed to link to.
 * @returns parsed article data array.
 */
export async function parseFeed (rss: RssType, feed: Feed): Promise<Array<Article>> {
    let arr: Array<Article> = new Array();
    
    // parse each item asynchronously
    const promises = rss.items.map(async element => {
        let hasPubDate = element.pubDate !== undefined;
        let pubDate = hasPubDate? new Date(element.pubDate!) : null;

        // check, whether article is potentially new (reduce duplicates as early as possible)
        if (!hasPubDate || pubDate! > feed.lastPolledAt) {
            let article = new Article();

            // link, description and title are required per RSS-standard, therefore there's no need to check, whether they exist
            article.url = element.link!;
            article.title = element.title!;
            article.description = element.description!;

            article.feed = feed;

            const response = await fetch(element.link!);
            const text = await response.text();
            article.content = text;

            if (hasPubDate) {
                article.publishedAt = pubDate!;
            }

            arr.push(article);
        }
    });

    // wait for all items to be parsed (otherwise an empty array would be returned)
    await Promise.all(promises);
    return(arr);
}
