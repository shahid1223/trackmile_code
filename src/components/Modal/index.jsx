import React from "react";
import { Modal } from "react-bootstrap";
import './Modal.scss'
/**
 * It's a function that returns a modal component with a title, body, footer, header, and a close
 * button
 */
const ModalTab = ({
  size,
  show,
  onHide,
  title,
  body,
  footer,
  header,
  ...props
}) => {
  return (
    <Modal size={size} show={show} onHide={onHide} {...props} dialogClassName="modal__bg">
      <div className="d-flex pb-1 ">
        <h5 className="me-auto">{title}</h5>
        <button
          type="button"
          aria-label="close"
          className="btn-close p-2 me-2"
          onClick={onHide}
        ></button>
      </div>
      {header && <Modal.Header>{header}</Modal.Header>}
      {body && <Modal.Body className="text-center p-2">{body}</Modal.Body>}
      {footer && (
        <Modal.Footer className="text-center">{footer}</Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalTab;
