import { rawRSS } from "./types";

export async function pollFeed (link: string): Promise<rawRSS> {
    return new Promise<rawRSS> ((resolve, reject) => {
        let raw: rawRSS = {content: link};

        resolve(raw);
    });
}