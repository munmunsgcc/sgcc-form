import React from "react";

import { COMPONENTS } from "./globals.js";

export default props => {
  const { options, required, other, name, onChange, label_text, error } = props;
  let list = options.map((opt, index) => {
    return (
      <div className="Radio" key={name + index}>
        <input
          type="radio"
          onChange={onChange}
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
      <div className="Radio" key={name + list.length}>
        <input
          type="radio"
          onChange={onChange}
          name={name + ".other.radio"}
          value="other"
        />
        Other:
        <input type="text" onChange={onChange} name={name + ".other.input"} />
      </div>
    );
  }

  if (error[name]) {
    list.push(
      <p className="Error" key={name + "error"}>
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
