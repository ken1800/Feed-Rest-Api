const {
    config: {
        db,
        app
    }
} = require("../config")

const ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// fetch all the data from the tweets table and populate it to the 
const seedTweetsToFeed = async(tweets) => {
    const specialID = ID()
    const activity_type = "tweet"

    const newTweetObj = tweets.map((tweetEl) => ({
        specialID,
        data: tweetEl
    }))


    // transforming the tweet object data to the required feeds table format
    const dataTweets = newTweetObj.map((twee) => {
        return {
            author: twee.data.author,
            time_created: twee.data.tweeted_at,
            activity_id: twee.data.tweets_id,
            activity_type: activity_type,
            seen_at: new Date()
        }
    })

    console.log(dataTweets)
        // insert this tweets to the feeds table
    const rows = await db.insert(dataTweets).into("feeds").returning("*");
    return rows[0];


}


// select feeds from feeds table
const selectFeeds = async() => {
    const feeds = await db.select("*").from("feeds").orderBy('feed_id');
    return feeds;
}


// select specific user
const selectUser = async(id) => {
    const user = await db.select("name").from("users").where('userId', id);
    return user;
}

//  function to get the feeds
const getfeeds = (feeds) => {
    // output the  feeds 
    const feed = feeds.map((fed) => {
        return fed
    })

    return feed.map((data) => {

        // console.log(name)
        return `On ${data.time_created.toString().slice(0, -48)} at ${data.time_created.toTimeString().slice(0, -31)}  ${selectUser(data.author).then((dt) => {
            dt.map((d) => d.name)
        })} ${data.activity_type}  `
    })



}


exports.seedTweetsToFeed = seedTweetsToFeed
exports.selectFeeds = selectFeeds
exports.getfeeds = getfeeds
exports.selectUser = selectUser