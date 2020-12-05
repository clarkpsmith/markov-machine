/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
    this.makeText();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      if (this.chains[this.words[i]]) {
        this.chains[this.words[i]].push(this.words[i + 1]);
      } else {
        this.chains[this.words[i]] = [this.words[i + 1]];
      }
    }
  }

  static choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keysArray = Object.keys(this.chains);
    let key = MarkovMachine.choice(keysArray);

    let textArray = [];

    while (textArray.length < numWords && key != undefined) {
      textArray.push(key);
      key = MarkovMachine.choice(this.chains[key]);
    }
    console.log(textArray.join(" "));
    return textArray.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
