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
function main () {
    let feeds = getFeedsToPoll();
    
    feeds.forEach(feed => {
        pollFeed(feed)
        .then((raw) => parseFeed(raw))
        .then((parsed) => insertArticles(parsed))
        .then((inserted) => console.log(inserted))
        .catch((err) => {
            console.log(`error in: ${feed}:${err}`);
        }) 
    });
}

main()
