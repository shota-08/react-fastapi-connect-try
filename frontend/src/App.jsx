import { useState } from "react";
import axios from "axios";

function App() {
  // const [data, setData] = useState();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const url = "http://127.0.0.1:8001/send";

  const sendMessage = () => {
    const userMessage = inputText;
    if (!userMessage.trim()) return; // 空白メッセージは送信しない
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    setInputText(""); // 送信後は空白に

    axios
      .post(url, { text: userMessage })
      .then((res) => {
        const botResponse = res.data.text;
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      })
      .catch((error) => {
        console.log("error!", error);
        setMessages((prev) => [...prev, { text: "error!", sender: "bot" }]);
      });
  };

  // const sendData = () => {
  //   axios
  //     .post(url, { text: inputText })
  //     .then((res) => {
  //       setMessages(res.data.text);
  //     })
  //     .catch((error) => {
  //       console.error("error!", error);
  //     });
  // };

  return (
    <>
      <h1>syllabus x llm</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {/* <button onClick={sendData}>送信</button> */}
      <button onClick={sendMessage}>送信</button>
      {/* <div>
        <p>{messages}</p>
      </div> */}
    </>
  );
}

export default App;
