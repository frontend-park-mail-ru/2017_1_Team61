
'use strict';

const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + '/static'));

app.listen(port, function () {
    console.log('Listen port: ' + port + ' !');
});
