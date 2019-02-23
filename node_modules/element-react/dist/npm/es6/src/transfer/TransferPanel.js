import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, View } from '../../libs';
import Input from '../input';
import Checkbox from '../checkbox';
import i18n from '../locale';

var TransferPanel = function (_Component) {
  _inherits(TransferPanel, _Component);

  function TransferPanel(props) {
    _classCallCheck(this, TransferPanel);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleMouseEnter = function () {
      return _this.setState({ inputHover: true });
    };

    _this.handleMouseLeave = function () {
      return _this.setState({ inputHover: false });
    };

    _this.clearQuery = function () {
      if (_this.inputIcon === 'circle-close') {
        _this.setState({ query: '' });
      }
    };

    _this.handleAllCheckedChange = function (ischecked) {
      var checked = ischecked ? _this.checkableData.map(function (item) {
        return item[_this.keyProp];
      }) : [];
      _this.props.onChange(checked);
    };

    _this.handleCheckedChange = function (value) {
      _this.props.onChange(value);
    };

    _this.handleInputChange = function (value) {
      _this.setState({ query: value });
    };

    _this.state = {
      query: '',
      inputHover: false
    };
    return _this;
  }

  TransferPanel.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        filterable = _props.filterable,
        title = _props.title,
        data = _props.data,
        renderContent = _props.renderContent,
        checked = _props.checked,
        placeholder = _props.placeholder;
    var query = this.state.query;

    return React.createElement(
      'div',
      { className: 'el-transfer-panel' },
      React.createElement(
        'p',
        { className: 'el-transfer-panel__header' },
        title
      ),
      React.createElement(
        'div',
        { className: 'el-transfer-panel__body' },
        filterable && React.createElement(Input, {
          className: 'el-transfer-panel__filter',
          value: query,
          size: 'small',
          placeholder: placeholder,
          icon: this.inputIcon,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          onIconClick: this.clearQuery,
          onChange: this.handleInputChange
        }),
        React.createElement(
          View,
          { show: !this.hasNoMatch && data.length > 0 },
          React.createElement(
            Checkbox.Group,
            {
              value: checked,
              'v-show': '',
              className: this.classNames({
                'is-filterable': filterable,
                'el-transfer-panel__list': true
              }),
              onChange: this.handleCheckedChange
            },
            this.filteredData.map(function (item, index) {
              return React.createElement(
                Checkbox,
                {
                  className: 'el-transfer-panel__item',
                  label: item[_this2.labelProp],
                  disabled: item[_this2.disabledProp],
                  value: item[_this2.keyProp],
                  key: index
                },
                React.createElement(OptionContent, {
                  option: item,
                  renderContent: renderContent,
                  labelProp: _this2.labelProp,
                  keyProp: _this2.keyProp
                })
              );
            })
          )
        ),
        React.createElement(
          View,
          { show: this.hasNoMatch },
          React.createElement(
            'p',
            { className: 'el-transfer-panel__empty' },
            i18n.t('el.transfer.noMatch')
          )
        ),
        React.createElement(
          View,
          { show: data.length === 0 && !this.hasNoMatch },
          React.createElement(
            'p',
            { className: 'el-transfer-panel__empty' },
            i18n.t('el.transfer.noData')
          )
        )
      ),
      React.createElement(
        'p',
        { className: 'el-transfer-panel__footer' },
        React.createElement(
          Checkbox,
          {
            checked: this.allChecked,
            onChange: this.handleAllCheckedChange,
            indeterminate: this.isIndeterminate
          },
          this.checkedSummary
        ),
        this.props.children
      )
    );
  };

  _createClass(TransferPanel, [{
    key: 'allChecked',
    get: function get() {
      var _this3 = this;

      var checkableDataKeys = this.checkableData.map(function (item) {
        return item[_this3.keyProp];
      });
      return checkableDataKeys.length > 0 && checkableDataKeys.every(function (item) {
        return _this3.props.checked.includes(item);
      });
    }
  }, {
    key: 'filteredData',
    get: function get() {
      var _this4 = this;

      return this.props.data.filter(function (item) {
        if (typeof _this4.props.filterMethod === 'function') {
          return _this4.props.filterMethod(_this4.state.query, item);
        } else {
          var label = item[_this4.labelProp] || item[_this4.keyProp].toString();
          return label.toLowerCase().includes(_this4.state.query.toLowerCase());
        }
      });
    }
  }, {
    key: 'checkableData',
    get: function get() {
      var _this5 = this;

      return this.filteredData.filter(function (item) {
        return !item[_this5.disabledProp];
      });
    }
  }, {
    key: 'checkedSummary',
    get: function get() {
      var checkedLength = this.props.checked.length;
      var dataLength = this.props.data.length;
      var _props$footerFormat = this.props.footerFormat,
          noChecked = _props$footerFormat.noChecked,
          hasChecked = _props$footerFormat.hasChecked;

      if (noChecked && hasChecked) {
        return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength) : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return checkedLength > 0 ? i18n.t('el.transfer.hasCheckedFormat', {
          total: dataLength,
          checked: checkedLength
        }) : i18n.t('el.transfer.noCheckedFormat', { total: dataLength });
      }
    }
  }, {
    key: 'isIndeterminate',
    get: function get() {
      var checkedLength = this.props.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    }
  }, {
    key: 'hasNoMatch',
    get: function get() {
      var query = this.state.query;

      return query.length > 0 && this.filteredData.length === 0;
    }
  }, {
    key: 'inputIcon',
    get: function get() {
      var _state = this.state,
          query = _state.query,
          inputHover = _state.inputHover;

      return query.length > 0 && inputHover ? 'circle-close' : 'search';
    }
  }, {
    key: 'labelProp',
    get: function get() {
      return this.props.propsAlias.label;
    }
  }, {
    key: 'keyProp',
    get: function get() {
      return this.props.propsAlias.key;
    }
  }, {
    key: 'disabledProp',
    get: function get() {
      return this.props.propsAlias.disabled;
    }
  }]);

  return TransferPanel;
}(Component);

TransferPanel.propTypes = {
  data: PropTypes.array,
  renderContent: PropTypes.func,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  filterable: PropTypes.bool,
  footerFormat: PropTypes.object,
  filterMethod: PropTypes.func,
  propsAlias: PropTypes.object,
  onChange: PropTypes.func,
  checked: PropTypes.array
};
TransferPanel.defaultProps = {
  data: [],
  footerFormat: {},
  propsAlias: {},
  onChange: function onChange() {}
};
export default TransferPanel;


var OptionContent = function OptionContent(_ref) {
  var option = _ref.option,
      renderContent = _ref.renderContent,
      labelProp = _ref.labelProp,
      keyProp = _ref.keyProp;

  return renderContent ? renderContent(option) : React.createElement(
    'span',
    null,
    option[labelProp] || option[keyProp]
  );
};