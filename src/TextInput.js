import React from "react";
import { COMPONENTS } from "./globals.js";

export default props => {
  const { type, name, placeholder, onChange, label_text, required } = props;
  const error = props.error || {};
  let show_star = required ? <COMPONENTS.star /> : "";

  return (
    <COMPONENTS.input>
      <label htmlFor={name}>
        {label_text}
        {show_star}
      </label>
      <input
        type={type || "text"}
        name={name}
        onChange={onChange}
        className={error[name] ? "Error" : ""}
        placeholder={placeholder ? placeholder : ""}
      />
      {error[name] ? <p className="Error">{error[name]}</p> : null}
    </COMPONENTS.input>
  );
};
