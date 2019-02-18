import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import COMPONENTS from './globals';

const TextInput = (props) => {
  const {
    type,
    name,
    placeholder,
    onChange,
    labelText,
    required,
    touched = {},
    errors = {},
  } = props;
  const showStar = required ? <COMPONENTS.star /> : '';
  const showError = errors[name] && touched[name];

  return (
    <COMPONENTS.input>
      <label htmlFor={name}>
        {labelText}
        {showStar}
      </label>
      <Field
        type={type || 'text'}
        name={name}
        onChange={onChange}
        className={showError ? 'Error' : ''}
        placeholder={placeholder || ''}
      />
      {showError ? <p className="Error">{errors[name]}</p> : null}
    </COMPONENTS.input>
  );
};

TextInput.defaultProps = {
  type: '',
  name: '',
  placeholder: '',
  onChange: () => {},
  labelText: '',
  required: false,
  errors: {},
  touched: {},
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  touched: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default TextInput;
