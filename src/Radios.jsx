import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import COMPONENTS from './globals';

/**
 * A general function to create a row of radio item.
 * @param {Object} *
 * @param {string} name - The name of the radio input
 * @param {string} key - The React's key
 * @param {func} handler - The onChange callback.
 * @param {string} text - The accompanying text for this radio input
 * @param {string} value - The value of the radio input
 * @param {React.Component} [input] - An additional component
 */
function row({
  name, key, handler, text, value, input,
}) {
  return (
    <div className="Radio" key={key}>
      <Field type="radio" onChange={handler} name={name} value={value} />
      {text}
      {input || null}
    </div>
  );
}

/**
 * Creates a group of radio inputs.
 * @param {Object[]} options - An array of radio inputs.
 * @param {string} options[].value - The single radio's value.
 * @param {string} options[].text - The accompanying text.
 * @param {boolean} [required] - Is this group of radios required? Adds * to the label.
 * @param {boolean} [other] - Is there a "Other:" radio option?
 * @param {string} name - The name for the group of radios.
 * @param {function} onChange - The onChange callback.
 * @param {string} labelText - The label text for the group of radios.
 * @param {object} errors - An object of error messages.
 * @param {object} touched - An object of inputs touched by the user.
 */

class Radios extends React.Component {
  render() {
    const {
      options, required, other, name, onChange, labelText,
    } = this.props;
    let { errors = {}, touched = {} } = this.props;
    const showStar = required === true ? <COMPONENTS.star /> : '';

    const list = options.map((opt, index) => {
      const { ...newOpt } = opt;

      newOpt.name = `${name}.radio`;
      newOpt.key = name + index;
      newOpt.handler = onChange;

      return row({ ...newOpt });
    });

    if (other === true) {
      list.push(
        row({
          key: name + list.length,
          name: `${name}.radio`,
          handler: onChange,
          value: 'other',
          text: 'Other:',
          input: <Field name={`${name}.input`} type="text" onChange={onChange} />,
        }),
      );
    }

    errors = errors[name] ? errors[name].input || errors[name].radio : errors[name];
    touched = touched[name] ? touched[name].radio || touched[name].input : touched[name];

    if (errors && touched) {
      list.push(
        <p className="Error" key={`${name}error`}>
          {errors}
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
  }
}

row.defaultProps = {
  name: '',
  key: '',
  handler: () => {},
  text: '',
  value: '',
  input: null,
};

row.propTypes = {
  name: PropTypes.string,
  key: PropTypes.string,
  handler: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string,
  input: PropTypes.element,
};

Radios.defaultProps = {
  options: [],
  required: false,
  other: false,
  name: '',
  onChange: () => {},
  labelText: '',
  errors: {},
  touched: {},
};

Radios.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  required: PropTypes.bool,
  other: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  touched: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Radios;
