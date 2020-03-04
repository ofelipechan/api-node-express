const auth = require('./../services/authService');

const validateHeadersPrivate = async (req, res, next) => {
	const bearerHeader = req.headers['authorization'];

	if (!bearerHeader) {
		res.status(401).send({
			error: true,
			message: 'Token não fornecido.'
		});
		return;
	}

	const token = getTokenFromHeader(bearerHeader);

	try {
		const authData = await auth.verifyToken(token);
		req.user = authData.user;
		next();
	} catch (error) {
		res.status(401).send({
			message: error
		});
	}
};

const getTokenFromHeader = (bearerHeader) => {
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	return bearerToken;
};

module.exports = {
	validateHeadersPrivate
};