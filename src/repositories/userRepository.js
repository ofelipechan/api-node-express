const User = require('../models/usuario');

const toJSON = (result) => {
	if (result) {
		return result.toJSON();
	} else {
		return null;
	}
};

const findOne = async (conditions) => {
	return await User.findOne(conditions).then(toJSON);
};

const findById = async (id) => {
	return User.findById(id).then(toJSON);
};

const create = async (user) => {
	return await User.create(user).then(toJSON);
};

const updateOne = async (user) => {
	user.lastUpdate = new Date();
	return await User.updateOne({
		_id: user._id
	}, user);
};

module.exports = {
	findOne,
	findById,
	create,
	updateOne
};