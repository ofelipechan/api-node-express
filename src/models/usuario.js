const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
	"nome": {
		type: String,
		require: true
	},
	"email": {
		type: String,
		default: "",
		lowercase: true
	},
	"senha": {
		type: String,
		default: "admin"
	},
	"telefones": [
		{
			"_id": false,
			"numero": {
				type: String
			},
			"ddd": { 
				type: String
			}
		}
	],
	"data_criacao": {
		type: Date,
		default: Date.now
	},
	"data_atualizacao": {
		type: Date,
		default: null
	},
	"ultimo_login": {
		type: Date,
		default: Date.now
	},
	"token": {
		type: String,
		default: ""
	}
});
module.exports = mongoose.model("usuario", usuarioSchema);