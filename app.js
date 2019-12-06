const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.all('/', (req, res) => {
    res.end('Hello World')
});

app.listen(8080);

console.log("Server Running on 8080");
