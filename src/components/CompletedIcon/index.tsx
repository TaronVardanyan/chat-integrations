import React from "react";
import InputCheckIcon from "../../assets/svg/inputCheckIcon.svg";

interface Props {
  completed: boolean;
}

function CompletedIcon({ completed }: Props) {
  if (completed) {
    return <img src={InputCheckIcon} alt={"InputCheckIcon"} />;
  }

  return null;
}

export default CompletedIcon;
