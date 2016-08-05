import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Grid, Row, Radio } from 'react-bootstrap';

const Input = ({id, chartId, type, name, value, checkedValue, checkClick}) => {
  const printChecked = (e) => {
    checkClick(e, id, chartId);
  };

  return (<Radio type={type} name={name} onChange={printChecked} checked={value === checkedValue}>{value}</Radio>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  chartId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checkedValue: PropTypes.string.isRequired,
  checkClick: PropTypes.func.isRequired
};

export default Input;
