export const INVALID_FORMAT = 'INVALID_FORMAT', INVALID_KEY = 'INVALID_KEY';
export const HELP_MESSAGES  = {
  [INVALID_FORMAT]: 'Please enter your command in the following format:\n [target-language] [translation-text]',
  [INVALID_KEY]:    'Invalid Google API Key'
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
      invalidFormat: true 
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

export default function (source, apiKey) {
  let isEphemeral = false, translationText = '';

  if (!apiKey) 
    return getHelpText(INVALID_KEY);

  const { langKey, sourceText, invalidFormat } = parseSource(source);

  if(invalidFormat) 
    return getHelpText(INVALID_FORMAT);

  return {
    isEphemeral,
    langKey,
    sourceText,
    translationText
  };
}