const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const helmet = require('helmet');
const dotenv = require('dotenv');

const authRouter = require('./auth/auth-router')
const potluckRouter = require('./potluck/potluck-router')

const server = express();

server.use(logger('dev'))
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/potlucks', potluckRouter)

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