import React from "react";
import { DropdownButtonProps } from "react-bootstrap";
import { IconProps } from "components/Icon/types";

export interface CustomDropdownProps
  extends Omit<DropdownButtonProps, "children"> {
  items: CustomDropdownItemProps[];
  title: string;
  iconProps?: IconProps;
  cornered?: boolean;
  children?: React.ReactNode;
}

export interface CustomDropdownItemProps {
  text: string;
  onClick: () => void;
  key: string;
}
