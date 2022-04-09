import { IconProps } from "components/Icon/types";
import { ButtonProps } from "react-bootstrap";

export interface CustomButtonProps extends ButtonProps {
  cornered?: boolean;
  outlined?: boolean;
  text?: string;
  iconProps?: IconProps;
}
