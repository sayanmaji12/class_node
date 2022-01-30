const dao = require('../dao/user_dao');
const common = require('../services/commonService');
const express = require('express');
const router = express.Router();
var md5 = require('js-md5');
module.exports = router;


router.post('/login', async (req, res) => {
	try{
		if (req.body.username === undefined || req.body.password === undefined) {
			res.send(common.sendResponse(false, 0, 'username, password missing', null, 401))
		} else {
			req.body.password = md5(req.body.password)
			const result = await dao.login(req.body);
			if (result.error) {
				res.send(common.sendResponse(false, 0, 'Some error occurred', null, 500));
			} else {
				let message = 'User found.'
				if (result.length==0) {
					message = 'Wrong email or password'
					res.send(common.sendResponse(false, 1, message, null, 0));
				}else{
					res.send(common.sendResponse(true, 1, message, result[0], 0));
				}
				
			}
		}
	} catch(e) {
        console.log(e)
        res.send(common.sendResponse(false, 0, 'Something went wrong. Please try again.', null, 1002));
	}
});