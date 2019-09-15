import { Drawing } from "./drawing";
import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const DrawingComponent: React.FC<{ color: string }> = ({ color }) => {
  const drawingRef = useRef<Drawing>(null);
  const receiveDrawingComponent = useCallback(el => {
    drawingRef.current = el ? new Drawing({ container: el }) : null;
  }, []);

  useEffect(() => {
    if (!drawingRef.current) {
      return;
    }

    drawingRef.current.tool.color = color;
  }, [color]);

  return <CanvasContainer ref={receiveDrawingComponent} />;
};
