'use strict';

const jwt = require('jsonwebtoken');
const security = require('../../settings/config').security;
const userService = require('./userService');

async function generateToken(user) {
	const newToken = jwt.sign({
		user
	}, security.jwtSecretkey, {
		expiresIn: security.jwtTokenExpire
	});

	await userService.updateUserToken(user._id, newToken);

	return newToken;
}

const getToken = async (email, password) => {
	try {
		const user = await userService.checkUser(email, password);
		const userData = {
			email: user.email,
			_id: user._id
		};

		const accessToken = await generateToken(userData);

		return {
			_id: user._id,
			lastLogin: user.lastLogin,
			accessToken
		};
	} catch (error) {
		console.error('error while trying to get token');
		throw error;
	}
};

const verifyToken = async (token) => {
	try {
		const authData = jwt.verify(token, security.jwtSecretkey);
		const user = await userService.getUserById(authData.user._id);
		if (!user || user.accessToken !== token)
			throw 'Unauthorized';

		return authData;
	} catch (error) {
		throw 'Unauthorized';
	}
};

module.exports = {
	getToken,
	verifyToken
};