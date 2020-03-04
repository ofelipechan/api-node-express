const express = require('express');
const router = express.Router();
const authService = require('../../services/authService');
const userService = require('../../services/userService');

router.post('/signup', async (req, res) => {
	try {
		const response = await userService.createUser(req.body);
		res.json(response);
	} catch (error) {
		res.status(400).send({
			mensagem: error.message ? error.message : error
		});
	}
});

router.post('/signin', async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const response = await authService.getToken(email, password);
		res.json(response);
	} catch (error) {
		res.status(401).send({
			mensagem: error.message ? error.message : error
		});
	}
});


module.exports = router;