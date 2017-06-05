import request from 'request';
import { INVALID_KEY, INVALID_LANG, GENERAL_ERROR } from './translate';

const baseEndpoint = 'https://translation.googleapis.com/language/translate/v2';

const parseError = function (body) {
  if (body.error) {
    const code = body.error.code;
    switch (code) {
      case 400:
        return INVALID_LANG;
      case 403:
        return INVALID_KEY;
      default : 
        return GENERAL_ERROR;
    } 
  }
  return null;
};

export default function (apiKey) {
  const languagesEndpoint   = `${baseEndpoint}/languages?key=${apiKey}`;
  const translationEndpoint = `${baseEndpoint}?key=${apiKey}`;

  const getLanguages = (done) => {
    request.get(languagesEndpoint, (err, res, body) => {
      const parsedBody = JSON.parse(body);
      const errMessage = parseError(parsedBody);
      if (errMessage) 
          return done(null, errMessage);

      
      const languages  = parsedBody.data.languages.reduce((fullText, current) => {
        return fullText === '' ? current.language : `${fullText} ${current.language}`; //Don't want a leading space
      }, '');

      done(languages, errMessage);
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
        const parsedBody = JSON.parse(body);
        const errMessage = parseError(parsedBody);
        if (errMessage) 
          return done(null, errMessage);
 
        const translatedText = parsedBody.data.translations.reduce((fullText, current) => {
          return fullText === '' ? current.translatedText : `${fullText}\n${current.translatedText}`; //Don't want a leading \n
        }, '');

        done(translatedText, errMessage);
      });
  }

  return {
    getLanguages,
    getTranslation,
    languagesEndpoint,
    translationEndpoint
  }
}