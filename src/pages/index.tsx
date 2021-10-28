import { NextPage } from "next";
import Header from "../components/head";
import dynamic from "next/dynamic";
import { useTweets } from "../hooks/useTweet";
import TweetWindow from "../components/tweet";

const TopPage:NextPage = (props) => {
    const { tweets } = useTweets();

    return (
        <>
            <Header></Header>
            {/* <body> */}
                <TweetWindow></TweetWindow>
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
                                {tweets.map(posts => (
                                    <li className="tweetSentence">{ posts.sentence }</li>    
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
