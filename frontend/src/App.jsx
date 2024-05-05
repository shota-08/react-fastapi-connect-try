import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [inputText, setInputText] = useState("");
  const url = "http://127.0.0.1:8001/send";

  const sendData = () => {
    axios
      .post(url, { text: inputText })
      .then((res) => {
        setData(res.data.text);
      })
      .catch((error) => {
        console.error("error!", error);
      });
  };

  return (
    <>
      <h1>OpenAIからの回答を取得</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={sendData}>データを取得</button>
      <div>
        <p>{data}</p>
      </div>
    </>
  );
}

export default App;
