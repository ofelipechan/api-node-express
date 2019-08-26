const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

function checkRequiredFields(user) {
	if (!user.name)
		throw 'Campo NOME não preenchido';
	if (!user.email)
		throw 'Campo EMAIL não preenchido';
	if (!user.password)
		throw 'Campo password não preenchido';
	if (!user.phones || user.phones.length == 0)
		throw 'Campo TELEFONES não preenchido';

	return true;
}

function validatePassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

function generateHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const createUser = async (user) => {
	if (checkRequiredFields(user)) {
		const exists = await userRepository.findOne({
			email: user.email
		});

		if(exists)
			throw 'E-mail já existente';

		user.password = generateHash(user.password);

		const newUser = await userRepository.create(user);

		return {
			_id: newUser._id,
			creationDate: newUser.creationDate,
			lastUpdate: newUser.lastUpdate,
			lastLogin: newUser.lastLogin
		};
	}
};

const updateUserToken = async (userId, newToken) => {
	let user = await getUserById(userId);

	user.accessToken = newToken;
	user.lastLogin = new Date();

	await userRepository.updateOne(user);
};

const getUserById = async (id) => {
	if (!id || id.length < 5)
		throw 'id não fornecido';

	const user = await userRepository.findById(id);

	return user;
};

const checkUser = async (email, password) => {
	const user = await userRepository.findOne({
		email: email.toLowerCase()
	});
	if (!user) {
		throw 'Usuário e/ou password inválidos';
	} else {
		if (!validatePassword(password, user.password))
			throw 'Usuário e/ou password inválidos';
		else {
			delete user.password;
			return user;
		}
	}
};



module.exports = {
	checkUser,
	createUser,
	getUserById,
	updateUserToken
};