/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 61);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_userModel__ = __webpack_require__(2);
/**
* Created by tlakatlekutl on 24.03.17.
*/



const userModel = new __WEBPACK_IMPORTED_MODULE_0__models_userModel__["a" /* default */]();

class Router {
  // singleton class Router
  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    // this.root = '/';
    this.routes = [];
    this.history = window.history;
    this.goto404 = () => { console.error('page not found'); };
    Router.instance = this;
  }

  addRoute(re, view) {
    if (typeof view !== 'object') {
      throw new TypeError('handler is not a view');
    }
    this.routes.push({ re, view });
    return this;
  }

  checkPathExists(url) {
    return this.routes.findIndex(route => route.re.test(url));
  }

  navigate(url) {
    const i = this.checkPathExists(url);
    // debugger;
    if (i !== -1) {
      if (this.routes[i].view.isModal) {
        if (!this.currentView) {
          this.routes[0].view.show();
        }
        this.currentView = this.routes[i].view;
      } else {
        if (this.currentView) {
          this.currentView.hide();
        }
        this.currentView = this.routes[i].view;
      }
    } else {
      if (this.currentView) {
        this.currentView.hide();
      }
      this.currentView = this.goto404;
    }
    this.currentView.show();
  }

  go(url) {
    this.history.pushState(null, '', url);
    this.navigate(url);
    this.currentUrl = url;
    return this;
  }

  set404(view) {
    this.goto404 = view;
    return this;
  }

  start() {
    return new Promise((resolve) => {
      userModel.getUserStatus()
        .then(() => {
          setInterval(() => { this.checkUrlChanging(); }, 50);
          resolve();
        });
    })
    ;
  }
  checkUrlChanging() {
    const url = window.location.href;
    if (url !== this.currentUrl) {
      this.navigate(url);
      this.currentUrl = url;
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;




/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(67).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_api_api__ = __webpack_require__(12);
/**
* Created by tlakatlekutl on 07.03.17.
*/



const api = new __WEBPACK_IMPORTED_MODULE_0__modules_api_api__["a" /* default */]();

class UserModel {

  constructor() {
    if (UserModel.instance) {
      return UserModel.instance;
    }
    this.user = { isAuthorised: false };

    UserModel.instance = this;
  }

  isAuthorised() {
    return this.user.isAuthorised;
  }
  getData() {
    return this.user;
  }
  logout() {
    return new Promise((resolve) => {
      api.logout()
        .then(() => {
          this.user.isAuthorised = false;
          resolve();
        });
    });
  }

  getUserStatus() {
    return new Promise((resolve) => {
      api.getUser()
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 403) {
            this.user.isAuthorised = false;
          }
          throw new Error('User not authorized');
        })
        .then((json) => {
          this.user.isAuthorised = true;
          this.user.nickname = json.login;
          this.user.email = json.email;
          this.user.id = json.id;
          this.user.rating = json.rating;
          this.user.newRating = this.user.rating;
          resolve(json);
        })
        .catch((err) => {
          console.log(err);
          resolve();
        });
    });
  }
  login(data) {
    return new Promise((done, error) => {
      api.login(data)
        .then(response => new Promise((resolve, reject) => {
          if (response.status === 200) {
            resolve(response.json());
          } else {
            reject(response.json());
          }
        }))
        .then((json) => {
          this.user.isAuthorised = true;
          this.user.nickname = json.login;
          this.user.email = json.email;
          done(json);
        })
        .catch((json) => {
          console.log(json);
          error(json);
        });
    });
  }
  signup(data) {
    return new Promise((done, error) => {
      api.signup(data)
        .then(response => new Promise((resolve, reject) => {
          if (response.status === 200) {
            resolve(response.json());
          } else {
            reject(response.json());
          }
        }))
        .then((json) => {
          this.user.isAuthorised = true;
          this.user.nickname = json.login;
          this.user.email = json.email;
          done(json);
        })
        .catch((errorPromise) => {
          return errorPromise;
        })
        .then((json)=> {
          // console.log(json);
          error(json);
        });
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UserModel;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router_router__ = __webpack_require__(0);
/**
* Created by tlakatlekutl on 31.03.17.
*/



const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router_router__["a" /* default */]();

class ModalView {
  constructor(headerText, drawFunc, parent = document.querySelector('main')) {
    this.isModal = true;
    this.parent = parent;
    this.drawFunc = drawFunc;
    this.alreadyInDOM = false;
    this.headerText = headerText;
    // this.generateBase();
  }
  generateBase() {
    this.modal = document.createElement('div');
    this.modal.className = 'modal';

    const content = document.createElement('div');
    content.className = 'modal-content';
    this.modal.appendChild(content);

    const header = document.createElement('div');
    header.className = 'modal-header';
    content.appendChild(header);

    this.close = document.createElement('span');
    this.close.className = 'close';
    this.close.innerHTML = '&times;';
    header.appendChild(this.close);

    const title = document.createElement('h2');
    title.className = 'modal-header-title';
    title.innerHTML = this.headerText;
    header.appendChild(title);

    this.bodyModal = document.createElement('div');
    this.bodyModal.className = 'modal-body';
    content.appendChild(this.bodyModal);
  }
  render(data) {
    this.alreadyInDOM = true;
    this.generateBase();
    this.onClose(() => { router.go('/'); });
    this.bodyModal.innerHTML = this.drawFunc(data);
    this.parent.appendChild(this.modal);
    return this;
  }
  destruct() {
    this.alreadyInDOM = false;
    this.parent.removeChild(this.modal);
  }
  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
  show(data) {
    if (!this.alreadyInDOM) {
      this.render(data);
    }
    this.modal.style.display = 'block';
  }
  hide() {
    this.modal.style.display = 'none';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModalView;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35).Buffer))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by tlakatlekutl on 19.04.17.
 */

class EventEmitter {
  constructor() {
    if (EventEmitter.instance) {
      return EventEmitter.instance;
    }
    this.events = [];

    EventEmitter.instance = this;
  }
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener is not a function');
    }
    this.events.push({ event, listener });
  }
  emit(name, payload = null) {
    const handler = this.events.find((x) => { if (x.event === name) { return x; } });
    if (handler) {
      handler.listener(payload);
    } else {
      throw new Error(`Cant emit no event ${name}`);
    }
  }
  off(name) {
    const i = this.events.findIndex((x) => { if (x.event === name) { return x; } });
    if (i !== -1) {
      delete this.events[i];
    } else {
      throw new Error(`Cant delete no event ${name}`);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventEmitter;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(56);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sergey on 15.04.17.
 */
class GameObject {
    constructor(pos) {
        this.X = pos.x;
        this.Y = pos.y;
        this.Z = pos.z;
    }

    setPosition(pos) {
        this.X = pos.x;
        this.Y = pos.y;
        this.Z = pos.z;
    }

    getPosition() {
        return {x: this.X, y: this.Y, z: this.Z };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameObject;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* Created by tlakatlekutl on 27.03.17.
*/

class BaseView {
  constructor(classNames, drawFunc, parent = document.querySelector('main')) {
    const el = document.createElement('div');
    el.hidden = true;
    el.classList.add(...classNames);
    this.drawFunc = drawFunc;
    this.node = el;
    this.parent = parent;
    this.isModal = false;
  }
  render(data) {
    this.setContent(data);
    this.addElemToDOM();
    return this;
  }
  setContent(data) {
    this.node.innerHTML = this.drawFunc(data);
  }
  addElemToDOM() {
    this.parent.appendChild(this.node);
  }
  destruct() {
    this.parent.removeChild(this.node);
  }
  show() {
    this.node.hidden = false;
  }

  hide() {
    this.node.hidden = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseView;




/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"concede-modal\"\u003E\u003Cdiv class=\"concede-modal__text\"\u003EВы собираетесь покинуть игру! Вам будет засчитано поражение!\u003C\u002Fdiv\u003E\u003Cdiv class=\"choose\"\u003E\u003Cdiv class=\"choose__yes\"\u003EДА\u003C\u002Fdiv\u003E\u003Cdiv class=\"choose__no\"\u003EНЕТ\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./concede.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./concede.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_gameTransport_transport__ = __webpack_require__(65);
/**
 * Created by tlakatlekutl on 19.04.17.
 */

// import EventEmitter from '../modules/eventEmitter/eventEmitter';

// const ee = new EventEmitter();

class GameModel {
  constructor() {
    if (GameModel.instance) {
      return GameModel.instance;
    }
    // transport.send() lala
    this.transport = new __WEBPACK_IMPORTED_MODULE_0__modules_gameTransport_transport__["a" /* default */]();
    GameModel.instance = this;
  }

  // handleEvent(message) {
  //	console.log(`Hi from GM ${message}`);
  // 	ee.emit('msg', message);
  // }

  findOpponent() {
    this.transport.send('com.aerohockey.mechanics.requests.JoinGame$Request', '{}');
  }

  sendButton(button, frameTime) {
    this.transport.send('com.aerohockey.mechanics.base.ClientSnap', JSON.stringify({ button, frameTime }));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameModel;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__network_net__ = __webpack_require__(66);
/**
* Created by tlakatlekutl on 07.03.17.
*/



class API {

  constructor(
    baseUrl = 'http://62.109.3.208:8082/api',
    headers = { 'content-type': 'application/json; charset=utf-8' }) {
    if (API.instance) {
      return API.instance;
    }

    this.net = new __WEBPACK_IMPORTED_MODULE_0__network_net__["a" /* default */](baseUrl, headers);

    API.instance = this;
  }

  logout() {
    return this.net.post('/logout', null)
              .catch((error) => {
                console.error(error);
              });
  }

  signup(data) {
    return this.net.post('/signup', data)
              .catch((error) => {
                console.error(error);
              });
  }

  getUser() {
    return this.net.get('/user')
              .catch((error) => {
                console.error(error);
              });
  }

  login(data) {
    return this.net.post('/login', data)
              .catch((error) => {
                console.error(error);
              });
  }

  changePass(data) {
    return this.net.post('/change-password', data)
              .catch((error) => {
                console.error(error);
              });
  }
  getLeaderBoard() {
    return this.net.get('/leaderboard')
              .catch((error) => {
                console.error(error);
              });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = API;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(7);
/**
 * Created by sergey on 15.04.17.
 */


class Ball extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(side, pos, radius) {
        super(pos);
        this.radius = radius;

        this.side = side;
        this.move = false;
        this.vectorMove = { x: 0, y: 0, z: 0 };

        this.Geometry = new THREE.SphereGeometry(this.radius, 20, 20);
        this.Material = new THREE.MeshLambertMaterial({ color: 0xE7DF32 });
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return this.radius;
    }

    getSide() {
        return this.side;
    }

    getMove() {
        return this.move;
    }

    getVectorMove() {
        return this.vectorMove;
    }

    getModel() {
        return this.model;
    }

    setPosition(pos) {
        super.setPosition(pos);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    setMove(state) {
        this.move = state;
    }

    setSide(side) {
        this.side = side;
    }

    setVectorMove(vector) {
        this.vectorMove.x = vector.x;
        this.vectorMove.y = vector.y;
        this.vectorMove.z = vector.z;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(7);
/**
 * Created by sergey on 15.04.17.
 */



class Barrier extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(pos, size, angle) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.angle = angle;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.Material = new THREE.MeshLambertMaterial({color: 0xF2F0BA});
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    getSide() {
        return this.side;
    }

    getAngle() {
        return this.angle;
    }

    getModel() {
        return this.model;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Barrier;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(7);
/**
 * Created by sergey on 15.04.17.
 */



class Ground extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(pos, size) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.Material = new THREE.MeshLambertMaterial({color: 0xF7F6EE});
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);

        this.goalMy = this.depth - 0.5;
        this.goalEnemy = 0.5;
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    getModel() {
        return this.model;
    }

    getGoalMy() {
        return this.goalMy;
    }

    getGoalEnemy() {
        return this.goalEnemy;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ground;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object__ = __webpack_require__(7);
/**
 * Created by sergey on 15.04.17.
 */


class Platform extends __WEBPACK_IMPORTED_MODULE_0__object__["a" /* GameObject */] {
    constructor(side, pos, size) {
        super(pos);
        this.width = size.width;
        this.height = size.height;
        this.depth = size.depth;

        this.side = side;

        this.Geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        if(side === 0) {
            this.Material = new THREE.MeshLambertMaterial({color: 0x1D870D});
        } else {
            this.Material = new THREE.MeshLambertMaterial({color: 0xC70A00});
        }
        this.model = new THREE.Mesh(this.Geometry, this.Material);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    setPosition(pos) {
        super.setPosition(pos);
        this.model.position.set(this.X, this.Y, this.Z);
    }

    getSize() {
        return { width: this.width, height: this.height, depth: this.depth };
    }

    getSide() {
        return this.side;
    }

    getModel() {
        return this.model;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Platform;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategy__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__multi__ = __webpack_require__(63);
/**
 * Created by sergey on 21.04.17.
 */




class Game {
    constructor(state) {
        this.state = state;
        this.play = true;
        if(this.state === 'single') {
            this.games = new __WEBPACK_IMPORTED_MODULE_0__strategy__["a" /* default */]();
        } else {
            this.games = new __WEBPACK_IMPORTED_MODULE_1__multi__["a" /* default */]();
        }
    }

    gameProcess () {
        if(this.state === 'single') {
            if (this.play === true) {
                this.games.animationScene();
            }
        } else {
            if (this.play === true) {
                this.games.animationScene();
            }
        }
    }

    stop() {
      this.games.stop();
    }

    resume() {
      this.games.resume();
      this.gameProcess();
    }

    setStateGame(message) {
      this.games.setStateGame(JSON.parse(message));
    }

    setOpponent(message) {
      this.games.setOpponent(JSON.parse(message));
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sergey on 22.04.17.
 */

class Player {
  constructor(nickname, score, rating) {
    this.nickname = nickname;
    this.score = score;
    this.rating = rating;
  }

  getNickname() {
    return this.nickname;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getRating() {
    return this.rating;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_about_pug__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templates_about_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__templates_about_pug__);
/**
 * Created by tlakatlekutl on 04.04.17.
 */





class AboutModalView extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('About', __WEBPACK_IMPORTED_MODULE_1__templates_about_pug___default.a);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AboutModalView;




/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_concede_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_concede_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_concede_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_concede_pug__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_concede_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_concede_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(5);
/**
 * Created by sergey on 25.04.17.
 */








const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();

class ConcedeModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Выход', __WEBPACK_IMPORTED_MODULE_3__templates_concede_pug___default.a);
  }
  render() {
    super.render();
    document.querySelector('.choose__yes').addEventListener('click', () => {
      ee.emit('destroyGame');
      router.go('/');
    });
    document.querySelector('.choose__no').addEventListener('click', () => {
      router.go('/game');
    });
    this.onClose(() => { router.go('/game'); });
  }

  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConcedeModal;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_concede_css__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_concede_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_concede_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_concede_pug__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_concede_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_concede_pug__);
/**
 * Created by sergey on 25.04.17.
 */







const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class ConcedeMpModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Выход', __WEBPACK_IMPORTED_MODULE_3__templates_concede_pug___default.a);
  }
  render() {
    super.render();
    document.querySelector('.choose__yes').addEventListener('click', () => {
      router.go('/');
    });
    document.querySelector('.choose__no').addEventListener('click', () => {
      router.go('/mp');
    });
    this.onClose(() => { router.go('/mp'); });
  }

  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConcedeMpModal;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_defeat_css__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_defeat_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_defeat_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_defeat_pug__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_defeat_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_defeat_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_userModel__ = __webpack_require__(2);
/**
 * Created by sergey on 01.05.17.
 */









const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_5__models_userModel__["a" /* default */]();

class DefeatModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Завершение игры', __WEBPACK_IMPORTED_MODULE_3__templates_defeat_pug___default.a);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.defeat-modal .change');
    this.changeRating.innerHTML = us.getData().rating - us.getData().newRating;
    this.newRating = document.querySelector('.defeat-modal .rating_score');
    this.newRating.innerHTML = us.getData().newRating;
    // document.querySelector('.choose__yes').addEventListener('click', () => {
    //   ee.emit('destroyGame');
    //   router.go('/');
    // });
    // document.querySelector('.choose__no').addEventListener('click', () => {
    //   router.go('/game');
    // });
    this.onClose(() => {
      ee.emit('destroyGame');
      router.go('/');
    });
  }

  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefeatModal;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__baseView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_gameTemplate_pug__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_gameTemplate_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_gameTemplate_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_eventEmitter_eventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_game_play__ = __webpack_require__(17);
/**
* Created by tlakatlekutl on 04.04.17.
*/








const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router_router__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_3__modules_eventEmitter_eventEmitter__["a" /* default */]();

class GameView extends __WEBPACK_IMPORTED_MODULE_1__baseView__["a" /* default */] {
  constructor() {
    super(['game-window-container'], __WEBPACK_IMPORTED_MODULE_2__templates_gameTemplate_pug___default.a);
    this.alreadyInDOM = false;
  }
  render() {
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      router.go('/concede');
    });
    ee.on('destroyGame', ()=> {
      delete this.game;
      const game = document.querySelector('canvas');
      document.body.removeChild(game);
    });
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    if (this.game) {
      this.game.resume();
    } else {
      this.game = new __WEBPACK_IMPORTED_MODULE_4__modules_game_play__["a" /* default */]('single');
      this.game.gameProcess();
    }
    // const game = document.querySelector('canvas');
    // game.hidden = false;
    this.node.hidden = false;
  }
  hide() {
    if (this.alreadyInDOM) {
      // super.destruct();
      // const game = document.querySelector('canvas');
      // game.hidden = true;
    }
    super.hide();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameView;




/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_api_api__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug__);
/**
* Created by tlakatlekutl on 04.04.17.
*/





const api = new __WEBPACK_IMPORTED_MODULE_0__modules_api_api__["a" /* default */]();

class LeaderBoardModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Leaderboard', __WEBPACK_IMPORTED_MODULE_2__templates_leaderboard_pug___default.a);
  }
  render() {
    api.getLeaderBoard()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('error getting leaderboard');
      })
      .then((json) => {
        console.log(json);
        super.render({ data: json.users });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LeaderBoardModal;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_login_pug__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_login_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_login_pug__);
/**
* Created by tlakatlekutl on 02.04.17.
*/






const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class LoginModal extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('Login', __WEBPACK_IMPORTED_MODULE_3__templates_login_pug___default.a);
  }
  render() {
    super.render();
    this.errorField = document.querySelector('.danger');
    document.querySelector('.login-submit-button').addEventListener('click', (event) => {
      if (this.isValid()) {
        event.preventDefault();
        userModel.login(this.getFormData())
          .then(() => {
            router.go('/');
            this.destruct();
          })
          .catch(() => { this.showError(); });
      }
    });
  }
  show() {
    if (!userModel.isAuthorised()) {
      super.show();
      this.hideError();
    } else {
      router.go('/');
    }
  }
  showError() {
    this.errorField.style.display = 'block';
  }
  hideError() {
    this.errorField.style.display = 'none';
  }
  isValid() {
    this.nickname = document.querySelector('.login-nickname-input').value;
    this.password = document.querySelector('.login-password-input').value;
    if (this.nickname === '') {
      return false;
    }
    if (this.password === '') {
      return false;
    }
    return true;
  }
  getFormData() {
    return {
      login: this.nickname,
      password: this.password,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LoginModal;




/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug__);
/**
* Created by tlakatlekutl on 27.03.17.
*/






const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();
const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();

class MainView extends __WEBPACK_IMPORTED_MODULE_0__baseView__["a" /* default */] {
  constructor() {
    super(['main-vindow-container'], __WEBPACK_IMPORTED_MODULE_3__templates_mainWindow_pug___default.a);
  }
  render() {
    this.data = {
      authorised: userModel.isAuthorised(),
      nickname: userModel.getData().nickname,
    };
    super.render({ user: this.data });
    this.addListeners();
  }
  show() {
    if (this.data.authorised !== userModel.isAuthorised()) {
      this.data = {
        authorised: userModel.isAuthorised(),
        nickname: userModel.getData().nickname,
      };
      this.setContent({ user: this.data });
      this.addListeners();
    }
    super.show();
  }
  addListeners() {
    document.querySelector('.btn-left').addEventListener('click', () => { router.go('/game'); });
    document.querySelector('.btn-right').addEventListener('click', () => { router.go('/mp'); });
    document.querySelector('.leaderboard-button').addEventListener('click', () => { router.go('/leaderboard'); });
    document.querySelector('.footer-help-link').addEventListener('click', () => { router.go('/about'); });

    if (this.data.authorised) {
      document.querySelector('.profile-link').addEventListener('click', () => {
        router.go('/profile');
      });
      document.querySelector('.logout-link').addEventListener('click', () => {
        userModel.logout()
          .then(() => {
            // debugger;
            this.show();
          });
      });
    } else {
      document.querySelector('.login-link').addEventListener('click', () => {
        router.go('/login');
      });
      document.querySelector('.signup-link').addEventListener('click', () => {
        router.go('/signup');
      });
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainView;




/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__baseView__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_mp_pug__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templates_mp_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__templates_mp_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_gameModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_game_play__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_userModel__ = __webpack_require__(2);
/**
 * Created by tlakatlekutl on 27.03.17.
 */









const gm = new __WEBPACK_IMPORTED_MODULE_3__models_gameModel__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router_router__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_6__models_userModel__["a" /* default */]();

class MpGameView extends __WEBPACK_IMPORTED_MODULE_1__baseView__["a" /* default */] {
  constructor() {
    super(['multiplayer-game-view'], __WEBPACK_IMPORTED_MODULE_2__templates_mp_pug___default.a);
    // this.render();
    ee.on('com.aerohockey.mechanics.base.ServerSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.game.setStateGame(message.content);
    });
    ee.on('com.aerohockey.mechanics.requests.StartGame$Request', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.game.setOpponent(message.content);
    });
    ee.on('com.aerohockey.mechanics.base.GameOverSnap', (message) => {
      this.x.innerHTML = JSON.stringify(message.content);
      this.state = JSON.parse(message.content);
      console.log(this.state.newRating);
      this.game.stop();
      if(this.state.newRating > us.getData().rating) {
        us.getData().newRating = this.state.newRating;
        router.go('/victory');
      } else {
        us.getData().newRating = this.state.newRating;
        router.go('/defeat');
      }
    });
    ee.on('print', (message) => {
      this.x.innerHTML = message;
    });
    ee.on('alert', (msg) => { alert(msg); });
    this.alreadyInDOM = false;
  }
  render() {
    super.render();
    this.node.innerHTML = this.drawFunc();
    this.parent.appendChild(this.node);
    this.addEventListeners();
    document.querySelector('.game-back-link').addEventListener('click', () => {
      this.game.stop();
      router.go('/concedemp');
    });
    ee.on('destroyGame', ()=> {
      delete this.game;
      const game = document.querySelector('canvas');
      document.body.removeChild(game);
    });
    gm.findOpponent();
  }
  show() {
    if (!this.alreadyInDOM) {
      this.render();
      this.alreadyInDOM = true;
    }
    if (this.game) {
      this.game.resume();
    } else {
      this.game = new __WEBPACK_IMPORTED_MODULE_5__modules_game_play__["a" /* default */]('multi');
      this.game.gameProcess();
    }

    // const game = document.querySelector('canvas');
    // game.hidden = false;
    this.node.hidden = false;
  }
  hide() {
    if (this.alreadyInDOM) {
      // super.destruct();
      // const game = document.querySelector('canvas');
      // game.hidden = true;
    }
    super.hide();
  }
  addEventListeners() {
    this.x = document.querySelector('.result');
    document.querySelector('.goleft').addEventListener('click', () => {
      gm.findOpponent();
    });
    document.querySelector('.goright').addEventListener('click', () => {
      ee.emit('alert', 'OLOLOLO');
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MpGameView;




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseView__ = __webpack_require__(8);
/**
 * Created by tlakatlekutl on 27.03.17.
 */



class Page404View extends __WEBPACK_IMPORTED_MODULE_0__baseView__["a" /* default */] {
  constructor() {
    super(['page404-container'], () => '<h1> Not Found </h1>');
    this.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Page404View;




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* Created by tlakatlekutl on 31.03.17.
*/
class PreloaderView {
  constructor() {
    this.node = document.querySelector('.preloader-page');
    this.onLoad = new Event('onUserStatusLoad');
    this.node.addEventListener('onUserStatusLoad', this.hide);
  }
  hide() {
    this.hidden = true;
  }
  dispatchLoadCompleted() {
    this.node.dispatchEvent(this.onLoad);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PreloaderView;



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_profile_pug__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_profile_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_profile_pug__);
/**
 * Created by tlakatlekutl on 04.04.17.
 */







const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class ProfileModalView extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('Profile', __WEBPACK_IMPORTED_MODULE_3__templates_profile_pug___default.a);
  }
  show() {
    if (userModel.isAuthorised()) {
      if (!this.alreadyInDOM) {
        this.alreadyInDOM = true;
        this.render({ user: userModel.getData() });
      }
      this.bodyModal.innerHTML = this.drawFunc({ user: userModel.getData() });
      this.modal.style.display = 'block';
    } else {
      router.go('/');
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProfileModalView;




/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug__);
/**
* Created by tlakatlekutl on 03.04.17.
*/







const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();

class SignupModal extends __WEBPACK_IMPORTED_MODULE_0__modalView__["a" /* default */] {
  constructor() {
    super('Signup', __WEBPACK_IMPORTED_MODULE_3__templates_sign_up_pug___default.a);
  }
  render() {
    super.render();
    this.errorField = document.querySelector('.danger-signup');
    document.querySelector('.signup-submit-button').addEventListener('click', (event) => {
      event.preventDefault();
      if (this.isValid()) {
        this.errorField.style.display = 'none';
        userModel.signup(this.getFormData())
          .then(() => {
            router.go('/');
            this.destruct();
          })
          .catch((error) => { this.showError(error.error); });
      }
    });
  }
  show() {
    if (!userModel.isAuthorised()) {
      super.show();
      this.hideError();
    } else {
      router.go('/');
    }
  }
  showError(errorText) {
    this.errorField.innerHTML = errorText;
    this.errorField.style.display = 'block';
  }
  hideError() {
    this.errorField.style.display = 'none';
  }
  isValid() {
    this.nickname = document.querySelector('.signup-nickname-input').value;
    this.password = document.querySelector('.signup-password-input').value;
    this.repeatPassword = document.querySelector('.signup-password-repeat').value;
    this.email = document.querySelector('.signup-email-input').value;

    if (this.nickname === '') {
      this.showError('Имя не может быть пустым');
      return false;
    }
    if (this.password === '') {
      this.showError('Пароль не может быть пустым');
      return false;
    }
    if (this.repeatPassword === '') {
      this.showError('Повторите пароль');
      return false;
    }
    if (this.password !== this.repeatPassword) {
      this.showError('Пароли не совпадают');
      return false;
    }
    if (this.email === '') {
      this.showError('Email не может быть пустым');
      return false;
    }
    return true;
  }
  getFormData() {
    return {
      login: this.nickname,
      password: this.password,
      email: this.email,
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SignupModal;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_victory_css__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_victory_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_victory_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modalView__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_victory_pug__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_victory_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_victory_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_userModel__ = __webpack_require__(2);
/**
 * Created by sergey on 01.05.17.
 */









const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_4__modules_eventEmitter_eventEmitter__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_5__models_userModel__["a" /* default */]();

class VictoryModal extends __WEBPACK_IMPORTED_MODULE_1__modalView__["a" /* default */] {
  constructor() {
    super('Завершение игры', __WEBPACK_IMPORTED_MODULE_3__templates_victory_pug___default.a);
  }
  render() {
    super.render();
    this.changeRating = document.querySelector('.victory-modal .change');
    this.changeRating.innerHTML = us.getData().newRating - us.getData().rating;
    this.newRating = document.querySelector('.victory-modal .rating_score');
    this.newRating.innerHTML = us.getData().newRating;
    // document.querySelector('.choose__yes').addEventListener('click', () => {
    //   ee.emit('destroyGame');
    //   router.go('/');
    // });
    // document.querySelector('.choose__no').addEventListener('click', () => {
    //   router.go('/game');
    // });
    this.onClose(() => {
      ee.emit('destroyGame');
      router.go('/');
    });
  }

  onClose(func) {
    this.close.addEventListener('click', func);
    this.close.addEventListener('click', () => {
      this.modal.style.display = 'none';
    });
    return this;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VictoryModal;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(34)
var ieee754 = __webpack_require__(44)
var isArray = __webpack_require__(45)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".modal-header-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.concede-modal__text {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    font-size: 24px;\n}\n\n.choose {\n    font-size: 24px;\n    margin-bottom: 25px;\n}\n\n.choose__yes, .choose__no {\n    display: inline-block;\n    font-size: 36px;\n}\n\n.choose__yes {\n    margin-left: 30%;\n    margin-right: 10%;\n}\n\n.choose__no {\n    margin-left: 10%;\n    margin-right: 30%;\n}\n\n.choose__yes:hover, .choose__no:hover {\n    color: mediumpurple;\n    text-decoration: underline;\n}", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".modal-content {\n    width: 50%;\n}\n\n.modal-header-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.defeat-modal__text {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    font-size: 24px;\n}\n\n.defeat-modal__text {\n    margin-left: 30%;\n    font-size: 36px;\n    font-weight: bold;\n}\n\n.change, .rating_score {\n    display: inline-block;\n    margin-left: 15px;\n}\n\n.defeat-modal .change {\n    color: #8b1700;\n}\n\n.rating__change, .new__rating, .change, .rating_score {\n    font-weight: bold;\n    font-size: 28px;\n}\n\n.rating__change, .new__rating {\n    margin-left: 10%;\n    margin-top: 2%;\n}\n\n.rating {\n    margin-bottom: 10%;\n}", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".game-header {\n    display: flex;\n    width: 100%;\n    flex-direction: row;\n    padding-top: 20px;\n    margin-bottom: 45px;\n}\n\n.game-back-link {\n    padding-left: 20px;\n    font-size: 28px;\n}\n\n.player1, .player2, .score {\n    text-align: center;\n    width: 20%;\n}\n\n.score {\n    padding-top: 30px;\n}\n\n.player1 {\n    padding-left: 10%;\n}\n\n.player1_score, .separate, .player2_score {\n    display: inline-block;\n    font-size: 64px;\n    padding-left: 5px;\n    padding-right: 5px;\n}\n\n.player_rating_score, .player_rating {\n    display: inline-block;\n}\n\n.player_rating_score {\n    font-size: 32px;\n    margin-left: 12px;\n}\n\n.player_nickname {\n    font-size: 52px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n}\n\n.player_rating {\n    font-size: 24px;\n}\n\ncanvas {\n    margin-left: 16%;\n}\n\n.goleft, .goright, .result {\n    display: none;\n}", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports
exports.i(__webpack_require__(42), "");
exports.i(__webpack_require__(41), "");
exports.i(__webpack_require__(40), "");
exports.i(__webpack_require__(38), "");

// module
exports.push([module.i, "@media all {\n    .main-page {\n        display: flex;\n        flex-direction: column;\n        height: 90vh;\n    }\n\n    .name-game {\n        align-self: center;\n        font-size: 120px;\n        margin-top: 5%;\n        margin-bottom: 4%;\n    }\n\n    .main-page-center {\n        align-self: center;\n    }\n\n    .start-game-buttons {\n        background-color: white;\n        display: flex;\n        /*align-self: center;*/\n    }\n\n    .button {\n        -webkit-transition-duration: 0.4s;\n        transition-duration: 0.4s;\n        border: none;\n        color: white;\n        padding: 15px 32px;\n        font-size: 48px;\n        float: left;\n        position: relative;\n        display: block;\n        align-self: center;\n        width: 225px;\n        flex-grow: 1;\n    }\n\n    .button:hover {\n        /*border: 6px solid darkcyan;*/\n        width: 280px;\n        height: 90px;\n    }\n\n    /*.btn-left:hover {*/\n    /*transition: 3s;*/\n    /*flex-grow: 2;*/\n    /*}*/\n    /*.btn-left:hover ~ .btn-right{*/\n    /*!*transition: 3s;*!*/\n    /*!*width: 25px;*!*/\n    /*}*/\n    /*.btn-right:hover {*/\n    /*transition: 3s;*/\n    /*flex-grow: 2;*/\n    /*}*/\n    /*.btn-right:hover ~ .btn-left{*/\n    /*transition: 3s;*/\n    /*width: 25px;*/\n    /*}*/\n    .leaderboard-button {\n        background-image: url(" + __webpack_require__(59) + ");\n        width: 100px;\n        height: 110px;\n        margin-top: 10%;\n        color: black;\n        border: none;\n        font-size: 0.1px;\n        border-radius: 50px;\n        flex-grow: 1;\n    }\n\n    .leaderboard-button:hover {\n        background-color: darkcyan;\n        border: solid;\n    }\n\n    .btn-left {\n        flex-grow: 1;\n        background-color: #4CAF50;\n        border-radius: 50px 0 0 50px;\n    }\n\n    .btn-right {\n        background-color: orange;\n        border-radius: 0 50px 50px 0;\n        flex-grow: 1;\n    }\n\n    .btn-right:hover {\n        flex-grow: 2;\n    }\n\n    .main-page-leaderboard {\n        text-align: center;\n    }\n\n    .main-page-footer {\n        text-align: right;\n        font-size: 32px;\n        margin-right: 2%;\n    }\n\n    .user-state {\n        /*background-color: #0D47A1;*/\n        height: 50px;\n        width: 200px;\n        text-align: center;\n        align-self: flex-end;\n        position: relative;\n        display: inline-block;\n        font-size: 30px;\n        margin-right: 1%;\n        margin-top: 1%;\n    }\n\n    .dropdown-link {\n\n    }\n\n    .dropdown-content {\n        display: none;\n        position: absolute;\n        background-color: #f9f9f9;\n        min-width: 160px;\n        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\n        z-index: 1;\n    }\n\n    .dropdown-content a {\n        color: black;\n        padding: 12px 16px;\n        text-decoration: none;\n        display: block;\n    }\n\n    .dropdown-content a:hover {\n        background-color: #f1f1f1\n    }\n\n    .user-state:hover .dropdown-content {\n        display: block;\n    }\n\n    .login-link:hover, .signup-link:hover, .footer-help-link:hover {\n        color: mediumpurple;\n        text-decoration: underline;\n    }\n\n    .login-link {\n        width: 10%;\n    }\n\n    .signup-link {\n        padding-left: 15%;\n    }\n}\n\n@media handheld {\n    .name-game {\n        align-self: center;\n        font-size: 100px;\n        margin-top: 2%;\n        margin-bottom: 3%;\n    }\n}\n\n/*.user-state:hover .dropdown-link {*/\n    /*background-color: #3e8e41;*/\n/*}*/\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".leaderboard-table {\n    border-collapse: collapse;\n    width: 100%;\n}\n\nth, td {\n    text-align: left;\n    padding: 8px;\n}\n.leaderboard-table th {\n    border-bottom: 3px solid black;\n}\n\n.leaderboard-table tr:nth-child(even){\n    background-color: #f2f2f2;\n}", ""]);

// exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "input, select {\n    width: 100%;\n    padding: 12px 20px;\n    margin: 8px 0;\n    display: inline-block;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    box-sizing: border-box;\n}\n\ninput[type=submit] {\n    width: 100%;\n    background-color: #4CAF50;\n    color: white;\n    padding: 14px 20px;\n    margin: 8px 0;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n}\n\ninput[type=submit]:hover {\n    background-color: #45a049;\n}\n\n.login-modal {\n    border-radius: 5px;\n    background-color: #f2f2f2;\n    padding: 20px;\n}\n\n.input-error {\n    color: red;\n}\n.danger {\n    display: none;\n    margin-top: 15px;\n    margin-bottom: 15px;\n    padding: 4px 12px;\n    background-color: #ffdddd;\n    border-left: 6px solid #f44336;\n}", ""]);

// exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".modal {\n    display: none; /* Hidden by default */\n    position: fixed; /* Stay in place */\n    z-index: 1; /* Sit on top */\n    padding-top: 100px; /* Location of the box */\n    left: 0;\n    top: 0;\n    width: 100%; /* Full width */\n    height: 100%; /* Full height */\n    overflow: auto; /* Enable scroll if needed */\n    background-color: rgb(0,0,0); /* Fallback color */\n    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n}\n\n/* Modal Content */\n.modal-content {\n    position: relative;\n    background-color: #fefefe;\n    margin: auto;\n    padding: 0;\n    border: 1px solid #888;\n    width: 80%;\n    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\n    -webkit-animation-name: animatetop;\n    -webkit-animation-duration: 0.4s;\n    animation-name: animatetop;\n    animation-duration: 0.4s;\n    max-width: 636px;\n}\n\n/* Add Animation */\n@-webkit-keyframes animatetop {\n    from {top:-300px; opacity:0}\n    to {top:0; opacity:1}\n}\n\n@keyframes animatetop {\n    from {top:-300px; opacity:0}\n    to {top:0; opacity:1}\n}\n\n/* The Close Button */\n.close {\n    color: white;\n    float: right;\n    font-size: 28px;\n    font-weight: bold;\n}\n\n.close:hover,\n.close:focus {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n}\n\n.modal-header {\n    padding: 2px 16px;\n    background-color: #5cb85c;\n    color: white;\n}\n\n.modal-body {padding: 2px 16px;}\n\n.modal-footer {\n    padding: 2px 16px;\n    background-color: #5cb85c;\n    color: white;\n}", ""]);

// exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".modal-content {\n    width: 50%;\n}\n\n.modal-header-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n\n.victory-modal__text {\n    margin-top: 15px;\n    margin-bottom: 15px;\n    font-size: 24px;\n}\n\n.victory-modal__text {\n    margin-left: 35%;\n    font-size: 36px;\n    font-weight: bold;\n}\n\n.change, .rating_score {\n    display: inline-block;\n    margin-left: 15px;\n}\n\n.victory-modal .change {\n    color: darkgreen;\n}\n\n.rating__change, .new__rating, .change, .rating_score {\n    font-weight: bold;\n    font-size: 28px;\n}\n\n.rating__change, .new__rating {\n    margin-left: 10%;\n    margin-top: 2%;\n}\n\n.rating {\n    margin-bottom: 10%;\n}", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"about-modal\"\u003E\u003Cp\u003EТут какой-то текст\u003C\u002Fp\u003E\u003Cp\u003EАвторы этого безобразия:\u003C\u002Fp\u003E\u003Cul\u003E\u003Cli\u003EБуклин Сергей\u003C\u002Fli\u003E\u003Cli\u003EБуторин Сергей\u003C\u002Fli\u003E\u003Cli\u003EЯкубов Алексей\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!--Created by sergey on 01.05.17.\n--\u003E\u003Cdiv class=\"defeat-modal\"\u003E\u003Cdiv class=\"defeat-modal__text\"\u003EПоражение\u003C\u002Fdiv\u003E\u003Cdiv class=\"rating\"\u003E\u003Cdiv class=\"rating__change\"\u003EИзменение:\u003Cdiv class=\"change\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"new__rating\"\u003EРейтинг:\u003Cdiv class=\"rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"game-header\"\u003E\u003Cdiv class=\"game-back-link\"\u003E\u003C Back\u003C\u002Fdiv\u003E\u003Cdiv class=\"player1\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"score\"\u003E\u003Cdiv class=\"player1_score\"\u003E0\u003C\u002Fdiv\u003E\u003Cdiv class=\"separate\"\u003E:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data) {pug_html = pug_html + "\u003Cdiv class=\"leaderboard-modal\" style=\"overflow-y:auto;\"\u003E\u003Ctable class=\"leaderboard-table\"\u003E\u003Ctr\u003E\u003Cth\u003EМесто\u003C\u002Fth\u003E\u003Cth\u003ENickname\u003C\u002Fth\u003E\u003Cth\u003EСчет\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
// iterate data
;(function(){
  var $$obj = data;
  if ('number' == typeof $$obj.length) {
      for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
        var user = $$obj[index];
pug_html = pug_html + "\u003Ctr\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.rating) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var index in $$obj) {
      $$l++;
      var user = $$obj[index];
pug_html = pug_html + "\u003Ctr\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = index) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.rating) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"danger\"\u003E\u003Cp\u003E\u003Cstrong\u003EОшибка:\u003C\u002Fstrong\u003E неверный логин или пароль\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"login-modal\"\u003E\u003Cform\u003E\u003Clabel for=\"login-input\"\u003ENickname\u003C\u002Flabel\u003E\u003Cinput class=\"login-nickname-input\" type=\"text\" id=\"login-input\" placeholder=\"Your nickname..\" required=\"true\"\u003E\u003Clabel for=\"password-input\"\u003EPassword\u003C\u002Flabel\u003E\u003Cinput class=\"login-password-input\" type=\"password\" id=\"password-input\" placeholder=\"Your password..\" required=\"true\"\u003E\u003Cinput class=\"login-submit-button\" type=\"submit\" value=\"Enter the game\"\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (user) {pug_html = pug_html + "\u003C!--Created by tlakatlekutl on 27.03.17.\n--\u003E\u003Cdiv class=\"main-page\"\u003E\u003Cdiv class=\"user-state\"\u003E";
if (user.authorised) {
pug_html = pug_html + "\u003Ca class=\"dropdown-link\"\u003E" + (pug.escape(null == (pug_interp = user.nickname) ? "" : pug_interp)) + " \\\u002F\u003C\u002Fa\u003E\u003Cdiv class=\"dropdown-content\"\u003E\u003Ca class=\"profile-link\"\u003EProfile\u003C\u002Fa\u003E\u003Ca class=\"logout-link\"\u003ELogout\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Ca class=\"login-link\"\u003ELogin\u003C\u002Fa\u003E\u003Ca class=\"signup-link\"\u003ESign up\u003C\u002Fa\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"name-game\"\u003EFastBall\u003C\u002Fdiv\u003E\u003Cdiv class=\"main-page-center\"\u003E\u003Cdiv class=\"start-game-buttons\"\u003E\u003Cbutton class=\"button btn-left\"\u003ESingle\u003C\u002Fbutton\u003E\u003Cbutton class=\"button btn-right\"\u003EMulti\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"main-page-leaderboard\"\u003E\u003Cbutton class=\"leaderboard-button\"\u003ELeaderboard\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cfooter class=\"main-page-footer\"\u003E\u003Ca class=\"footer-help-link\"\u003Ehelp\u003C\u002Fa\u003E\u003C\u002Ffooter\u003E";}.call(this,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cbutton class=\"goleft\"\u003ELeft\u003C\u002Fbutton\u003E\u003Cspan class=\"result\"\u003E50\u003C\u002Fspan\u003E\u003Cbutton class=\"goright\"\u003ERight\u003C\u002Fbutton\u003E\u003Cdiv class=\"game-header\"\u003E\u003Cdiv class=\"game-back-link\"\u003E\u003C Back\u003C\u002Fdiv\u003E\u003Cdiv class=\"player1\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"score\"\u003E\u003Cdiv class=\"player1_score\"\u003E0\u003C\u002Fdiv\u003E\u003Cdiv class=\"separate\"\u003E:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player2\"\u003E\u003Cdiv class=\"player_nickname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating\"\u003EРейтинг:\u003C\u002Fdiv\u003E\u003Cdiv class=\"player_rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (user) {pug_html = pug_html + "\u003Cdiv class=\"profile-modal\"\u003E\u003Ctable class=\"profile-table\"\u003E\u003Ctr\u003E\u003Cth\u003ENickname\u003C\u002Fth\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.nickname) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003Ctr\u003E\u003Cth\u003EEmail\u003C\u002Fth\u003E\u003Ctd\u003E" + (pug.escape(null == (pug_interp = user.email) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E";}.call(this,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"danger danger-signup\"\u003E\u003Cp\u003E\u003Cstrong\u003EОшибка:\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"signup-modal\"\u003E\u003Cform\u003E\u003Clabel for=\"signup-nickname-input\"\u003ENickname\u003C\u002Flabel\u003E\u003Cinput class=\"signup-nickname-input\" type=\"text\" id=\"signup-nickname-input\" placeholder=\"Your nickname..\" required=\"true\"\u003E\u003Clabel for=\"signup-password-input\"\u003EPassword\u003C\u002Flabel\u003E\u003Cinput class=\"signup-password-input\" type=\"password\" id=\"signup-password-input\" placeholder=\"Your password..\" required=\"true\"\u003E\u003Cinput class=\"signup-password-repeat\" type=\"password\" id=\"signup-password-repeat\" placeholder=\"Repeat password..\" required=\"true\"\u003E\u003Clabel for=\"signup-email-input\"\u003EE-mail\u003C\u002Flabel\u003E\u003Cinput class=\"signup-email-input\" type=\"email\" id=\"signup-email-input\" placeholder=\"Your email..\" required=\"true\"\u003E\u003Cinput class=\"signup-submit-button\" type=\"submit\" value=\"Signup and play!\"\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!-- Created by sergey on 01.05.17.--\u003E\u003Cdiv class=\"victory-modal\"\u003E\u003Cdiv class=\"victory-modal__text\"\u003EПобеда\u003C\u002Fdiv\u003E\u003Cdiv class=\"rating\"\u003E\u003Cdiv class=\"rating__change\"\u003EИзменение:\u003Cdiv class=\"change\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"new__rating\"\u003EРейтинг:\u003Cdiv class=\"rating_score\"\u003E0\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 56 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./defeat.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./defeat.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(6)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./victory.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./victory.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_userModel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_preloaderView__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_mainWindowView__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_loginModalView__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_signupModalVew__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_leaderBoardModalView__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_profileModalView__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_aboutModalVIew__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_gameView__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_page404view__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__views_mpGameView__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__views_concedeModalView__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__views_concedeMpModalView__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__views_victoryModalView__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__views_defeatModalView__ = __webpack_require__(23);
/**
 * Created by tlakatlekutl on 31.03.17.
 */





















// views
const preloaderView = new __WEBPACK_IMPORTED_MODULE_3__views_preloaderView__["a" /* default */]();
const mainView = new __WEBPACK_IMPORTED_MODULE_4__views_mainWindowView__["a" /* default */]();
const p404 = new __WEBPACK_IMPORTED_MODULE_11__views_page404view__["a" /* default */]();
const loginModalView = new __WEBPACK_IMPORTED_MODULE_5__views_loginModalView__["a" /* default */]();
const signupModalView = new __WEBPACK_IMPORTED_MODULE_6__views_signupModalVew__["a" /* default */]();
const leaderBoardModal = new __WEBPACK_IMPORTED_MODULE_7__views_leaderBoardModalView__["a" /* default */]();
const profileModalView = new __WEBPACK_IMPORTED_MODULE_8__views_profileModalView__["a" /* default */]();
const aboutModalView = new __WEBPACK_IMPORTED_MODULE_9__views_aboutModalVIew__["a" /* default */]();
const mpView = new __WEBPACK_IMPORTED_MODULE_12__views_mpGameView__["a" /* default */]();
const gameView = new __WEBPACK_IMPORTED_MODULE_10__views_gameView__["a" /* default */]();
const concedeModalView = new __WEBPACK_IMPORTED_MODULE_13__views_concedeModalView__["a" /* default */]();
const concedeMpModalView = new __WEBPACK_IMPORTED_MODULE_14__views_concedeMpModalView__["a" /* default */]();
const victoryModalView = new __WEBPACK_IMPORTED_MODULE_15__views_victoryModalView__["a" /* default */]();
const defeatModalView = new __WEBPACK_IMPORTED_MODULE_16__views_defeatModalView__["a" /* default */]();

// init router
const router = new __WEBPACK_IMPORTED_MODULE_2__modules_router_router__["a" /* default */]();
router.addRoute(/\/$/, mainView)
  .addRoute(/login$/, loginModalView)
  .addRoute(/signup$/, signupModalView)
  .addRoute(/leaderboard$/, leaderBoardModal)
  .addRoute(/profile$/, profileModalView)
  .addRoute(/about$/, aboutModalView)
  .addRoute(/mp/, mpView)
  .addRoute(/game$/, gameView)
  .addRoute(/concede$/, concedeModalView)
  .addRoute(/concedemp$/, concedeMpModalView)
  .addRoute(/victory$/, victoryModalView)
  .addRoute(/defeat$/, defeatModalView)
  .set404(p404);

// global user profile
const userModel = new __WEBPACK_IMPORTED_MODULE_1__models_userModel__["a" /* default */]();

leaderBoardModal.render();
aboutModalView.render();

router.start()
  .then(() => {
    console.log(userModel.getData());
    mainView.render();
    router.go(window.location.href);
    preloaderView.dispatchLoadCompleted();
  });


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sergey on 20.04.17.
 */

class Bot {
    constructor(pos) {
        this.active = false;

        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
        this.del = 0.2;
        this.move = { xd: 0, yd: 0, zd: 0};
    }

    getState() {
        return this.active;
    }

    setState(state) {
        this.active = state;
    }

    setPosition(pos) {
        this.x = pos.x;
        this.y = pos.y;
        this.z = pos.z;
    }

    getBehavior(posBall) {
        this.move = { xd: 0, yd: 0, zd: 0};
        if(posBall.x - this.x >= this.del) {
            this.move.xd = this.del;
        } else if (this.x - posBall.x  >= this.del) {
            this.move.xd = -this.del;
        }
        return this.move;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bot;


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__barrier__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ground__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_gameModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__eventEmitter_eventEmitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_userModel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__player__ = __webpack_require__(18);
/**
 * Created by sergey on 21.04.17.
 */










const gm = new __WEBPACK_IMPORTED_MODULE_4__models_gameModel__["a" /* default */]();
const ee = new __WEBPACK_IMPORTED_MODULE_5__eventEmitter_eventEmitter__["a" /* default */]();
const us = new __WEBPACK_IMPORTED_MODULE_6__models_userModel__["a" /* default */]();

class MultiStrategy {

  constructor() {

    this.play = true;
    this.time = (new Date).getTime();
    this.pres = 0;
    this.timeLast = (new Date).getTime();

    this.player1 = new __WEBPACK_IMPORTED_MODULE_7__player__["a" /* default */](us.getData().nickname, 0, us.getData().rating);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 340, 340);
    this.scene.add(this.spotLight);

    this.y = window.innerHeight * 0.6;
    this.x = this.y * 2.1;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 120 };
    this.size = { width: 180, height: 10, depth: 240 };
    this.ground = new __WEBPACK_IMPORTED_MODULE_3__ground__["a" /* Ground */](this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -85, y: 10, z: 120 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderLeft = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 85, y: 10, z: 120 };
    this.size = { width: 10, height: 10, depth: 240 };
    this.angle = Math.PI / 2;
    this.borderRight = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 10, z: 232.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformMy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 10, z: 7.5 };
    this.size = { width: 60, height: 5, depth: 15 };
    this.platformEnemy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 10, z: 220 };
    this.radius = 5;
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball__["a" /* Ball */](0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.camera.position.x = 0;
    this.camera.position.y = 120;
    this.camera.position.z = 300;
    this.camera.lookAt(this.ground.getPosition());
  }

  render() {
    this.keyboard2.update();

    this.pres = 0;

    if (this.keyboard2.pressed('left')) {
      this.control('left');
    }

    if (this.keyboard2.pressed('right')) {
      this.control('right');
    }

    if (this.keyboard2.down('space')) {
      this.control('space');
    }

    this.renderer.render(this.scene, this.camera);
  }

  animationScene() {
    this.render();
    this.time = (new Date).getTime();

    if(this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  control(button) {
    this.controller = 1;
    if(this.pres === 0) {
      this.pres = 1;
      this.del = 20;
    } else {
      this.time = (new Date).getTime();
      this.del = this.time - this.timeLast;
    }
    this.timeLast = (new Date).getTime();
    if(this.del > 100) {
      this.del = 20;
    }
    if (button === 'left') {
      gm.sendButton('left', this.del);
    } else if (button === 'right') {
      gm.sendButton('right', this.del);
    } else if (button === 'space') {
      gm.sendButton('space', this.del);
    }
  }

  setStateGame(state) {
    // console.log(us);
    this.state = state;

    if(us.getData().id === this.state.players[0].userId) {
      this.player1.setScore(this.state.players[0].score);
      this.player2.setScore(this.state.players[1].score);
    } else {
      this.player1.setScore(this.state.players[1].score);
      this.player2.setScore(this.state.players[0].score);
    }

    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();

    if(us.getData().id === this.state.players[0].userId) {
      this.pos = {
        x: this.state.players[0].platform.x,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[1].platform.x,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
      this.pos = {
        x: this.state.ballCoords.x,
        y: this.ball.getPosition().y,
        z: this.state.ballCoords.y
      };
      this.ball.setPosition(this.pos);
    } else {
      this.pos = {
        x: this.state.players[1].platform.x,
        y: this.platformMy.getPosition().y,
        z: this.platformMy.getPosition().z
      };
      this.platformMy.setPosition(this.pos);
      this.pos = {
        x: this.state.players[0].platform.x,
        y: this.platformEnemy.getPosition().y,
        z: this.platformEnemy.getPosition().z
      };
      this.platformEnemy.setPosition(this.pos);
      this.pos = {
        x: this.state.ballCoords.x,
        y: this.ball.getPosition().y,
        z: this.state.ballCoords.y
      };
      this.ball.setPosition(this.pos);
    }
  }

  setOpponent(state) {
    console.log(state);
    this.state = state;
    this.player2 = new __WEBPACK_IMPORTED_MODULE_7__player__["a" /* default */](this.state.opponentLogin, 0, this.state.opponentRating);
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
  }

  stop() {
    this.play = false;
    this.keyboard2.destroy();
  }

  resume() {
    this.play = true;
    this.keyboard2 = new KeyboardState();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiStrategy;



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ball__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__barrier__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ground__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bot__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__player__ = __webpack_require__(18);
/**
 * Created by sergey on 15.04.17.
 */








class SingleStrategy {

  constructor() {
    this.play = true;

    this.player1 = new __WEBPACK_IMPORTED_MODULE_5__player__["a" /* default */]('Player1', 0, 42);
    this.player2 = new __WEBPACK_IMPORTED_MODULE_5__player__["a" /* default */]('Player2', 0, 36);

    this.nick1 = document.querySelector('.player1 .player_nickname');
    this.nick1.innerHTML = this.player1.getNickname();
    this.nick2 = document.querySelector('.player2 .player_nickname');
    this.nick2.innerHTML = this.player2.getNickname();
    this.rat1 = document.querySelector('.player1 .player_rating_score');
    this.rat1.innerHTML = this.player1.getRating();
    this.rat2 = document.querySelector('.player2 .player_rating_score');
    this.rat2.innerHTML = this.player2.getRating();
    this.score1 = document.querySelector('.player1_score');
    this.score1.innerHTML = this.player1.getScore();
    this.score2 = document.querySelector('.player2_score');
    this.score2.innerHTML = this.player2.getScore();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.keyboard2 = new KeyboardState();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 40, 40);
    this.scene.add(this.spotLight);

    this.y = window.innerHeight * 0.6;
    this.x = this.y * 2.1;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.x, this.y);
    document.body.appendChild(this.renderer.domElement);

    this.pos = { x: 0, y: 0, z: 8 };
    this.size = { width: 16, height: 1, depth: 16 };
    this.ground = new __WEBPACK_IMPORTED_MODULE_3__ground__["a" /* Ground */](this.pos, this.size);
    this.scene.add(this.ground.getModel());

    this.barriers = [];

    this.pos = { x: -7.5, y: 1, z: 8 };
    this.size = { width: 1, height: 1, depth: 16 };
    this.angle = Math.PI / 2;
    this.borderLeft = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderLeft);
    this.scene.add(this.borderLeft.getModel());

    this.pos = { x: 7.5, y: 1, z: 8 };
    this.size = { width: 1, height: 1, depth: 16 };
    this.angle = Math.PI / 2;
    this.borderRight = new __WEBPACK_IMPORTED_MODULE_2__barrier__["a" /* Barrier */](this.pos, this.size, this.angle);
    this.barriers.push(this.borderRight);
    this.scene.add(this.borderRight.getModel());

    this.pos = { x: 0, y: 1, z: 15 };
    this.size = { width: 5, height: 1, depth: 1 };
    this.platformMy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](0, this.pos, this.size);
    this.scene.add(this.platformMy.getModel());

    this.pos = { x: 0, y: 1, z: 1 };
    this.size = { width: 5, height: 1, depth: 1 };
    this.platformEnemy = new __WEBPACK_IMPORTED_MODULE_0__platform__["a" /* Platform */](1, this.pos, this.size);
    this.scene.add(this.platformEnemy.getModel());

    this.pos = { x: 0, y: 1, z: 14 };
    this.radius = 0.5;
    this.ball = new __WEBPACK_IMPORTED_MODULE_1__ball__["a" /* Ball */](0, this.pos, this.radius);
    this.scene.add(this.ball.getModel());

    this.pos.x = this.platformEnemy.getPosition().x;
    this.pos.y = this.platformEnemy.getPosition().y;
    this.pos.z = this.platformEnemy.getPosition().z;
    this.bot = new __WEBPACK_IMPORTED_MODULE_4__bot__["a" /* Bot */](this.pos);


    this.pointViewG = new THREE.SphereGeometry(0, 0, 0);
    this.pointViewM = new THREE.MeshNormalMaterial({ color: 0xffff00 });
    this.pointView = new THREE.Mesh(this.pointViewG, this.pointViewM);
    this.pointView.position.set(0, -4, 2);
    this.scene.add(this.pointView);

    this.camera.position.x = 0;
    this.camera.position.y = 8;
    this.camera.position.z = 20;
    this.look = this.ground.getPosition();
    this.look.y -= 3;
    this.camera.lookAt(this.look);
  }

  render() {

    this.keyboard2.update();

    if (this.keyboard2.pressed('left')) {
      this.control('left');
    }

    if (this.keyboard2.pressed('right')) {
      this.control('right');
    }

    if (this.keyboard2.down('B')) {
      this.control('B');
    }

    if (this.keyboard2.down('space')) {
      this.control('space');
    }

    this.checkMove();

    this.renderer.render(this.scene, this.camera);
  }

  animationScene() {
    this.render();

    if(this.play === true) {
      window.requestAnimationFrame(this.animationScene.bind(this));
    }
  }

  control(button) {
    if (button === 'left') {
      if (this.platformMy.getPosition().x - this.platformMy.getSize().width / 2 >
                this.borderLeft.getPosition().x + this.borderLeft.getSize().width / 2) {
        this.pos = {
          x: this.platformMy.getPosition().x - 0.2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        if (this.ball.getMove() === false && this.ball.getSide() === 0) {
          if (this.ball.getPosition().x > this.platformMy.getPosition().x + this.platformMy.getSize().width / 2) {
            this.pos = {
              x: this.platformMy.getPosition().x + this.platformMy.getSize().width / 2,
              y: this.ball.getPosition().y,
              z: this.ball.getPosition().z,
            };
            this.ball.setPosition(this.pos);
          }
        }
      }
    } else if (button === 'right') {
      if (this.platformMy.getPosition().x + this.platformMy.getSize().width / 2 <
                this.borderRight.getPosition().x - this.borderRight.getSize().width / 2) {
        this.pos = {
          x: this.platformMy.getPosition().x + 0.2,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        if (this.ball.getMove() === false && this.ball.getSide() === 0) {
          if (this.ball.getPosition().x < this.platformMy.getPosition().x - this.platformMy.getSize().width / 2) {
            this.pos = {
              x: this.platformMy.getPosition().x - this.platformMy.getSize().width / 2,
              y: this.ball.getPosition().y,
              z: this.ball.getPosition().z,
            };
            this.ball.setPosition(this.pos);
          }
        }
      }
    } else if (button === 'B') {
      this.bot.setState(true);
    } else if (button === 'space') {
      if (this.ball.getMove() === false) {
        this.ball.setMove(true);
        this.vector = { x: 0, y: 0, z: 0 };
        if (this.ball.getSide() === 0) {
          this.vector.x = (this.ball.getPosition().x - this.platformMy.getPosition().x) / 13;
          this.vector.y = 0;
          this.vector.z = -(this.platformMy.getPosition().z + 2 - this.ball.getPosition().z) / 13;
        } else {
          this.vector.x = (this.ball.getPosition().x - this.platformEnemy.getPosition().x) / 13;
          this.vector.y = 0;
          this.vector.z = -(this.platformEnemy.getPosition().z - 2 - this.ball.getPosition().z) / 13;
        }
        this.ball.setVectorMove(this.vector);
      }
    }
  }

  checkMove() {
    if (this.ball.getMove() === true) {
      if (this.ball.getPosition().x - this.ball.getSize() < this.borderLeft.getPosition().x + this.borderLeft.getSize().width / 2 ||
                this.ball.getPosition().x + this.ball.getSize() > this.borderRight.getPosition().x - this.borderRight.getSize().width / 2) {
        this.vector.x = -this.ball.getVectorMove().x;
        this.vector.y = this.ball.getVectorMove().y;
        this.vector.z = this.ball.getVectorMove().z;
        this.ball.setVectorMove(this.vector);
      } else if (this.ball.getPosition().x >= this.platformMy.getPosition().x - this.platformMy.getSize().width / 2 &&
                this.ball.getPosition().x <= this.platformMy.getPosition().x + this.platformMy.getSize().width / 2 &&
                this.ball.getPosition().z + this.ball.getSize() >= this.platformMy.getPosition().z - this.platformMy.getSize().height / 2) {
        this.vector.x = (this.ball.getPosition().x - this.platformMy.getPosition().x) / 13;
        this.vector.y = 0;
        this.vector.z = -(this.platformMy.getPosition().z + 2 - this.ball.getPosition().z) / 13;
        this.ball.setVectorMove(this.vector);
      } else if (this.ball.getPosition().x >= this.platformEnemy.getPosition().x - this.platformEnemy.getSize().width / 2 &&
                this.ball.getPosition().x <= this.platformEnemy.getPosition().x + this.platformEnemy.getSize().width / 2 &&
                this.ball.getPosition().z - this.ball.getSize() <= this.platformEnemy.getPosition().z + this.platformEnemy.getSize().height / 2) {
        this.vector.x = (this.ball.getPosition().x - this.platformEnemy.getPosition().x) / 13;
        this.vector.y = 0;
        this.vector.z = -(this.platformEnemy.getPosition().z - 2 - this.ball.getPosition().z) / 13;
        this.ball.setVectorMove(this.vector);
      }
      if (this.ball.getPosition().z > this.ground.getGoalMy()) {
        this.ball.setSide(0);
        this.ball.setMove(false);
        this.pos = {
          x: this.ground.getPosition().x,
          y: this.platformMy.getPosition().y,
          z: this.platformMy.getPosition().z,
        };
        this.platformMy.setPosition(this.pos);
        this.pos = {
          x: this.platformMy.getPosition().x,
          y: this.ball.getPosition().y,
          z: this.platformMy.getPosition().z - this.platformMy.getSize().height / 2 - this.ball.getSize(),
        };
        this.vector.x = 0;
        this.vector.y = 0;
        this.vector.z = 0;
        this.ball.setVectorMove(this.vector);
        this.ball.setPosition(this.pos);
        this.player2.setScore(this.player2.getScore() + 1);
        this.score2.innerHTML = this.player2.getScore();
      } else if (this.ball.getPosition().z < this.ground.getGoalEnemy()) {
        this.ball.setSide(1);
        this.ball.setMove(false);
        this.pos = {
          x: this.ground.getPosition().x,
          y: this.platformEnemy.getPosition().y,
          z: this.platformEnemy.getPosition().z,
        };
        this.platformEnemy.setPosition(this.pos);
        this.pos = {
          x: this.platformEnemy.getPosition().x,
          y: this.ball.getPosition().y,
          z: this.platformEnemy.getPosition().z + this.platformEnemy.getSize().height / 2 + this.ball.getSize(),
        };
        this.vector.x = 0;
        this.vector.y = 0;
        this.vector.z = 0;
        this.ball.setVectorMove(this.vector);
        this.ball.setPosition(this.pos);
        this.player1.setScore(this.player1.getScore() + 1);
        this.score1.innerHTML = this.player1.getScore();
      }
      this.pos = {
        x: this.ball.getPosition().x + this.ball.getVectorMove().x,
        y: this.ball.getPosition().y + this.ball.getVectorMove().y,
        z: this.ball.getPosition().z + this.ball.getVectorMove().z,
      };
      this.ball.setPosition(this.pos);
      if (this.bot.getState() === true) {
        this.enemyMove = this.bot.getBehavior(this.ball.getPosition());
        this.pos = {
          x: this.platformEnemy.getPosition().x + this.enemyMove.xd,
          y: this.platformEnemy.getPosition().y + this.enemyMove.yd,
          z: this.platformEnemy.getPosition().z + this.enemyMove.zd,
        };
        if (this.enemyMove.xd > 0 && this.pos.x + this.platformEnemy.getSize().width / 2 < this.borderRight.getPosition().x -
                    this.borderRight.getSize().width / 2) {
          this.platformEnemy.setPosition(this.pos);
          this.bot.setPosition(this.platformEnemy.getPosition());
        } else if (this.enemyMove.xd < 0 && this.pos.x - this.platformEnemy.getSize().width / 2 > this.borderLeft.getPosition().x +
                    this.borderLeft.getSize().width / 2) {
          this.platformEnemy.setPosition(this.pos);
          this.bot.setPosition(this.platformEnemy.getPosition());
        }
      }
    }
  }

  stop() {
    this.play = false;
    this.keyboard2.destroy();
  }

  resume() {
    this.play = true;
    this.keyboard2 = new KeyboardState();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SingleStrategy;




/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__eventEmitter_eventEmitter__ = __webpack_require__(5);
/**
 * Created by sergey on 21.04.17.
 */



const ee = new __WEBPACK_IMPORTED_MODULE_0__eventEmitter_eventEmitter__["a" /* default */]();

class Transport {
  constructor() {
    if (Transport.instance) {
      return Transport.instance;
    }
    const address = 'ws://62.109.3.208:8082/game';

    this.ws = new WebSocket(address);
    this.ws.onopen = () => {
      console.log(`Success connect to socket ${address}`);
    };
    this.ws.onclose = (event) => {
      console.log(`Socket closed with code ${event.code}`);
    };
    this.ws.onmessage = (event) => { this.handleMessage(event); };

    Transport.instance = this;
  }

  handleMessage(event) {
    const messageText = event.data;
    const message = JSON.parse(messageText);
    // if (message.type === 'com.aerohockey.mechanics.base.ServerSnap') {
    ee.emit(message.type, message);
    // }
    // else {
    //   //console.log(message);
    //   ee.emit('print', messageText);
    // }
  }

  send(type, content) {
		//console.log(JSON.stringify({ type, content }));
    this.ws.send(JSON.stringify({ type, content }));
		// this.ws.send(JSON.stringify({
			// type: 'com.aerohockey.mechanics.requests.JoinGame$Request',
			// content: '{}',
		// }));
  }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = Transport;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by tlakatlekutl on 05.03.17.
 */

/* global fetch*/

class Net {

  constructor(baseUrl = '', headers = {}) {
    if (Net.instance) {
      return Net.instance;
    }

    this._headers = headers;
    this._baseUrl = baseUrl;

    Net.instance = this;
  }

  _getDefaultParams() {
    return {
      method: '',
      headers: this._headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
    };
  }

  set Headers(value) {
    try {
      this.checkObjectString(value);
      this._headers = value;
    } catch (e) {
      console.log(e.message);
    }
  }

  get BaseUrl() {
    return this._baseUrl;
  }

  set BaseUrl(url) {
    if (typeof url === 'string') {
      this._baseUrl = url;
    } else {
      throw new TypeError('Url must be a string');
    }
  }

  post(url, data) {
    const postParams = this._getDefaultParams();
    postParams.method = 'POST';

    if (data) {
      if (!this.checkObjectString(data)) { throw new TypeError('Error data object'); }
      postParams.body = JSON.stringify(data);
    } else { postParams.body = null; }

    return fetch(this._baseUrl + url, postParams);
  }

  get(url, onSucces) {
    const getParams = this._getDefaultParams();
    getParams.method = 'GET';
    getParams.body = null;

    return fetch(this._baseUrl + url, getParams, onSucces);
  }


  checkObjectString(object) {
    if (!(object && (`${object}` === '[object Object]'))) {
      console.error('Object must be a plain object');
      return false;
    }
    const valid = Object.keys(object).every(key => typeof object[key] === 'string');
    if (!valid) {
      console.error('Object must contain strings values');
      return false;
    }
    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Net;




/***/ }),
/* 67 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);