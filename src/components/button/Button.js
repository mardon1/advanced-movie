import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

export const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.children}`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

// Button.PropTypes = {
//   onClick: PropTypes.func,
// };

export default Button;
