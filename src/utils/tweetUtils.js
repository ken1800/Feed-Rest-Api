const {
    config: {
        db,
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

const addTweets = async() => {
    const rows = await db.insert(dammyDataTweet).into("tweets").returning("*");
    return rows[0];

}

const selectTweets = async() => {
    const rows = await db.select("*").from("tweets");
    return rows;
}




exports.addTweets = addTweets
exports.selectTweets = selectTweets