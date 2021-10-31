import { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../components/head";
import dynamic from "next/dynamic";
import { Tweets } from "../interface/tweet";
import { readTweets } from "../hooks/useTweet";

const TopPage:NextPage = (props) => {
    const [tweets, setTweet] = useState<Tweets | undefined>(readTweets());
    const [tweetSentence, setTweetSentence] = useState<string>();
    useEffect(() => {
        setTweet(tweets);
    }, [tweets]);

    const setTweetSentenceFunc = (e: any) => {
        setTweetSentence(e.target.value);
    }

    const tweetButton = () => {
        let lastNum = 1;
        if (typeof tweets != 'undefined') {
            lastNum = tweets.data.slice(-1)[0].id + 1;
        }
        const newTweet = {
            id: lastNum,
            sentence: tweetSentence,
        };
        if (typeof tweets == 'undefined') {
            const firstTweet:Tweets = {
                data : [{
                    id:lastNum,
                    sentence:tweetSentence,
                }],
            };
            localStorage.setItem("tweets", JSON.stringify(firstTweet));
            setTweet(firstTweet);
        } else {
            const newTweets:Tweets = {
                data : tweets.data
            };
            newTweets.data.push(newTweet);
            localStorage.setItem("tweets", JSON.stringify(newTweets));
            setTweet(newTweets);
        }
    }


    return (
        <>
            <Header></Header>
            {/* <body> */}
                <div className="tweetBoard">
                    <textarea className="tweetArea"
                        placeholder="何か呟いてみましょう"
                        onChange={ setTweetSentenceFunc }
                        value={props.tweetSentence}></textarea>
                    <button onClick={ tweetButton }>ツイートする</button>
                </div>
                <div className="tweetList">
                <h2>TweetList</h2>
                    { tweets == null ? (
                        <div>
                            <p>ツイートがまだありません。<br />
                            ツイートをしてみましょう！</p>
                        </div>
                    ) : (
                        <div className="tweets">
                            <ul>
                                <li className="tweetHeader">
                                    <p className="tweetSentence">ツイート内容</p>
                                </li>
                                {tweets.data.map(posts => (
                                    <li className="tweetSentence">{ posts.id }: { posts.sentence }</li>    
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            {/* </body> */}
            
        </>
    )
}

const DynamicTopPage = dynamic(
    {
        loader: async () => TopPage,
    },
    {
        ssr: false
    }
);

export default DynamicTopPage;
