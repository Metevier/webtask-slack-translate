const baseEndpoint = 'https://translation.googleapis.com/language/translate/v2';

export default function(apiKey) {
  const translationEndpoint = `${baseEndpoint}?key=${apiKey}`;

  const getTranslation = () => {
    return;
  }

  return {
    getTranslation,
    translationEndpoint
  }
}