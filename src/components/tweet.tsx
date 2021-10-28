import { NextPage } from "next";
import { useTweets } from "../hooks/useTweet";
import { useState } from "react";
import { Tweets } from "../interface/tweet";

interface Props {
    tweetSentence:string,
}

const TweetWindow:NextPage<Tweets, Props> = props => {
    const [tweetSentence, setTweetSentence] = useState<Props>();
    const [tweets, setTweet] = useState<Tweets | undefined>();

    const setTweetSentenceFunc = (e: any) => {
        setTweetSentence(e.target.value);
    }

    const tweetButton = (e: any) => {
        
        let value = tweetSentence;
        localStorage.setItem("tweets", JSON.stringify(value));
        // setTweet(value);
        console.log(localStorage.getItem("tweets"));
        console.log(value);
    }

    return (
        <div className="tweetBoard">
            <textarea className="tweetArea"
                placeholder="何か呟いてみましょう"
                onChange={ setTweetSentenceFunc }
                value={props.tweetSentence}></textarea>
            <button onClick={ tweetButton }>ツイートする</button>
        </div>
    );
}

export default TweetWindow;