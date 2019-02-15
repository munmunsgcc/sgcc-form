import React from 'react';
import PropTypes from 'prop-types';

import './css/globals.css';
import COMPONENTS from './globals';

const Checkboxes = (props) => {
  const {
    options, name, labelText, required, other, onChange, error = {},
  } = props;
  const list = options.map(opt => (
    <div className="Checkbox" key={name + opt.value}>
      <input onChange={onChange} type="checkbox" name={`${name}.${opt.value}`} value={opt.value} />
      {opt.text}
    </div>
  ));
  const showStar = required === true ? <COMPONENTS.star /> : '';

  if (other === true) {
    list.push(
      <div className="Checkbox" key={name + list.length}>
        <input type="checkbox" name={`${name}.other.checkbox`} value="other" onChange={onChange} />
        Other:
        <input type="text" name={`${name}.other.input`} onChange={onChange} />
      </div>,
    );
  }

  if (error[name]) {
    list.push(
      <p key={`${name}error`} className="Error">
        {error[name]}
      </p>,
    );
  }

  return (
    <COMPONENTS.input>
      <label htmlFor={name}>
        {labelText}
        {showStar}
      </label>
      {list}
    </COMPONENTS.input>
  );
};

Checkboxes.defaultProps = {
  options: [],
  name: '',
  labelText: '',
  required: false,
  other: false,
  onChange: () => {},
  error: {},
};

Checkboxes.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  labelText: PropTypes.string,
  required: PropTypes.bool,
  other: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Checkboxes;
