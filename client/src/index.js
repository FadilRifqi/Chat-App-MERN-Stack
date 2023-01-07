import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";

const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
