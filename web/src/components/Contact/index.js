import React, { useState } from 'react';
import { Button } from 'react-bulma-components';


const Contact = () => {

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [name, setName] = React.useState('');

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
      <textarea class="form-control" placeholder="Message"></textarea>
      <Button  type="submit" color="success">Envoyer</Button>
    </div>
	);
  
};

export default Contact;