import { Article } from "skiosa-orm";
import { dataSource } from "skiosa-orm/lib/db"

const articleRepository = dataSource.getRepository(Article);

/**
 * inserts a given List of Article-Objects into the database.
 * should also update the TTL of the corresponding RSS-Feed.
 * 
 * @param articles Articles to insert.
 */
export async function insertArticles (articles: Array<Article>) {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    
    let promises = new Array();

    articles.forEach(article => {;
        promises.push(articleRepository.save(article));
    });
    
    let insertedContent = await Promise.all(promises);
    return insertedContent;
}

/**
 * checks for every known RSS-Feed, whether it should be polled.
 * (by checking, whether the TTL expired)
 * 
 * @returns list of RSS-Feeds to poll.
 */
export function getFeedsToPoll (): Array<string> {
    let feeds = new Array();

    feeds.push("test");
    feeds.push("another test")
    
    return feeds;
}
