import { assert } from "chai";
import { Article } from "skiosa-orm";
import { parseFeed } from "../../src/parsing";

describe('Test: parse a raw feed', () => {
    it('should return a parsed feed', async () => {
        let parsedFeed = await parseFeed({content: 'test'});
        assert.instanceOf(parsedFeed, Array, 'no Array was returned');
        parsedFeed.forEach(article => {
            assert.instanceOf(article, Article, 'contents of returned Array include non-Article Objects');
        });
        // console.log(parsedFeed); // uncomment, when you want to look at the output
    });
});
