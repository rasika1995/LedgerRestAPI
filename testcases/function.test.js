const { responceArray, calculateMonthLineItems, addMonths, calculateLineItems, addDates, numOfDateBetweenTwoDates} = require("../public/javascripts/function");
var {ledgerResponceData, ledgerlineItem, ledgerRequestData} = require("../models/ledger");


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



/**
 * Unit Test case for function calculateLineItems
 */
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
var expected = new ledgerResponceData(res);

test('start date is 2020-03-28, end date is 2020-05-27, weekly rent is $555 and frequency is FORTNIGHTLY then resultant itemsArray of length is 5', () => {
    const result = calculateLineItems("2020-03-28T00:00:00.000Z","2020-05-27T10:00:00.000Z",1110,13);
    var received = new ledgerResponceData([]);
    result.lineitem.map(
        (res)=>{
            const lineItem = {
                start_date: res.start_date,
                end_date: res.end_date,
                total_amount: res.total_amount,
            };
            received.lineitem.push(lineItem);
        }
    )
    expect(received.lineitem).toEqual(expected.lineitem);
});



/**
 * Unit Test case for function calculateMonthLineItems
 */
const resMonthly = {
    "lineitem": [
        {
            "start_date": "2020-03-28T00:00:00.000Z",
            "end_date": "2020-04-28T00:00:00.000Z",
            "total_amount": 2411.61,
        },
        {
            "start_date": "2020-04-28T00:00:00.000Z",
            "end_date": "2020-05-27T00:00:00.000Z",
            "total_amount": 2299.29,
        }
    ],
}
var expectedMonthly = new ledgerResponceData(resMonthly);


test('start date is 2020-03-28, end date is 2020-05-27, monthly rent is 2411.61 and weekly rent is $555 and frequency is MONTHLY then resultant itemsArray of length is 2', () => {
    const resultMonthly = calculateMonthLineItems("2020-03-28T00:00:00.000Z","2020-05-27T00:00:00.000Z",2411.61, 555);
    var receivedMonthly = new ledgerResponceData([]);
    resultMonthly.lineitem.map(
        (res)=>{
            const lineItem = {
                start_date: res.start_date,
                end_date: res.end_date,
                total_amount: res.total_amount,
            };
            receivedMonthly.lineitem.push(lineItem);
        }
    )
    expect(receivedMonthly.lineitem).toEqual(expectedMonthly.lineitem);
});



/**
 * Unit Test case for function responceArray
 */
const ledger = {
    "start_date":"2020-03-28T00:00:00.000Z",
    "end_date":"2020-05-27T00:00:00.000Z",
    "frequency":"FORTNIGHTLY",
    "weakly_rent":555,
    "timezone":"LK"
}

var reqData = new ledgerRequestData(ledger);

const resLedger = {
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
            "end_date": "2020-05-27T00:00:00.000Z",
            "total_amount": 396.43,
        }
    ],
}

var resData = new ledgerResponceData(resLedger);

test('start date is 2020-03-28, end date is 2020-05-27, weekly rent is $555 and frequency is FORTNIGHTLY then resultant itemsArray of length is 5', () => {
    const resultArray = responceArray(reqData);
    var receivedArray = new ledgerResponceData([]);
    resultArray.lineitem.map(
        (res)=>{
            const lineItem = {
                start_date: res.start_date,
                end_date: res.end_date,
                total_amount: res.total_amount,
            };
            receivedArray.lineitem.push(lineItem);
        }
    )
    expect(receivedArray.lineitem).toEqual(resData.lineitem);
});






