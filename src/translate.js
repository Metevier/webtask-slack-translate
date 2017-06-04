const SOURCE_PATTERN = /(\w+) ([\s\S]*)/;

export default function(source) {
  const exp = SOURCE_PATTERN.exec(source);
  const langKey = exp[1], sourceText = exp[2];

  return {
    langKey,
    sourceText
  };
}