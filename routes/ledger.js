var express = require('express');
var router = express.Router();

var ledger_controller = require('../controllers/ledger');

/* GET home page. */

router.post('/', ledger_controller.add);

module.exports = router;