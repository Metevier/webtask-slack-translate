import { expect } from 'chai';
import translate, { HELP_MESSAGES, INVALID_FORMAT, INVALID_KEY } from '../../src/translate';

describe('translate()', () => {
  const key = 'supersecretkey';

  it('Should return a target language key and source text', () => {
    const expectedLangKey    = 'fr', 
          expectedSourceText = 'This is some test text. We have multiple sentences. With \\ some ) weird @ characters. \nWill you match this$%^#',
          source             = `${expectedLangKey} ${expectedSourceText}`;

    const { langKey, sourceText } = translate(source, key);
    expect(langKey).to.equal(expectedLangKey);
    expect(sourceText).to.equal(expectedSourceText);
  });

  it('Should generate ephemeral help text when missing langKey or source text', () => {
    const { langKey, sourceText, isEphemeral, translationText } = translate('', key);
    expect(isEphemeral).to.be.true;
    expect(translationText).to.equal(HELP_MESSAGES[INVALID_FORMAT]);
  });

  it('Should generate ephemeral help text when missing API_KEY', () => {
    const { langKey, sourceText, isEphemeral, translationText } = translate('en Buenos dias', '');
    expect(isEphemeral).to.be.true;
    expect(translationText).to.equal(HELP_MESSAGES[INVALID_KEY]);
  });
});
