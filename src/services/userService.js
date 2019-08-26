const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');

function checkRequiredFields(user) {
	if (!user.nome)
		throw 'Campo NOME não preenchido';
	if (!user.email)
		throw 'Campo EMAIL não preenchido';
	if (!user.senha)
		throw 'Campo SENHA não preenchido';
	if (!user.telefones || user.telefones.length == 0)
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
		let exists = await userRepository.findOne({
			email: user.email
		});

		if(exists)
			throw 'E-mail já existente';

		user.senha = generateHash(user.senha);

		let newUser = await userRepository.create(user);

		return {
			_id: newUser._id,
			data_criacao: newUser.data_criacao,
			data_atualizacao: newUser.data_atualizacao,
			ultimo_login: newUser.ultimo_login
		};
	}
};

const updateUserToken = async (userId, token) => {
	let user = await getUserById(userId);

	user.token = token;
	user.ultimo_login = new Date();

	await userRepository.updateOne(user);

};

const getUserById = async (id) => {
	let user = null;

	if (!id || id.length < 5)
		throw 'id não fornecido';

	user = await userRepository.findById(id);

	return user;
};

const checkUser = async (email, password) => {
	let user = await userRepository.findOne({
		email: email.toLowerCase()
	});
	if (!user) {
		throw 'Usuário e/ou senha inválidos';
	} else {
		if (!validatePassword(password, user.senha))
			throw 'Usuário e/ou senha inválidos';
		else {
			delete user.senha;
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