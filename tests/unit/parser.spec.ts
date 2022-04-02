import { assert } from "chai";
import { parseFeed } from "../../src/parsing";
import { parsedRSS } from "../../src/types";

describe('Test: parse a raw feed', () => {
    it('should return a parsed feed', async () => {
        let parsedFeed = await parseFeed({content: 'test'});
        assert.instanceOf(parsedFeed, parsedRSS, 'no parsed feed was returned');
        // console.log(parsedFeed); // uncomment, when you want to look at the output
    });
});
