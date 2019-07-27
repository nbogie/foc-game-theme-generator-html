"use strict";
//assumes that wordList.js will already have been loaded

let elemNoun1;
let elemNoun2;
let elemAdj1;
let elemAdj2;
let elemVs;
let allElems;
function makeRandomPhrase() {
  let [n1, n2] = _.sample(nouns, 2);
  let [a1, a2] = _.sample(adjectives, 2);
  return {
    noun1: n1,
    adj1: a1,
    noun2: n2,
    adj2: a2
  };
}

class Cycle {
  constructor(vals) {
    this.vals = vals;
    this.ix = 0;
  }

  current = () => this.vals[this.ix];

  next = () => {
    this.ix++;
    if (this.ix >= this.vals.length) {
      this.ix = 0;
    }
    return this.vals[this.ix];
  };

  random = () => pick(this.vals);
}

const bgColorsCycle = new Cycle([{ value: "black" }, { value: "white" }]);

const fontsCycle = new Cycle([
  "Concert One",
  "Allerta Stencil",
  "Barrio",
  "Londrina Sketch",
  "Cabin Sketch",
  "Ranchers"
]);

function pick(arr) {
  const ix = Math.floor(Math.random() * arr.length);
  return arr[ix];
}

function giantWordElement() {
  return document.getElementById("giantword");
}

function colorElemRandomly(elem) {
  const hue = Math.round(Math.random() * 360);
  elem.style.color = `hsl(${hue}, 100%, 50%)`;
}
function rotateElem(elem) {
  const angle = Math.random() * 10 - 5;
  elem.style.transform = `rotate(${angle}deg)`;
}
function handleClick(elem, list) {
  elem.innerText = pick(list);
  colorElemRandomly(elem);
}
function setPhraseIntoElements(data) {
  allElems.map(colorElemRandomly);
  allElems.map(rotateElem);
  elemNoun1.innerText = data.noun1;
  elemNoun2.innerText = data.noun2;
  elemAdj1.innerText = data.adj1;
  elemAdj2.innerText = data.adj2;
}

function showRandomPhrase() {
  const data = makeRandomPhrase();
  setPhraseIntoElements(data);
}

function cycleBackgroundColor() {
  const colorStr = bgColorsCycle.next().value;
  document.body.style.background = colorStr;
}

function setFont(fontName) {
  console.log(`font: ${fontName}`);
  document.body.style.fontFamily = fontName;
}

function cycleFont() {
  setFont(fontsCycle.next());
}

function randomiseFont() {
  setFont(fontsCycle.random());
}

function handleKeypress(e) {
  console.log(`keypress: ${e.code}`);
  switch (e.code) {
    case "Digit1":
      cycleBackgroundColor();
      showRandomPhrase();
      break;
    case "Digit2":
      randomiseFont();
      break;
    case "Digit3":
      showRandomPhrase();
      break;
    default:
      randomiseFont();
      showRandomPhrase();
  }
}

window.onload = function() {
  document.body.onkeydown = handleKeypress;
  elemNoun1 = document.getElementById("noun1");
  elemNoun2 = document.getElementById("noun2");
  elemAdj1 = document.getElementById("adj1");
  elemAdj2 = document.getElementById("adj2");
  elemVs = document.getElementById("vs");
  allElems = [elemNoun1, elemNoun2, elemAdj1, elemAdj2, elemVs];
  cycleFont();
  cycleBackgroundColor();
  cycleBackgroundColor();

  showRandomPhrase();
};
