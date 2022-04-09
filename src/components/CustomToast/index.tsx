import { Toast } from "react-bootstrap";
import { CustomToastProps } from "./types";
import "./styles.scss";

export const CustomToast: React.FC<CustomToastProps> = ({
  text,
  ...restProps
}) => {
  return (
    <Toast
      {...restProps}
      className="toast-container"
      delay={restProps.autohide ? restProps.delay || 3000 : undefined}
    >
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};
