var express = require('express');
var router = express.Router();

var usersApi = require('./api/users');
var EXAMEN_Api = require('./api/0805199400141');

router.use('/users', usersApi);
router.use('/0805199400141', EXAMEN_Api);

module.exports = router;