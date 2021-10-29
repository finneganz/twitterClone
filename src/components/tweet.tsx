import { NextPage } from "next";
import { useTweets } from "../hooks/useTweet";
import { useState, ChangeEvent, ChangeEventHandler } from "react";
import { Tweets } from "../interface/tweet";

const TweetWindow:NextPage<Tweets> = props => {
    const [tweetSentence, setTweetSentence] = useState<string>();
    const [tweets, setTweet] = useState<Tweets | undefined>();

    const setTweetSentenceFunc = (e: any) => {
        setTweetSentence(e.target.value);
    }

    const tweetButton = () => {
        let lastNum = 1;
        if (typeof tweets != undefined) {
            lastNum = tweets.data.slice(-1)[0].id + 1;
        }
        let newTweet = {
            id: lastNum,
            sentence: tweetSentence,
        };
        if (tweets == undefined) {
            const firstTweet = {
                data : [{
                    id:lastNum,
                    sentence:tweetSentence,
                }],
            };
            localStorage.setItem("tweets", JSON.stringify(firstTweet));
        } else {
            tweets.data.push(newTweet);
        
            localStorage.setItem("tweets", JSON.stringify(tweets));
        }
        // setTweet(value);
        console.log(localStorage.getItem("tweets"));
        console.log(tweets);
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