export interface CustomModalProps {
  isShown: boolean;
  onHide: () => void;
  onConfirm?: () => void;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  confirmation?: boolean;
}
