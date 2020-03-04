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

const signUp = async (user) => {
	const newUser = await userService.createUser(user);

	return newUser;
};

const getToken = (email, password) => {
	return userService.checkUser(email, password)
		.then(async (user) => {
			const userData = {
				email: user.email,
				_id: user._id
			};

			const accessToken = await generateToken(userData);

			return {
				_id: user._id,
				creationDate: user.creationDate,
				lastUpdate: user.lastUpdate,
				lastLogin: user.lastLogin,
				accessToken
			};
		})
		.catch((error) => {
			throw error;
		});
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
	verifyToken,
	signUp
};