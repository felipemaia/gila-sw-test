import React, { useEffect, useState, useRef } from "react";
import "./log-history.css";
import axios from "axios";
import LogComponent from "../log-component/log-component";

function LogHistory() {
  const [logArray, setLogArray] = useState([]);

  const logArrayRef = useRef(logArray);

  useEffect(() => {
    logArrayRef.current = logArray;
  }, [logArray]);

  const fetchLog = () => {
    axios
      .get("http://localhost:3001/log")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          const logger = data.map((element) => (
            <LogComponent
              key={element._id}
              name={element.name}
              email={element.email}
              phone={element.phone}
              channel={element.channel}
              category={element.category}
              created={element.createdAt}
            />
          ));
          createSSEListener();

          setLogArray(logger);
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchLog();
  }, []);

  function createSSEListener() {
    const sse = new EventSource("http://localhost:3001/event");

    function getRealtimeData(data) {
      const newElement = (
        <LogComponent
          key={data.message.data._id}
          name={data.message.data.name}
          email={data.message.data.email}
          phone={data.message.data.phone}
          channel={data.message.data.channel}
          category={data.message.data.category}
          created={data.message.data.createdAt}
        />
      );

      logArrayRef.current.unshift(newElement);

      setLogArray([...logArrayRef.current]);
    }
    sse.onmessage = (e) => {
      getRealtimeData(JSON.parse(e.data));
    };
  }

  return (
    <div>
      <main>
        <div className="card-form">
          <h1> Log History </h1>
          <div className="line-form"></div>
          <div className="content">{logArray}</div>
        </div>
      </main>
    </div>
  );
}

export default LogHistory;
