"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalWindow = (props) => {
  const {
    // book,
    showModal,
    setModal,
  } = props;

  // function FormContent() {
  //   return {

  //   }
  // }

  return (
    <div>
      {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
      <Modal isOpen={showModal} toggle={setModal}>
        <ModalHeader toggle={setModal}>Modal title</ModalHeader>
        <ModalBody>
          {/* <FormContent>
            
          </FormContent> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={setModal}>Do Something</Button>{' '}
          <Button color="secondary" onClick={setModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
ModalWindow.propTypes = {
        formData: PropTypes.object.isRequired,
        showModal: PropTypes.bool,
        setModal: PropTypes.func,
    };

export default ModalWindow;