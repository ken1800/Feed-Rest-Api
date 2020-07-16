const {
    config: {
        app,
        db,
        port
    }
} = require("./config")
const {
    seedFunc
} = require("./utils/seedUtils")
const {
    addTweets,
    selectTweets
} = require("./utils/tweetUtils")


app.set("db", db);


// for seeding data into the database
app.get("/seed", (req, res) => {

    // this creates tables (if they dont exists) and populates them with some dummydata
    seedFunc(res)


    // Adds the a single post/tweet to the tweet table. (user= davis),the data is already declared in the tweets utils file.
    addTweets().then((data) => {
        res.send(data);
    }).catch((error) => {
        console.log("there was an error")
    })


    // the default server response
    res.send("Hey check your console")
});


app.get("/getdata", (req, res) => {

    // selectes all the tweets from the tweets table -returns an array of tweets objects
    selectTweets().then((data) => {
        res.send(data);
    }).catch((error) => {
        console.log(error, "there was an error")
    });

});




app.get("/", (req, res) => {
    res.send("Database creation Step1");
});



app.listen(port, () => {
    console.log(
        `application listening at port ${port} || ${console.log(new Date())}`
    );
});