import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const url = "http://127.0.0.1:8001/send";

  const sendMessage = () => {
    const userMessage = inputText;
    if (!userMessage.trim()) return; // 空白メッセージは送信しない
    setMessages([
      ...messages,
      { text: userMessage, title: "", sender: "user" },
    ]);
    setInputText(""); // 送信後は空白に

    axios
      .post(url, { text: userMessage })
      .then((res) => {
        const botResponseText = res.data.text;
        const botResponseTitle = res.data.title;
        setMessages((prev) => [
          ...prev,
          { text: botResponseText, title: botResponseTitle, sender: "bot" },
        ]);
      })
      .catch((error) => {
        console.log("error!", error);
        setMessages((prev) => [...prev, { text: "error!", sender: "bot" }]);
      });
  };

  return (
    <>
      <h1>syllabus x llm</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
            <p>{message.title}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={sendMessage}>送信</button>
    </>
  );
}

export default App;
