# rhymes-with

> Determines whether two words rhyme with each other

Uses the [`cmu-pronouncing-dictionary`](https://github.com/words/cmu-pronouncing-dictionary) (~1MB) to determine if two words rhyme.

This has the advantage of being much more accurate than algorithmic methods, but the drawback is that the dictionary contains ~130,000 words, so the results may be limited.

## Install

```sh
npm install rhymes-with
```

## Usage

```js
import rhymesWith from 'rhymes-with';

rhymesWith('cat', 'hat');
//=> true

rhymesWith('bonnie', 'irani');
//=> true

rhymesWith('resume', 'ricochet');
//=> false

rhymesWith('resume', 'ricochet', { allPronounciations: true });
//=> true

// words not in dictionary
rhymesWith('pooper', 'scooper');
//=> false

rhymesWith('I need to use the bathroom..', 'We met in a chatroom');
//=> false
```

## API

### rhymesWith(wordA, wordB, options?)

Returns false if either word is not in the dictionary.

#### wordA and wordB

Type: `string`

Words to check if they rhyme.

#### options

Type: `object`

##### allPronounciations

Type: `bool`\
Default: `false`

Whether to check alternative pronounciations of the words to see if there's a rhyme.
