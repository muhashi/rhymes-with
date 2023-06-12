import { dictionary } from 'cmu-pronouncing-dictionary';

function getRhymingPart(pronounciation) {
	const stresses = pronounciation.split(' ');
	for (let i = stresses.length - 1; i >= 0; i--) {
		if (stresses[i].includes('1') || stresses[i].includes('2')) {
			return stresses.slice(i).join(' ');
		}
	}

  return '';
}

function getRhymingParts(word) {
  const pronounciation = dictionary[word] || '';
  if (pronounciation === '') {
    return [];
  }

  const rhymingParts = [getRhymingPart(pronounciation)];

  for (let i = 0; i < 5; i++) {
    const wordKey = `${word}(${i})`;
    const pronounciation = dictionary[wordKey] || '';
    if (pronounciation === '') {
      continue;
    }

    rhymingParts.push(getRhymingPart(pronounciation));
  }

  return rhymingParts;
}

export default function rhymesWith(wordA, wordB, {allPronounciations = false} = {}) {
  if (typeof wordA !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof wordA}`);
  } else if (typeof wordB !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof wordB}`);
  }

  const rhymingPartsA = getRhymingParts(wordA.trim().toLowerCase());
  const rhymingPartsB = getRhymingParts(wordB.trim().toLowerCase());

  if (rhymingPartsA.length === 0 || rhymingPartsB.length === 0) {
    return false;
  }

  if (allPronounciations) {
    return rhymingPartsA.some(rhymingPartA => rhymingPartsB.some(rhymingPartB => rhymingPartA === rhymingPartB));
  }

  return rhymingPartsA[0] === rhymingPartsB[0];
}
