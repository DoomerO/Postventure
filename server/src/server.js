const express = require('express');
const knex = require("./knex/knex");
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const {Server} = require('socket.io');

const io = new Server(3000, {
    cors : {
        origin: "http://localhost:19006"
    }
});

io.on("connection", (socket) => {
    socket.emit("message", "Test");

    socket.on("reqPosts", async () => {
        const posts = await knex("Post");
        io.emit("showPosts", posts);
    })

    socket.on("makePost", async (data) => {
        await knex("Post").insert({
            name : data.name,
            content : data.content
        })
        const posts = await knex("Post");
        io.emit("showPosts", posts);
    })
})

server.get('/', async (req, res) => {
    res.send("Root of the Postventure server.");
});

module.exports = server;
