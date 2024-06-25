document.getElementById('send-btn').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    });
    const data = await response.json();
    document.getElementById('chat-box').innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    document.getElementById('chat-box').innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
    document.getElementById('user-input').value = '';
});
