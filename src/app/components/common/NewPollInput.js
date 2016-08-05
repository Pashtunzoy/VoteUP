import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, FieldGroup, Col, FormControl, ControlLabel, Grid, Row, Checkbox } from 'react-bootstrap';

const NewPollInput = ({id, i, type, placeholder, name, value, checked, isCheckBox, isTitle, onChange, onClick, onTitleChange}) => {
  const onInputChange = e => onChange(id, e);
  const onTitleInputChange = e => onTitleChange(e);
  const onXClick = e => onClick(id, e);

  // if (isTitle) {
  //   return <input type={type} placeholder={placeholder} name={name} value={value} onChange={onTitleInputChange}/>;
  // }
  return (
    <FormGroup conrolId="formBasicText">
        <Col componentClass={ControlLabel}
          sm={2}>
            <ControlLabel>{`Option ${i}: `}</ControlLabel>
        </Col>
          <FormControl
            className="btn-radio"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onInputChange}/>
            <span onClick={onXClick}>&times;</span>
    </FormGroup>
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
