import { AppProps } from "next/app";
import Header from "../components/head";
import { useTweet } from "../hooks/useTweet";

const TopPage = () => {
    const { tweets, loading } = useTweet();

    if (loading) {
        return <h1>読み込み中...</h1>
    }

    return (
        <>
            <Header></Header>

            <h2>TweetList</h2>
                { tweets == null ? (
                    <div>
                        <p>ツイートがまだありません。<br />
                        ツイートをしてみましょう！</p>
                    </div>
                ) : (
                    <div className="mainBoard">
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
        </>
    )
}

export default TopPage;
