const express = require('express'); 
const router = express.Router(); 

router.use(express.json());

const db = require('./data/helpers/projectModel.js'); 

module.exports = router; 