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

test('test3:comedy and audience > 20', t => {
    //given
      const invoice = {
                        'customer': 'BigCo',
                        'performances': [
                          {
                            'playID': 'as-like',
                            'audience': 21,
                          }
                        ],
                      };


      //when
      const result = statement(invoice, plays);

      //then
      t.is(result, 'Statement for BigCo\n' +
                   ' As You Like It: $468.00 (21 seats)\n' +
                   'Amount owed is $468.00\n' +
                   'You earned 4 credits \n');
})

test('test4:comedy and audience <= 20', t => {
    //given
      const invoice = {
                        'customer': 'BigCo',
                        'performances': [
                          {
                            'playID': 'as-like',
                            'audience': 20,
                          }
                        ],
                      };


      //when
      const result = statement(invoice, plays);

      //then
      t.is(result, 'Statement for BigCo\n' +
                   ' As You Like It: $360.00 (20 seats)\n' +
                   'Amount owed is $360.00\n' +
                   'You earned 4 credits \n');
})

test('test5:complete function', t => {
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

test('test6:empty invoice.performances', t => {
  //given
  const invoice = {
                    'customer': 'BigCo',
                    'performances': []
                  };

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, 'Statement for BigCo\n' +
               'Amount owed is $0.00\n' +
               'You earned 0 credits \n');
});

test('test7:unknown type of performance', t => {
    //given
      const plays = {
        'othello': {
          'name': 'Othello',
          'type': 'tragedy1',
        },
      };
      const invoice = {
          'customer': 'BigCo',
          'performances': [
            {
              'playID': 'othello',
              'audience': 10,
            },
          ],
        };


      //when
      try{
        statement(invoice, plays);
        t.fail()
      }catch(e) {
      //then
        t.is(e.message, 'unknown type: tragedy1');
      }
})
