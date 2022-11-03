/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { registerRootComponent } from "expo";
import { Provider } from "react-redux";

import App from "./demo";

import usersReducer from "./src/redux/users";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

const Apps = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Apps);
