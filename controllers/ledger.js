var { ledgerRequestData } = require("../models/ledger");
const { responceArray } = require("../public/javascripts/function");


exports.add = (req, res) => {

    // Create a Ledger using request data
   
   
        const ledger = new ledgerRequestData({
            start_date:req.body.start_date,
            end_date:req.body.end_date,
            frequency:req.body.frequency,
            weakly_rent:req.body.weakly_rent,
            timezone:req.body.timezone,
        })
        
        
        const resArray = responceArray(ledger);
        res.json(resArray);   

    
       
};

/**
 * exports.add = (req, res) => {

    // Create a Ledger using request data
   
        const ledger = new ledgerRequestData({
            start_date:req.body.start_date,
            end_date:req.body.end_date,
            frequency:req.body.frequency,
            weakly_rent:req.body.weakly_rent,
            timezone:req.body.timezone,
        })
         
        const resArray = responceArray(ledger);
        res.json(resArray);

    
        
    
       
};
 */

