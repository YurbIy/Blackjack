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

module.exports = getHandWeight;
