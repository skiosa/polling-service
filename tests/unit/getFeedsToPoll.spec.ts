import { assert } from 'chai';
import { Feed } from 'skiosa-orm';
import { getFeedsToPoll } from '../../src/db';

describe('Test: get feeds to poll from database', () => {
    it('should return an array of all feeds that should be polled', async () => {
        let feedsToPoll = await getFeedsToPoll();
        
        assert.instanceOf(feedsToPoll, Array, 'no array was returned');
        feedsToPoll.forEach(feed => {
            assert.instanceOf(feed, Feed, "contents of returned Array include non-Feed Objects");
        })
        // console.log(feedsToPoll); // uncomment, when you want to look at the output
    });
});
