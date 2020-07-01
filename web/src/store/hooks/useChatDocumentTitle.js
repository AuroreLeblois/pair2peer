import { useEffect } from 'react';

export default (messages) => {
  // Objectif : modifier le document.title à mesure que des messages
  // sont postés dans le chat => afficher le nombre de messages.
  const setDocumentTitle = () => {
    document.title = `Chat - ${messages.length} messages`;
  };
  useEffect(setDocumentTitle, [messages]);
  // return ??
};
