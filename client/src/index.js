import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/rootReducer";
import jwtDecode from "jwt-decode";
// act type
import { SET_USER_TOKEN, REMOVE_USER_TOKEN } from "./constants/actionTypes";
// Create store
const store = createStore(
  rootReducer,
  // Dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Check if user has token
if (localStorage.tourJWT) {
  if (localStorage.tourJWT === undefined) {
    store.dispatch({
      type: REMOVE_USER_TOKEN
    });
  } else {
    const userInfo = jwtDecode(localStorage.tourJWT);
    if (!userInfo || userInfo.exp <= Date.now() / 1000) {
      store.dispatch({
        type: REMOVE_USER_TOKEN
      });
    } else {
      store.dispatch({
        type: SET_USER_TOKEN,
        payload: { token: localStorage.tourJWT }
      });
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
