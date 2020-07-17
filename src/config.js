const express = require("express");
const app = express();
const faker = require("faker");
const configDb = require('./db')
const db = configDb.db


exports.config = {
    app,
    faker,
    db
}