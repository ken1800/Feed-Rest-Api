const {
    config: {
        db,
    }
} = require("../config")

const ID = function() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// fetch all the data from the tweets table and populate it to the 
const seedTweetsToFeed = async(tweets) => {
    try {
        const specialID = ID()
        const activity_type = "tweet"

        const newTweetObj = await tweets.map((tweetEl) => ({
            specialID,
            data: tweetEl
        }))


        // transforming the tweet object data to the required feeds table format
        const dataTweets = await newTweetObj.map((twee) => {
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

    } catch (error) {
        return error
    }

}


// select feeds from feeds table
const selectFeeds = async() => {
    return await db.select("*").from("feeds");
}

// select specific user object returned
const selectUser = async(id) => {
    return await db.select("*").from("users").where('userId', id).first();
}

const getTweet = async(id) => {
    return await db.select("*").from("tweets").where('tweets_id', id).first();
}

//  function to get the feeds
async function getfeeds(){
    const rawFeed = await selectFeeds()
    return rawFeed.map((feedItem) => {
        feedItem.user = await selectUser(feedItem.author)
        if(feedItem.activity_type === 'tweet') {
            const tweet = await getTweet(feedItem.activity_id)
            feedItem.resource = tweet.post
        }
        return feedItem
    })
}


exports.seedTweetsToFeed = seedTweetsToFeed
exports.selectFeeds = selectFeeds
exports.getfeeds = getfeeds
exports.selectUser = selectUser
exports.getTweet = getTweet