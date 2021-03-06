import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import './css/globals.css';
import COMPONENTS from './globals';

/**
 * Creates a group of checkboxes.
 * @param {Object[]} options - An array of checkboxes.
 * @param {string} options[].value - The checkbox's value
 * @param {string} options[].text - The checkbox's accompanying text.
 * @param {string} labelText - The text for the group of checkboxes.
 * @param {boolean} [required] - Is this checkbox group required? Adds *.
 * @param {boolean} [other] - Does this checkbox group have "Others: "?
 * @param {function} onChange - onChange callback.
 * @param {object} errors - An object of error messages.
 * @param {object} touched - An object of inputs touched by the user.
 */
const Checkboxes = (props) => {
  const {
    options, name, labelText, required, other, onChange, errors = {}, touched = {},
  } = props;
  const list = options.map(opt => (
    <div className="Checkbox" key={name + opt.value}>
      <Field onChange={onChange} type="checkbox" name={`${name}.${opt.value}`} value={opt.value} />
      {opt.text}
    </div>
  ));
  const showStar = required === true ? <COMPONENTS.star /> : '';

  if (other === true) {
    list.push(
      <div className="Checkbox" key={name + list.length}>
        <Field type="checkbox" name={`${name}.other.checkbox`} value="other" onChange={onChange} />
        Other:
        <Field type="text" name={`${name}.other.input`} onChange={onChange} />
      </div>,
    );
  }

  if (errors[name] && touched[name]) {
    list.push(
      <p key={`${name}error`} className="Error">
        {errors[name]}
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
  errors: {},
  touched: {},
};

Checkboxes.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  labelText: PropTypes.string,
  required: PropTypes.bool,
  other: PropTypes.bool,
  onChange: PropTypes.func,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  touched: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Checkboxes;
