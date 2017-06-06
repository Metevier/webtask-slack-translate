import { expect } from 'chai';
import { stubRequest, restoreRequest, expectedLanguages, expectedTranslation } from './helpers';
import translate, { HELP_MESSAGES, INVALID_FORMAT, INVALID_KEY } from '../../src/translate';

describe('translate()', () => {
  const key = 'supersecretkey';

  before(stubRequest);
  after(restoreRequest)

  it('Should return a target language key and source text', (done) => {
    const expectedLangKey    = 'fr', 
          expectedSourceText = 'This is some test text. We have multiple sentences. With \\ some ) weird @ characters. \nWill you match this$%^#',
          source             = `${expectedLangKey} ${expectedSourceText}`;

    translate(source, key, ({ langKey, sourceText }) => {
      expect(langKey).to.equal(expectedLangKey);
      expect(sourceText).to.equal(expectedSourceText);
      done();
    });
  });

  it('Should generate ephemeral help text when missing langKey or source text', (done) => {
    translate('', key, ({ langKey, sourceText, isEphemeral, translationText }) => {
      expect(isEphemeral).to.be.true;
      expect(translationText).to.equal(HELP_MESSAGES[INVALID_FORMAT]);
      done();
    });
  });

  it('Should generate ephemeral help text when missing API_KEY', (done) => {
    translate('en Buenos dias', '', ({ langKey, sourceText, isEphemeral, translationText }) => {
      expect(isEphemeral).to.be.true;
      expect(translationText).to.equal(HELP_MESSAGES[INVALID_KEY]);
      done();
    });
  });

  it('A language key of "lang" should return available languages', (done) => {
    translate('lang', key, ({ langKey, sourceText, isEphemeral, translationText }) => {
      expect(isEphemeral).to.be.true;
      expect(translationText).to.equal(expectedLanguages);
      done();
    });
  });

  it('Should return translation text and a non ephemeral message', (done) => {
    translate('fr Hello world', key, ({ langKey, sourceText, isEphemeral, translationText }) => {
      expect(isEphemeral).to.be.false;
      expect(translationText).to.equal(expectedTranslation);
      done();
    });
  });
});