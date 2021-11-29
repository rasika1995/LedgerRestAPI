var { ledgerResponceData, ledgerlineItem  } = require("../../models/ledger");

/**
 * return the reponce according to the ledger request
 * 
 * @param {ledgerRequestData} ledger 
 * @returns {ledgerResponceData} 
 */

function responceArray(ledger){
    var objectArray;
    if(ledger.frequency == 'WEEKLY'){
        objectArray =  calculateLineItems(ledger.start_date, ledger.end_date, ledger.weakly_rent, 6);
    } 
    else if(ledger.frequency == 'FORTNIGHTLY'){
        objectArray =  calculateLineItems(ledger.start_date, ledger.end_date, ledger.weakly_rent*2, 13);
    } 
    else if(ledger.frequency == 'MONTHLY'){
        var rent = ((ledger.weakly_rent / 7) * 365) / 12;
        rent = Math.round((rent + Number.EPSILON) * 100) / 100;
        objectArray = calculateMonthLineItems(ledger.start_date, ledger.end_date, rent, ledger.weakly_rent);
    }

    return objectArray;
}

/**
 * return the responce items where frequency = MONTHLY
 * 
 * @param {ISOString} s_date start date
 * @param {ISOString} e_date end date
 * @param {number} m_rent monthly rent
 * @param {number} w_rent weekly rent
 * @returns {ledgerResponceData} 
 */

function calculateMonthLineItems(s_date, e_date, m_rent, w_rent){
    var ledgerResponce = new ledgerResponceData([]);
    var flag = true;
    var months = 0;
   
    while(flag) {

        var str_d = addMonths(new Date(s_date), months);
        var end_d = addMonths(new Date(s_date), months+1);
        if (e_date < end_d){
            flag = false;
            var numOfDays = numOfDateBetweenTwoDates(str_d, e_date);
            var rent = (w_rent / 7)* numOfDays;
            rent = Math.round((rent + Number.EPSILON) * 100) / 100;
            const lineItem = new ledgerlineItem({
                start_date: str_d,
                end_date: e_date,
                total_amount: rent,
            })
            ledgerResponce.lineitem.push(lineItem);
        }
        else{
            const lineItem = new ledgerlineItem({
                start_date: str_d,
                end_date: end_d,
                total_amount: m_rent,
            })
            ledgerResponce.lineitem.push(lineItem);
        }
        months++;
    }

    return ledgerResponce;
}

/**
 * return the next date of the next month
 * 
 * @param {Date} date start date
 * @param {number} months number of month from start date
 * @returns {ISOString} date of next month
 */

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date.toISOString();
}


/**
 * return the responce items where frequency = WEEKLY or frequency = FORTNIGHTLY
 * 
 * @param {ISOString} s_date start date
 * @param {ISOString} e_date end date
 * @param {number} w_rent  weekly or two-weekly rent
 * @param {number} gap gap between two dates
 * @returns {ledgerResponceData}
 */

function calculateLineItems(s_date, e_date, w_rent, gap){
    var ledgerResponce = new ledgerResponceData([]);
   
    var flag = true;
    var end_d = addDates(new Date(s_date), gap);
   
    while(flag) {
        if (e_date < end_d){
            flag = false;
            var numOfDays = numOfDateBetweenTwoDates(s_date, e_date)+1;
            var rent = (w_rent / (gap+1))* numOfDays;
            rent = Math.round((rent + Number.EPSILON) * 100) / 100;
            const lineItem = new ledgerlineItem({
                start_date: s_date,
                end_date: e_date,
                total_amount: rent,
            })
            ledgerResponce.lineitem.push(lineItem);
        }
        else{
            const lineItem = new ledgerlineItem({
                start_date: s_date,
                end_date: end_d,
                total_amount: w_rent,
            })
            ledgerResponce.lineitem.push(lineItem);
        }
        s_date = addDates(new Date(end_d), 1);
        end_d = addDates(new Date(s_date), gap);
        
    }
    return ledgerResponce;
}

/**
 * 
 * @param {Date} date current date
 * @param {number} dates number of dates from current date
 * @returns {ISOString} date after week or after two-weeks
 */
function addDates(date, dates) {
    date.setDate(date.getDate() + +dates);
    return date.toISOString();
}


/**
 * return the number of days between two Dates
 * 
 * @param {ISOString} start_date 1st date 
 * @param {ISOString} end_date 2nd date
 * @returns {number} number of days between 1st date and 2nd date
 */

 function numOfDateBetweenTwoDates(start_date, end_date){
    // One day Time in ms (milliseconds)
    var one_day = 1000 * 60 * 60 * 24;
    s_date = new Date(start_date);
    e_date = new Date(end_date);
    var days = Math.round( (e_date.getTime() - s_date.getTime()) / (one_day));
    return days
}


module.exports = { responceArray, calculateMonthLineItems, addMonths, calculateLineItems, addDates, numOfDateBetweenTwoDates };