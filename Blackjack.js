const ranges = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const suits = ['♥', '♦', '♣', '♠'];

var pile = [];
suits.map(suit => ranges.map((range) => range + suit)).map((value) => pile = pile.concat(value));

const random = () => {
    return Math.round(Math.random() * 51);
}

var hand = [];

const takeCard = () => {
  var card = pile[random()];
  while(hand.indexOf(card) !== -1) card = pile[random()];
  hand.push(card);
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
    case 'J':
    case 'Q':
    case 'K':
      return 10;
      break;
  }
}

const getHandWeight = () => {
  var result = 0;
  hand.map((card) => {result += getCardWeigth(card)});
  return result;
}

takeCard();
console.log(hand);
console.log(getHandWeight());
takeCard();
console.log(hand);
console.log(getHandWeight());
