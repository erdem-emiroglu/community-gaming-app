import React, { useRef, useState } from "react";
import { CustomButton } from "components/CustomButton";
import { CustomFormProps } from "./types";
import { Form } from "react-bootstrap";
import "./styles.scss";

export const CustomForm: React.FC<CustomFormProps> = ({
  title,
  onSubmit,
  items,
  buttonText,
  disabled,
}) => {
  const [isValid, setIsValid] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    const form = formRef.current;
    if (form?.checkValidity() === false) {
      return setIsValid(false);
    }
    setIsValid(true);
    onSubmit();
  };

  return (
    <Form
      ref={formRef}
      className="form-container"
      validated={!isValid}
      noValidate
    >
      <h2 className="form-title">{title}</h2>
      {items.map((itemProps) => (
        <Form.Group key={itemProps.key}>
          {!!itemProps.label && <Form.Label>{itemProps.label}</Form.Label>}
          <Form.Control {...itemProps} required={itemProps.required} />
          {!!itemProps.errorMessage && (
            <Form.Control.Feedback type="invalid">
              {itemProps.errorMessage}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      ))}
      <CustomButton
        className="submit-button"
        variant="success"
        text={buttonText || "SUBMIT"}
        onClick={handleSubmit}
        disabled={disabled}
      />
    </Form>
  );
};
