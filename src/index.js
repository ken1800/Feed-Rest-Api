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
    seedTweetsToFeed,
    selectFeeds,
    getfeeds,
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
app.get("/feed", (req, res) => {
    // the function that transforms the feedsPromise into readable human format
    const fnFeed = async() => {
        try {
            const fd = await selectFeeds();
            const fdData = await getfeeds(fd)
            res.setHeader('Content-Type', 'text/html');
            // Had to wait for atleast 1 second to get the fdData Promise fully resolved
            setTimeout(() => {
                // after mapping, you will get back Promise objects that contain the statement
                fdData.map((h) => {
                    // i resolved the object promise here
                    h.then((d) => {
                        const ar = []
                        ar.push(d)
                            // this will output the desired data as an array in the console
                        console.log(d)
                            // i couldnt use the res.send() method because it only sets the response once to the client. i had to send it as html data
                        res.write(`<h3>[${ar}]<br></br></h3>`)
                    })
                })
            }, 1000)
            setTimeout(() => {
                res.end();
            }, 1000)
        } catch (error) {
            console.log("there was an error outputing feeds to the user", error);
        }
    };
    // i executed the fnFeed function above here
    fnFeed()

});

app.get("/", (req, res) => {
    res.send("Database creation Step1");
});

app.listen(process.env.PORT, () => {
    console.log(
        `application listening at port ${process.env.PORT} || ${new Date()}`
    );
});