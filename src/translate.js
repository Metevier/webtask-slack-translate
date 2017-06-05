const INVALID_FORMAT = 'INVALID_FORMAT';
const HELP_MESSAGES  = {
  'INVALID_FORMAT': 'Please your command in the following format:\n [target-language] [translation-text]'
};

const getHelpText = (messageKey) => {
  return HELP_MESSAGES[messageKey];
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

export default function (source) {
  let isEphemeral = false, translationText = '';

  const { langKey, sourceText, invalidFormat } = parseSource(source);

  if(invalidFormat) {
    translationText = getHelpText(INVALID_FORMAT);
    isEphemeral     = true; 
  }

  return {
    isEphemeral,
    langKey,
    sourceText,
    translationText
  };
}