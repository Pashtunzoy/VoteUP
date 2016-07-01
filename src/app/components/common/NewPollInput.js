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
}

export default NewPollInput;
