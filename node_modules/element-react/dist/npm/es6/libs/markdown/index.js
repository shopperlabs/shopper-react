import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import prism from 'prismjs';

import Canvas from './canvas';

var Markdown = function (_React$Component) {
  _inherits(Markdown, _React$Component);

  function Markdown(props) {
    _classCallCheck(this, Markdown);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.components = new Map();

    _this.renderer = new marked.Renderer();
    _this.renderer.table = function (header, body) {
      return '<table class="grid"><thead>' + header + '</thead><tbody>' + body + '</tbody></table>';
    };
    return _this;
  }

  Markdown.prototype.componentDidMount = function componentDidMount() {
    this.renderDOM();
  };

  Markdown.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderDOM();
  };

  Markdown.prototype.renderDOM = function renderDOM() {
    for (var _iterator = this.components, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var _ref = _ref2;
      var id = _ref[0];
      var component = _ref[1];

      var div = document.getElementById(id);

      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
  };

  Markdown.prototype.render = function render() {
    var _this2 = this;

    var document = this.document(localStorage.getItem('ELEMENT_LANGUAGE') || 'zh-CN');

    if (typeof document === 'string') {
      this.components.clear();

      var html = marked(document.replace(/:::\s?demo\s?([^]+?):::/g, function (match, p1, offset) {
        var id = offset.toString(36);

        _this2.components.set(id, React.createElement(Canvas, Object.assign({
          name: _this2.constructor.name.toLowerCase()
        }, _this2.props), p1));

        return '<div id=' + id + '></div>';
      }), { renderer: this.renderer });

      return React.createElement('div', { dangerouslySetInnerHTML: {
          __html: html
        } });
    } else {
      return React.createElement('span', null);
    }
  };

  return Markdown;
}(React.Component);

export default Markdown;