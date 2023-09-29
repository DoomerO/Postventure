require('dotenv').config();
const express = require('express');
const knex = require("./knex/knex");
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

//const postgres = require('postgres');

//const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
//const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

//const sql = postgres(URL, { ssl: 'require' });

//async function getPgVersion() {
  //const result = await sql`2.18.1`;
  //console.log(result);
//}

//getPgVersion();

const {Server} = require('socket.io');

const io = new Server(3000, {
    cors : {
        origin: "exp://192.168.1.69:8081" || "http://localhost:19006"
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
