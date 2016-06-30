import React, { PropTypes } from 'react';

const Input = ({id, type, name, value, checkedValue, checkClick}) => {
  const printChecked = (e) => {
    checkClick(e, id);
  };

  return (
    <div className="vote-options">
      {value}
      <br />
      <input type={type} name={name} onChange={printChecked} value={value} checked={value === checkedValue} />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checkedValue: PropTypes.string.isRequired,
  checkClick: PropTypes.func.isRequired
};

export default Input;
