import { expect } from 'chai';
import endpoints from '../src/endpoints';

describe('endpoints', () => {
  const key = 'supersecretkey';

  it ('Should build a languagesEndpoint with API_KEY', () => {
    const expectedLanguagesEndpoint = `https://translation.googleapis.com/language/translate/v2/languages?key=${key}`;
    const { languagesEndpoint } = endpoints(key);
    expect(languagesEndpoint).to.equal(expectedLanguagesEndpoint);
  }); 

  it ('Should build a translationEndpoint with API_KEY', () => {
    const expectedTranslationEndpoint = `https://translation.googleapis.com/language/translate/v2?key=${key}`;
    const { translationEndpoint } = endpoints(key);
    expect(translationEndpoint).to.equal(expectedTranslationEndpoint);
  }); 
  
  it('Should return getLanguages()', () => {
    const { getLanguages } = endpoints(key);
    expect(getLanguages).to.be.a('function');
  });

  it('Should return getTranslation()', () => {
    const { getTranslation } = endpoints(key);
    expect(getTranslation).to.be.a('function');
  });

});