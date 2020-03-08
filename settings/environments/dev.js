module.exports = {
    db: {
        name: 'dev',
        connectionString: 'mongodb://mongo:27017/docker-node-mongo'
    },
    security: {
        jwtSecretkey: '2038D3129381234197744',
        jwtTokenExpire: 1800,
        apiClientId: 'my_node_api',
        appClientSecret: 'my@node_api',
    },
    environmentName: 'dev'
};