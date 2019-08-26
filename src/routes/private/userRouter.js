const express = require('express');
const router = express.Router();
const userService = require('../../services/userService');


router.get('/:_id', async (req, res) => {
	try {
		let id = req.params._id;
		let user = await userService.getUserById(id);
		delete user.senha;
		res.json(user);
	} catch (error) {
		res.status(400).send({
			'mensagem': error.message ? error.message : error
		});
	}
});


module.exports = router;