import test from 'ava';
import rhymesWith from './index.js';


test('throws errors', t => {
  t.throws(() => {
    rhymesWith(123);
  }, {
    instanceOf: TypeError,
    message: 'Expected a string, got number',
  });

  t.throws(() => {
    rhymesWith({});
  }, {
    instanceOf: TypeError,
    message: 'Expected a string, got object',
  });

  t.throws(() => {
    rhymesWith();
  }, {
    instanceOf: TypeError,
    message: 'Expected a string, got undefined',
  });

  t.throws(() => {
    rhymesWith('real', 123);
  }, {
    instanceOf: TypeError,
    message: 'Expected a string, got number',
  });
});

test('true tests', t => {
  t.true(rhymesWith('cat', 'bat'));
  t.true(rhymesWith('cat', 'hat'));
  t.true(rhymesWith('bat', 'cat'));
  t.true(rhymesWith('john', 'bon'));
  t.true(rhymesWith('bonnie', 'irani'));
});

test('false tests with words in dictionary', t => {
  t.false(rhymesWith('cat', 'john'));
  t.false(rhymesWith('john', 'cat'));
  t.false(rhymesWith('bat', 'bath'));
  t.false(rhymesWith('john', 'aaron'));
  t.false(rhymesWith('bonnie', 'blobby'));
});

test('false tests with words not in dictionary', t => {
  t.false(rhymesWith('cat', 'qat'));
  t.false(rhymesWith('qat', 'cat'));
  t.false(rhymesWith('poopie', 'scoopie'));
  t.false(rhymesWith('john', 'asodijoa'));
  t.false(rhymesWith('sadjoas', 'blobby'));
});

test('tests with multiple pronunciations', t => {
  t.false(rhymesWith('adverse', 'universe'));
  t.true(rhymesWith('adverse', 'universe', { allPronounciations: true }));
  t.false(rhymesWith('aigner', 'ama'));
  t.true(rhymesWith('aigner', 'ama', { allPronounciations: true }));
});

test('test case sensitivity and space trimming', t => {
  t.true(rhymesWith('CAt', 'baT'));
  t.true(rhymesWith('Cat', 'Hat'));
  t.true(rhymesWith(' bat   ', ' cAt '));
  t.true(rhymesWith('JOHN  ', 'bOn'));
  t.true(rhymesWith('bonnie', 'irani'));
  t.false(rhymesWith('cat  ', ' jOhn  '));
});

test('true tests with sentences', t => {
  t.true(rhymesWith('The cat sat on the mat.', 'The bat flew over the hat'));
  t.true(rhymesWith('He was late for the debate!!', "She couldn't wait to skate"));
  t.true(rhymesWith('John went to the store, alone', 'Bon went to get a scone'));
});

test('false tests with sentences', t => {
  t.false(rhymesWith('He bought a bat for the game', 'She washed her hands in the rain.'));
  t.false(rhymesWith('John played the violin', 'Aaron drove the car in the morning!'));
  t.false(rhymesWith('Bonnie likes to bake a cake!!', 'Blobby likes to jump in the toke'));
  t.false(rhymesWith('The sun was bright, and what', 'The plot was intricate and whatnot'));
  t.false(rhymesWith('Bonnie went to the beach in Miami', 'Irani watched the tsunami. From a cabbie'));
});

test('multiple pronunciations tests with sentences', t => {
  t.false(rhymesWith('I sat on the granite.', 'What the hell is a gannett!', { allPronounciations: false }));
  t.true(rhymesWith('I sat on the granite.', 'What the hell is a gannett', { allPronounciations: true }));
  t.false(rhymesWith('This is not our', 'Lets go to Qatar..'));
  t.true(rhymesWith('This is not our', 'Lets go to Qatar..', { allPronounciations: true }));
  t.false(rhymesWith('I need help with my resume', 'It just did a ricochet'));
  t.true(rhymesWith('I need help with my resume', 'It just did a ricochet', { allPronounciations: true }));
});
