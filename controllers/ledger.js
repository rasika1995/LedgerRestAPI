var { ledgerRequestData } = require("../models/ledger");
const { responceArray } = require("../public/javascripts/function");
const errorFunction = require("../utils/errorFunction");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

exports.add = (req, res) => {

    try{
        const ledger = new ledgerRequestData({
            start_date:req.body.start_date,
            end_date:req.body.end_date,
            frequency:req.body.frequency,
            weakly_rent:req.body.weakly_rent,
            timezone:req.body.timezone,
        });

        if(ledger){
            res.status(201);
            return res.json(errorFunction(false, "Ledger Created", responceArray(ledger)))
        }else{
            return res.json(errorFunction(true, "Error Creating Ledger"));
            
        }

    } catch(err){
        res.status(400);
        return res.json(errorFunction(true, "Error Adding Ledger"));
    }
};

