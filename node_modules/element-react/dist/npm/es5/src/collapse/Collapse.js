'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Collapse = function (_Component) {
  (0, _inherits3.default)(Collapse, _Component);

  function Collapse(props) {
    (0, _classCallCheck3.default)(this, Collapse);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    _this.state = {
      activeNames: [].concat(_this.props.value)
    };
    return _this;
  }

  (0, _createClass3.default)(Collapse, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setActiveNames(nextProps.value);
    }
  }, {
    key: 'setActiveNames',
    value: function setActiveNames(activeNames) {
      var _this2 = this;

      activeNames = [].concat(activeNames);
      this.setState({ activeNames: activeNames }, function () {
        return _this2.props.onChange(activeNames);
      });
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick(name) {
      var activeNames = this.state.activeNames;


      if (this.props.accordion) {
        this.setActiveNames(activeNames[0] && activeNames[0] === name ? '' : name);
      } else {
        if (activeNames.includes(name)) {
          this.setActiveNames(activeNames.filter(function (item) {
            return item !== name;
          }));
        } else {
          this.setActiveNames(activeNames.concat(name));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var content = _react2.default.Children.map(this.props.children, function (child, idx) {
        var name = child.props.name || idx.toString();
        return _react2.default.cloneElement(child, {
          isActive: _this3.state.activeNames.includes(name),
          key: idx,
          name: name,
          onClick: function onClick(item) {
            return _this3.handleItemClick(item);
          }
        });
      });
      return _react2.default.createElement(
        'div',
        { className: 'el-collapse' },
        content
      );
    }
  }]);
  return Collapse;
}(_libs.Component);

Collapse.defaultProps = {
  value: [],
  onChange: function onChange() {}
};
var _default = Collapse;
exports.default = _default;


Collapse.propTypes = {
  accordion: _libs.PropTypes.bool,
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.array, _libs.PropTypes.string]),
  onChange: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Collapse, 'Collapse', 'src/collapse/Collapse.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/collapse/Collapse.jsx');
}();

;