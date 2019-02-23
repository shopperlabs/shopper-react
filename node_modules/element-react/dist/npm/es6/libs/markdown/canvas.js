import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import marked from 'marked';
import { transform } from 'babel-standalone';

import Editor from '../editor';

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas(props) {
    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.playerId = '' + parseInt(Math.random() * 1e9).toString(36);
    _this.document = _this.props.children.match(/([^]*)\n?(```[^]+```)/);
    _this.description = marked(_this.document[1]);
    _this.source = _this.document[2].match(/```(.*)\n?([^]+)```/);

    _this.state = {
      showBlock: false
    };
    return _this;
  }

  Canvas.prototype.componentDidMount = function componentDidMount() {
    this.renderSource(this.source[2]);
  };

  Canvas.prototype.blockControl = function blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    });
  };

  Canvas.prototype.renderSource = function renderSource(value) {
    var _this2 = this;

    import('../../src').then(function (Element) {
      var args = ['context', 'React', 'ReactDOM'];
      var argv = [_this2, React, ReactDOM];

      for (var key in Element) {
        args.push(key);
        argv.push(Element[key]);
      }

      return {
        args: args,
        argv: argv
      };
    }).then(function (_ref) {
      var args = _ref.args,
          argv = _ref.argv;

      var code = transform('\n        class Demo extends React.Component {\n          ' + value + '\n        }\n\n        ReactDOM.render(<Demo {...context.props} />, document.getElementById(\'' + _this2.playerId + '\'))\n      ', {
        presets: ['es2015', 'react']
      }).code;

      args.push(code);

      new (Function.prototype.bind.apply(Function, [null].concat(args)))().apply(null, argv);

      _this2.source[2] = value;
    }).catch(function (err) {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  };

  Canvas.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      'div',
      { className: 'demo-block demo-box demo-' + this.props.name },
      React.createElement('div', { className: 'source', id: this.playerId }),
      this.state.showBlock && React.createElement(
        'div',
        { className: 'meta' },
        this.description && React.createElement('div', {
          ref: 'description',
          className: 'description',
          dangerouslySetInnerHTML: { __html: this.description }
        }),
        React.createElement(Editor, {
          value: this.source[2],
          onChange: function onChange(code) {
            return _this3.renderSource(code);
          }
        })
      ),
      React.createElement(
        'div',
        { className: 'demo-block-control', onClick: this.blockControl.bind(this) },
        this.state.showBlock ? React.createElement(
          'span',
          null,
          React.createElement('i', { className: 'el-icon-caret-top' }),
          this.props.locale.hide
        ) : React.createElement(
          'span',
          null,
          React.createElement('i', { className: 'el-icon-caret-bottom' }),
          this.props.locale.show
        )
      )
    );
  };

  return Canvas;
}(React.Component);

export default Canvas;


Canvas.propTypes = {
  locale: PropTypes.object
};

Canvas.defaultProps = {
  locale: {}
};