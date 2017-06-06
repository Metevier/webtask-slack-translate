import request from 'request';
import sinon from 'sinon';

//Example JSON results pulled from the Translation API
export const stubRequest = (done) => {
  sinon
    .stub(request, 'get')
    .yields(null, null, JSON.stringify({
      "data": {
        "languages": [
          {
            "language": "en"
          },
          {
            "language": "fr"
          }
        ]
      }
    }));

  sinon
    .stub(request, 'post')
    .yields(null, null, JSON.stringify({
      "data": {
        "translations": [
          {
            "translatedText": "Hallo Welt",
            "detectedSourceLanguage": "en"
          },
          {
            "translatedText": "Mein Name ist Jeff",
            "detectedSourceLanguage": "en"
          }
        ]
      }
    }));
  done();
};

export const restoreRequest = function () {
  request.get.restore();
  request.post.restore();
}

export const expectedLanguages   = 'en fr';
export const expectedTranslation = 'Hallo Welt\nMein Name ist Jeff';