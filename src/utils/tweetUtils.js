const {
    config: {
        db,
        faker,
    }
} = require("../config")


// MY IDEA FOR THE PROCESS 2
// 1st Step - Selecting all the data from the tweets table
// 2nd step -cross check if the data exists(using all the id in the table) in the feeds table, if not ADD the data(to the feeds table) else exit.
// final step -Selecting from the feed and sorting them by time

const dammyDataTweet = {
    post: "its a wonderful day",
    author: 2,
    isReply: false,
    tweetId: null,
    tweeted_at: new Date()
}

const addTweets = () => {
    return db.insert(dammyDataTweet).into("tweets").returning("*").then(rows => {
        return rows[0];
    });

}

const selectTweets = () => {
    return db.select("*").from("tweets").then(rows => rows);
}




exports.addTweets = addTweets
exports.selectTweets = selectTweets