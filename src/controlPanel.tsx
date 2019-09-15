import React from "react";
import styled from "styled-components";

const StyledControlPanel = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 2px solid black;
`;

export const ControlPanel: React.FC<{}> = ({ children }) => {
  return <StyledControlPanel>{children}</StyledControlPanel>;
};
