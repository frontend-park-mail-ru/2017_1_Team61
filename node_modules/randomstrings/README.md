# randomstrings

A module for generating random strings

## Install

```npm install randomstrings```

## Example

```
var RS = require('./randomstrings');

var lowercase = true;
var uppercase = true;
var digit = true;
var symbol = true;
var length = 20;

var randomstring = RS(length, lowercase, uppercase, digit, symbol);

console.log(randomstring);
```
