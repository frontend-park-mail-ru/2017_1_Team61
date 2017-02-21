'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

const port = process.env.PORT || 3000;

app.listen(3000, function () {
    console.log('Listen port: 3000!');
});