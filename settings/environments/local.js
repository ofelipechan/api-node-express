module.exports = {
	db: {
		connectionString: 'mongodb://localhost:27017/local'
	},
	security: {
		jwtSecretkey: '2038D3129381234197744',
		jwtTokenExpire: 1800,
		apiClientId: 'my_node_api',
		appClientSecret: 'my@node_api',
	},
	environmentName: 'local'
};