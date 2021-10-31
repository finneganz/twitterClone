import { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../components/head";
import dynamic from "next/dynamic";
import { Tweets } from "../interface/tweet";
import { readTweets } from "../hooks/useTweet";

interface Props {
    tweetSentence:string,
};

const TopPage:NextPage<Props> = (props) => {
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
            like: false,
        };
        if (typeof tweets == 'undefined') {
            const firstTweet:Tweets = {
                data : [{
                    id: lastNum,
                    sentence: tweetSentence,
                    like: false,
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

    const likeButton = (e: any) => {
        const likeTweetNum = e.target.value;
        let newTweets:Tweets = {
            data: tweets.data
        };
        newTweets.data.filter(function(item, index) {
            if (item.id == likeTweetNum) {
                item.like = item.like ? false : true;
            }
        });
        localStorage.setItem("tweets", JSON.stringify(newTweets));
        setTweet(newTweets);
    }

    return (
        <>
            <Header></Header>
            <div className="tweetBoard">
                <textarea className="tweetArea"
                    placeholder="何か呟いてみましょう"
                    onChange={ setTweetSentenceFunc }
                    value={ props.tweetSentence }></textarea>
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
                            {tweets.data.map((posts, index) => (
                                <li className="tweetSentence" key={index}>
                                    { posts.id }: { posts.sentence }
                                    <button onClick={ likeButton } value={ posts.id }>{ posts.like ? 'Liked★' : 'Like☆' }</button>
                                </li>    
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
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
