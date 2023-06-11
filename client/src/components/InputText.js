import React, { useState } from "react";

const styles = {
  button: {
    width: "10%",
    height: 50,
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#34b7f1",
    borderWidth: 0,
    color: "#fff",
    marginLeft: "10px",
  },
  textarea: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    fontSize: 18,
    marginTop: "30px",
  },
  textContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};
export default function InputText({ addMessage }) {
  const [message, setmessage] = useState("");

  function addAMessage() {
    addMessage({ message });
    setmessage("");
  }
  return (
    <div style={styles.textContainer}>
      <textarea
        style={styles.textarea}
        rows={6}
        placeholder="Write your thoughts..."
        value={message}
        onChange={(e) => setmessage(e.target.value)}
      ></textarea>
      <button onClick={() => addAMessage()} style={styles.button}>
        Send
      </button>
    </div>
  );
}
