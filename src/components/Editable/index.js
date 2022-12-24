import React, { useState, useCallback, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import EditIcon from "../../images/editable.svg";

const Input = ({ editable, children }) => {
  const [editing, setEditing] = useState(false);
  const mainElemRef = useRef(null);

  const handleClickOutside = useCallback(() => {
    if (editing) {
      setEditing(false);
    }
  }, [editing]);

  useClickOutside(mainElemRef, handleClickOutside);

  return (
    <div
      className="relative"
      ref={mainElemRef}
      onClick={() => {
        setEditing((prev) => !prev);
      }}
    >
      {children}
      {editable && !editing && (
        <div className="absolute right-[10px] top-[10px]">
          <img src={EditIcon} alt="Edit Icon" />
        </div>
      )}
    </div>
  );
};

export default Input;
