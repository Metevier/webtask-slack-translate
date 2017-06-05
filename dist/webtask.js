'use strict';

var INVALID_FORMAT = 'INVALID_FORMAT';
var HELP_MESSAGES = {
  'INVALID_FORMAT': 'Please your command in the following format:\n [target-language] [translation-text]'
};

var getHelpText = function getHelpText(messageKey) {
  return HELP_MESSAGES[messageKey];
};

var parseSource = function parseSource(source) {
  if (!source) {
    return {
      invalidFormat: true
    };
  }

  var tokens = source.split(' ');
  var langKey = tokens.shift();
  var sourceText = tokens.join(' ');
  var invalidFormat = !langKey || !sourceText;

  return {
    langKey: langKey,
    sourceText: sourceText,
    invalidFormat: invalidFormat
  };
};

var translate = function (source) {
  var isEphemeral = false,
      translationText = '';

  var _parseSource = parseSource(source),
      langKey = _parseSource.langKey,
      sourceText = _parseSource.sourceText,
      invalidFormat = _parseSource.invalidFormat;

  if (invalidFormat) {
    translationText = getHelpText(INVALID_FORMAT);
    isEphemeral = true;
  }

  return {
    isEphemeral: isEphemeral,
    langKey: langKey,
    sourceText: sourceText,
    translationText: translationText
  };
};

var webtask = function (context, cb) {
  cb(null, { text: translate() });
};

module.exports = webtask;
