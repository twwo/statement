function getUSDFormat() {
    return new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
               minimumFractionDigits: 2,
             }).format;
}

function calculateAmount(type, performance) {
    let amount = 0;
    switch (type) {
          case 'tragedy':
            amount = 40000;
            if (performance.audience > 30) {
              amount += 1000 * (performance.audience - 30);
            }
            break;
          case 'comedy':
            amount = 30000;
            if (performance.audience > 20) {
              amount += 10000 + 500 * (performance.audience - 20);
            }
            amount += 300 * performance.audience;
            break;
          default:
            throw new Error(`unknown type: ${type}`);
        }
    return amount;
}

function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const USDformat = getUSDFormat();
  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisAmount = calculateAmount(play.type, performance);
    // add volume credits
    volumeCredits += Math.max(performance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(performance.audience / 5);
    //print line for this order
    result += ` ${play.name}: ${USDformat(thisAmount / 100)} (${performance.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${USDformat(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};
