import { AppProps } from "next/app";
import Header from "../components/head";
import dynamic from "next/dynamic";
import { useTweets } from "../hooks/useTweet";

const TopPage = () => {
    const { tweets, loading } = useTweets();

    if (loading) {
        return <h1>読み込み中...</h1>
    }

    return (
        <>
            <Header></Header>

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
