'use strict';

const SOURCE_PATTERN = /(\w+) ([\s\S]*)/;

var translate = function(source) {
  const exp = SOURCE_PATTERN.exec(source);
  const langKey = exp[1], sourceText = exp[2];

  return {
    langKey,
    sourceText
  };
};

var webtask = function (context, cb) { 
  cb(null, { text: translate() }); 
};

module.exports = webtask;
