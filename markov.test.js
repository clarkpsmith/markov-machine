const { MarkovMachine } = require("./markov");

describe("test markov machine", () => {
  test("test makeChains function", () => {
    mm = new MarkovMachine("the cat in the hat");
    let res = mm.chains;
    expect(res).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [undefined],
    });
  });

  test("generates random choice", () => {
    let choice = MarkovMachine.choice(["hat", "hat", "hat"]);
    expect(choice).toEqual("hat");
    expect(["a", "b", "c"]).toContain(MarkovMachine.choice(["a", "b", "c"]));
  });

  test("semi predictable text", () => {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(["a b c", "b c", "c"]).toContain(text);
  });
});

test("output string always ends with the input strings last word", () => {
  let input = "the cat in the hat";
  let mm = new MarkovMachine(input);
  let text = mm.makeText();

  expect(text.slice(-3)).toEqual(input.slice(-3));
});

test("cuts off at length", () => {
  let mm = new MarkovMachine("the cat in the hat");
  let text = mm.makeText(2);
  let textArray = text.split(" ");
  console.log(textArray.length);
  expect([1, 2]).toContain(textArray.length);
});
