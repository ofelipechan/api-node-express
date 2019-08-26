'use strict';

const jwt = require('jsonwebtoken');
const security = require('../../settings/config').security;
const userService = require('./userService');

async function generateToken(user) {
	let token = jwt.sign({
		user
	}, security.jwt_secretkey, {
		expiresIn: security.jwt_token_expire
	});

	await userService.updateUserToken(user._id, token);

	return token;
}

const signUp = async (user) => {
	let newUser = await userService.createUser(user);

	newUser.token = await generateToken(newUser);

	return newUser;

};

const getToken = (email, password) => {
	return userService.checkUser(email, password)
		.then(async (user) => {
			let userData = {
				email: user.email,
				_id: user._id
			};

			var token = await generateToken(userData);

			return {
				_id: user._id,
				data_criacao: user.data_criacao,
				data_atualizacao: user.data_atualizacao,
				ultimo_login: user.ultimo_login,
				token
			};
		})
		.catch((error) => {
			throw error;
		});
};

const verifyToken = async (token) => {
	return await new Promise(async (resolve, reject) => {
		try {
			let authData = jwt.verify(token, security.jwt_secretkey);
			let user = await userService.getUserById(authData.user._id);
			if (user.token != token)
				return reject('Unauthorized');
			else
				return resolve(authData);
		} catch (error) {
			reject('Unauthorized');
		}
	});
};

module.exports = {
	getToken,
	verifyToken,
	signUp
};