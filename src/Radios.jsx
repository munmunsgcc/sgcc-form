import React from 'react';
import PropTypes from 'prop-types';

import COMPONENTS from './globals';

function row({
  name, key, handler, text, value, input,
}) {
  return (
    <div className="Radio" key={key}>
      <input type="radio" onChange={handler} name={name} value={value} />
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
    let { error = {} } = this.props;
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
          input: <input name={`${name}.input`} type="text" onChange={onChange} />,
        }),
      );
    }

    error = error[name] ? error[name].radio || error[name].input : null;

    if (error) {
      list.push(
        <p className="Error" key={`${name}error`}>
          {error}
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
  error: {},
};

Radios.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  required: PropTypes.bool,
  other: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  labelText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Radios;
