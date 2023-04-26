const PUNCTUATION_LIST = [
  '.',
  ',',
  '!',
  '?',
  "'",
  '{',
  '}',
  '(',
  ')',
  '[',
  ']',
  '/',
];

const spaceMatch = (character) => {
  if (character === ' ') {
    return true;
  }
};

const punctuationMatch = (idx, text) => {
  const punctuationIdx = PUNCTUATION_LIST.indexOf(text[idx]);
  if (punctuationIdx >= 0 && spaceMatch(text[idx + 1])) {
    return true;
  }
};

const checkMatch = (idx, text, max, min) => {
  if (idx < max && idx > min && punctuationMatch(idx, text)) {
    return true;
  }
};

const trimText = (text, min = 80, ideal = 100, max = 200) => {
  if (max < min || ideal > max || ideal < min) {
    throw new Error(
      'The minimum length must be less than the maximum, and the ideal must be between the minimum and maximum.',
    );
  }

  if (text.length < ideal) {
    return [text, ''];
  }

  let pointerOne = ideal;
  let pointerTwo = ideal;
  let firstSpace;
  let resultIdx;

  const setSpace = (idx) => {
    if (spaceMatch(text[idx])) {
      firstSpace = firstSpace || idx;
    }
  };

  while (pointerOne < max || pointerTwo > min) {
    if (checkMatch(pointerOne, text, max, min)) {
      resultIdx = pointerOne + 1;
      break;
    } else if (checkMatch(pointerTwo, text, max, min)) {
      resultIdx = pointerTwo + 1;
      break;
    } else {
      setSpace(pointerOne);
      setSpace(pointerTwo);
    }

    pointerOne += 1;
    pointerTwo -= 1;
  }

  if (resultIdx === undefined) {
    if (firstSpace && firstSpace >= min && firstSpace <= max) {
      resultIdx = firstSpace;
    } else if (ideal - min < max - ideal) {
      resultIdx = min;
    } else {
      resultIdx = max;
    }
  }

  return [text.slice(0, resultIdx), text.slice(resultIdx).trim()];
};

export default trimText;
