'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var request = _interopDefault(require('request'));

var baseEndpoint = 'https://translation.googleapis.com/language/translate/v2';

var endpoints = function (apiKey) {
  var languagesEndpoint = baseEndpoint + '/languages?key=' + apiKey;
  var translationEndpoint = baseEndpoint + '?key=' + apiKey;

  var getLanguages = function getLanguages(done) {
    request.get(languagesEndpoint, function (err, res, body) {
      var parsedBody = JSON.parse(body);
      var languages = parsedBody.data.languages.reduce(function (fullText, current) {
        return fullText === '' ? current.language : fullText + ' ' + current.language; //Don't want a leading space
      }, '');

      done(languages);
    });
  };

  var getTranslation = function getTranslation(langKey, sourceText, done) {
    request.post(translationEndpoint, {
      form: {
        q: sourceText,
        target: langKey
      }
    }, function (err, res, body) {
      var parsedBody = JSON.parse(body);
      var translatedText = parsedBody.data.translations.reduce(function (fullText, current) {
        return fullText === '' ? current.translatedText : fullText + '\n' + current.translatedText; //Don't want a leading \n
      }, '');

      done(translatedText);
    });
  };

  return {
    getLanguages: getLanguages,
    getTranslation: getTranslation,
    languagesEndpoint: languagesEndpoint,
    translationEndpoint: translationEndpoint
  };
};

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

var translate = function (source, apiKey, done) {
  var isEphemeral = false,
      translationText = '';

  if (!apiKey) return done(getHelpText(INVALID_KEY));

  var _endpoints = endpoints(apiKey),
      getLanguages = _endpoints.getLanguages,
      getTranslation = _endpoints.getTranslation;

  var _parseSource = parseSource(source),
      langKey = _parseSource.langKey,
      sourceText = _parseSource.sourceText,
      invalidFormat = _parseSource.invalidFormat;

  if (langKey === 'lang') {
    return getLanguages(function (languages) {
      return done({
        translationText: languages,
        isEphemeral: true
      });
    });
  }

  if (invalidFormat) return done(getHelpText(INVALID_FORMAT));

  return getTranslation(langKey, sourceText, function (translation) {
    return done({
      isEphemeral: isEphemeral,
      langKey: langKey,
      sourceText: sourceText,
      translationText: translation
    });
  });

  return done({
    isEphemeral: isEphemeral,
    langKey: langKey,
    sourceText: sourceText,
    translationText: translationText
  });
};

var webtask = function (context, cb) {
  translate(context.body.text, context.secrets.API_KEY, function (_ref) {
    var translationText = _ref.translationText,
        isEphemeral = _ref.isEphemeral;

    cb(null, { text: translationText, response_type: isEphemeral ? 'emphemeral' : 'in_channel' });
  });
};

module.exports = webtask;
