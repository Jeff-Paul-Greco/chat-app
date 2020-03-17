var socket = io();
var messages = document.getElementById("messages");

(function () {
    $("#form").submit(function (event) {

        event.preventDefault();
        if ($("#message").val() === "") {
            alert("please type something into the field");
            return;
        } else {

            let li = document.createElement("li");

            socket.emit("chat message", $("#message").val());

            messages.appendChild(li).append($("#message").val());
            let span = document.createElement("span");
            messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");

            $("#message").val("");

            $("#messages")[0].scrollTop =  $("#messages")[0].scrollHeight

            return false;
        }
    });

    socket.on("received", data => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        var messages = document.getElementById("messages");
        messages.appendChild(li).append(data.message);
        messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
        $("#messages")[0].scrollTop =  $("#messages")[0].scrollHeight
    });
})();

// Retrieve messages from DB
(function () {
    fetch("/chats")
        .then(data => {
            return data.json();
        })
        .then(json => {
            json.map(data => {
                let li = document.createElement("li");
                let span = document.createElement("span");
                messages.appendChild(li).append(data.message);
                messages
                    .appendChild(span)
                    .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
                    $("#messages")[0].scrollTop =  $("#messages")[0].scrollHeight
            });
        });
        
})();

let messageInput = document.getElementById("message");
let typing = document.getElementById("typing");

// Typing listener
messageInput.addEventListener("keypress", () => {
    socket.emit("typing", { user: "Someone", message: "is typing..." });
});

socket.on("notifyTyping", data => {
    typing.innerText = data.user + " " + data.message;
    console.log(data.user + data.message);
});

// Stop listener
messageInput.addEventListener("keyup", () => {
    socket.emit("stopTyping", "");
});

socket.on("notifyStopTyping", () => {
    typing.innerText = "";
});

$("#name-change").submit(function (event) {

    event.preventDefault(); 
    let username = localStorage.setItem("user", $("#name-input").val())
    $("#name-input").val("");
});
