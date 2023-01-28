import { Tooltip } from "@mui/material";
import ExportIcon from "../../images/export.svg";

const ExportButton = ({ text, handleClick, disabled }) => {
  return (
    <Tooltip
      title={disabled && "There are no intentions to export"}
      placement="bottom"
    >
      <button
        onClick={handleClick}
        className="p-[10px] border-2 border-customGreen-100 rounded-lg font-bold"
        disabled={disabled}
      >
        <div className="flex">
          <img src={ExportIcon} alt="Export" />
          <h6 className="ml-3 text-customGreen-100">{text}</h6>
        </div>
      </button>
    </Tooltip>
  );
};

export default ExportButton;
