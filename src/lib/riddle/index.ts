import Riddle from './riddle';


/**
 * Get a riddle from the datastore
 *
 * @returns string: a greeting
 */
export function getRiddle(): Riddle {  
  return new Riddle(
    'A pizza weighs ten pounds plus half its own weight. How much does the pizza weigh?',
    '20 pounds',
    ['It is not 15 pounds', 'Try using algebra', 'x = 10 + x/2'],
  );
}

