const express = require('express')
const http = require('http')

const sockets = require("socket.io-client")({
  rejectUnauthorized: false // WARN: please do not do this in production
});

const app = express()
const port = process.env.PORT || 3000

const server = http.createServer(app);

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "../public/index.html")
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// Socket.io

const io = require("socket.io")(server);

io.on("connection",(socket)=>{
    console.log("Connected...");
    
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg);
    })
})