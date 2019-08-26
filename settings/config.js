'use strict';

const environment = process.env.NODE_ENV || 'dev'; // local, dev

console.log('Enviroment running:', environment);

let env = require(`./environments/${environment}`);

module.exports = env;