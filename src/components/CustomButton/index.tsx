import { Button } from "react-bootstrap";
import { CustomButtonProps } from "./types";
import { Icon } from "components/Icon";
import "./styles.scss";

export const CustomButton: React.FC<CustomButtonProps> = ({
  cornered,
  outlined,
  iconProps,
  text,
  children,
  ...restProps
}) => {
  const corneredButtonTheme = cornered ? "cornered-button" : "";
  const outlinedButtonTheme = outlined ? "outlined-button" : "";
  const customButtonTheme = restProps.className ? restProps.className : "";
  return (
    <Button
      {...restProps}
      className={`button-container ${corneredButtonTheme} ${customButtonTheme} ${outlinedButtonTheme}`}
    >
      {!!iconProps && (
        <Icon {...iconProps} className={!!text ? "icon-container" : ""} />
      )}
      {text}
      {children}
    </Button>
  );
};
