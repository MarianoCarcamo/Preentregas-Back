import chatModel from "../dao/models/message.model.js"

function chatSocket (socketServer) {
    socketServer.on('connection', socket => {
        
        socket.on("loggedUser", data => {
            socket.broadcast.emit('newUser', data)
            chatModel.find()
            .then( (messages) => {
                socket.emit('messageLogs', messages)
            })
        })

        socket.on('message', data => {
            chatModel.create(data).then(() => {
                chatModel.find()
                .then( (messages) => {
                    socketServer.emit('messageLogs', messages)
                })
            })
        })

    })
}

export default chatSocket
