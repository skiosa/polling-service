import Parser from "rss-parser";

export type rssType = {
    [key: string]: any;
} & Parser.Output<{description: string}>