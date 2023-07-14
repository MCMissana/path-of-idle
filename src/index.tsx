import { render } from "react-dom";
import { Provider } from "react-redux";
import { persistor,store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

import App from "./App";

const rootElement = document.getElementById("root");


render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
     </PersistGate>
  </Provider>
  , rootElement);
