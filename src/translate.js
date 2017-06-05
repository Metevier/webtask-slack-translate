import endpoints from './endpoints';

export const INVALID_FORMAT = 'INVALID_FORMAT', INVALID_KEY = 'INVALID_KEY', INVALID_LANG = 'INVALID_LANG', GENERAL_ERROR = 'GENERAL_ERROR';
export const HELP_MESSAGES  = {
  [INVALID_FORMAT] : 'Please enter your command in the following format:\n [target-language] [translation-text]\n Type lang to see a list of available languages',
  [INVALID_KEY]    : 'Invalid Google API Key.',
  [INVALID_LANG]   : 'Invalid target language.\n Type lang to see a list of available languages',
  [GENERAL_ERROR]  : 'Something went wrong!'
};

const getHelpText = (messageKey) => {
  return {
    translationText : HELP_MESSAGES[messageKey],
    isEphemeral     : true
  };
}

const parseSource = (source) => {
  if (!source) {
    return { 
      invalidFormat : true 
    };
  }

  let   tokens        = source.split(' ');
  const langKey       = tokens.shift();
  const sourceText    = tokens.join(' ');
  const invalidFormat = !langKey || !sourceText;

  return {
    langKey,
    sourceText,
    invalidFormat
  }
};

export default function (source, apiKey, done) {
  let isEphemeral = false, translationText = '';

  if (!apiKey) 
    return done(getHelpText(INVALID_KEY));

  const { getLanguages, getTranslation } = endpoints(apiKey);

  const { langKey, sourceText, invalidFormat } = parseSource(source);

  if (langKey === 'lang') {
    return getLanguages((languages, errMessage) => {
      if (errMessage) 
        return done(getHelpText(errMessage));

      return done({
        translationText : languages,
        isEphemeral     : true
      });
    });
  }

  if(invalidFormat) 
    return done(getHelpText(INVALID_FORMAT));

  return getTranslation(langKey, sourceText, (translation, errMessage) => {
    if (errMessage) 
        return done(getHelpText(errMessage));

    return done({
      isEphemeral,
      langKey,
      sourceText,
      translationText: translation
    });
  });
}