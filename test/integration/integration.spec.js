import { expect } from 'chai';
import dotenv from 'dotenv';
import endpoints from '../../src/endpoints';

dotenv.config();

//We can't test much here besides not getting an error
//There is no garuentee the translations will always be the same.
describe('Google Translate Integration', () => {
  const key = process.env.API_KEY;
  const { getLanguages, getTranslation } = endpoints(key);

  it ('endpoints.getLanguages() should return available languages', (done) => {
    getLanguages((languages, errMessage) => {
      expect(errMessage).to.be.null;
      expect(languages).to.be.a('string');
      done();
    });
  }); 

  it ('endpoints.getTranslation() should return translated text', (done) => {
    getTranslation('en', 'Merci beaucoup', (translatedText, errMessage) => {
      expect(errMessage).to.be.null;
      expect(translatedText).to.be.a('string');
      done();
    });
  }); 

});