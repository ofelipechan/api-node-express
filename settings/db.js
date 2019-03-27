"use strict";

var mongoose = require("mongoose");
var config = require("./config");

mongoose.Promise = require("bluebird");

function connection() {
	var auth = `${config.db.username}:${config.db.password}`;
	var conexao =
    `mongodb://${auth}@${config.db.server}/${config.db.database}?`;

	if(config.db.authSource)
		conexao += `authSource=${config.db.authSource}`;
	if(config.db.retryWrites)
		conexao += `&retryWrites=${config.db.retryWrites}`;
	if (config.db.ssl)
		conexao += `&ssl=${config.db.ssl}`;
	if (config.db.replicaSet)
		conexao += `&replicaSet=${config.db.replicaSet}`;

	return conexao;
}

function localConnection() {
	var conexao = `mongodb://${config.db.server}:${config.db.port}/${config.db.database}`;

	return conexao;
}



module.exports = mongoose.connect(config.environmentName === "local" ? localConnection() : connection(), {
	useMongoClient: true
})
	.then((connection) => {
		console.log(`Connected to database: ${config.db.database}`);
		return connection;
	})
	.catch((err) => console.error(err));