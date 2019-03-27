/* eslint-disable linebreak-style */
/* eslint-disable indent */
module.exports = {
    db: {
        username: "",
        password: "",
        server: "localhost",
        name: "<%= nodeapidatabase %>",
        port: "27017",
        database: "nodeapidatabase",
        ssl: false,
        sslVerifyCertificate: false,
        replicaSet: "",
        authSource: "nodeapidatabase",
        retryWrites: true
    },
    security: {
        jwt_secretkey: "2038D3129381234197744",
        jwt_token_expire: 1800,
        apiClientId: "my_node_api",
        appClientSecret: "my@node_api",
    },
    environmentName: "local"
};