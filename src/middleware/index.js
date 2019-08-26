const auth = require('./../services/authService');

const validateHeadersPrivate = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		const token = bearerToken;

		auth.verifyToken(token).then((authData) => {
			req.user = authData.user;
			next();
		}).catch((error) => {
			res.status(401).send({
				message: error
			});
		});

	} else {
		res.status(401).send({
			error: true,
			message: 'Token não fornecido.'
		});
	}
};

module.exports = {
	validateHeadersPrivate
};