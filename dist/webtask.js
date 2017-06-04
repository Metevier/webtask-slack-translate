'use strict';

var translate = function() {
  return "Hello";
};

var webtask = function (context, cb) { 
  cb(null, { text: translate() }); 
};

module.exports = webtask;
