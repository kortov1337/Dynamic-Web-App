var BooksModule =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cancel = exports.save = exports.edit = exports.loadInfo = exports.Clear = exports.sortGrid = exports.validate = exports.deleteById = exports.create = exports.switchType = exports.search = exports.pickClass = exports.loadBooks = exports.main = undefined;

	var _books = __webpack_require__(1);

	var Books = _interopRequireWildcard(_books);

	var _functions = __webpack_require__(2);

	var Functions = _interopRequireWildcard(_functions);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function main() {
	    var book = new Books.Book("sadasd", "dfsdfa", "qweqwe");
	    console.log('PI = ' + book.title);
	    console.log(Books);
	}
	function loadBooks() {
	    Books.loadBooks();
	}

	function pickClass(callType) {
	    Books.pickClass(callType);
	}

	function search() {
	    Books.search();
	}

	function switchType(callType) {
	    Functions.switchType(callType);
	}

	function create(callType) {
	    Functions.create(callType);
	}

	function deleteById(itemId) {
	    Functions.deleteById(itemId);
	}

	function validate(input, msgstub) {
	    Functions.validate(input, msgstub);
	}

	function sortGrid() {
	    Functions.sortGrid();
	}

	function Clear() {
	    Functions.Clear();
	}

	function loadInfo() {
	    Functions.loadInfo();
	}

	function edit() {
	    Functions.edit();
	}

	function save(callType) {
	    Functions.save(callType);
	}

	function cancel() {
	    Functions.cancel();
	}

	//global export
	exports.main = main;
	exports.loadBooks = loadBooks;
	exports.pickClass = pickClass;
	exports.search = search;
	exports.switchType = switchType;
	exports.create = create;
	exports.deleteById = deleteById;
	exports.validate = validate;
	exports.sortGrid = sortGrid;
	exports.Clear = Clear;
	exports.loadInfo = loadInfo;
	exports.edit = edit;
	exports.save = save;
	exports.cancel = cancel;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var books = [];
	var searchResult = [];

	var Author = exports.Author = function Author(name, country, gender) {
	    _classCallCheck(this, Author);

	    this.name = name;
	    this.country = country;
	    this.gender = gender;
	};

	var Book = exports.Book = function () {
	    function Book(title, publishingHouse, type, branch, id, releaseDate) {
	        _classCallCheck(this, Book);

	        this.id = id;
	        this.title = title;
	        this.publishingHouse = publishingHouse;
	        this.branch = branch;
	        this.type = type;
	        this.releaseDate = releaseDate;
	        this.author = new Author("Default Name", "Default Country", "Default gender");
	    }

	    _createClass(Book, [{
	        key: "getAuthor",
	        get: function get() {
	            return this.author;
	        }
	    }]);

	    return Book;
	}();

	var Audiobook = exports.Audiobook = function (_Book) {
	    _inherits(Audiobook, _Book);

	    function Audiobook(narrator, duration) {
	        _classCallCheck(this, Audiobook);

	        var _this = _possibleConstructorReturn(this, (Audiobook.__proto__ || Object.getPrototypeOf(Audiobook)).call(this));

	        _this.narrator = narrator;
	        _this.duration = duration;
	        return _this;
	    }

	    _createClass(Audiobook, [{
	        key: "getNarrator",
	        get: function get() {
	            return this.narrator;
	        }
	    }, {
	        key: "getDuration",
	        get: function get() {
	            return this.duration;
	        }
	    }]);

	    return Audiobook;
	}(Book);

	var Textbook = exports.Textbook = function (_Book2) {
	    _inherits(Textbook, _Book2);

	    function Textbook(binding, numberOfPage) {
	        _classCallCheck(this, Textbook);

	        var _this2 = _possibleConstructorReturn(this, (Textbook.__proto__ || Object.getPrototypeOf(Textbook)).call(this));

	        _this2.numberOfPage = numberOfPage;
	        _this2.binding = binding;
	        return _this2;
	    }

	    return Textbook;
	}(Book);

	function getXmlHttp() {
	    var xmlhttp = void 0;
	    try {
	        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	        try {
	            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	        } catch (E) {
	            xmlhttp = false;
	        }
	    }
	    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	        xmlhttp = new XMLHttpRequest();
	    }
	    return xmlhttp;
	}

	function getAllBooks() {
	    $.ajax({
	        type: 'GET',
	        url: "http://localhost:2403/books",
	        async: false
	    }).done(function (response) {
	        jsonToBooks(response);
	    });
	}

	function isAlreadyIn(id) {
	    var flag = false;
	    books.forEach(function (item, i, books) {
	        if (item.id == id) flag = true;
	    });
	    return flag;
	}

	function jsonToBooks(res) {
	    if (Array.isArray(res)) {
	        res.forEach(function (item, i, res) {
	            if (!isAlreadyIn(item.id)) if (item.type == 'Audiobook') {
	                var tmp = new Audiobook(item.narrator, item.duration);
	                tmp.title = item.title;
	                tmp.publishingHouse = item.publishingHouse;
	                tmp.branch = item.branch;
	                tmp.id = item.id;
	                tmp.type = item.type;
	                tmp.author.name = item.authorName;
	                tmp.author.country = item.authorCountry;
	                tmp.author.gender = item.authorGender;
	                tmp.releaseDate = new Date(item.releaseDate);
	                books.push(tmp);
	            } else if (item.type == 'Textbook') {
	                var _tmp = new Textbook(item.binding, item.numberOfPage);
	                _tmp.title = item.title;
	                _tmp.publishingHouse = item.publishingHouse;
	                _tmp.branch = item.branch;
	                _tmp.id = item.id;
	                _tmp.type = item.type;
	                _tmp.author.name = item.authorName;
	                _tmp.author.country = item.authorCountry;
	                _tmp.author.gender = item.authorGender;
	                _tmp.releaseDate = new Date(item.releaseDate);
	                books.push(_tmp);
	            }
	        });
	    }
	}

	function loadBooks() {
	    getAllBooks();
	    var data = books;

	    var _$ = $('#content'),
	        _$2 = _toArray(_$),
	        root_node = _$2[0],
	        rest = _$2.slice(1); //document.getElementById("content");


	    var _$3 = $('#datatable'),
	        _$4 = _toArray(_$3),
	        old_table = _$4[0],
	        rest2 = _$4.slice(1); //document.getElementById("datatable");


	    root_node.removeChild(old_table);

	    root_node.innerHTML = "";
	    var table = document.createElement("table");
	    table.className = "datatable";
	    table.id = "datatable";
	    table.setAttribute("onclick", "BooksModule.sortGrid()");
	    var tbody = document.createElement("tbody");
	    var theader = document.createElement("thead");
	    table.appendChild(theader);
	    table.appendChild(tbody);
	    var row = document.createElement("tr");
	    var values = ["ID", "Type", "Author Name", "Title", "Branch", "Publishing House", "Release Date", ""];

	    for (var i = 0; i < values.length; i++) {

	        var cell = document.createElement("th");
	        cell.innerHTML = values[i];
	        cell.setAttribute("data-type", "string");
	        row.appendChild(cell);
	    }
	    theader.appendChild(row);
	    for (var _i = 0; _i < data.length; _i++) {
	        row = document.createElement("tr");
	        tbody.appendChild(row);
	        values = [data[_i].id, data[_i].type, data[_i].author.name, data[_i].title, data[_i].branch, data[_i].publishingHouse, data[_i].releaseDate];
	        for (var j = 0; j < values.length; j++) {
	            var _cell2 = document.createElement("td");
	            if (j == 3) {
	                var ref = document.createElement("a");
	                ref.href = "info.html?id=" + data[_i].id;
	                ref.innerHTML = values[j];
	                ref.className = "editref";
	                _cell2.appendChild(ref);
	            } else _cell2.innerHTML = values[j];
	            row.appendChild(_cell2);
	        }

	        var _cell = document.createElement("td");
	        var editref = document.createElement("a");
	        editref.text = "Edit ";
	        editref.className = "editref";
	        editref.setAttribute("onclick", "BooksModule.loadInfo('" + data[_i].id + "')");
	        editref.href = "edit.html?id=" + data[_i].id;
	        var delref = document.createElement("a");
	        delref.text = "Delete";
	        delref.className = "delref";
	        delref.id = data[_i].id;
	        delref.setAttribute("onclick", "BooksModule.deleteById('" + data[_i].id + "')");
	        _cell.appendChild(editref);
	        _cell.appendChild(delref);
	        row.appendChild(_cell);
	    }

	    root_node.appendChild(table);
	}

	function loadAudiobooks() {
	    getAllBooks();
	    var data = books;
	    var root_node = document.getElementById("content");
	    var old_table = document.getElementById("datatable");
	    root_node.removeChild(old_table);

	    root_node.innerHTML = "";
	    var table = document.createElement("table");
	    table.className = "datatable";
	    table.id = "datatable";
	    table.setAttribute("onclick", "BooksModule.sortGrid()");
	    var tbody = document.createElement("tbody");
	    var theader = document.createElement("thead");
	    table.appendChild(theader);
	    table.appendChild(tbody);
	    var row = document.createElement("tr");
	    var values = ["ID", "Type", "Author Name", "Title", "Branch", "Publishing House", "Release Date", ""];

	    for (var i = 0; i < values.length; i++) {
	        var cell = document.createElement("th");
	        cell.innerHTML = values[i];
	        cell.setAttribute("data-type", "string");
	        row.appendChild(cell);
	    }
	    theader.appendChild(row);
	    for (var _i2 = 0; _i2 < data.length; _i2++) {
	        if (data[_i2].type == "Audiobook") {
	            row = document.createElement("tr");
	            tbody.appendChild(row);
	            values = [data[_i2].id, data[_i2].type, data[_i2].author.name, data[_i2].title, data[_i2].branch, data[_i2].publishingHouse, data[_i2].releaseDate];
	            for (var j = 0; j < values.length; j++) {
	                var _cell4 = document.createElement("td");
	                if (j == 3) {
	                    var ref = document.createElement("a");
	                    ref.href = "info.html?id=" + data[_i2].id;
	                    ref.innerHTML = values[j];
	                    ref.className = "editref";
	                    _cell4.appendChild(ref);
	                } else _cell4.innerHTML = values[j];

	                row.appendChild(_cell4);
	            }
	            var _cell3 = document.createElement("td");
	            var editref = document.createElement("a");
	            editref.text = "Edit ";
	            editref.className = "editref";
	            editref.href = "edit.html?id=" + data[_i2].id;
	            var delref = document.createElement("a");
	            delref.text = "Delete";
	            delref.className = "delref";
	            delref.id = data[_i2].id;
	            delref.setAttribute("onclick", "BooksModule.deleteById('" + data[_i2].id + "')");
	            _cell3.appendChild(editref);
	            _cell3.appendChild(delref);
	            row.appendChild(_cell3);
	        }
	    }

	    root_node.appendChild(table);
	}

	function loadTextbooks() {
	    getAllBooks();
	    var data = books;
	    var root_node = document.getElementById("content");
	    var old_table = document.getElementById("datatable");
	    root_node.removeChild(old_table);

	    root_node.innerHTML = "";
	    var table = document.createElement("table");
	    table.className = "datatable";
	    table.id = "datatable";
	    table.setAttribute("onclick", "BooksModule.sortGrid()");
	    var tbody = document.createElement("tbody");
	    var theader = document.createElement("thead");
	    table.appendChild(theader);
	    table.appendChild(tbody);
	    var row = document.createElement("tr");
	    var values = ["ID", "Type", "Author Name", "Title", "Branch", "Publishing House", "Release Date", ""];

	    for (var i = 0; i < values.length; i++) {
	        var cell = document.createElement("th");
	        cell.innerHTML = values[i];
	        cell.setAttribute("data-type", "string");
	        row.appendChild(cell);
	    }
	    theader.appendChild(row);
	    for (var _i3 = 0; _i3 < data.length; _i3++) {
	        if (data[_i3].type == "Textbook") {
	            row = document.createElement("tr");
	            tbody.appendChild(row);
	            values = [data[_i3].id, data[_i3].type, data[_i3].author.name, data[_i3].title, data[_i3].branch, data[_i3].publishingHouse, data[_i3].releaseDate];
	            for (var j = 0; j < values.length; j++) {
	                var _cell6 = document.createElement("td");
	                if (j == 3) {
	                    var ref = document.createElement("a");
	                    ref.href = "info.html?id=" + data[_i3].id;
	                    ref.innerHTML = values[j];
	                    ref.className = "editref";
	                    _cell6.appendChild(ref);
	                } else _cell6.innerHTML = values[j];

	                row.appendChild(_cell6);
	            }
	            var _cell5 = document.createElement("td");
	            var editref = document.createElement("a");
	            editref.text = "Edit ";
	            editref.className = "editref";
	            editref.href = "edit.html?id=" + data[_i3].id;
	            var delref = document.createElement("a");
	            delref.text = "Delete";
	            delref.className = "delref";
	            delref.id = data[_i3].id;
	            delref.setAttribute("onclick", "BooksModule.deleteById('" + data[_i3].id + "')");
	            _cell5.appendChild(editref);
	            _cell5.appendChild(delref);
	            row.appendChild(_cell5);
	        }
	    }

	    root_node.appendChild(table);
	}

	function pickClass(classType) {
	    if (classType == 'ab') {
	        var button = document.getElementById(classType);
	        var button2 = document.getElementById('tb');
	        var button3 = document.getElementById('alb');
	        button.className = "pressedpicker";
	        button2.className = "pickertable";
	        button3.className = "pickertable";
	        loadAudiobooks();
	    }
	    if (classType == 'tb') {
	        var _button = document.getElementById(classType);
	        var _button2 = document.getElementById('ab');
	        var _button3 = document.getElementById('alb');
	        _button.className = "pressedpicker";
	        _button2.className = "pickertable";
	        _button3.className = "pickertable";
	        loadTextbooks();
	    }
	    if (classType == 'alb') {
	        var _button4 = document.getElementById(classType);
	        var _button5 = document.getElementById('ab');
	        var _button6 = document.getElementById('tb');
	        _button4.className = "pressedpicker";
	        _button5.className = "pickertable";
	        _button6.className = "pickertable";
	        loadBooks();
	    }
	}

	function search() {
	    //debugger;
	    searchResult.forEach(function (item, i, searchResult) {
	        searchResult.pop();
	    });
	    var query = document.getElementById('query').value;
	    //console.log(query.toLowerCase);

	    books.forEach(function (item, i, books) {
	        if (query == item.author || //.toLowerCase||
	        query == item.title || //.toLowerCase||
	        query == item.type || //.toLowerCase||
	        query == item.authorName || //.toLowerCase||
	        query == item.publishingHouse || //.toLowerCase||
	        query == item.branch //.toLowerCase
	        ) {
	                searchResult.push(item);
	            }
	    });
	    printSearchResult();
	}

	function printSearchResult() {

	    var data = searchResult;
	    var root_node = document.getElementById("content");
	    var old_table = document.getElementById("datatable");
	    root_node.removeChild(old_table);

	    root_node.innerHTML = "";
	    var table = document.createElement("table");
	    table.className = "datatable";
	    table.id = "datatable";
	    var tbody = document.createElement("tbody");
	    table.appendChild(tbody);
	    if (searchResult.length > 0) {
	        var row = document.createElement("tr");

	        var values = ["ID", "Type", "Author Name", "Title", "Branch", "Publishing House", ""];
	        tbody.appendChild(row);
	        for (var i = 0; i < values.length; i++) {
	            var cell = document.createElement("th");
	            cell.innerHTML = values[i];
	            row.appendChild(cell);
	        }
	        for (var _i4 = 0; _i4 < data.length; _i4++) {
	            row = document.createElement("tr");
	            tbody.appendChild(row);
	            values = [data[_i4].id, data[_i4].type, data[_i4].author.name, data[_i4].title, data[_i4].branch, data[_i4].publishingHouse];
	            for (var j = 0; j < values.length; j++) {
	                var _cell8 = document.createElement("td");
	                if (j == 3) {
	                    var ref = document.createElement("a");
	                    ref.href = "info.html?id=" + data[_i4].id;
	                    ref.innerHTML = values[j];
	                    ref.className = "editref";
	                    _cell8.appendChild(ref);
	                } else _cell8.innerHTML = values[j];

	                row.appendChild(_cell8);
	            }
	            var _cell7 = document.createElement("td");
	            var editref = document.createElement("a");
	            row.appendChild(_cell7);
	        }
	        root_node.appendChild(table);
	    } else {
	        var header = document.createElement("h2");
	        header.className = "datatable";
	        header.innerHTML = "No results was found...";
	        root_node.appendChild(header);
	        root_node.appendChild(table);
	    }
	}

	exports.loadBooks = loadBooks;
	exports.pickClass = pickClass;
	exports.search = search;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var sortFlag = false;
	var validationLog = [];

	var proxy = new Proxy(validationLog, {
	    get: function get(target, prop) {
	        console.log("Read " + prop);
	        return target[prop];
	    },
	    set: function set(target, prop, value) {
	        console.log("Write " + prop + " " + value);
	        target[prop] = value;
	        return true;
	    }
	});

	var Vali = function Vali(fieldName, validator) {
	    _classCallCheck(this, Vali);

	    this.isValid = validator;
	    this.fieldName = fieldName;
	};

	function getXmlHttp() {
	    var xmlhttp = void 0;
	    try {
	        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	        try {
	            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	        } catch (E) {
	            xmlhttp = false;
	        }
	    }
	    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	        xmlhttp = new XMLHttpRequest();
	    }
	    return xmlhttp;
	}

	function Clear() {
	    var inputs = document.querySelectorAll("input");
	    var inputsIterator = getInputsIterator(inputs);
	    inputsIterator.next();
	    for (var i = 0; i < inputs.length; i++) {
	        var inp = inputsIterator.next();
	        if (!inp.done && (inp.value.type == "text" || inp.type == "number")) inp.value.value = "";
	    }
	}

	function getUrlVars() {
	    var lets = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
	        lets[key] = value;
	    });
	    return lets;
	}

	function loadInfo() {
	    var Id = getUrlVars()["id"];
	    var xmlhttp = getXmlHttp();
	    xmlhttp.open('GET', 'http://localhost:2403/books/' + Id, false);
	    xmlhttp.send(null);
	    if (xmlhttp.status == 200) {
	        var result = JSON.parse(xmlhttp.responseText);
	        if (result.type == "Audiobook") {
	            var _result$type = result.type,
	                type = _result$type === undefined ? "default" : _result$type,
	                _result$title = result.title,
	                title = _result$title === undefined ? "default" : _result$title,
	                _result$authorName = result.authorName,
	                authorName = _result$authorName === undefined ? "default" : _result$authorName,
	                _result$publishingHou = result.publishingHouse,
	                publishingHouse = _result$publishingHou === undefined ? "default" : _result$publishingHou,
	                _result$branch = result.branch,
	                branch = _result$branch === undefined ? "default" : _result$branch,
	                _result$duration = result.duration,
	                duration = _result$duration === undefined ? "default" : _result$duration,
	                _result$narrator = result.narrator,
	                narrator = _result$narrator === undefined ? "default" : _result$narrator;

	            document.getElementById('type').value = type;
	            document.getElementById('title').value = title;
	            document.getElementById('author').value = authorName;
	            document.getElementById('phouse').value = publishingHouse;
	            document.getElementById('branch').value = branch;
	            document.getElementById('duration').value = duration;
	            document.getElementById('narrator').value = narrator;
	        }
	        if (result.type == "Textbook") {
	            var _type = result.type,
	                _title = result.title,
	                _authorName = result.authorName,
	                _publishingHouse = result.publishingHouse,
	                _branch = result.branch,
	                numberOfPage = result.numberOfPage,
	                binding = result.binding;

	            document.getElementById('type').value = _type;
	            document.getElementById('title').value = _title;
	            document.getElementById('author').value = _authorName;
	            document.getElementById('phouse').value = _publishingHouse;
	            document.getElementById('branch').value = _branch;
	            var numOfPage = document.getElementById('duration');
	            var label1 = document.getElementById('dur');
	            var bbinding = document.getElementById('narrator');
	            var label2 = document.getElementById('nar');
	            numOfPage.id = 'numofpage';
	            numOfPage.value = numberOfPage;
	            label1.innerText = 'Number of pages';
	            label1.id = 'num';
	            bbinding.id = 'binding';
	            bbinding.value = binding;
	            label2.innerText = 'Binding';
	            label2.id = 'bind';
	        }
	    }
	}

	function getInputsIterator(array) {
	    var nextIndex = 0;
	    return {
	        next: function next() {
	            return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { done: true };
	        }
	    };
	}

	function switchType(buttId) {
	    if (buttId == 'ab') {
	        var numOfPage = document.getElementById('numofpage');
	        var label1 = document.getElementById('num');
	        var bbinding = document.getElementById('binding');
	        var label2 = document.getElementById('bind');
	        var button = document.getElementById('cb');
	        document.getElementById(buttId).className = 'pressedpicker';
	        document.getElementById('tb').className = 'pickertable';
	        document.getElementById('type').value = "Audiobook";
	        button.setAttribute("onclick", "BooksModule.create('ab')");
	        numOfPage.id = 'duration';
	        numOfPage.setAttribute("onchange", "BooksModule.validate('duration','durerr')");
	        label1.innerText = 'Duration';
	        label1.id = 'dur';
	        bbinding.id = 'narrator';
	        bbinding.setAttribute("onchange", "BooksModule.validate('narrator','narerr')");
	        label2.innerText = 'Narrator';
	        label2.id = 'nar';
	    }
	    if (buttId == 'tb') {
	        var _numOfPage = document.getElementById('duration');
	        var _label = document.getElementById('dur');
	        var _bbinding = document.getElementById('narrator');
	        var _label2 = document.getElementById('nar');
	        var _button = document.getElementById('cb');
	        document.getElementById(buttId).className = 'pressedpicker';
	        document.getElementById('ab').className = 'pickertable';
	        document.getElementById('type').value = "Textbook";
	        _button.setAttribute("onclick", "BooksModule.create('tb')");
	        _numOfPage.id = 'numofpage';
	        _numOfPage.setAttribute("onchange", "BooksModule.validate('numofpage','durerr')");
	        _label.innerText = 'Number of pages';
	        _label.id = 'num';
	        _bbinding.id = 'binding';
	        _bbinding.setAttribute("onchange", "BooksModule.validate('binding','narerr')");
	        _label2.innerText = 'Binding';
	        _label2.id = 'bind';
	    }
	}

	function deleteById(itemId) {
	    if (confirm("Delete?")) {
	        var promise = fetch('http://localhost:2403/books/' + itemId, {
	            method: 'DELETE'
	        }).then(function (response) {
	            if (response.status == 200) {
	                // console.log(response);
	                alert("Operation complete");
	                var row = document.getElementById(itemId).parentNode.parentNode;
	                row.parentNode.removeChild(row);
	            } else console.log(response.statusText);
	        });
	    }
	}

	function edit() {
	    var Id = getUrlVars()["id"];
	    var xmlhttp = getXmlHttp();
	    xmlhttp.open('GET', 'http://localhost:2403/books/' + Id, false);
	    xmlhttp.send(null);
	    if (xmlhttp.status == 200) {
	        var result = JSON.parse(xmlhttp.responseText);
	        if (result.type == "Audiobook") {
	            document.getElementById('save').setAttribute('onclick', "BooksModule.save('ab')");
	            document.getElementById('type').value = result.type;
	            document.getElementById('title').value = result.title;
	            document.getElementById('author').value = result.authorName;
	            document.getElementById('phouse').value = result.publishingHouse;
	            document.getElementById('branch').value = result.branch;
	            document.getElementById('duration').value = result.duration;
	            document.getElementById('narrator').value = result.narrator;
	        }
	        if (result.type == "Textbook") {
	            document.getElementById('save').setAttribute('onclick', "BooksModule.save('tb')");
	            document.getElementById('type').value = result.type;
	            document.getElementById('title').value = result.title;
	            document.getElementById('author').value = result.authorName;
	            document.getElementById('phouse').value = result.publishingHouse;
	            document.getElementById('branch').value = result.branch;
	            var numOfPage = document.getElementById('duration');
	            var label1 = document.getElementById('dur');
	            var bbinding = document.getElementById('narrator');
	            var label2 = document.getElementById('nar');
	            numOfPage.id = 'numofpage';
	            numOfPage.value = result.numberOfPage;
	            numOfPage.setAttribute("onchange", "BooksModule.validate('numofpage','durerr')");
	            label1.innerText = 'Number of pages';
	            label1.id = 'num';
	            bbinding.id = 'binding';
	            bbinding.value = result.binding;
	            bbinding.setAttribute("onchange", "BooksModule.validate('binding','narerr')");
	            label2.innerText = 'Binding';
	            label2.id = 'bind';
	        }
	    }
	}

	function save(callType) {
	    var Id = getUrlVars()["id"];
	    var title = document.getElementById('title').value;
	    var author = document.getElementById('author').value;
	    var publishingHouse = document.getElementById('phouse').value;
	    var branch = document.getElementById('branch').value;
	    if (callType == 'ab') {
	        var duration = document.getElementById('duration').value;
	        var narrator = document.getElementById('narrator').value;
	        var type = "Audiobook";
	        var tmp = "id=" + encodeURIComponent(Id) + "type=" + encodeURIComponent(type) + "&title=" + encodeURIComponent(title) + "&authorName=" + encodeURIComponent(author) + "&publishingHouse=" + encodeURIComponent(publishingHouse) + "&narrator=" + encodeURIComponent(narrator) + "&duration=" + encodeURIComponent(duration) + "&branch=" + encodeURIComponent(branch);
	    }
	    if (callType == 'tb') {
	        var numofpage = document.getElementById('numofpage').value;
	        var binding = document.getElementById('binding').value;
	        var _type2 = "Textbook";
	        var tmp = "id=" + encodeURIComponent(Id) + "type=" + encodeURIComponent(_type2) + "&title=" + encodeURIComponent(title) + "&authorName=" + encodeURIComponent(author) + "&publishingHouse=" + encodeURIComponent(publishingHouse) + "&numberOfPage=" + encodeURIComponent(numofpage) + "&binding=" + encodeURIComponent(binding) + "&branch=" + encodeURIComponent(branch);
	    }

	    if (validationLog.length != 0) {
	        var troubles = "";
	        validationLog.forEach(function (item, i, validationLog) {
	            if (!item.isValid) troubles += item.fieldName + ", ";
	        });
	        alert("Validation failed. Plz fill fields correctly: " + troubles);
	    } else {
	        var promise = fetch('http://localhost:2403/books/' + Id, {
	            method: 'PUT',
	            headers: { "Content-Type": "application/x-www-form-urlencoded" },
	            body: tmp
	        }).then(function (response) {
	            return response.json();
	        }).then(function (item) {
	            alert("Operation complete! " + item.title + " saved.");
	            document.location.href = "lab1.html";
	        });
	    }
	}

	function cancel() {
	    document.location.href = "lab1.html";
	}

	function create(callType) {
	    var title = document.getElementById('title').value;
	    var author = document.getElementById('author').value;
	    var publishingHouse = document.getElementById('phouse').value;
	    var branch = document.getElementById('branch').value;
	    var rdate = document.getElementById('rdate').value;
	    if (callType == 'ab') {
	        var duration = document.getElementById('duration').value;
	        var narrator = document.getElementById('narrator').value;
	        var type = "Audiobook";
	        var tmp = "type=" + encodeURIComponent(type) + "&title=" + encodeURIComponent(title) + "&authorName=" + encodeURIComponent(author) + "&publishingHouse=" + encodeURIComponent(publishingHouse) + "&narrator=" + encodeURIComponent(narrator) + "&duration=" + encodeURIComponent(duration) + "&branch=" + encodeURIComponent(branch) + "&releaseDate=" + encodeURIComponent(rdate);
	    }
	    if (callType == 'tb') {
	        var numofpage = document.getElementById('numofpage').value;
	        var binding = document.getElementById('binding').value;
	        var _type3 = "Textbook";
	        var tmp = "type=" + encodeURIComponent(_type3) + "&title=" + encodeURIComponent(title) + "&authorName=" + encodeURIComponent(author) + "&publishingHouse=" + encodeURIComponent(publishingHouse) + "&numberOfPage=" + encodeURIComponent(numofpage) + "&binding=" + encodeURIComponent(binding) + "&branch=" + encodeURIComponent(branch) + "&releaseDate=" + encodeURIComponent(rdate);
	    }

	    if (validationLog.length != 0) {
	        var troubles = "";
	        proxy.forEach(function (item, i, proxy) {
	            if (!item.isValid) troubles += item.fieldName + ", ";
	        });

	        alert("Validation failed. Plz fill fields correctly: " + troubles);
	    } else {
	        var promise = fetch('http://localhost:2403/books', {
	            method: 'POST',
	            headers: { "Content-Type": "application/x-www-form-urlencoded" },
	            body: tmp
	        }).then(function (response) {
	            return response.json();
	        }).then(function (item) {
	            alert("Operation complete! " + item.title + " added.");
	            document.location.href = "lab1.html";
	        });
	    }
	}

	function validate(fieldId, msgStab) {
	    var field = document.getElementById(fieldId);
	    var msgstab = document.getElementById(msgStab);

	    if (fieldId == "type") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("type", false));
	        }
	        if (field.value == "Audiobook" || field.value == "Textbook") {
	            msgstab.style = "visibility: hidden";
	            deleteFromLog("type");
	        } else {
	            msgstab.innerHTML = "This field must be Audiobook or Textbook only";
	            msgstab.style = "visibility: unset";
	            pushInLog(new Vali("type", false));
	        }
	    } else if (fieldId == "duration") {
	        if (!isNaN(parseInt(field.value))) {
	            if (parseInt(field.value) > 0) {
	                msgstab.style = "visibility: hidden";
	                deleteFromLog("duration");
	            }
	        } else {
	            msgstab.innerHTML = "This field must be a number more than 0";
	            msgstab.style = "visibility: unset";
	            pushInLog(new Vali("duration", false));
	        }
	    } else if (fieldId == "title") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("title", false));
	        } else {
	            document.getElementById(msgStab).style = "visibility: hidden";
	            deleteFromLog("title");
	        }
	    } else if (fieldId == "author") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("author", false));
	        } else {
	            document.getElementById(msgStab).style = "visibility: hidden";
	            deleteFromLog("author");
	        }
	    } else if (fieldId == "phouse") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("phouse", false));
	        } else {
	            document.getElementById(msgStab).style = "visibility: hidden";
	            deleteFromLog("phouse");
	        }
	    } else if (fieldId == "branch") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("branch", false));
	        } else {
	            document.getElementById(msgStab).style = "visibility: hidden";
	            deleteFromLog("branch");
	        }
	    } else if (fieldId == "narrator") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("narrator", false));
	        } else {
	            document.getElementById(msgStab).style = "visibility: hidden";
	            deleteFromLog("narrator");
	        }
	    } else if (fieldId == "numofpage") {
	        if (!isNaN(parseInt(field.value))) {
	            if (parseInt(field.value) > 0) {
	                msgstab.style = "visibility: hidden";
	                deleteFromLog("numofpage");
	            }
	        } else {
	            msgstab.innerHTML = "This field must be a number more than 0";
	            msgstab.style = "visibility: unset";
	            pushInLog(new Vali("numofpage", false));
	        }
	    } else if (fieldId == "binding") {
	        if (field.value == "") {
	            msgstab.style = "visibility: unset";
	            msgstab.innerHTML = "This field is required";
	            pushInLog(new Vali("binding", false));
	        } else {
	            document.getElementById(msgStab).style = "visibility: hidden";
	            deleteFromLog("binding");
	        }
	    }
	}

	function deleteFromLog(fieldName) {
	    var position = void 0;
	    validationLog.forEach(function (item, i, validationLog) {
	        if (item.fieldName == fieldName) position = i;
	    });
	    validationLog.splice(position, 1);
	}

	function pushInLog(item) {
	    var flag = false;
	    validationLog.forEach(function (it, i, validationLog) {
	        if (it.fieldName == item.fieldName) flag = true;
	    });
	    // if(!flag)validationLog.push(item);
	    if (!flag) proxy.push(item);else return;
	}

	function sortGrid() {
	    var grid = document.getElementById('datatable');
	    var target = event.target;
	    var type = target.getAttribute('data-type');
	    var colNum = target.cellIndex;
	    if (target.tagName != 'TH') return;else {
	        var tbody = grid.getElementsByTagName('tbody')[0];
	        var rowsArray = [].slice.call(tbody.rows);
	        var compare;

	        switch (type) {
	            case 'number':
	                compare = function compare(rowA, rowB) {
	                    if (!sortFlag) {
	                        sortFlag = true;
	                        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
	                    } else {
	                        sortFlag = false;
	                        return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
	                    }
	                };
	                break;
	            case 'string':
	                if (!sortFlag) {
	                    sortFlag = true;
	                    compare = function compare(rowA, rowB) {
	                        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
	                    };
	                    break;
	                } else {
	                    sortFlag = false;
	                    compare = function compare(rowA, rowB) {
	                        return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML ? 1 : -1;
	                    };
	                    break;
	                }
	        };
	    }
	    rowsArray.sort(compare);
	    grid.removeChild(tbody);
	    for (var i = 0; i < rowsArray.length; i++) {
	        tbody.appendChild(rowsArray[i]);
	    }
	    grid.appendChild(tbody);
	}

	exports.sortGrid = sortGrid;
	exports.cancel = cancel;
	exports.save = save;
	exports.edit = edit;
	exports.deleteById = deleteById;
	exports.switchType = switchType;
	exports.loadInfo = loadInfo;
	exports.Clear = Clear;
	exports.create = create;
	exports.validate = validate;

/***/ }
/******/ ]);