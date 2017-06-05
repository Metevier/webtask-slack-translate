import { expect } from 'chai';
import translate from '../src/translate';

describe('translate()', () => {
  it('Should return a target language key and source text', () => {
    const expectedLangKey    = 'fr', 
          expectedSourceText = 'This is some test text. We have multiple sentences. With \\ some ) weird @ characters. \nWill you match this$%^#',
          source             = `${expectedLangKey} ${expectedSourceText}`;

    const { langKey, sourceText } = translate(source);
    expect(langKey).to.equal(expectedLangKey);
    expect(sourceText).to.equal(expectedSourceText);
  });

  it('Should generate ephemeral help text when missing langKey or source text', () => {
    const { langKey, sourceText, isEphemeral, translationText } = translate();
    expect(isEphemeral).to.be.true;
    expect(translationText).to.equal('Please enter your command in the following format:\n [target-language] [translation-text]');
  });

  it('Should generate ephemeral help text when missing API_KEY', () => {
    const { langKey, sourceText, isEphemeral, translationText } = translate('', { API_PAT });
    expect(isEphemeral).to.be.true;
    expect(translationText).to.equal('Please your command in the following format:\n [target-language] [translation-text]');
  });
});
