var { ledgerResponceData, ledgerlineItem  } = require("../../models/ledger");


// API responce array

function responceArray(ledger){

    
    //console.log(numOfDays);
    //const [s_year, s_month, s_dt] = convertDateStringIntoDate(ledger.start_date);
    //const [e_year, e_month, e_dt] = convertDateStringIntoDate(ledger.end_date);

    //var ledgerResponce = new ledgerResponceData([]);
    var objectArray;
    if(ledger.frequency == 'WEEKLY'){
        objectArray =  calculateLineItems(ledger.start_date, ledger.end_date, ledger.weakly_rent, 7);
    } 
    
    else if(ledger.frequency == 'FORTNIGHTLY'){
        objectArray =  calculateLineItems(ledger.start_date, ledger.end_date, ledger.weakly_rent*2, 14);
    } 

    else if(ledger.frequency == 'MONTHLY'){
        var rent = ((ledger.weakly_rent / 7) * 365) / 12;
        rent = Math.round((rent + Number.EPSILON) * 100) / 100;
        objectArray = calculateMonthLineItems(ledger.start_date, ledger.end_date, rent, ledger.weakly_rent, 1);
    }

    return objectArray;

}

// calculate the responce items 

function calculateMonthLineItems(s_date, e_date, m_rent, w_rent, gap){
    var ledgerResponce = new ledgerResponceData([]);
    var numOfDays = numOfDateBetweenTwoDates(s_date, e_date);
    //console.log(numOfDays);
    var values = nextMonth(s_date,0,'undefined');

    var s_date = values[0];
    var date = values[1];
    
    //var dayCounts = values[2];
    //console.log(dayCounts);
    var dayCount = 0;
   
    while(numOfDays > dayCount) {
    
        var values = nextMonth(s_date, gap, date);

        var next_date = values[0];
        var date = values[1];
        console.log("day"+date);
       
        var dayCount = values[2];

        const lineItem = new ledgerlineItem({
            start_date: s_date,
            end_date: next_date,
            total_amount: m_rent,
        })
        ledgerResponce.lineitem.push(lineItem);
       
        numOfDays = numOfDays - dayCount;
        
        var s_date = new Date(next_date);
        var s_date = s_date.toISOString();

    } 

    var values = nextMonth(e_date, 0,'undefined');

    var e_date = values[0];
    
    if(numOfDays != 0){
        var rent = (w_rent / 7)* numOfDays;
        rent = Math.round((rent + Number.EPSILON) * 100) / 100;
        const lineItem = new ledgerlineItem({
            start_date: s_date,
            end_date: e_date,
            total_amount: rent,
        })
        ledgerResponce.lineitem.push(lineItem);
    }
    return ledgerResponce;
}

// calculate the next month date
function nextMonth(present_date, gap, date){
    var today = new Date(present_date);
    
    
    let day;
    let nextdate;
    if(date === 'undefined'){
        day = today.getDate()+1;
        nextdate = new Date(today.getFullYear(), today.getMonth(), day);
    }
    else{
        nextdate = new Date(today.getFullYear(), today.getMonth()+1, date);
        if(nextdate.getMonth() !== today.getMonth()+1){
            nextdate = new Date(today.getFullYear(), nextdate.getMonth(),0);   
        }
        day = date;
    }
    
    var numOfDays = numOfDateBetweenTwoDates(today, nextdate);
    return [nextdate.toISOString(), day, numOfDays];
}

function numOfDateBetweenTwoDates(start_date, end_date){
    
    // One day Time in ms (milliseconds)
    var one_day = 1000 * 60 * 60 * 24;

    s_date = new Date(start_date);
    e_date = new Date(end_date);
    var days = Math.round( (e_date.getTime() - s_date.getTime()) / (one_day));
    console.log(days);
    return days
}






// ############################### for WEEKLY and FORTNIGHTLY

// calculate the responce items 

function calculateLineItems(s_date, e_date, w_rent, gap){
    var ledgerResponce = new ledgerResponceData([]);
    var numOfDays = numOfDaysFromStartDateToEndDate(s_date, e_date);

    //var s_date =  nextDate(s_date,1);
    //var e_date =  nextDate(e_date,1);

    var s_date =  nextDate(s_date,0);
    var e_date =  nextDate(e_date,0);

    
    while(numOfDays > gap){
        
        //var next_date = nextDate(s_date, gap-1);
        var next_date = nextDate(s_date, gap-1);

        const lineItem = new ledgerlineItem({
            start_date: s_date,
            end_date: next_date,
            total_amount: w_rent,
        })
        ledgerResponce.lineitem.push(lineItem);
        numOfDays = numOfDays - gap;

        var day = new Date(next_date);
        var s_date = nextDate(day,1);
    }
    
    if(numOfDays != 0){
        var rent = w_rent / gap * numOfDays;
        rent = Math.round((rent + Number.EPSILON) * 100) / 100;
        const lineItem = new ledgerlineItem({
            start_date: s_date,
            end_date: e_date,
            total_amount: rent,
        })
        ledgerResponce.lineitem.push(lineItem);
    }
    //console.log(ledgerResponce);
    return ledgerResponce;
}


// calculate the next date according to the gap between two dates
function nextDate(present_date, gap){
    var today = new Date(present_date);
    //var nextdate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+gap);
    today.setDate(today.getDate()+gap);
    return today.toISOString();
}


// calculate the number of days from one date to another date

function numOfDaysFromStartDateToEndDate(start_date, end_date){
    
    // One day Time in ms (milliseconds)
    var one_day = 1000 * 60 * 60 * 24;

    s_date = new Date(start_date);
    e_date = new Date(end_date);
    var days = Math.round( (e_date.getTime() - s_date.getTime()) / (one_day)) + 1;
    return days
}


module.exports = { responceArray, calculateLineItems, nextDate, numOfDaysFromStartDateToEndDate };