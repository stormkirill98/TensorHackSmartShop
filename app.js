const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000

const app = express();
app.use(cors());

app.all('/', (req, res) => {
    res.end('Hello World')
});

app.listen(PORT);
