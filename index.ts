//DO NOT REMOVE THIS CODE
import VCIT from "./VibeCodeInternalTool";
VCIT.init(process.env.EXPO_PUBLIC_PROJECT_ID);
import "./global.css";
import "react-native-get-random-values";
//DO NOT REMOVE THE ABOVE CODE

import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
