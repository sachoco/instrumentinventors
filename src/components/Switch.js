import React, { useState } from "react";

export default function Switch(props) {
  const [checked, setChecked] = useState(props.checked);

  const onClickHandler = (e) => {
    checked ? setChecked(false) : setChecked(true);
    props.onModeChange(checked);
  };
  return (
    <div className={props.className}>
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative" onClick={onClickHandler}>
          <div
            className="block border border-white rounded-full"
            style={{ width: "47px", height: "26px" }}
          ></div>
          <div
            className={
              "absolute left-3px top-3px bg-white rounded-full transition transform duration-100 " +
              (checked ? "translate-x-full " : "")
            }
            style={{ width: "20px", height: "20px" }}
          ></div>
        </div>
      </label>
    </div>
  );
}
