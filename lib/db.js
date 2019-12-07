const {Client} = require('pg');

module.exports = {
    getClient: () => new Client({
            connectionString: 'postgres://bqxteefqvvlcpe:baea83ed1a88bff65f4e17bce5cf3c37ef653dcdf6f9438ef71a38d9cc6f4e78@ec2-54-247-92-167.eu-west-1.compute.amazonaws.com:5432/dg3eebencmfq4',
            ssl: true
        })
};