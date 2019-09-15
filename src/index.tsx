import React, { useState } from "react";
import { render } from "react-dom";
import { DrawingComponent } from "./drawingComponent";
import { ControlPanel } from "./controlPanel";
import { ColorPickerButton } from "./colorPicker";
import styled, { createGlobalStyle } from "styled-components";
import "antd/dist/antd.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  html,
  body, 
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

function App() {
  const [color, setColor] = useState("black");

  return (
    <AppContainer>
      <GlobalStyle />
      <ControlPanel>
        <ColorPickerButton color={color} onChange={setColor} />
      </ControlPanel>
      <DrawingComponent color={color} />
    </AppContainer>
  );
}

render(<App />, document.getElementById("root"));
