const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

const port = process.env.PORT

app.use('',express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`)
    socket.on('chat message', (msg) => {
        console.log(`Mensagem recebida: ${msg}.`)
        //emitindo evento do back
        io.emit('chat message', msg, socket.usuario);//envia para todos os clientes conectados
        //socket.broadcast.emit('chat message', msg);//envia para todos, exceto para o sender
    })

    // io.on('connection', (cliente) => {
    //         //emitindo evento do back
    //        cliente = socket.usuario
    //         io.emit('usuarios', cliente);//envia para todos os clientes conectados
    //         console.log(cliente)
           
    //     })

    socket.on('mudar nome', (usuario) => {
        console.log(`usuario: ${usuario}.`)
        socket.usuario = usuario;
        socket.name = usuario;
        console.log(socket.usuario);
        
    })

    socket.on('disconnect', () => {
        console.log(`Um usuário desconectou!`)
    })
    var clients = [];

    // io.sockets.on('connect', function(client) {
       
        
    //     clients = Array.from(io.sockets.sockets.keys())
    //     if(clients.id == socket.id){
    //         console.log("foi")
    //     }else {
    //         console.log("não foi")
    //     }
    //     io.emit('usuarios', clients);
    //     console.log(clients)
    //     console.log(socket.usuario)
       
    // })

})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})