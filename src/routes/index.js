var router = require('express').Router();
const IndexController = require("../controllers/index.controller")
const {validateMail}=require('../utils/common.validate');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', IndexController.test);
router.post('/test', validateMail, IndexController.testPostMethod);  // Using raw body type JSON of postman to test

module.exports = router;
