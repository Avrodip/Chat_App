import React from "react";
import { Avatar, Image } from "antd";

export default function ChatBoxReceiver({ avatar, user, message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row ",
        marginTop: "20px",
      }}
    >
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            style={{
              objectFit: "cover",
              width: 45,
              height: 45,
              borderRadius: "100%",
            }}
            preview={false}
          />
        }
      />
      &nbsp;&nbsp;&nbsp;
      <p
        style={{
          padding: 10,
          backgroundColor: "#dcf8c6",
          borderRadius: 10,
          maxWidth: "60%",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <strong style={{ fontSize: 13 }}>{user}</strong>
        <br></br>
        {message}
      </p>
    </div>
  );
}

export function ChatBoxSender({ avatar, user, message }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row ",
        marginTop: "20px",
      }}
    >
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            style={{
              objectFit: "cover",
              width: 45,
              height: 45,
              borderRadius: "100%",
              marginLeft: "10px",
            }}
            preview={false}
          />
        }
      />
      &nbsp;&nbsp;&nbsp;
      <p
        style={{
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          maxWidth: "60%",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <strong style={{ fontSize: 13 }}>{user}</strong>
        <br></br>
        {message}
      </p>
    </div>
  );
}
