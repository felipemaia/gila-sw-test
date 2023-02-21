import React from "react";
import axios from "axios";
import "./form.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectComponent from "../input-select/input-select";

const validateForm = yup.object().shape({
  text: yup
    .string()
    .required("The message should contain at least ONE character"),
});

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateForm),
  });

  const messageSent = (data) =>
    axios
      .post("http://localhost:3001/message", data)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));

  const handleChild = (callback) => {
    setValue("category", callback);
  };

  return (
    <div>
      <main>
        <div className="card-form">
          <h1>Event Generator</h1>
          <div className="line-form"></div>

          <div className="card-body-form">
            <form onSubmit={handleSubmit(messageSent)}>
              <div className="fields">
                <label>Category</label>
                <SelectComponent
                  handleChild={handleChild}
                  {...register("category")}
                />
              </div>

              <div className="fields">
                <label>Message</label>
                <textarea
                  type="text"
                  name="text"
                  placeholder="Enter a message..."
                  {...register("text")}
                ></textarea>
                <p className="error-message">{errors.text?.message}</p>
              </div>

              <div className="btn-form">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Form;
