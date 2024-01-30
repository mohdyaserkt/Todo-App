import React from "react";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmallButton from "../SmallButton/SmallButton";
import Tooltip from "../Tooltip/Tooltip";

interface ImportButtonProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>; // Update the type
  importFileRef: React.RefObject<HTMLInputElement>;
}

const ImportButton: React.FC<ImportButtonProps> = ({ handleChange, importFileRef }) => {
  return (
    <SmallButton title="import" handleClick={() => {}}>
      <label htmlFor="file-input">
        <FontAwesomeIcon icon={faFileImport} />
        <Tooltip text={"import"} place="left" />
      </label>
      <input
        ref={importFileRef}
        id="file-input"
        type="file"
        accept=".txt"
        onChange={handleChange} // Ensure that the type matches the expected type
      />
    </SmallButton>
  );
};

export default ImportButton;
