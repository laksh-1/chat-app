const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");
const userName = document.getElementById('userName');
const name = prompt("Enter your name: ");
userName.innerText = `You've joined as ${name}`;
var audio = new Audio('ting.mp3');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
})

const appendMessage = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    appendMessage(`${name} joined the chat`, 'left');
})

socket.on('recieve', data =>{
    appendMessage(`${data.name} : ${data.message}`, 'left')
})

socket.on('leave', name => {
    appendMessage(`${name} left the chat`, 'left');
})