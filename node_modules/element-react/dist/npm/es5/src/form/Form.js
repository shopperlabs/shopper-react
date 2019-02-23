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

var Form = function (_Component) {
  (0, _inherits3.default)(Form, _Component);

  function Form(props) {
    (0, _classCallCheck3.default)(this, Form);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      fields: []
    };
    return _this;
  }

  (0, _createClass3.default)(Form, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(newProps) {
      var model = newProps.model;

      var oldModel = this.props.model;
      if (!model) return;
      var diff = Object.keys(model).filter(function (key) {
        return model[key] !== oldModel[key];
      });
      if (diff.length) {
        this.state.fields.filter(function (_ref) {
          var props = _ref.props;
          return props.prop.match(diff);
        }).map(function (field) {
          return field.validate('', function () {
            return undefined;
          });
        });
      }
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'addField',
    value: function addField(field) {
      this.state.fields.push(field);
    }
  }, {
    key: 'removeField',
    value: function removeField(field) {
      if (field.props.prop) {
        this.state.fields.splice(this.state.fields.indexOf(field), 1);
      }
    }
  }, {
    key: 'resetFields',
    value: function resetFields() {
      this.state.fields.forEach(function (field) {
        field.resetField();
      });
    }
  }, {
    key: 'validate',
    value: function validate(callback) {
      var _this2 = this;

      var valid = true;
      var count = 0;

      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (this.state.fields.length === 0 && callback) {
        callback(true);
      }

      this.state.fields.forEach(function (field) {
        field.validate('', function (errors) {
          if (errors) {
            valid = false;
          }
          if (typeof callback === 'function' && ++count === _this2.state.fields.length) {
            callback(valid);
          }
        });
      });
    }
  }, {
    key: 'validateField',
    value: function validateField(prop, cb) {
      var field = this.state.fields.filter(function (field) {
        return field.props.prop === prop;
      })[0];

      if (!field) {
        throw new Error('must call validateField with valid prop string!');
      }

      field.validate('', cb);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { style: this.style(), className: this.className('el-form', this.props.labelPosition && 'el-form--label-' + this.props.labelPosition, {
            'el-form--inline': this.props.inline
          }), onSubmit: this.props.onSubmit },
        this.props.children
      );
    }
  }]);
  return Form;
}(_libs.Component);

var _default = Form;
exports.default = _default;


Form.childContextTypes = {
  component: _libs.PropTypes.any
};

Form.propTypes = {
  model: _libs.PropTypes.object,
  rules: _libs.PropTypes.object,
  labelPosition: _libs.PropTypes.oneOf(['right', 'left', 'top']),
  labelWidth: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  labelSuffix: _libs.PropTypes.string,
  inline: _libs.PropTypes.bool,
  onSubmit: _libs.PropTypes.func
};

Form.defaultProps = {
  labelPosition: 'right',
  labelSuffix: ''
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Form, 'Form', 'src/form/Form.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/form/Form.jsx');
}();

;