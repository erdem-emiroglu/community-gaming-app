import { CustomButton } from "components";
import { Modal } from "react-bootstrap";
import { CustomModalProps } from "./types";
import "./styles.scss";

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  isShown,
  onHide,
  description,
  confirmation,
  onConfirm,
}) => {
  return (
    <Modal show={isShown} onHide={onHide} centered style={{ zIndex: 100000 }}>
      {!!title && (
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {!!description && <Modal.Body>{description}</Modal.Body>}
      {confirmation && (
        <Modal.Footer className="footer-container">
          <CustomButton
            className="confirmation-button"
            text="CANCEL"
            variant="outline-secondary"
            onClick={onHide}
            cornered
          />
          {!!onConfirm && (
            <CustomButton
              className="confirmation-button"
              text="OK"
              variant="danger"
              onClick={onConfirm}
              cornered
            />
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};
