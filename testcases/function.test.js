const { responceArray, calculateLineItems, nextDate, numOfDaysFromStartDateToEndDate } = require("../public/javascripts/function");
var {ledgerResponceData, ledgerlineItem} = require("../models/ledger");

// Test case for function numOfDaysFromStartDateToEndDate
test('number of dates from 2020-03-28 to 2020-05-27 is eqaul to the 61', () => {
    expect(numOfDaysFromStartDateToEndDate("2020-03-28T00:00:00.000Z", "2020-05-27T10:00:00.000Z")).toBe(61);
});

// Test case for function nextDate
test('today is 2021-11-27 then after 2 days, new date is equal to the 2021-11-29', () => {
    expect(nextDate("2021-11-27T00:00:00.000Z", 2)).toBe("2021-11-29T00:00:00.000Z");
});


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
    const received = calculateLineItems("2020-03-28T00:00:00.000Z","2020-05-27T10:00:00.000Z",1110,14);
    expect(received.lineitem.length).toBe(expected.lineitem.length);
});



