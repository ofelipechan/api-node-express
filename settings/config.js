"use strict";

const environment = process.env.NODE_ENV || "local"; // local, dev

console.log("Enviroment running:", environment);

let config = require(`./environments/${environment}`);

module.exports = config;