import React from "react";
import styled from "styled-components";

import "./css/globals.css";
import CONSTANT from "./css/globals.js";

const Star = styled.span`
  font-weight: bold;
  color: ${CONSTANT.ERROR};
`;

export default props => {
  const { options, name, label_text, required, other, error } = props;
  const list = options.map((opt, index) => {
    return (
      <div key={name + index}>
        <input type="checkbox" name={name + "[]"} value={opt.value} />
        {opt.text}
      </div>
    );
  });
  const show_star = required === true ? <Star>*</Star> : "";

  if (other === true) {
    list.push(
      <div key={name + list.length}>
        <input type="checkbox" name={name + "[]"} value="other" />
        Other: <input type="text" name="other_input" />
      </div>
    );
  }

  console.log(error[name]);

  return (
    <div>
      <label htmlFor={name}>
        {label_text}
        {show_star}
      </label>
      {list}
      {error[name] ? <p className="Error">{error[name]}</p> : null}
    </div>
  );
};
