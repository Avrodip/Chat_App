import React, { useEffect, useState } from "react";
import socketIoClient from "socket.io-client";
import InputText from "./InputText";
import ChatBoxReceiver, { ChatBoxSender } from "./ChatBox";
import UserLogin from "./UserLogin";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db from "./firebaseConfig/firebaseConfig.js";
import { message } from "antd";
export default function ChatContainer() {
  let socketio = socketIoClient("http://localhost:3001");

  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const avatar = localStorage.getItem("avatar");
  const chatsRef = collection(db, "Messages");

  useEffect(() => {
    socketio.on("chat", (senderChats) => {
      setChats(senderChats);
    });
  });

  useEffect(() => {
    const q = query(chatsRef, orderBy("createdAt", "asc")); //fetch specific messages with createdAt being ascending order

    const unsub = onSnapshot(q, (querySnapshot) => {
      const fireChats = [];
      querySnapshot.forEach((doc) => {
        fireChats.push(doc.data());
      });
      setChats([...fireChats]);
    });
    return () => {
      unsub();
    };
  }, []);

  function addToFirebase(chat) {
    const newChat = {
      avatar,
      createdAt: serverTimestamp(),
      user,
      message: chat.message,
    };

    const chatRef = doc(chatsRef);
    setDoc(chatRef, newChat)
      .then(() => console.log("Chat added succesfully"))
      .catch(console.log);
  }

  function sendChatToSocket(chat) {
    socketio.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar };
    addToFirebase(chat);
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar"); //at logging out every avatar,chats stored are removed from the local storage
    setUser("");
  }

  function ChatsList() {
    return chats.map((chat, index) => {
      if (chat.user === user)
        return (
          <ChatBoxSender
            key={index}
            message={chat.message}
            avatar={chat.avatar}
            user={chat.user}
          />
        );
      return (
        <ChatBoxReceiver
          key={index}
          message={chat.message}
          avatar={chat.avatar}
          user={chat.user}
        />
      );
    });
  }

  return (
    <div>
      {user ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "1px solid black",
              padding: "10px 5px",
              alignItems: "center",
              borderRadius: "7px",
              background: "#3C4043",
            }}
          >
            <h4
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: "10px",
              }}
            >
              USER: {user}
            </h4>
            <p
              onClick={() => logout()}
              style={{
                color: "blue",
                cursor: "pointer",
                backgroundColor: "#ff6242",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
                marginRight: "10px",
              }}
            >
              Log Out
            </p>
          </div>

          <ChatsList />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
}
