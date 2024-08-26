export type Options = {
    /**
    Whether to include the rhyming part for all pronunciations of the word.

    @default false
    */
    readonly allPronounciations?: boolean;
};

/**
Determines whether two words rhyme with each other, based on the CMU Pronouncing Dictionary.

@param wordA - First word to check if it rhyme.
@param wordB - Second word to check for rhyme.
@returns Whether or not the two words rhyme.

@example
```
import rhymesWith from 'rhymes-with';

rhymesWith('cat', 'hat');
//=> true

rhymesWith('resume', 'ricochet');
//=> false

rhymesWith('resume', 'ricochet', { allPronounciations: true });
//=> true
```
*/
export default function rhymesWith(wordA: string, wordB: string, options?: Options): boolean;
