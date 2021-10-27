import { useState, useEffect } from "react";

interface Tweets {
    id: number,
    sentence: string,
};

const readTweet = (): Tweets | undefined => {
    const tweets = localStorage.getItem("tweet");
    return tweets != null ? JSON.parse(tweets) : undefined;
};

export const useTweet = () => {
    const [tweets, setTweet] = useState<Tweets | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTweet(readTweet());
        setLoading(false);
    }, []);

    return {
        tweets,
        loading,
    };
};
