/**
 * Gérer les champs de formulaire avec Formik
 */

import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import './styles.css';

/** 
// CAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

// Tentative de captcha
function onChange(value) {
  console.log("Captcha value:", value);
}
 
ReactDOM.render(
  <ReCAPTCHA
    sitekey="Your client site key"
    onChange={onChange}
  />,
  document.body
);

*/



const Signup = () => {
  const formik = useFormik({
    initialValues: { prenom:"Valeur par defaut" ,nom:"Valeur par defaut" ,email: "Valeur@pardefaut.com", password: "Valeur par defaut", city: "Valeur par defaut" },

// email invalide avec message d'erreur si il n'est pas aux "normes"

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Nom :</label>
      <input
        id="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.nom}
      />
      <label htmlFor="firstName">Prenom :</label>
      <input
        id="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.prenom}
      />
      <label htmlFor="email">Email :</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor="password">Password :</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <label htmlFor="city">Ville :</label>
      <input
        id="city"
        name="city"
        type="city"
        onChange={formik.handleChange}
        value={formik.values.city}
      />
      <button type="submit">S'inscrire</button>
      
    </form>
  );
};

function App() {
  return <Signup />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default Signup;
