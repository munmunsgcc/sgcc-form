import React from "react";

import "./css/globals.css";
import { COMPONENTS } from "./globals.js";

export default props => {
  const { options, name, label_text, required, other, onChange } = props;
  const error = props.error || {};
  const list = options.map((opt, index) => {
    return (
      <div className="Checkbox" key={name + index}>
        <input
          onChange={onChange}
          type="checkbox"
          name={name + "." + opt.value}
          value={opt.value}
        />
        {opt.text}
      </div>
    );
  });
  const show_star = required === true ? <COMPONENTS.star /> : "";

  if (other === true) {
    list.push(
      <div className="Checkbox" key={name + list.length}>
        <input
          type="checkbox"
          name={name + ".other.checkbox"}
          value="other"
          onChange={onChange}
        />
        Other:
        <input type="text" name={name + ".other.input"} onChange={onChange} />
      </div>
    );
  }

  if (error[name]) {
    list.push(
      <p key={name + "error"} className="Error">
        {error[name]}
      </p>
    );
  }

  return (
    <COMPONENTS.input>
      <label>
        {label_text}
        {show_star}
      </label>
      {list}
    </COMPONENTS.input>
  );
};
