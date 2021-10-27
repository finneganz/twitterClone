import { useState, useEffect } from "react";

interface Tweets {
    id: number,
    sentence: string,
};

const readTweets = (): Tweets | undefined => {
    const tweets = localStorage.getItem("tweet");
    return tweets != null ? JSON.parse(tweets) : undefined;
};

export const useTweets = () => {
    const [tweets, setTweet] = useState<Tweets | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTweet(readTweets());
        setLoading(false);
    }, []);

    return {
        tweets,
        loading,
    };
};
