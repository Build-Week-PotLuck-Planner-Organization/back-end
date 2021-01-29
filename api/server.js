require("dotenv/config")
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Potluck API!",
    })
})

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong."
    })
})

module.exports = server;