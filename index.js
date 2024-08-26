import getRhymingPart from 'rhyming-part';


export default function rhymesWith(wordA, wordB, { allPronounciations = false } = {}) {
    if (typeof wordA !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof wordA}`);
    } else if (typeof wordB !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof wordB}`);
    }

    const rhymingPartsA = getRhymingPart(wordA.trim().toLowerCase(), { multiple: true }) ?? [];
    const rhymingPartsB = getRhymingPart(wordB.trim().toLowerCase(), { multiple: true }) ?? [];

    if (rhymingPartsA.length === 0 || rhymingPartsB.length === 0) {
        return false;
    }

    if (allPronounciations) {
        return rhymingPartsA.some(rhymingPartA => rhymingPartsB.some(rhymingPartB => rhymingPartA === rhymingPartB));
    }

    return rhymingPartsA[0] === rhymingPartsB[0];
}
