const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const Validator = require('validatorjs');

const validate = (body, rules, customMessages) => {
	const validation = new Validator(body, rules, customMessages);
	return {
		errors: validation.errors.errors,
		status: validation.passes()
	};
};

function validateFields(user) {
	const fieldsRules = {
		name: 'required|string|min:3',
		email: 'required|email',
		phones: 'required|array',
		password: 'required|string|min:6|confirmed',
		gender: 'string'
	};

	return validate(user, fieldsRules, {});
}

function validatePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

function generateHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const createUser = async (user) => {
	const fieldsValidation = validateFields(user);
	if (!fieldsValidation.status) {
		throw fieldsValidation;
	}

	const exists = await userRepository.findOne({
		email: user.email
	});

	if (exists)
		throw 'E-mail already exists';

	user.password = generateHash(user.password);

	const newUser = await userRepository.create(user);

	return {
		_id: newUser._id,
		creationDate: newUser.creationDate,
	};
};

const updateUserToken = async (userId, newToken) => {
	const user = await getUserById(userId);

	user.accessToken = newToken;
	user.lastLogin = new Date();

	await userRepository.updateOne(user);
};

const getUserById = async (id) => {
	if (!id || id.length < 5)
		throw 'Invalid id.';

	const user = await userRepository.findById(id);
	if (user) {
		delete user.password;
	}
	return user;
};

const checkUser = async (email, password) => {
	const user = await userRepository.findOne({
		email: email.toLowerCase()
	});
	if (!user) {
		throw 'Invalid e-mail or password';
	}

	if (!validatePassword(password, user.password))
		throw 'Invalid e-mail or password';

	delete user.password;
	return user;
};

module.exports = {
	checkUser,
	createUser,
	getUserById,
	updateUserToken
};