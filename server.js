
'use strict';

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/static'));

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listen port: 3000!');
});
