/**
 * Gérer les champs de formulaire avec Formik
 */

import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import "./styles.css";

const Signup = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Submit</button>
      
    </form>
  );
};

function App() {
  return <Signup />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default Signup;
