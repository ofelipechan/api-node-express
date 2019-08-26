'use strict';

const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = require('bluebird');

const connect = async () => {
	try {
		await mongoose.connect(config.db.connectionString, {
			dbName: 'paceats',
			useNewUrlParser: true
		});
		console.log('Connected to database');
	} catch (error) {
		console.error('Error on mongodb connection');
		console.error(error);
	}
};

module.exports = {
	connect
};