const {
    config: {
        db,
        faker,
    }
} = require("../config")

const seedFunc = ({
    res
}) => {
    db.schema.hasTable("users").then(function(exists) {

        if (!exists) {
            db.schema
                .createTable("users", function(table) {
                    table.increments("userId").primary();
                    table.string("name");
                    table.string("email");
                })
                .then(function() {
                    const recordsLength = Array.from(Array(100).keys());
                    const records = recordsLength.map((rec) => ({
                        name: faker.name.findName(),
                        email: faker.internet.email(),
                    }));
                    console.log(records, "records")
                    db("users")
                        .insert(records)
                        .then(() => {
                            res.send("Seeded users data");
                        });
                });
        } else {

            console.log("User Table exists - Seeded data")
        }
    }).catch((error) => {
        console.log(error)
    })

    db.schema.hasTable("groups").then(function(exists) {
        if (!exists) {
            db.schema
                .createTable("groups", function(table) {
                    table.increments("groups_id").primary();
                    table.string("group_name");
                    table.integer('author').unsigned().notNullable();
                    table.timestamp('created_at').defaultTo(db.fn.now());
                    table.foreign('author').references('userId').inTable('users');
                })
                .then(function() {
                    const records = {
                        group_name: "KEMSA",
                        author: 1,
                        created_at: new Date()
                    }
                    console.log(records, "records")
                    db("groups")
                        .insert(records)
                        .then(() => {
                            res.send("Seeded groups data");
                        });
                });
        } else {
            console.log("Groups Table exists - Seeded data")
        }
    }).catch((error) => {
        console.log(error)
    })

    db.schema.hasTable("tweets").then(function(exists) {
        if (!exists) {
            db.schema
                .createTable("tweets", function(table) {
                    table.increments("tweets_id").primary();
                    table.string("post");
                    table.integer('author').unsigned().notNullable();
                    table.boolean("isReply");
                    table.integer("tweetId");
                    table.timestamp('tweeted_at').defaultTo(db.fn.now());
                    table.foreign('author').references('userId').inTable('users');
                })
                .then(function() {
                    const records = {
                        post: "with jesus all is possible",
                        author: 1,
                        isReply: false,
                        tweetId: null,
                        tweeted_at: new Date()
                    }
                    console.log(records, "records")
                    db("tweets")
                        .insert(records)
                        .then(() => {
                            res.send("Seeded tweets data");
                        });
                });
        } else {

            console.log("Tweets Table exists - Seeded data")
        }
    }).catch((error) => {
        console.log(error)
    })
    db.schema.hasTable("feeds").then(function(exists) {

        if (!exists) {
            db.schema
                .createTable("feeds", function(table) {
                    table.increments("feed_id").primary();
                    table.integer('author').unsigned().notNullable();
                    table.timestamp('time_created');
                    table.integer("activity_id");
                    table.string("activity_type");
                    table.timestamp("seen_at");
                    table.foreign('author').references('userId').inTable('users');
                }).then(function() {
                    const records = {
                        author: 1,
                        time_created: new Date(),
                        activity_id: 2,
                        activity_type: "tweeted",
                        seen_at: new Date()

                    }
                    console.log(records, "records")
                    db("feeds")
                        .insert(records)
                        .then(() => {
                            // res.send("Seeded Feeds data");
                            console.log("feeds created succesfully")
                        });
                });
        } else {

            console.log("Feeds Table exists - Seeded data")
        }
    }).catch((error) => {
        console.log(error)
    })


    db.schema.hasTable("likes").then(function(exists) {
        if (!exists) {
            db.schema
                .createTable("likes", function(table) {
                    table.increments("likes_id").primary();
                    table.integer("tweetId");
                    table.integer('author').unsigned().notNullable();
                    table.timestamp('liked_at').defaultTo(db.fn.now());
                    table.foreign('tweetId').references('tweetId').inTable('tweets');
                    table.foreign('author').references('userId').inTable('users');
                })
                .then(function() {
                    const records = {
                        tweetId: 1,
                        author: 2,
                        liked_at: new Date()
                    }
                    console.log(records, "records")
                    db("likes")
                        .insert(records)
                        .then(() => {
                            res.send("Seeded likes data");
                        });
                });
        } else {

            console.log("Likes Table exists - Seeded data")
        }
    }).catch((error) => {
        console.log(error)
    })








}

exports.seedFunc = seedFunc;