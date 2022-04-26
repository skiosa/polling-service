import { assert } from "chai";
import { Article, Feed } from "skiosa-orm";
import { parseFeed } from "../../src/parsing";
import { RssType } from "../../src/types";

describe('Test: parse a raw feed', () => {
    it('should return a parsed feed', async () => {
        let feed = new Feed();
        feed.link = 'https://www.tagesschau.de/xml/rss2/';
        feed.lastPolledAt = new Date(0);

        let rss = new RssType({
            title: 'tagesschau.de - Die Nachrichten der ARD',
            description: 'tagesschau.de',
            link: 'https://www.tagesschau.de',
            items: [{
                title: 'test',
                description: 'test',
                link: 'https://www.tagesschau.de',
                pubDate: 'Mon, 25 Apr 2022 15:49:24 +0200',
            }]
        });
        
        let parsedFeed = await parseFeed(rss, feed);

        assert.instanceOf(parsedFeed, Array, 'no Array was returned');
        parsedFeed.forEach(article => {
            assert.instanceOf(article, Article, 'contents of returned Array include non-Article Objects');
        });
        // console.log(parsedFeed); // uncomment, when you want to look at the output
    });
});
