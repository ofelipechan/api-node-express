const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/index');
const userRouter = require('./userRouter');

// router.use(middleware.validateHeadersPrivate);

router.get('/', (req, res) => {
	res.json({
		error: false,
		message: 'Routes working'
	});
});

router.use('/user', middleware.validateHeadersPrivate, userRouter);

module.exports = router;