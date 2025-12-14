/* global Scaledrone */
import React, { useEffect, useState, useRef } from "react";
import Input from "./input";
import "./ChatRoom.css";

const CHANNEL_ID = "W7ULLKgDei816tvx";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const droneRef = useRef(null);
  const bottomRef = useRef(null); // 👈 novi ref

  useEffect(() => {
    const username = "User" + Math.floor(Math.random() * 1000);
    const drone = new Scaledrone(CHANNEL_ID, { data: { username } });
    droneRef.current = drone;

    drone.on("open", (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("✅ Povezano s Scaledrone kanalom!");
        setUser({ username });
      }
    });

    const room = drone.subscribe("observable-room");
    room.on("message", (message) => {
      const { data, member } = message;
      const msgData = {
        text: data.text,
        sender: member?.clientData?.username || "Nepoznato",
        time:
          data.time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
      };
      setMessages((prev) => [...prev, msgData]);
    });

    return () => drone.close();
  }, []);

  const handleSendMessage = (text) => {
    if (droneRef.current && user) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      droneRef.current.publish({
        room: "observable-room",
        message: { text, user: user.username, time },
      });
    }
  };

  // 👇 automatski scroll na dno kad se doda nova poruka
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container text-center">
      <div className="chat-box border rounded p-3 bg-light">
        {messages.map((msg, i) => {
          const isOwnMessage = msg.sender === user?.username;
          return (
            <div
              key={i}
              className={`message ${isOwnMessage ? "own" : "other"}`}
            >
              <div className="sender">
                <strong>{msg.sender}</strong>{" "}
                <span className="time">({msg.time})</span>
              </div>
              <div className="bubble">{msg.text}</div>
            </div>
          );
        })}
        <div ref={bottomRef} /> {/* 👈 marker za kraj poruka */}
      </div>
      <Input onSend={handleSendMessage} />
    </div>
  );
}

export default ChatRoom;
