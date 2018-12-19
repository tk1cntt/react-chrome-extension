/*global chrome*/
/* src/content.js */
import React from "react";
import ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./content.css";
import "./antd.min.css";

import Login from "./Login";

const FormItem = Form.Item;

class Main extends React.Component {
  render() {
    return (
      <Frame
        head={[
          <link
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL("/static/css/content.css")}
          />,
          <link
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL("/app/antd.min.css")}
          />
        ]}
      >
        <FrameContextConsumer>
          {// Callback is invoked with iframe's window and document instances
          ({ document, window }) => {
            // Render Children
            return (
              <div className={"my-extension"}>
                <Login save={setItem} />
              </div>
            );
          }}
        </FrameContextConsumer>
      </Frame>
    );
  }
}

const app = document.createElement("div");
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    toggle();
  }
});

function setItem(key, value) {
  chrome.storage.sync.set({ [key]: value });
}

function isAuthentication() {
  chrome.storage.sync.get(['token']);
}

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}
