var express = require('express');
var router = express.Router();

var ledger_controller = require('../controllers/ledger');
const ledgerValidation = require('../models/ledger.validation');


/**
 * POST request for ledger
 */
router.post('/', ledgerValidation, ledger_controller.add);

module.exports = router;