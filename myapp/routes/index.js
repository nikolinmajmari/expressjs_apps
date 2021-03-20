var express = require('express');
var router = express.Router();

var mongoClient = require("../services/mongodb_service");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index.pug', { title: 'Express' });
});

module.exports = router;
