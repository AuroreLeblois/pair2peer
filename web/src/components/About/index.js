/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Columns, Card, Media, Heading, Content, Icon } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// == Import css
import Max from 'src/assets/images/max.jpg';
import Victor from 'src/assets/images/victor.jpg';
import Aurore from 'src/assets/images/aurore.jpg';
import Charles from 'src/assets/images/charles.jpg';

// == Composant
const About = () => {
  return (
    <>
      <Columns>
        <Columns.Column>
          <Content style={{ textAlign: 'center' }}>
            <Heading size={3}>L'équipe</Heading>
            <Heading subtitle size={6}>4 personnes pour 4 semaines de projet</Heading>
          </Content>
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column>
          <Card>
            <Card.Image src={Victor} alt="Charles, notre product owner" />
            <Card.Content>
              <Media>
                <Media.Item>
                  <Heading size={4}>Victor Greiveldinger</Heading>
                  <Heading subtitle size={6}>Technical Referent, Frontend Developer</Heading>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faGithub} />
                    </Icon>
                  </Link>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faLinkedin} />
                    </Icon>
                  </Link>
                </Media.Item>
              </Media>
              <Content>
                Moi, prochaine bataille rangée je reste à Kaamelott. On plaisante, on plaisante… Ah, ben tourné vers là-bas c'est sûr, moi non plus je vois rien. La vache! Ca vous rend pas aimable en tout cas, hein!
              </Content>
            </Card.Content>
          </Card>
        </Columns.Column>
        <Columns.Column>
          <Card>
            <Card.Image src={Charles} />
            <Card.Content>
              <Media>
                <Media.Item>
                  <Heading size={4}>Charles Phonepraseuth</Heading>
                  <Heading subtitle size={6}>Product Owner, Lead Backend Developer</Heading>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faGithub} />
                    </Icon>
                  </Link>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faLinkedin} />
                    </Icon>
                  </Link>
                </Media.Item>
              </Media>
              <Content>
                Moi, prochaine bataille rangée je reste à Kaamelott. On plaisante, on plaisante… Ah, ben tourné vers là-bas c'est sûr, moi non plus je vois rien. La vache! Ca vous rend pas aimable en tout cas, hein!
              </Content>
            </Card.Content>
          </Card>
        </Columns.Column>
        <Columns.Column>
          <Card>
            <Card.Image src={Aurore} />
            <Card.Content>
              <Media>
                <Media.Item>
                  <Heading size={4}>Aurore Leblois</Heading>
                  <Heading subtitle size={6}>SCRUM Master, Backend Developer</Heading>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faGithub} />
                    </Icon>
                  </Link>
                  <Link to="https://www.linkedin.com/in/aurore-leblois-4909a0a9/">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faLinkedin} />
                    </Icon>
                  </Link>
                </Media.Item>
              </Media>
              <Content>
                Moi, prochaine bataille rangée je reste à Kaamelott. On plaisante, on plaisante… Ah, ben tourné vers là-bas c'est sûr, moi non plus je vois rien. La vache! Ca vous rend pas aimable en tout cas, hein!
              </Content>
            </Card.Content>
          </Card>
        </Columns.Column>
        <Columns.Column>
          <Card>
            <Card.Image src={Max} />
            <Card.Content>
              <Media>
                <Media.Item>
                  <Heading size={4}>Maximilien Bec</Heading>
                  <Heading subtitle size={6}>Lead Frontend Developer</Heading>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faGithub} />
                    </Icon>
                  </Link>
                  <Link to="">
                    <Icon className="about-icons" color="dark">
                      <FontAwesomeIcon size="2x" icon={faLinkedin} />
                    </Icon>
                  </Link>
                </Media.Item>
              </Media>
              <Content>
                Moi, prochaine bataille rangée je reste à Kaamelott. On plaisante, on plaisante… Ah, ben tourné vers là-bas c'est sûr, moi non plus je vois rien. La vache! Ca vous rend pas aimable en tout cas, hein!
              </Content>
            </Card.Content>
          </Card>
        </Columns.Column>
      </Columns>
    </>
  );
};
// == Export
export default About;
