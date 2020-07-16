const express = require("express");
const app = express();
const port = 3000;
const faker = require("faker");
const config = require('./db')

app.set()

app.set("db", config.db);



app.get("/seed", (req, res) => {
    const db = req.app.get("db");
    // console.log(db);
    console.log(
        faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
        "fakers"
    );
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
            res.send(" User Table exists - Seeded data");
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
            res.send(" Groups Table exists - Seeded data");
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
            res.send(" Tweets Table exists - Seeded data");
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
            res.send("Likes Table exists - Seeded data");
        }
    }).catch((error) => {
        console.log(error)
    })

    db.schema.hasTable("feed").then(function(exists) {
            if (!exists) {
                db.schema
                    .createTable("feed", function(table) {
                        table.increments("feed_id").primary();
                        table.timestamp('time_created');
                        table.integer('author').unsigned().notNullable();
                        // was challenging to link this with their respective pareant tables
                        table.integer("activity_id");
                        table.string("activity_type");
                        table.timestamp("seen_at");
                        table.foreign('author').references('userId').inTable('users');
                    })
                    // .then(function() {
                    //     const records = {
                    //         tweetId: 1,
                    //         author: 2,
                    //         liked_at: new Date()
                    //     }
                    //     console.log(records, "records")
                    //     db("likes")
                    //         .insert(records)
                    //         .then(() => {
                    //             res.send("Seeded likes data");
                    //         });
                    // });
            } else {
                res.send(" Feeds Table exists ");
            }
        })
        .catch((error) => {
            console.log(error)
        })

});

app.get("/", (req, res) => {
    res.send("Database creation Step1");
});

app.listen(port, () => {
    console.log(
        `application listening at port ${port} || ${console.log(new Date())}`
    );
});