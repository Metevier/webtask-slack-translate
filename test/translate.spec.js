import { expect } from 'chai';
import translate from '../src/translate';

describe('translate', () => {
  it('Should return a target language key and source text', () => {
    const source = 'fr This is some test text. We have multiple sentances. With \\ some ) weird @ characters. \nWill you match this$%^#';
    const { langKey, sourceText } = translate(source);
    expect(langKey).to.equal('fr');
    expect(sourceText).to.equal('This is some test text. We have multiple sentances. With \\ some ) weird @ characters. \nWill you match this$%^#');
  });
});