// tslint:disable:no-expression-statement
import test from 'ava';
import Riddle from './riddle';


const PROMPT = 'A pizza weighs ten pounds plus half its own weight. How much does the pizza weigh?';
const ANSWER = '20 pounds';
const FIRST_HINT = 'It is not 15 pounds';
const SECOND_HINT = 'Try using algebra';
const THIRD_HINT = 'x = 10 + x/2';
const HINTS = [FIRST_HINT, SECOND_HINT, THIRD_HINT];

test.beforeEach(t => {
  t.context['riddle'] = new Riddle(PROMPT, ANSWER, HINTS);
});

test.afterEach(t => {
  t.context['riddle'] = undefined;
});

test('get riddle prompt', async t => {
  t.deepEqual(t.context['riddle'].getPrompt(), PROMPT);
});

test('get riddle answer', async t => {
  t.deepEqual(t.context['riddle'].getAnswer(), ANSWER);
});

test('get riddle hint', async t => {
  t.deepEqual(t.context['riddle'].getHint(), FIRST_HINT);
  t.context['riddle'].incrementHintIndex();

  t.deepEqual(t.context['riddle'].getHint(), SECOND_HINT);
  t.context['riddle'].incrementHintIndex();

  t.deepEqual(t.context['riddle'].getHint(), THIRD_HINT);
  t.context['riddle'].incrementHintIndex();

  t.deepEqual(t.context['riddle'].getHint(), FIRST_HINT);
});