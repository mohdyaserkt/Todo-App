import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SmallButton from "../SmallButton/SmallButton";
import Tooltip from "../Tooltip/Tooltip";

const ExportButton = ({ handleClick }: any) => {
  return (
    <SmallButton title="export" handleClick={handleClick}>
      <FontAwesomeIcon icon={faFileExport} />
      <Tooltip text={"export"} place="left"/>
    </SmallButton>
  );
};

export default ExportButton;
