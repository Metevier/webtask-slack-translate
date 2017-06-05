import { expect } from 'chai';
import translate from '../src/translate';

describe('translate()', () => {
  it('Should return a target language key and source text', () => {
    const source = 'fr This is some test text. We have multiple sentences. With \\ some ) weird @ characters. \nWill you match this$%^#';
    const { langKey, sourceText } = translate(source);
    expect(langKey).to.equal('fr');
    expect(sourceText).to.equal('This is some test text. We have multiple sentences. With \\ some ) weird @ characters. \nWill you match this$%^#');
  });

  it('Should generate ephemeral help text when missing langKey or source text', () => {
    const { langKey, sourceText, isEphemeral, translationText } = translate();
    expect(isEphemeral).to.be.true;
    expect(translationText).to.equal('Please your command in the following format:\n [target-language] [translation-text]');
  });
});