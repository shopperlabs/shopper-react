"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ProgressEvent = exports.RawFile = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RawFile = exports.RawFile = function (_File2) {
  (0, _inherits3.default)(RawFile, _File2);

  function RawFile() {
    (0, _classCallCheck3.default)(this, RawFile);
    return (0, _possibleConstructorReturn3.default)(this, (RawFile.__proto__ || Object.getPrototypeOf(RawFile)).apply(this, arguments));
  }

  return RawFile;
}(File);

// 自定义file类型


var _ProgressEvent = exports._ProgressEvent = function (_ProgressEvent2) {
  (0, _inherits3.default)(_ProgressEvent, _ProgressEvent2);

  function _ProgressEvent() {
    (0, _classCallCheck3.default)(this, _ProgressEvent);
    return (0, _possibleConstructorReturn3.default)(this, (_ProgressEvent.__proto__ || Object.getPrototypeOf(_ProgressEvent)).apply(this, arguments));
  }

  return _ProgressEvent;
}(ProgressEvent);

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RawFile, "RawFile", "src/upload/Types.js");

  __REACT_HOT_LOADER__.register(_ProgressEvent, "_ProgressEvent", "src/upload/Types.js");
}();

;