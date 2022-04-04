import { DataSource } from "typeorm";
import { parsedRSS } from "./types";

export const dataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [parsedRSS],
    subscribers: [],
    migrations: [],
});

const articleRepository = dataSource.getRepository(parsedRSS);

/**
 * inserts a given Article-Object into the database.
 * should also update the TTL of the corresponding RSS-Feed.
 * 
 * @param content Article to insert.
 */
export async function insertArticle (content: parsedRSS) {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    
    let insertedContent = await articleRepository.save(content);
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
