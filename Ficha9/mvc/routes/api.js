var express = require('express');
var router = express.Router();

var person_controller = require('../controllers/personController');

router.get('/person/:id' , person_controller.person_detail);

//router.get('/person' , author_controller.author_list) ;

module.exports = router;
