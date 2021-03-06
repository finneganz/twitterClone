import { NextPage } from "next";
import { useState, useEffect } from "react";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import dynamic from "next/dynamic";
import { Tweets } from "../interface/tweet";
import { readTweets } from "../hooks/useTweet";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

interface Props {
  tweetSentence: string;
}

const TopPage: NextPage<Props> = props => {
  const [tweets, setTweet] = useState<Tweets | undefined>(readTweets());
  const [tweetSentence, setTweetSentence] = useState<string>();

  const setTweetSentenceFunc = (e: any) => {
    setTweetSentence(e.currentTarget.value);
  };

  const tweetButton = () => {
    console.log(tweetSentence);
    if (typeof tweetSentence === "undefined" || tweetSentence === "")
      return false;
    let lastNum = 1;
    if (typeof tweets != "undefined") {
      lastNum = tweets.data.slice(-1)[0].id + 1;
    }
    const newTweet = {
      id: lastNum,
      sentence: tweetSentence,
      like: false
    };
    if (typeof tweets == "undefined") {
      const firstTweet: Tweets = {
        data: [
          {
            id: lastNum,
            sentence: tweetSentence,
            like: false
          }
        ]
      };
      localStorage.setItem("tweets", JSON.stringify(firstTweet));
      setTweet(firstTweet);
    } else {
      const newTweets: Tweets = {
        data: tweets.data
      };
      newTweets.data.push(newTweet);
      localStorage.setItem("tweets", JSON.stringify(newTweets));
      setTweet(newTweets);
    }
  };

  const likeButton = (e: any) => {
    const likeTweetNum = e.currentTarget.value;
    let newTweets: Tweets = {
      data: tweets.data
    };
    newTweets.data.filter(function(item, index) {
      if (item.id == likeTweetNum) {
        item.like = item.like ? false : true;
      }
    });
    localStorage.setItem("tweets", JSON.stringify(newTweets));
    setTweet(newTweets);
  };

  return (
    <>
      <div className="tweetBoard">
        <TextField
          type="text"
          className="tweetArea"
          placeholder="??????????????????????????????"
          onChange={setTweetSentenceFunc}
          value={props.tweetSentence}
          required
          inputProps={{ maxLength: 140 }}
          multiline
          minRows={2}
          maxRows={4}
        />
        <Button variant="contained" onClick={tweetButton}>
          ??????????????????
        </Button>
      </div>
      <div className="tweetList">
        <h2>TweetList</h2>
        {tweets == null ? (
          <div>
            <p>
              ???????????????????????????????????????
              <br />
              ???????????????????????????????????????
            </p>
          </div>
        ) : (
          <div className="tweets">
            <ul style={{ listStyle: "none" }}>
              {tweets.data.map((posts, index) => (
                <li
                  className="tweetSentence"
                  key={index}
                  style={{
                    width: "15em",
                    height: "3.3em"
                  }}
                >
                  {posts.id}: {posts.sentence}
                  <Button
                    variant="outlined"
                    value={posts.id}
                    onClick={likeButton}
                    color="secondary"
                    style={{
                      position: "relative",
                      margin: "0 auto",
                      right: "0"
                    }}
                  >
                    {posts.like ? (
                      <Favorite></Favorite>
                    ) : (
                      <FavoriteBorder></FavoriteBorder>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

const DynamicTopPage = dynamic(
  {
    loader: async () => TopPage
  },
  {
    ssr: false
  }
);

export default DynamicTopPage;
