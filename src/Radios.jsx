import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import COMPONENTS from './globals';

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
