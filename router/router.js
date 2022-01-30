const express = require('express');
const router = express.Router();

const user = require('../controller/user_controller')

router.use('/', user );

module.exports = router;