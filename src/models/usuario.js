const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
	'firstName': {
		type: String,
		require: true
	},
	'lastName': {
		type: String,
		require: true
	},
	'email': {
		type: String,
		default: '',
		lowercase: true
	},
	'password': {
		type: String,
		default: 'admin'
	},
	'phones': [
		{
			'_id': false,
			'number': {
				type: String
			},
			'ddd': { 
				type: String
			}
		}
	],
	'creationDate': {
		type: Date,
		default: Date.now
	},
	'lastUpdate': {
		type: Date,
		default: null
	},
	'lastLogin': {
		type: Date,
		default: Date.now
	},
	'accessToken': {
		type: String,
		default: ''
	}
});
module.exports = mongoose.model('usuario', usuarioSchema);