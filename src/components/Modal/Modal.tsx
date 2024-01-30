import React from "react";
import styles from "./Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";


interface ModalProps {
  show: boolean;
  handleClose: () => void;
  text: string;
  handleConfirm: () => void;
  actions: boolean;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, text, handleConfirm, actions }) => {

  return (
    <div className={show ? styles.showModal : styles.hideModal}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <span className={styles.closeIcon} onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </span>
          <div className={styles.content}>
            <p>{text}</p>
            {actions ? (
              <div className={styles.actions}>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirm}
                >
                  {"confirm"}
                </button>
                <button className={styles.cancelButton} onClick={handleClose}>
                  {"cancel"}
                </button>
              </div>
            ) : (
              <div className={styles.actions}>
                <button className={styles.confirmButton} onClick={handleClose}>
                  {"ok"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.backdrop} onClick={handleClose}></div>
      </div>
    </div>
  );
};

export default Modal;
