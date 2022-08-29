const express = require('express');
var router = express.Router();
const emailController=require('../controller/emailConteroller.js')






router.get('/',emailController.gettingHomePage)
router.post('/',emailController.email_validator )


 

module.exports = router;
