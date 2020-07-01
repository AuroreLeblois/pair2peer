/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

// == Utils function to handle input Onchange
const useInputChange = () => {
  const [input, setInput] = useState({});

  const handleInputChange = (evt) => setInput({
    ...input,
    [evt.currentTarget.name]: evt.currentTarget.value,
  });
  return [input, handleInputChange];
};

export default useInputChange;
