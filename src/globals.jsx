import React from 'react';
import styled from 'styled-components';

const CONSTANTS = {
  ERROR: '#ff0000',
  BLUE: '#1B75BC',
  ORANGE: '#F37021',
};

const COMPONENTS = {
  input: styled.div`
    margin-bottom: 20px;
    label {
      display: block;
      margin-bottom: 10px;
    }
    input[type='text'],
    input[type='email'] {
      outline: 0;
      border-width: 0 0 2px;
      border-color: ${CONSTANTS.BLUE};
      width: 40%;
      padding: 8px 6px;
      font-family: PT Sans;
      font-size: 14px;

      &.Error {
        border-color: ${CONSTANTS.ERROR};
      }
    }
    .Checkbox {
      input[type='checkbox'] {
        margin-right: 10px;
      }
    }
    .Radio {
      input[type='radio'] {
        margin-right: 10px;
      }
    }
    .Error {
      color: ${CONSTANTS.ERROR};
      font-size: 12px;
    }
  `,
  star: () => {
    const Star = styled.span`
      color: ${CONSTANTS.ERROR};
      font-weight: bold;
    `;

    return <Star>*</Star>;
  },
};

export default COMPONENTS;
