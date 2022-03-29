import "reflect-metadata";
import { dataSource, getFeedsToPoll, insertArticle } from "./db";
import { parseFeed } from "./parsing";
import { pollFeed } from "./polling";

const dotenv = require('dotenv');
dotenv.config({ path: '../config/app.env' });

function main () {
    let feeds = getFeedsToPoll();
    
    feeds.forEach(feed => {
        pollFeed(feed)
        .then((raw) => parseFeed(raw))
        .then((parsed) => insertArticle(parsed))
        .catch((err) => {
            console.log(`error in: ${feed}:${err}`);
        }) 
    });
}

dataSource.initialize()
.then(() => main())
.catch((err) => console.log(err));