const express = require("express");
const app = express();
const port = 3000;
const faker = require("faker");
const configDb = require('./db')
const db = configDb.db


exports.config = {
    app,
    port,
    faker,
    db
}