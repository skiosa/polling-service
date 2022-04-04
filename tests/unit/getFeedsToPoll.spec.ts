import { assert } from 'chai';
import { getFeedsToPoll } from '../../src/db';

describe('Test: get feeds to poll from database', () => {
    it('should return an array of all feeds that should be polled', () => {
        let feedsToPoll = getFeedsToPoll();
        assert.instanceOf(feedsToPoll, Array, 'no array was returned');
        // console.log(feedsToPoll); // uncomment, when you want to look at the output
    });
});
