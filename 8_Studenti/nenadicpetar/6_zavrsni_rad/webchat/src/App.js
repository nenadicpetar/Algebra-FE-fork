import React from "react";
import ChatRoom from "./components/ChatRoom";
import "./App.css";

function App() {
  return (
    <div className="App container py-5">
      <h1 className="text-center mb-4">💬 Web Chat App</h1>
      <ChatRoom />
    </div>
  );
}

export default App;
