import React from 'react';
import { Segment, Dimmer, Loader, Image } from 'semantic-ui-react';

const Loading = () => (
  <Segment>
    <Dimmer active inverted>
      <Loader inverted content="Patientez" />
    </Dimmer>

    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
  </Segment>
);

export default Loading;
