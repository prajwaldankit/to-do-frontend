import React from "react";

function AddIcon(props) {
  return (
    <button className="fab btn-add" onClick={e => props.onClick()}></button>
  );
}

export default AddIcon;
