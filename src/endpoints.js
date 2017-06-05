const baseEndpoint = 'https://translation.googleapis.com/language/translate/v2';

export default function(apiKey) {
  const languagesEndpoint   = `${baseEndpoint}/languages?key=${apiKey}`;
  const translationEndpoint = `${baseEndpoint}?key=${apiKey}`;

  const getLanguages = () => {
    return;
  }

  const getTranslation = () => {
    return;
  }

  return {
    getLanguages,
    getTranslation,
    languagesEndpoint,
    translationEndpoint
  }
}