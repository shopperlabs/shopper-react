"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDGenerator = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IDGenerator = exports.IDGenerator = function () {
  function IDGenerator() {
    (0, _classCallCheck3.default)(this, IDGenerator);

    this.id = 0;
  }

  (0, _createClass3.default)(IDGenerator, [{
    key: "next",
    value: function next() {
      return this.id++ & 0xffff;
    }
  }]);
  return IDGenerator;
}();

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(IDGenerator, "IDGenerator", "libs/utils/IDGenerator.js");
}();

;