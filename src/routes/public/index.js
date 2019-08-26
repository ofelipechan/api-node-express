const express = require('express');
const router = express.Router();
const signUp = require('./authRouter');

router.get('/', (req, res) => {
	res.json({
		'error': false,
		'message': 'Routes working'
	});
});

router.use('/auth', signUp);

module.exports = router;