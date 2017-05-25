function setComplexity(has_lowercase, has_uppercase, has_digit, has_symbol){
  var complexities = new Array()
  if (has_lowercase != true &&
      has_uppercase != true &&
      has_digit     != true &&
      has_symbol    != true) {
    has_lowercase = true;
  };

  if (has_lowercase == true) { complexities.push(0) };
  if (has_uppercase == true) { complexities.push(1) };
  if (has_digit      == true) { complexities.push(2) };
  if (has_symbol   == true) { complexities.push(3) };

  return complexities;
};

function isConfusable(character) {
  var confusables = ['1', '9', '0', 'q', 'I', 'o', '0', 'l'];
  if (confusables.indexOf(character) >= 0) {
    return true
  } else {
    return false
  };
};

function getBase(complexities) {
  var element = '';
  var sources = new Array();
  var base = new Array();
  while (complexities.length > 0) {
    if (complexities[0] == 0) { sources = getLowercaseCharacters() };
    if (complexities[0] == 1) { sources = getUppercaseCharacters() };
    if (complexities[0] == 2) { sources = getNumberCharacters() };
    if (complexities[0] == 3) { sources = getSymbolCharacters() };

    element = sources[Math.floor(Math.random() * sources.length)];

    if (isConfusable(element) == true) {
      continue;
    } else {
      base.push(element);
      complexities.splice(0,1);
    };
  };
  return base;
};

function getRestLength(full_length, complexities_length){
  return full_length - complexities_length
};

function setComplexity(has_lowercase, has_uppercase, has_digit, has_symbol){
  var complexities = new Array()
  if (has_lowercase != true &&
      has_uppercase != true &&
      has_digit     != true &&
      has_symbol    != true) {
    has_lowercase = true;
  };

  if (has_lowercase == true) { complexities.push(0) };
  if (has_uppercase == true) { complexities.push(1) };
  if (has_digit     == true) { complexities.push(2) };
  if (has_symbol    == true) { complexities.push(3) };

  return complexities;
};

function getLowercaseCharacters(){
  var lowercase_characters = new Array();
  for (var i=0; i<26; i++){
    lowercase_characters.push(String.fromCharCode('a'.charCodeAt() + i));
  };
  return lowercase_characters;
};

function getUppercaseCharacters(){
  var uppercase_characters = new Array();
  for (var i=0; i<26; i++){
    uppercase_characters.push(String.fromCharCode('A'.charCodeAt() + i));
  };
  return uppercase_characters;
};

function getNumberCharacters(){
  var number_characters = new Array();
  for (var i=0; i<10; i++){
    number_characters.push(String.fromCharCode('0'.charCodeAt() + i));
  };
  return number_characters;
};

function getSymbolCharacters() {
  var symbols = '!@#$%&*?+-'.split('');
  return symbols;
};

function getRestElements(rest_length, complexities){
  var sources = "";
  var rest_elements = new Array();
  while (rest_length > 0) {
    source_method = complexities[Math.floor(Math.random() * complexities.length)];
    if (source_method == 0) { sources = getLowercaseCharacters()};
    if (source_method == 1) { sources = getUppercaseCharacters()};
    if (source_method == 2) { sources = getNumberCharacters()};
    if (source_method == 3) { sources = getSymbolCharacters()};

    var element = sources[Math.floor(Math.random() * sources.length)];

    if (isConfusable(element) == true) {
      continue;
    } else {
      rest_elements.push(element);
    }
    rest_length -= 1;
  };
  return rest_elements;
};

function mergeElements(base, rest) {
  if (rest.length <= 0) { return base };
  var elements = base.concat(rest);
  return elements;
};

function shuffleElements(elements) {
  var random_words = new Array();
  while  (elements.length > 0 ) {
    var i = Math.floor(Math.random() * elements.length);
    random_words.push(elements[i]);
    elements.splice(i, 1);
  };
  return random_words;
};

function shuffleElements(elements) {
  var random_words = new Array();
  while  (elements.length > 0 ) {
    var i = Math.floor(Math.random() * elements.length);
    random_words.push(elements[i]);
    elements.splice(i, 1);
  };
  return random_words;
};

function convertArraytoString(array) {
  var string = array.join("");
  return string;
};

var randomstrings = function (
                      length,
                      has_lowercase,
                      has_uppercase,
                      has_digit,
                      has_symbol) {
  var complexities = setComplexity(has_lowercase, has_uppercase, has_digit, has_symbol);
  var base = getBase(complexities);
  var rest_length = getRestLength(length, base.length);
  var complexities = setComplexity(has_lowercase, has_uppercase, has_digit, has_symbol);
  var rest = getRestElements(rest_length, complexities);
  var elements = mergeElements(base, rest);
  elements = shuffleElements(elements);
  var randomstring = convertArraytoString(elements);

  return randomstring;
};

module.exports = randomstrings;
