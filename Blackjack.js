const readline = require('readline');

const GREETING = 'Hello, there! Here is console Blackjack.'

const ranges = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const suits = ['♥', '♦', '♣', '♠'];

var pile = [];
suits.map(suit => ranges.map((range) => range + suit)).map((value) => pile = pile.concat(value));

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

const getHandWeight = (hand) => {
  var result = 0;
  hand.map((card) => {
    if(card[0] === 'A' && (result + 11) > 21){
      card[0] = 'B';
  }
    result += getCardWeigth(card);
  });
  return result;
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

  if (playersScore > 21
    || 21 - playersScore > 21 - croupiersScore) console.log('You lose!');
  else console.log('You win!!!');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

while (hand.length < 2) hand = takeCard(hand);
while (croupiersHand.length < 2) croupiersHand = takeCard(croupiersHand);

console.log('Here is your hand: ' + hand + '\nHere is croupier\'s first card:' + croupiersHand[0] + '\nOne more card?(y/n)');

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



