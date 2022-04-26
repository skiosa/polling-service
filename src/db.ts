import { Article, Feed } from "skiosa-orm";
import { dataSource } from "skiosa-orm/lib/db"
import { Raw } from "typeorm";

const articleRepository = dataSource.getRepository(Article);
const feedRepository = dataSource.getRepository(Feed);

/**
 * inserts a given List of Article-Objects into the database.
 * should also update the TTL of the corresponding RSS-Feed.
 * 
 * @param articles Articles to insert.
 */
export async function insertArticles (articles: Array<Article>, feed: Feed) {
    if (articles.length === 0) {
        return;
    }

    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }

    // console.log(articles)
    
    let promises = new Array();

    promises.push(
        feedRepository.createQueryBuilder()
        .update()
        .set({
            lastPolledAt: () => 'CURRENT_TIMESTAMP'
        })
        .where({
            id: feed.id
        })
        .execute()
    );

    articles.forEach(article => {
        articleRepository.findOne({
            select: {
                id: true,
            },
            where: {
                title: article.title,
                url: article.url,
                feed: {
                    id : article.feed!.id,
                },
            }
        })
        .then(duplicate => {
            //console.log(duplicate);
            if (duplicate) {
                article.id = duplicate.id;
            }

            promises.push(articleRepository.save(article));
        });
    });
    
    return await Promise.all(promises);
}

/**
 * checks for every known RSS-Feed, whether it should be polled.
 * (by checking, whether the TTL expired)
 * 
 * @returns list of RSS-Feeds to poll.
 */
export async function getFeedsToPoll (): Promise<Array<Feed>> {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }

    let feeds = await feedRepository.findBy({
        lastPolledAt: Raw((alias) => `${alias} + ttl * interval '1 second' < CURRENT_TIMESTAMP`),
    });
    
    return feeds;
}
