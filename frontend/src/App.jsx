import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const url = "http://127.0.0.1:8001";

  const GetData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  };

  return (
    <>
      <div>ここに処理を書いていきます</div>
      {data ? (
        <div>{data.Hello}</div>
      ) : (
        <button onClick={GetData}>データを取得</button>
      )}
    </>
  );
}

export default App;
