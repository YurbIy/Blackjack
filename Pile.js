


const getPile = () => {

  const ranges = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const suits = ['♥', '♦', '♣', '♠'];

  var pile = [];

  suits.map(suit => ranges.map((range) => range + suit)).map((value) => pile = pile.concat(value));
  return pile;
}

module.exports = getPile;
