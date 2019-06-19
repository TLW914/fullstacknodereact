// SurveyField is rendered by Field component of reduxForm
// It contains logic to render a single label and text input

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  //input, label, meta props passed from reduxForm
  //console.log(meta)
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '10px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
