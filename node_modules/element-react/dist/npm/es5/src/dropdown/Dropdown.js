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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _libs = require('../../libs');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = function (_Component) {
  (0, _inherits3.default)(Dropdown, _Component);

  function Dropdown(props) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  (0, _createClass3.default)(Dropdown, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initEvent();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props, state) {
      if (state.visible != this.state.visible) {
        this.refs.dropdown.onVisibleChange(state.visible);

        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(state.visible);
        }
      }
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside() {
      if (this.state.visible) {
        this.setState({ visible: false });
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this2.setState({ visible: true });
      }, 250);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this3.setState({ visible: false });
      }, 150);
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'initEvent',
    value: function initEvent() {
      var _props = this.props,
          trigger = _props.trigger,
          splitButton = _props.splitButton;

      var triggerElm = _reactDom2.default.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', this.show.bind(this));
        triggerElm.addEventListener('mouseleave', this.hide.bind(this));

        var dropdownElm = _reactDom2.default.findDOMNode(this.refs.dropdown);

        dropdownElm.addEventListener('mouseenter', this.show.bind(this));
        dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
      } else if (trigger === 'click') {
        triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: 'handleMenuItemClick',
    value: function handleMenuItemClick(command, instance) {
      var _this4 = this;

      if (this.props.hideOnClick) {
        this.setState({
          visible: false
        });
      }

      if (this.props.onCommand) {
        setTimeout(function () {
          _this4.props.onCommand(command, instance);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          splitButton = _props2.splitButton,
          type = _props2.type,
          size = _props2.size,
          menu = _props2.menu;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-dropdown') },
        splitButton ? _react2.default.createElement(
          _button2.default.Group,
          null,
          _react2.default.createElement(
            _button2.default,
            { type: type, size: size, onClick: this.props.onClick.bind(this) },
            this.props.children
          ),
          _react2.default.createElement(
            _button2.default,
            { ref: 'trigger', type: type, size: size, className: 'el-dropdown__caret-button' },
            _react2.default.createElement('i', { className: 'el-dropdown__icon el-icon-caret-bottom' })
          )
        ) : _react2.default.cloneElement(this.props.children, { ref: 'default' }),
        _react2.default.cloneElement(menu, {
          ref: 'dropdown'
        })
      );
    }
  }]);
  return Dropdown;
}(_libs.Component);

Dropdown.childContextTypes = {
  component: _libs.PropTypes.any
};

Dropdown.propTypes = {
  menu: _libs.PropTypes.node.isRequired,
  type: _libs.PropTypes.string,
  size: _libs.PropTypes.string,
  trigger: _libs.PropTypes.oneOf(['hover', 'click']),
  menuAlign: _libs.PropTypes.oneOf(['start', 'end']),
  splitButton: _libs.PropTypes.bool,
  hideOnClick: _libs.PropTypes.bool,
  onClick: _libs.PropTypes.func,
  onCommand: _libs.PropTypes.func,
  onVisibleChange: _libs.PropTypes.func
};

Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
};

var _default = (0, _reactClickOutside2.default)(Dropdown);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Dropdown, 'Dropdown', 'src/dropdown/Dropdown.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dropdown/Dropdown.jsx');
}();

;