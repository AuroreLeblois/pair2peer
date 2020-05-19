/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Modal, Section, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => (
  <Modal closeOnBlur={false} closeOnEsc={false} showClose={false} show onClose={() => {}}>
    <Modal.Content>
      <Section className="container-loading" style={{ textAlign: 'center' }}>
        <Icon color="light">
          <FontAwesomeIcon size="6x" icon={faSpinner} spin />
        </Icon>
      </Section>
    </Modal.Content>
  </Modal>
);

export default Loading;
