
/***
 * Riddle Class
 */
export default class Riddle {

  prompt: string;
  answer: string;
  hints: Array<string>;

  // keeps track of what hint should be given next
  hintIndex: number;
  
  constructor(prompt: string, answer: string, hints?: Array<string>) {
    this.prompt = prompt;
    this.answer = answer;
    this.hints = hints ? hints : [];
    this.hintIndex = 0;
  }

  getPrompt(): string {
    return this.prompt;
  }

  getAnswer(): string {
    return this.answer;
  }

  getHint(): string {
    const noMoreHints = this.hints.length === 0;
    return noMoreHints
      ? 'No more hints'
      : this.hints[this.hintIndex];
  }

  incrementHintIndex() {
    this.hintIndex = (this.hintIndex + 1) % this.hints.length;
  }
}