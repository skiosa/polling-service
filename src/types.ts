import Parser, { Item, PaginationLinks } from "rss-parser";

export class RssType implements Parser.Output<{description: string}> {
    [key: string]: any;
    image?: {
        link?: string;
        url: string;
        title?: string;
    };
    paginationLinks?: PaginationLinks;
    link!: string;
    title!: string;
    items!: ({description: string} & Item)[];
    feedUrl?: string;
    description!: string;
    itunes?: {
        [key: string]: any;
        image?: string;
        owner?: {
            name?: string;
            email?: string;
    };
    author?: string;
    summary?: string;
    explicit?: string;
    categories?: string[];
    keywords?: string[];
    };

    /**
     * transforms the return type from the rss-parser into an Object (better type-checking)
     * 
     * @param rss return type from rss-parser
     */
    constructor (rss: {[key: string]: any} & Parser.Output<{description: string}>) {
        for (let key of Object.keys(rss)) {
            // make required fields actually 'required'
            if (['link', 'title', 'description'].includes(key)) {
                this[key] = rss[key]!; // notice the extra exclamation mark here
            }
            // copy any other given (optional) field
            else {
                this[key] = rss[key];
            }
        }
    }
}
