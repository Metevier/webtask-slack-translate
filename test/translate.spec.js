import { expect } from 'chai';
import translate from '../src/translate';

describe("translate", () => {
  it("Should return Hello", () => {
    expect(translate()).to.equal("Hello");
  });
});