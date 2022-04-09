import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Icon } from "components/Icon";
import { CustomDropdownProps } from "./types";
import "./styles.scss";

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  items,
  title,
  cornered,
  iconProps,
  ...restProps
}) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const corneredDropdownTheme = cornered ? "cornered-dropdown" : "";
  const corneredDropdownItemTheme = cornered ? "cornered-dropdown-item" : "";
  const customDropdownTheme = restProps.className ? restProps.className : "";

  return (
    <DropdownButton
      {...restProps}
      className={`dropdown-container ${corneredDropdownTheme} ${customDropdownTheme}`}
      title={
        <>
          {!!iconProps && (
            <Icon {...iconProps} className={title ? "icon-container" : ""} />
          )}
          {currentTitle}
        </>
      }
    >
      {items.map((item) => (
        <Dropdown.Item
          className={corneredDropdownItemTheme}
          key={item.key}
          onClick={() => {
            setCurrentTitle(item.text);
            item.onClick();
          }}
        >
          {item.text}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};
