import { expect } from 'chai';
import endpoints from '../src/endpoints';

describe('endpoints', () => {
  const key = 'supersecretkey';

  it ('Should build a translationEndpoint with API_KEY', () => {
    const expectedTranslationEnpoint = `https://translation.googleapis.com/language/translate/v2?key=${key}`;
    const { translationEndpoint } = endpoints({ API_KEY: key });
    expect(translationEndpoint).to.equal(expectedTranslationEnpoint);
  }); 

  it('Should return getTranslation()', () => {
    const { getTranslation } = endpoints({ API_KEY: key });
    expect(getTranslation).to.be.a('function');
  });
});