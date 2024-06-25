async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (!message) return;

    addMessageToChat('user', message);
    messageInput.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        if (data.reply) {
            addMessageToChat('ai', data.reply);
        } else {
            addMessageToChat('ai', 'Sorry, something went wrong.');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('ai', 'Sorry, something went wrong.');
    }
}

function addMessageToChat(sender, message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
