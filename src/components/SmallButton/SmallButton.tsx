import React, { ReactNode, MouseEvent } from "react";
import styles from "./SmallButton.module.css";

interface SmallButtonProps {
  children: ReactNode;
  handleClick: (event: MouseEvent<HTMLDivElement>) => void;
  title: string; // Add the 'title' prop to the interface
}

const SmallButton: React.FC<SmallButtonProps> = ({ children, handleClick, title }) => {
  return (
    <div className={styles.smallButton} onClick={handleClick} title={title}>
      <button>{children}</button>
    </div>
  );
};

export default SmallButton;
