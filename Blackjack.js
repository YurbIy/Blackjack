const readline = require('readline');
const getPile = require('./Pile');
const getHandWeight = require('./ScoreCounter')
const readStats = require('./FileProcessor');
const writeResult = require('./FileProcessor')
const GREETING = 'Hello, there! Here is console Blackjack.'

const pile = getPile();
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

const finalCount = () => {
  const playersScore = getHandWeight(hand);
  const croupiersScore = getHandWeight(croupiersHand);
  console.log('Your final hand is:');
  console.log(hand);
  console.log('Croupier\'s final hand is:');
  console.log(croupiersHand);
  console.log('Your total score is:' + playersScore);
  console.log('Croupier\'s total score is:' + croupiersScore);

  let result;

  if (playersScore > 21) {
    result = 'You lose!';
  } else if (playersScore === croupiersScore){
    result = 'Draw!';
  } else if (playersScore === 21){
    result = 'You win!!!';
  }
  else {
    if (croupiersScore > 21) {
      result = 'You win!!!';
    } else if (21 - playersScore > 21 - croupiersScore) {
      result = 'You lose!';
    }
    else {
      result = 'You win!!!';
    }
  }
  console.log(result);
  writeResult(result);
  console.log(readStat());
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
