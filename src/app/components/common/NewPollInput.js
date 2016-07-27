import React, { PropTypes } from 'react';

const NewPollInput = ({id, i, type, placeholder, name, value, checked, isCheckBox, isTitle, onChange, onClick, onTitleChange}) => {
  const onInputChange = e => onChange(id, e);
  const onTitleInputChange = e => onTitleChange(e);
  const onXClick = e => onClick(id, e);
  if (isCheckBox) {
    return <input type={type} name={name} checked={checked} onChange={onInputChange}/>;
  }

  if (isTitle) {
    return <input type={type} placeholder={placeholder} name={name} value={value} onChange={onTitleInputChange}/>;
  }
  return (
    <div>
      {`Option ${i}: `}
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onInputChange}/> <span onClick={onXClick}>&times;</span>
    </div>
  );
};

NewPollInput.propTypes = {
  id: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  isCheckBox: PropTypes.bool.isRequired,
  isTitle: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired
};

export default NewPollInput;
