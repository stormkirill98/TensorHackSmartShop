const routes = require('./lib/routes');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(PORT);

routes(app);

app.use(express.static(path.join(__dirname, 'webclient/build')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'webclient/build', 'index.html'));
});
