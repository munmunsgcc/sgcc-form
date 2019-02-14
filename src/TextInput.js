import React from "react";
import styled from "styled-components";

import CONSTANT from "./css/globals.js";

const NodeInput = styled.div`
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 10px;
  }
  input {
    outline: 0;
    border-width: 0 0 2px;
    border-color: ${CONSTANT.BLUE};
    width: 40%;
    padding: 8px 6px;
    font-family: PT Sans;
    font-size: 14px;

    &.Error {
      border-color: ${CONSTANT.ERROR};
    }
  }
  .Error {
    color: ${CONSTANT.ERROR};
  }
`;

const Star = styled.span`
  color: ${CONSTANT.ERROR};
  font-weight: bold;
`;

export default props => {
  const {
    type,
    name,
    placeholder,
    onChange,
    error,
    label_text,
    required
  } = props;
  let show_star = required ? <Star>*</Star> : "";

  return (
    <NodeInput>
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
    </NodeInput>
  );
};
