import axios from "axios";
import "./input-select.css";
import React, { useEffect, useState } from "react";

function SelectComponent({ handleChild }, ref) {
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3002/getcategorylist")
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          data.unshift(0);
          data[0] = { _id: 0, name: "Select a Category..." };
          setOptionList(data);
        } else {
          //error handle section
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <select
      ref={ref}
      name="category"
      disabled={false}
      value={select}
      onChange={(e) => {
        setSelected(e.currentTarget.value);
        handleChild(e.currentTarget.value);
      }}
    >
      {optionList.map((item) => (
        <option key={item._id} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

const forwardedSelect = React.forwardRef(SelectComponent);
export default forwardedSelect;
