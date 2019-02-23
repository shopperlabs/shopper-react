'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperBase = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _libs = require('../../../libs');

var _utils = require('../../../libs/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopperBase = exports.PopperBase = function (_Component) {
  (0, _inherits3.default)(PopperBase, _Component);
  (0, _createClass3.default)(PopperBase, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        //()=>HtmlElement
        getPopperRefElement: _libs.PropTypes.func,
        popperMixinOption: _libs.PropTypes.object
      };
    }
  }]);

  function PopperBase(props) {
    (0, _classCallCheck3.default)(this, PopperBase);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PopperBase.__proto__ || Object.getPrototypeOf(PopperBase)).call(this, props));

    _utils.PopperReactMixin.call(_this, function () {
      return _this.refs.root;
    }, props.getPopperRefElement, Object.assign({
      boundariesPadding: 0,
      gpuAcceleration: false
    }, props.popperMixinOption));
    return _this;
  }

  return PopperBase;
}(_libs.Component);

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PopperBase, 'PopperBase', 'src/date-picker/panel/PopperBase.js');
}();

;