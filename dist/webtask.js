'use strict';

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _HELP_MESSAGES;

var INVALID_FORMAT = 'INVALID_FORMAT';
var INVALID_KEY = 'INVALID_KEY';
var HELP_MESSAGES = (_HELP_MESSAGES = {}, defineProperty(_HELP_MESSAGES, INVALID_FORMAT, 'Please enter your command in the following format:\n [target-language] [translation-text]'), defineProperty(_HELP_MESSAGES, INVALID_KEY, 'Invalid Google API Key'), _HELP_MESSAGES);

var getHelpText = function getHelpText(messageKey) {
  return {
    translationText: HELP_MESSAGES[messageKey],
    isEphemeral: true
  };
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

var translate = function (source, apiKey) {
  var isEphemeral = false,
      translationText = '';

  if (!apiKey) return getHelpText(INVALID_KEY);

  var _parseSource = parseSource(source),
      langKey = _parseSource.langKey,
      sourceText = _parseSource.sourceText,
      invalidFormat = _parseSource.invalidFormat;

  if (invalidFormat) return getHelpText(INVALID_FORMAT);

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
