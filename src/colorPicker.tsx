import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";
import { Popover } from "antd";

const StyledColorPreview = styled.button`
  display: flex;
  border-radius: 5px;
  padding: 5px;
  margin-left: 5px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  border: 0;
  outline: none;
  cursor: pointer;
  align-items: center;

  & > div {
    width: 30px;
    height: 30px;
  }
`;

export const ColorPickerButton: React.FC<{
  color: string;
  onChange: (c: string) => void;
}> = ({ color: colorProp, onChange }) => {
  const [color, setColor] = useState(colorProp);

  useEffect(() => {
    setColor(colorProp);
  }, [colorProp, setColor]);

  return (
    <Popover
      arrowPointAtCenter={false}
      trigger="click"
      placement="bottom"
      content={
        <ChromePicker
          color={color}
          onChange={nextColor => {
            onChange(nextColor.hex);
          }}
        />
      }
    >
      <StyledColorPreview>
        <div style={{ backgroundColor: color }} />
      </StyledColorPreview>
    </Popover>
  );
};
