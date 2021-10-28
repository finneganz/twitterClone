import { useState, useEffect } from "react";

interface Tweets {
    id: number,
    sentence: string,
};

const readTweets = (): Tweets | undefined => {
    const tweets = localStorage.getItem("tweets");
    return tweets != null ? JSON.parse(tweets) : undefined;
};

export const useTweets = () => {
    const [tweets, setTweet] = useState<Tweets | undefined>(readTweets());

    return {
        tweets,
    };
};
