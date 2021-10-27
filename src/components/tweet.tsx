import { useTweets } from "../hooks/useTweet";

const Tweet = () => {
    const { tweets } = useTweets();

    return (
        <div className="tweetBoard">
            
        </div>
    );
}

export default Tweet;