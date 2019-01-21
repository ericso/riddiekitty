import { getRiddle } from '.';
import Riddle from './riddle';


export default class RiddleMaster {

  // Map of users to riddles being handled by this RiddleMaster
  riddles: { [key: string]: Riddle };

  constructor() {
    this.riddles = {};
  }

  getOrCreateRiddleFor(user: string):Riddle {
    if (!this.riddles[user]) {
      this.riddles[user] = getRiddle();
    }
    return this.riddles[user];
  }

  getPromptFor(user: string): string {
    return this.getOrCreateRiddleFor(user).getPrompt();
  }

  getAnswerFor(user: string): string {
    return this.getOrCreateRiddleFor(user).getAnswer();
  }

  getHintFor(user: string): string {
    const riddle = this.getOrCreateRiddleFor(user);
    const hint = riddle.getHint();
    riddle.incrementHintIndex();
    return hint;
  }
}