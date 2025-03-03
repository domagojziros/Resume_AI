document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const messageInput = document.getElementById("message-input");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        // Dodaj korisničku poruku u chat
        addMessage(messageText, "sent");

        // Prikazivanje "Domagoj tipka..." indikator
        showTypingIndicator();

        // Pošalji poruku serveru
        fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: messageText })
        })
        .then(response => response.json())
        .then(data => {
            removeTypingIndicator();
            addMessage(data.response, "received");
        })
        .catch(error => {
            removeTypingIndicator();
            console.error("Greška pri slanju poruke:", error);
            addMessage("Greška pri dohvaćanju odgovora.", "received");
        });

        // Očisti input
        messageInput.value = "";
    }

    function addMessage(text, type) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", type);
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message", "received", "typing");
        typingIndicator.innerHTML = "<span></span><span></span><span></span>";
        typingIndicator.id = "typing-indicator";
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById("typing-indicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
});
