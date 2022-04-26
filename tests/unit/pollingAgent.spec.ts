import { assert } from "chai";
import { Feed } from "skiosa-orm";
import { pollFeed } from "../../src/polling";
import { RssType } from "../../src/types";

describe('Test: poll a feed', () => {
    it('should return a raw (just polled, not yet parsed) feed', async () => {
        let feed = new Feed();
        feed.link = 'https://www.tagesschau.de/xml/rss2/';

        let raw = await pollFeed(feed);
        
        assert.instanceOf(raw, Array, 'no Array was returned');
        assert.instanceOf(raw[0], RssType, 'no RssType returned');
        assert.containsAllKeys(raw[0], ['link', 'title', 'description'], 'mandatory fields missing in RssType');
        assert.strictEqual(raw[1], feed, 'input Feed was not returned');
        // console.log(raw); // uncomment, when you want to look at the output
    });
});

