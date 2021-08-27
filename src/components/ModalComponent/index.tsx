import React from "react";
import Modal from "@material-ui/core/Modal";
import styles from "./ModalComponent.module.css";

interface IModalComponent {
  visible: boolean;
  close?: () => void;
  children: JSX.Element;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const SimpleModal: React.FC<IModalComponent> = ({
  visible,
  close,
  children,
}) => {
  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={styles.modalContainer}>
      {children}
    </div>
  );

  return (
    <Modal
      open={visible}
      onClose={close}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default SimpleModal;
