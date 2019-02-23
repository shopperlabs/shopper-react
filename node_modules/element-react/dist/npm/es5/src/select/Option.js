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

var Option = function (_Component) {
  (0, _inherits3.default)(Option, _Component);

  function Option(props) {
    (0, _classCallCheck3.default)(this, Option);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

    _this.state = {
      index: -1,
      visible: true,
      hitState: false
    };
    return _this;
  }

  (0, _createClass3.default)(Option, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parent().onOptionCreate(this);

      this.setState({
        index: this.parent().state.options.indexOf(this)
      });

      if (this.currentSelected() === true) {
        this.parent().addOptionToValue(this, true);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().onOptionDestroy(this);
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'currentSelected',
    value: function currentSelected() {
      return this.props.selected || (this.parent().props.multiple ? this.parent().state.value.indexOf(this.props.value) > -1 : this.parent().state.value === this.props.value);
    }
  }, {
    key: 'currentLabel',
    value: function currentLabel() {
      return this.props.label || (typeof this.props.value === 'string' || typeof this.props.value === 'number' ? this.props.value : '');
    }
  }, {
    key: 'itemSelected',
    value: function itemSelected() {
      if (Object.prototype.toString.call(this.parent().state.selected) === '[object Object]') {
        return this === this.parent().state.selected;
      } else if (Array.isArray(this.parent().state.selected)) {
        return this.parent().state.selected.map(function (el) {
          return el.props.value;
        }).indexOf(this.props.value) > -1;
      }

      return false;
    }
  }, {
    key: 'hoverItem',
    value: function hoverItem() {
      if (!this.props.disabled && !this.parent().props.disabled) {
        this.parent().setState({
          hoverIndex: this.parent().state.options.indexOf(this)
        });
      }
    }
  }, {
    key: 'selectOptionClick',
    value: function selectOptionClick() {
      if (this.props.disabled !== true && this.parent().props.disabled !== true) {
        this.parent().onOptionClick(this);
      }
    }
  }, {
    key: 'queryChange',
    value: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      var parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      var visible = new RegExp(parsedQuery, 'i').test(this.currentLabel());

      if (!visible) {
        this.parent().setState({
          filteredOptionsCount: this.parent().state.filteredOptionsCount - 1
        });
      }

      this.setState({ visible: visible });
    }
  }, {
    key: 'resetIndex',
    value: function resetIndex() {
      this.setState({
        index: this.parent().state.options.indexOf(this)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          visible = _state.visible,
          index = _state.index;


      return _react2.default.createElement(
        _libs.View,
        { show: visible },
        _react2.default.createElement(
          'li',
          {
            style: this.style(),
            className: this.className('el-select-dropdown__item', {
              'selected': this.itemSelected(),
              'is-disabled': this.props.disabled || this.parent().props.disabled,
              'hover': this.parent().state.hoverIndex === index
            }),
            onMouseEnter: this.hoverItem.bind(this),
            onClick: this.selectOptionClick.bind(this)
          },
          this.props.children || _react2.default.createElement(
            'span',
            null,
            this.currentLabel()
          )
        )
      );
    }
  }]);
  return Option;
}(_libs.Component);

var _default = Option;
exports.default = _default;


Option.contextTypes = {
  component: _libs.PropTypes.any
};

Option.propTypes = {
  value: _libs.PropTypes.any.isRequired,
  label: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  selected: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Option, 'Option', 'src/select/Option.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/Option.jsx');
}();

;