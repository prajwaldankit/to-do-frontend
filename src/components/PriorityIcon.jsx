import React from "react";

export default function PriorityIcon(props) {
  let HighPriority = "/assets/icons/highPriority.png";
  let ModeratePriority = "/assets/icons/modPriority.png";
  let LowPriority = "/assets/icons/lowPriority.png";
  let PendingPriority = "/assets/icons/pendingPriority.png";
  let imgSrc = PendingPriority;
  if (props.priority === "high") {
    imgSrc = HighPriority;
  }
  if (props.priority === "moderate") {
    imgSrc = ModeratePriority;
  }
  if (props.priority === "low") {
    imgSrc = LowPriority;
  }
  return (
    <>
      <img
        src={imgSrc}
        alt={`${props.priority} Priority Icon`}
        width="24px"
        height="24px"
      />
    </>
  );
}
