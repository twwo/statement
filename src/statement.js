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

function calculateCredit(type, audience){
    let credit = 0;
    credit += Math.max(audience - 30, 0);
    if ('comedy' === type) {
        credit += Math.floor(audience / 5);
    }
    return credit;
}

function createData(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let performanceList = new Array();
    for (let performance of invoice.performances) {
        const play = plays[performance.playID];
        let thisAmount = calculateAmount(play.type, performance);
        volumeCredits += calculateCredit(play.type, performance.audience);
        totalAmount += thisAmount;
        performanceList.push({
            name: play.name,
            amount: thisAmount,
            audience: performance.audience
        })
      }
    let data = {
            customer: invoice.customer,
            totalAmount: totalAmount,
            volumeCredits: volumeCredits,
            performanceList: performanceList
        };
    return data;
}

function statement (invoice, plays) {
  const USDformat = getUSDFormat();
  let data = createData(invoice, plays);
  let result = `Statement for ${data.customer}\n`;
  for (let performance of data.performanceList) {
    result += ` ${performance.name}: ${USDformat(performance.amount / 100)} (${performance.audience} seats)\n`;
  }
  result += `Amount owed is ${USDformat(data.totalAmount / 100)}\n`;
  result += `You earned ${data.volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};
