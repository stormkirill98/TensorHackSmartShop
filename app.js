const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

app.all('/', (req, res) => {
    res.end('Hello World')
});

app.listen(PORT);
