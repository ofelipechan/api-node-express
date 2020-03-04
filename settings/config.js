'use strict';

const environment = process.env.NODE_ENV || 'local'; // local, dev

console.warn('Enviroment running:', environment);

const env = require(`./environments/${environment}`);

module.exports = env;