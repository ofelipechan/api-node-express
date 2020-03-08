'use strict';

const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = require('bluebird');

const connect = async () => {
	try {
		const connection = await mongoose.connect(config.db.connectionString, {
			dbName: 'local',
			useNewUrlParser: true
		});
		console.warn(`Connected to database ${config.db.name}`);
		return connection;
	} catch (error) {
		console.error('Error on mongodb connection');
		throw error;
	}
};

module.exports = {
	connect
};