import React, { useState } from 'react';
import { Button } from 'react-bulma-components';


const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newMessage = {
      name,
      email,
      message,
    };
    axios.post(`${API_URI}`)
    .then((res) => {
      if (res.data.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
    }else if(res.data.status === 'fail'){
        alert("Message failed to send.")
    }
  })
};
	return (
  	<div>
      Pour toute question, demande de récupération de mot de passe ou autre <br/>
      <div class="field">
        <div class="control">
          <textarea class="textarea is-primary" placeholder="Votre message"></textarea>
        </div>
      </div>
      <Button style={{ margin: "10px 600px" }} type="submit" color="success">Envoyer</Button>
    </div>
	);
  
};
export default Contact;