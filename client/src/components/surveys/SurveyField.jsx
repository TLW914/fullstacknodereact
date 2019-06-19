// SurveyField is rendered by Field component of reduxForm
// It contains logic to render a single label and text input

import React from 'react';

export default ({ input, label }) => {
  //input prop passed from reduxForm
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
