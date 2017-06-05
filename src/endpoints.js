import request from 'request';

const baseEndpoint = 'https://translation.googleapis.com/language/translate/v2';

export default function (apiKey) {
  const languagesEndpoint   = `${baseEndpoint}/languages?key=${apiKey}`;
  const translationEndpoint = `${baseEndpoint}?key=${apiKey}`;

  const getLanguages = (done) => {
    request.get(languagesEndpoint, (err, res, body) => {
      const parsedBody = JSON.parse(body);
      const languages  = parsedBody.data.languages.reduce((fullText, current) => {
        return fullText === '' ? current.language : `${fullText} ${current.language}`; //Don't want a leading space
      }, '');

      done(languages);
    });
  }

  const getTranslation = (langKey, sourceText, done) => {
    request.post(translationEndpoint,
      {
        form: {
          q: sourceText,
          target: langKey
        }
      },
      (err, res, body) => {
        const parsedBody     = JSON.parse(body);
        const translatedText = parsedBody.data.translations.reduce((fullText, current) => {
          return fullText === '' ? current.translatedText : `${fullText}\n${current.translatedText}`; //Don't want a leading \n
        }, '');

        done(translatedText);
      });
  }

  return {
    getLanguages,
    getTranslation,
    languagesEndpoint,
    translationEndpoint
  }
}