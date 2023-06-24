import './Chat.css'
import io from "socket.io-client";
import { useState, useEffect } from "react";
import ChatForm from "./ChatForm";

const socket = io.connect("http://localhost:8080");

function Chat() {
  const storedUsername = localStorage.getItem('username');
  const [username, setUsername] = useState(storedUsername || "");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [storedUsername]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      if (room === "1") {
        socket.emit("join_room", room);
        setShowChat(true);
      } else if (room === "2") {
        socket.emit("join_room", room);
        setShowChat(true);
        // Display "How can I help you?" message
        socket.emit("send_message", {
          room: room,
          message: "How can I help you?",
          sender: "System"
        });
      } else {
        alert("Invalid room. Please choose one of the specified rooms.");
      }
    }
  };
  
  return (
    <div className="Chat">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Name."
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <div className="roomOptions">
            <p>Room Options:</p>
            <ol>
              <li onClick={() => setRoom("general")}>General Chat</li>
              <li onClick={() => setRoom("contact-seller")}>Contact a Seller</li>
            </ol>
          </div>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <ChatForm socket={socket} username={username} room={room} />
      )}
    </div>
  );}
  
  export default Chat;