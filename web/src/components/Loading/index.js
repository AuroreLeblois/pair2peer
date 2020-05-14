import React from 'react';
import { Modal, Section, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => (
  <Modal closeOnBlur={false} closeOnEsc={false} showClose={false} show onClose={() => {}}>
    <Modal.Content>
      <Section style={{ backgroundColor: 'white' }}>
        <FontAwesomeIcon size="xs" icon={faSpinner} />
      </Section>
    </Modal.Content>
  </Modal>
);

export default Loading;
