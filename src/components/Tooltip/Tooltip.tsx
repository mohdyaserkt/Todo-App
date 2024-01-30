import React, { ReactNode } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  text: ReactNode;
  place?: "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({ text, place }) => {
  return (
    <div className={styles.tooltipContainer}>
      <div
        className={`${styles.tooltip} ${
          place ? (place === "left" ? styles.left : styles.right) : styles.default
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
