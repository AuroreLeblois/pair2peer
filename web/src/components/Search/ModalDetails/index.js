/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content, Modal, Media, Image, Level, Button } from 'react-bulma-components';
import { actions, selectedUserDetails } from 'src/store/actions';

// == Composant
const UserProfile = ({ modalUserDetails, setModalUserDetails }) => {
  const { selectedUser } = useSelector((state) => state);

  console.log(selectedUser)

  if (selectedUser) {
    return (
      <Modal closeOnBlur show={modalUserDetails} onClose={() => setModalUserDetails(false)}>
        <Modal.Card>
          <Modal.Card.Head onClose={() => setModalUserDetails(false)}>
            <Modal.Card.Title>
              Détails du profil de {selectedUser.pseudo}
            </Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <Media>
              <Media.Item renderAs="figure" position="left">
                <Image size={128} alt={`${selectedUser.pseudo}-picture`} src={selectedUser.picture} />
              </Media.Item>
              <Media.Item>
                <Content>
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                    <br />
                    If the children of the Modal is a card, the close button will be on the Card Head instead than the top-right corner
                    You can also pass showClose = false to Card.Head to hide the close button
                  </p>
                </Content>
                <Level breakpoint="mobile">
                  <Level.Side align="left">
                    <Button link>Like</Button>
                    <Button link>Share</Button>
                  </Level.Side>
                </Level>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
          <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
            <p>
              Lorem Ipsum...
            </p>
          </Modal.Card.Foot>
        </Modal.Card>
      </Modal>
    );
  }
  return null;
};

// == Export
export default UserProfile;
