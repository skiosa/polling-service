import { Article, Feed } from "skiosa-orm";
import fetch from "node-fetch";
import { rssType } from "./types";

/**
 * parses raw data from a RSS-Feed.
 * 
 * @param feed raw feed-data to parse.
 * @returns parsed article data.
 */
export async function parseFeed (data: [rssType, Feed]): Promise<Array<Article>> {    
    let rss = data[0];
    let feed = data[1];

    let arr: Array<Article> = new Array();
    
    // preprocessing to get article list from document
    // let items = Array.from(document.getElementsByTagName('item'));
    
    const promises = rss.items.map(async element => {
        let hasPubDate = !(element.pubDate === undefined);
        let pubDate = hasPubDate? new Date(element.pubDate!) : null;

        // console.log(element);

        if (!hasPubDate || pubDate!.getDate() < Date.now()) {
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

    await Promise.all(promises);
    return(arr);
}
