import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:4444');

class App extends Component {

  componentDidMount() {
    client.onopen = () => {
      console.log('Websocket Client Connected')
    }
  }

  render() {
    return (
      <div>
        <h3>Hello</h3>
      </div>
    )};
  
}

export default App;
