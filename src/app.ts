import "reflect-metadata";
import { getFeedsToPoll, insertArticles } from "./db";
import { parseFeed } from "./parsing";
import { pollFeed } from "./polling";

const dotenv = require('dotenv');
dotenv.config({ path: '../config/app.env' });

/**
 * main function, executed at start of script (after initializing db-connection).
 * gets, which feeds should be polled,
 * then polls those feeds, parses the raw feeds 
 * and inserts the parsed articles into the database.
 */
async function main () {
    let feeds = await getFeedsToPoll();
    
    feeds.forEach(feed => {
        const url = feed.link;

        console.log(`polling ${url}`);
        pollFeed(feed)
        .then((raw) => {
            console.log(`finished polling ${url}`);
            console.log(`parsing feed from ${url}`);
            return parseFeed(raw[0], raw[1]);
        })
        .then((parsed) => {
            console.log(`finished parsing feed from ${url}`);
            console.log(`inserting articles from ${url} into database`);
            return insertArticles(parsed, feed);
        })
        .then((inserted) => {
            console.log(`finished inserting articles from ${url} into database`);
            // console.log(inserted);
        })
        .catch((err) => {
            console.error(`error in: ${feed}:${err}`);
        }) 
    });
}

main()
