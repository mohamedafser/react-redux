import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore } from "redux";
import allreducer from "./reducers";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import { MainScreen } from "./screen/MainScreen";
const store = createStore(
  allreducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <MainScreen />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
