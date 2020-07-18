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
    try {
        const feeds = await db.select("*").from("feeds").orderBy('feed_id');
        return feeds;
    } catch (error) {
        return error
    }
}


// select specific user
const selectUser = async(id) => {
    try {
        const user = await db.select("name").from("users").where('userId', id);
        // console.log("user", user.map((n) => n.name))
        return user;
    } catch (error) {
        console.log(error)
    }
}

//  function to get the feeds
const getfeeds = async(feeds) => {
    // output the  feeds 
    try {
        const feed = await feeds.map((fed) => {
            return fed
        })


        const feedMod = await feed.map(async(data) => {
                try {

                    const nam = await selectUser(data.author)
                    const stmnt = `On ${data.time_created.toString().slice(0, -48)} at ${data.time_created.toTimeString().slice(0, -31)}  ${nam.map((n) => n.name)} ${data.activity_type} `
                    return stmnt


                } catch (error) {
                    console.log("mapping feeds error", error)
                }
            })
            // this will retun a promise with data
        return feedMod


    } catch (error) {
        console.log("get feeds error", error)
    }

}


exports.seedTweetsToFeed = seedTweetsToFeed
exports.selectFeeds = selectFeeds
exports.getfeeds = getfeeds
exports.selectUser = selectUser