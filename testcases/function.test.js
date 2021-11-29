const { responceArray, calculateMonthLineItems, addMonths, calculateLineItems, addDates, numOfDateBetweenTwoDates} = require("../public/javascripts/function");
var {ledgerResponceData, ledgerlineItem} = require("../models/ledger");

// Test case for function calculateLineItems
const res = {
    "lineitem": [
        {
            "start_date": "2020-03-28T00:00:00.000Z",
            "end_date": "2020-04-10T00:00:00.000Z",
            "total_amount": 1110,
        },
        {
            "start_date": "2020-04-11T00:00:00.000Z",
            "end_date": "2020-04-24T00:00:00.000Z",
            "total_amount": 1110,
        },
        {
            "start_date": "2020-04-25T00:00:00.000Z",
            "end_date": "2020-05-08T00:00:00.000Z",
            "total_amount": 1110,
        },
        {
            "start_date": "2020-05-09T00:00:00.000Z",
            "end_date": "2020-05-22T00:00:00.000Z",
            "total_amount": 1110,
        },
        {
            "start_date": "2020-05-23T00:00:00.000Z",
            "end_date": "2020-05-27T10:00:00.000Z",
            "total_amount": 396.43,
        }
    ]
}
const expected = new ledgerResponceData(res);


test('start date is 2020-03-28, end date is 2020-05-27, weekly rent is $555 and frequency is FORTNIGHTLY then resultant itemsArray of length is 5', () => {
    const received = calculateLineItems("2020-03-28T00:00:00.000Z","2020-05-27T10:00:00.000Z",1110,13);
    expect(received.lineitem.length).toBe(expected.lineitem.length);
});



/**
 * Unit Test case for function numOfDateBetweenTwoDates
 */
test('number of dates from 2020-03-28 to 2020-05-27 is eqaul to the 60', () => {
    expect(numOfDateBetweenTwoDates("2020-03-28T00:00:00.000Z", "2020-05-27T10:00:00.000Z")).toBe(60);
});

/**
 * Unit Test case for function addMonths
 */
test('After 1 month from starting date 2020-01-31 is eqaul to the 2020-02-29', () => {
    expect(addMonths(new Date("2020-01-31T00:00:00.000Z"), 1)).toBe("2020-02-29T00:00:00.000Z");
});

/**
 * Unit Test case for function addDates
 */
 test('After one week from starting date 2020-03-28 is eqaul to the 2020-04-03', () => {
    expect(addDates(new Date("2020-03-28T00:00:00.000Z"), 6)).toBe("2020-04-03T00:00:00.000Z");
});



