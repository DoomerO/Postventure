import React from "react";
import {  NativeBaseProvider } from "native-base";
import Router from "./Router";


function App() {
  return <NativeBaseProvider>
    <Router/>
  </NativeBaseProvider>;
}

export default App;