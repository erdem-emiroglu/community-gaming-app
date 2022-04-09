import { ReactNode } from "react";
import { ToastProps } from "react-bootstrap";

export interface CustomToastProps extends ToastProps {
  text: ReactNode;
}
