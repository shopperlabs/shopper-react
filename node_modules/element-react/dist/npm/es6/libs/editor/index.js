import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';

import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/comment/comment';

import 'codemirror/lib/codemirror.css';
import './style.scss';

var Editor = function (_Component) {
  _inherits(Editor, _Component);

  function Editor() {
    _classCallCheck(this, Editor);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Editor.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _props = this.props,
        onChange = _props.onChange,
        value = _props.value;


    this.cm = CodeMirror(this.editor, {
      mode: 'jsx',
      theme: 'react',
      keyMap: 'sublime',
      viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false
    });

    this.cm.setValue(value);

    this.cm.on('changes', function (cm) {
      if (onChange) {
        clearTimeout(_this2.timeout);

        _this2.timeout = setTimeout(function () {
          onChange(cm.getValue());
        }, 300);
      }
    });
  };

  Editor.prototype.render = function render() {
    var _this3 = this;

    return React.createElement('div', { className: 'editor', ref: function ref(_ref) {
        return _this3.editor = _ref;
      } });
  };

  return Editor;
}(Component);

export default Editor;


Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};