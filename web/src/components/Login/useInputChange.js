import { useState } from 'react';

// == Utils function to handle input Onchange
export const useInputChange = () => {
  const [input, setInput] = useState({});

  const handleInputChange = (evt) => setInput({
    ...input,
    [evt.currentTarget.name]: evt.currentTarget.value,
  });
  console.log(input);
  return [input, handleInputChange];
};