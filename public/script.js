const socket = io();

const sockets = require("socket.io-client")({
  rejectUnauthorized: false // WARN: please do not do this in production
});

let messageSection = document.querySelector('.message_section');
// Username
let u_name;

do
{
    u_name = prompt("Enter your name.");
}while(!u_name);


// Outgoing Messages
let textarea = document.querySelector('.message_box');

textarea.addEventListener("keyup",(e)=>{
    if(e.key === "Enter")
    {
        msg = {
            name : u_name,
            message : e.target.value.trim()
        }

        e.target.value = "";
        // append
        addMsg(msg,"outgoing")

        // send to server
        socket.emit("message",msg);

    }
})


function addMsg(msg,type)
{
    let elem_div = document.createElement("div");
    elem_div.classList.add("message" , type);
    
    let string = `<h5>${msg.name}</h5>
    <p>${msg.message}</p>`
    elem_div.innerHTML = string;

    let messageSection = document.querySelector('.message_section');
    messageSection.appendChild(elem_div)

    scrollToBottom()
}



// Receiving Messages
socket.on("message",(msg)=>{
    addMsg(msg,"incoming");
})

// Scroll Function
function scrollToBottom()
{
    messageSection.scrollTop = messageSection.scrollHeight;
}