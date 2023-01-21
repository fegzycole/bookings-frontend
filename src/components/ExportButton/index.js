import ExportIcon from "../../images/export.svg";

const ExportButton = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      <div>
        <img src={ExportIcon} alt="Export" />
        <h6>{text}</h6>
      </div>
    </button>
  );
};

export default ExportButton;
