"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import FormContent from './FormContent';

export class FormModal extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    const formContent = <FormContent></FormContent>;
    const modal = this.props.showModal ? <div>{formContent}</div> : null;
    return (
      <div>
        {modal}
      </div>
    );
  }
}

FormModal.propTypes = {
    showModal: PropTypes.object.isRequired
};