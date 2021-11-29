const Joi = require('joi');
const errorFunction = require("../utils/errorFunction");

/**
 * Validate ledgerSchema using joi 
 */
const ledgerSchemaValidation = Joi.object({
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    frequency: Joi.string().valid('WEEKLY', 'FORTNIGHTLY', 'MONTHLY').uppercase().required(),
    weakly_rent:Joi.number().required(),
    timezone:Joi.string().required(),
});

const ledgerValidation = async (req, res, next) => {
	const payload = {
		start_date:req.body.start_date,
        end_date:req.body.end_date,
        frequency:req.body.frequency,
        weakly_rent:req.body.weakly_rent,
        timezone:req.body.timezone,
	};

	const { error } = ledgerSchemaValidation.validate(payload);
	
    if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in Ledger Data : ${error.message}`)
		);
	} else {
		next();
	}
};

const lineItemSchemaValidation = Joi.object({
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    total_amount: Joi.number().required(),
});

var responceSchemaValidation = Joi.object({
    lineitem: Joi.array().default([]),
});


module.exports = ledgerValidation;