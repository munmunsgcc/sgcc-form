import React from "react";

import { COMPONENTS } from "./globals.js";

function row({ name, key, handler, text, value, input }) {
  return (
    <div className="Radio" key={key}>
      <input type="radio" onChange={handler} name={name} value={value} />
      {text}
      {input || null}
    </div>
  );
}

export default props => {
  const { options, required, other, name, onChange, label_text } = props;
  let error = props.error || {};
  const show_star = required === true ? <COMPONENTS.star /> : "";
  let list = options.map((opt, index) => {
    const { ...newOpt } = opt;

    newOpt.name = name + ".radio";
    newOpt.key = name + index;
    newOpt.handler = onChange;

    return row({ ...newOpt });
  });

  if (other === true) {
    list.push(
      row({
        key: name + list.length,
        name: name + ".radio",
        handler: onChange,
        value: "other",
        text: "Other:",
        input: <input name={name + ".input"} type="text" onChange={onChange} />
      })
    );
  }

  error = error[name] ? error[name].radio || error[name].input : null;

  if (error) {
    list.push(
      <p className="Error" key={name + "error"}>
        {error}
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
