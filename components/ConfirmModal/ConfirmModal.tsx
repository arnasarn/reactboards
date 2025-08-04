import React from "react";
import styles from "./confirmModel.module.css";
import cross from "../../assets/images/close-btn.svg";

type ConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
};

const ConfirmModal = ({ onCancel, onConfirm, title }: ConfirmModalProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h3>{title}</h3>
        <button className={styles.closeButton} onClick={onCancel}>
          <img src={cross.src} />
        </button>
      </div>

      <div className={styles.btnWrapper}>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
