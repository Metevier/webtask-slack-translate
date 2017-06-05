import { expect } from 'chai';
import dotenv from 'dotenv';
import endpoints from '../../src/endpoints';

dotenv.config();

describe('Google Translate Integration', () => {
  const key = process.env.API_KEY;
  const { getLanguages, getTranslation } = endpoints(key);

  it ('endpoints.getLanguages() should return available languages', done => {
    getLanguages((languages) => {
      expect(languages).to.be.a('string');
      done();
    });
  }); 

  it ('endpoints.getTranslation() should return translated text', done => {
    getTranslation('en', 'Merci beaucoup', (translatedText) => {
      expect(translatedText).to.be.a('string');
      done();
    });
  }); 

});