module.exports = {
	db: {
		connectionString: 'mongodb://localhost:27017/paceats'
	},
	security: {
		jwt_secretkey: '2038D3129381234197744',
		jwt_token_expire: 1800,
		apiClientId: 'my_node_api',
		appClientSecret: 'my@node_api',
	},
	environmentName: 'local'
};