const test = require('ava');
const {statement} = require('../src/statement');
const plays = {
                      'hamlet': {
                        'name': 'Hamlet',
                        'type': 'tragedy',
                      },
                      'as-like': {
                        'name': 'As You Like It',
                        'type': 'comedy',
                      },
                      'othello': {
                        'name': 'Othello',
                        'type': 'tragedy',
                      },
                    };

test('Sample test', t => {
  //given
  const invoice = {
                    'customer': 'BigCo',
                    'performances': [
                      {
                        'playID': 'hamlet',
                        'audience': 55,
                      },
                      {
                        'playID': 'as-like',
                        'audience': 35,
                      },
                      {
                        'playID': 'othello',
                        'audience': 40,
                      },
                    ],
                  };

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, 'Statement for BigCo\n' +
               ' Hamlet: $650.00 (55 seats)\n' +
               ' As You Like It: $580.00 (35 seats)\n' +
               ' Othello: $500.00 (40 seats)\n' +
               'Amount owed is $1,730.00\n' +
               'You earned 47 credits \n');
});

test('test1:tragedy and audience > 30', t => {
    //given
      const invoice = {
                        'customer': 'BigCo',
                        'performances': [
                          {
                            'playID': 'hamlet',
                            'audience': 31,
                          }
                        ],
                      };


      //when
      const result = statement(invoice, plays);

      //then
      t.is(result, 'Statement for BigCo\n' +
                   ' Hamlet: $410.00 (31 seats)\n' +
                   'Amount owed is $410.00\n' +
                   'You earned 1 credits \n');
})

test('test2:tragedy and audience <= 30', t => {
    //given
      const invoice = {
                        'customer': 'BigCo',
                        'performances': [
                          {
                            'playID': 'hamlet',
                            'audience': 30,
                          }
                        ],
                      };


      //when
      const result = statement(invoice, plays);

      //then
      t.is(result, 'Statement for BigCo\n' +
                   ' Hamlet: $400.00 (30 seats)\n' +
                   'Amount owed is $400.00\n' +
                   'You earned 0 credits \n');
})
