import { rawRSS } from "./types";
import { Article } from "skiosa-orm";

/**
 * parses raw data from a RSS-Feed.
 * 
 * @param feed raw feed-data to parse.
 * @returns parsed article data.
 */
export async function parseFeed (feed: rawRSS): Promise<Array<Article>> {
    return new Promise<Array<Article>> ((resolve, reject) => {
        let arr: Array<Article> = new Array();
        
        // preprocessing to get article list form raw xml
        let rawArr = new Array();
        rawArr.push(feed);

        rawArr.forEach(element => {
            let article = new Article();
            
            // the following code is a placeholder and has to be replaced when real rss-feeds are introduced.
            article.content = element.content;
            article.url = element.content;
            article.description = element.content;
            article.title = element.content;

            arr.push(article);
        });

        resolve(arr);
    });
}
