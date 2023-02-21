import React, { Component } from "react";

import Form from "./components/form/form";
import LogHistory from "./components/log-history/log-history";

export default class App extends Component {
  render() {
    return (
      <div>
        <Form />
        <LogHistory />
      </div>
    );
  }
}
