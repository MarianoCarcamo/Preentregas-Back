const socket = io()

let user
let chatBox = document.getElementById("chatBox")

Swal.fire({
    title:"Identificate",
    input:"email",
    text:"Ingresa tu email",

    inputValidator:(value) => {
        return !value && "Necesitas identificarte para ingresar al chat"
    },

    allowOutsideClick:false,
    allowEscapeKey: false
}).then (result => {
    user = result.value
    socket.emit('loggedUser',user)
})

chatBox.addEventListener("keyup", evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {user:user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

socket.on("messageLogs", data => {
    let log = document.getElementById("messageLogs")
    let messages = ""
    data.forEach(message => {
        messages = `${message.user}: ${message.message}</br>` + messages
    })
    log.innerHTML = messages
})

socket.on("newUser", user => {
    Swal.fire({
        title:`${user} is now in the chat room!`,
        toast:true,
        position:"top-right"
    })
})

