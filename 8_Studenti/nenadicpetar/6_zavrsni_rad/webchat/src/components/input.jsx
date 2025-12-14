import React, { useState } from "react";

function Input({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center mt-3"
    >
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Upiši poruku..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Pošalji
      </button>
    </form>
  );
}

export default Input;
