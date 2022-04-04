import { assert } from "chai";
import { pollFeed } from "../../src/polling";
import { rawRSS } from "../../src/types";

describe('Test: poll a feed', () => {
    it('should return a raw (just polled, not yet parsed) feed', async () => {
        let rawFeed = await pollFeed('test');
        assert.instanceOf(rawFeed, rawRSS, 'no parsed feed was returned');
        // console.log(rawFeed); // uncomment, when you want to look at the output
    });
});
