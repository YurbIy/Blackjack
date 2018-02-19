const readline = require('readline');
const getPile = require('./getPile');

const GREETING = 'Hello, there! Here is console Blackjack.'

const pile = getPile();
console.log(pile);
const random = () => {
    return Math.round(Math.random() * 51);
}

var hand = [];
var croupiersHand = [];

const takeCard = (hand) => {
  var card = pile[random()];
  while(hand.indexOf(card) !== -1) card = pile[random()];
  hand.push(card);
  return hand;
}

const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

const getCardWeigth = (card) => {
  const value = card[0];
  if (isNumeric(card[0])) return parseInt(card);
  switch (value) {
    case 'A':
      return 11;
      break;
    case 'B':
      return 1;
      break;
    case 'J':
    case 'Q':
    case 'K':
      return 10;
      break;
  }
}

const sum = (array) => array.length > 0 ? array.reduce(function(previousValue, currentValue) {
  return previousValue + currentValue;
}) : 0;

const getHandWeight = (set) => {
  let weightArray = set.map(card => getCardWeigth(card));
  if(sum(weightArray) > 21) {
    const aceIndex =  weightArray.indexOf(11);
    if(aceIndex !== -1) {
      weightArray[aceIndex] = 1;
    }
  }
  return sum(weightArray);
}

const finalCount = () => {
  const playersScore = getHandWeight(hand);
  const croupiersScore = getHandWeight(croupiersHand);
  console.log('Your final hand is:');
  console.log(hand);
  console.log('Croupier\'s final hand is:');
  console.log(croupiersHand);
  console.log('Your total score is:' + playersScore);
  console.log('Croupier\'s total score is:' + croupiersScore);

  if (playersScore > 21) {
    console.log('You lose!');
  } else if (playersScore === croupiersScore){
    console.log('Draw!');
  } else if (playersScore === 21){
    console.log('You win!!!');
  }
  else {
    if (croupiersScore > 21) {
      console.log('You win!!!');
    } else if (21 - playersScore > 21 - croupiersScore) {
      console.log('You lose!');
    }
    else {
      console.log('You win!!!');
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

while (hand.length < 2) hand = takeCard(hand);
while (getHandWeight(croupiersHand) < 17) croupiersHand = takeCard(croupiersHand);

console.log('Here is your hand: ' + hand + '\nHere is croupier\'s first card:' + croupiersHand[0]);

if(getHandWeight(hand) < 21) {
  console.log('One more card?(y/n)')
} else {
  finalCount();
  rl.close();
  return;
}

rl.on('line', (answer) => {
  if(answer.toLowerCase().trim() === 'y') {
    takeCard(hand);
    console.log('Here is your hand: ' + hand);
    if(getHandWeight(hand) < 21) {
      rl.setPrompt('One more card?(y/n)')
      rl.prompt();
    } else {
      finalCount();
      rl.close();
    }
  }
  else if (answer.toLowerCase().trim() === 'n') {
    finalCount();
    rl.close();
    return;
  } else {
    rl.setPrompt('Please type exacly y or n!')
    rl.prompt();
  }
});
