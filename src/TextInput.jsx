import React from 'react';
import PropTypes from 'prop-types';
import COMPONENTS from './globals';

const TextInput = (props) => {
  const {
    type, name, placeholder, onChange, labelText, required, error = {},
  } = props;
  const showStar = required ? <COMPONENTS.star /> : '';

  return (
    <COMPONENTS.input>
      <label htmlFor={name}>
        {labelText}
        {showStar}
      </label>
      <input
        type={type || 'text'}
        name={name}
        onChange={onChange}
        className={error[name] ? 'Error' : ''}
        placeholder={placeholder || ''}
      />
      {error[name] ? <p className="Error">{error[name]}</p> : null}
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
  error: {},
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default TextInput;
