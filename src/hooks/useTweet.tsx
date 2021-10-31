import { useState, useEffect } from "react";
import { Tweets } from "../interface/tweet";

export const readTweets = (): Tweets | undefined => {
    const tweets = localStorage.getItem("tweets");
    return tweets != null ? JSON.parse(tweets) : undefined;
};
