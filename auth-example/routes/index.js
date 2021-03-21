var express = require('express');
var router = express.Router();
const ensureAuthenticated  = require("../config/auth").ensureAuthenticated;
/* GET home page. */
router.get('/dashboard', ensureAuthenticated,function(req, res, next) {
  res.render('index', { user: req.user.email });
});

module.exports = router;
