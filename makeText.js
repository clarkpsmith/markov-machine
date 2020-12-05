/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

let type = process.argv[2];
let name = process.argv[3];

if (type == "file") {
  makeText(name);
}
if (type == "url") {
  makeUrlText(name);
} else if (type != "url" && type != "file") {
  console.error("Error: second input must only be 'file' or 'url'");
  process.exit(1);
}

function generateText(text) {
  let fileText = new MarkovMachine(text);
}

function makeText() {
  fs.readFile(name, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${name}`, err.message);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

async function makeUrlText(name) {
  //   let res;
  try {
    let res = await axios.get(name);
    generateText(res.data);
  } catch (err) {
    console.error(`Error fetching ${name}`, err.message);
    process.exit(1);
  }
}

module.exports = {
  generateText,
};
