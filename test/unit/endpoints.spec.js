import { expect } from 'chai';
import { stubRequest, restoreRequest, expectedLanguages, expectedTranslation } from './helpers';
import endpoints from '../../src/endpoints';

describe('endpoints', () => {
  const key = 'supersecretkey';
  const { languagesEndpoint, translationEndpoint, getLanguages, getTranslation } = endpoints(key);

  before(stubRequest);
  after(restoreRequest);

  it ('Should build a languagesEndpoint with API_KEY', () => {
    const expectedLanguagesEndpoint = `https://translation.googleapis.com/language/translate/v2/languages?key=${key}`;
    expect(languagesEndpoint).to.equal(expectedLanguagesEndpoint);
  }); 

  it ('Should build a translationEndpoint with API_KEY', () => {
    const expectedTranslationEndpoint = `https://translation.googleapis.com/language/translate/v2?key=${key}`;
    expect(translationEndpoint).to.equal(expectedTranslationEndpoint);
  }); 
  
  it('Should return getLanguages()', () => {
    expect(getLanguages).to.be.a('function');
  });

  it('Should return getTranslation()', () => {
    expect(getTranslation).to.be.a('function');
  });

  describe('getLanguages()', () => {
    it('Should return a space separated list of available langauges', (done) => {
      getLanguages((languages, errMessage) => {
        expect(errMessage).to.be.null;
        expect(languages).to.equal(expectedLanguages);
        done();
      });
    });
  });

  describe('getTranslation()', () => {
    it('Should return a \\n delimited list of translations', (done) => {
      //The langKey and sourceText don't do anything in this test
      getTranslation('de', 'Hello World\nMy Name is Jeff', (translation, errMessage) => {
        expect(errMessage).to.be.null;
        expect(translation).to.equal(expectedTranslation);
        done();
      });
    });
  });

});