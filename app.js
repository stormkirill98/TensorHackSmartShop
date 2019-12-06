const routes = require('./lib/routes');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { Client } = require('pg');
const client = new Client({
    connectionString: 'postgres://bqxteefqvvlcpe:baea83ed1a88bff65f4e17bce5cf3c37ef653dcdf6f9438ef71a38d9cc6f4e78@ec2-54-247-92-167.eu-west-1.compute.amazonaws.com:5432/dg3eebencmfq4',
    ssl: true
});

const PORT = process.env.PORT || 5000;
const app = express();

client.connect();
app.use(cors());
app.use(express.static('./'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.all('/', async (req, res) => {
    res.end('Hello World')
});

app.listen(PORT);

routes(app, client);
