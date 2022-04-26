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
        pollFeed(feed)
        .then((raw) => parseFeed(raw[0], raw[1]))
        .then((parsed) => insertArticles(parsed, feed))
        .then((inserted) => {})//console.log(inserted))
        .catch((err) => {
            console.log(`error in: ${feed}:${err}`);
        }) 
    });
}

main()
