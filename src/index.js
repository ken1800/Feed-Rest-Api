require("dotenv").config();
const {
    config: {
        app,
        db
    },
} = require("./config");
const {
    seedFunc
} = require("./utils/seedUtils");
const {
    addTweets,
    selectTweets
} = require("./utils/tweetUtils");

const {
    getTweet,
    seedTweetsToFeed,
    getfeeds,
    selectUser,
} = require("./utils/feedsUtils");

app.set("db", db);

// for seeding data into the database
app.get("/seed", (req, res) => {
    // this creates tables (if they dont exists) and populates them with some dummydata
    seedFunc(res);

    // Adds the a single post/tweet to the tweet table. (user= davis),the data is already declared in the tweets utils file.
    addTweets()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log("there was an error");
        });

    // the default server response
    res.send("Hey check your console");
});

//All tweets end point
app.get("/tweets", (req, res) => {
    // selectes all the tweets from the tweets table -returns an array of tweets objects
    selectTweets()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            console.log(error, "there was an error");
        });
});

// seed feeds ENDPOINT
app.get("/seedFeeds", (req, res) => {
    // get all tweets and pass it to feeds table
    selectTweets()
        .then((data) => {
            seedTweetsToFeed(data);
        })
        .catch((error) => {
            console.log(error, "there was an error");
        });

    res.send("Tweeets added to feeds");
});

// All feeds API endpoint
app.get("/feed", async (req, res) => {
    const feed = await getfeeds()
    res.send(feed)
});

app.get("/", (req, res) => {
    res.send("Database creation Step1");
});

app.listen(process.env.PORT, () => {
    console.log(
        `application listening at port ${process.env.PORT} || ${new Date()}`
    );
});