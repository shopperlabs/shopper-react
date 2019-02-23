import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import Button from '../button';
import Input from '../input';
import i18n from '../locale';

var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var MessageBox = function (_Component) {
  _inherits(MessageBox, _Component);

  function MessageBox(props) {
    _classCallCheck(this, MessageBox);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      visible: false,
      inputValue: props.inputValue
    };
    return _this;
  }

  MessageBox.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      visible: true
    });
    document.activeElement && document.activeElement.blur();
  };

  MessageBox.prototype.confirmButtonText = function confirmButtonText() {
    return this.props.confirmButtonText || i18n.t('el.messagebox.confirm');
  };

  MessageBox.prototype.cancelButtonText = function cancelButtonText() {
    return this.props.cancelButtonText || i18n.t('el.messagebox.cancel');
  };

  MessageBox.prototype.onChange = function onChange(value) {
    this.setState({
      inputValue: value
    });
    this.validate(value);
  };

  MessageBox.prototype.typeClass = function typeClass() {
    return this.props.type && typeMap[this.props.type] && 'el-icon-' + typeMap[this.props.type];
  };

  MessageBox.prototype.validate = function validate(value) {
    var _props = this.props,
        inputPattern = _props.inputPattern,
        inputValidator = _props.inputValidator,
        inputErrorMessage = _props.inputErrorMessage;

    var editorErrorMessage = void 0;

    if (inputPattern && !inputPattern.test(value)) {
      editorErrorMessage = inputErrorMessage || i18n.t('el.messagebox.error');
    }

    if (typeof inputValidator === 'function') {
      var validateResult = inputValidator(value);

      if (validateResult === false) {
        editorErrorMessage = inputErrorMessage || i18n.t('el.messagebox.error');
      }

      if (typeof validateResult === 'string') {
        editorErrorMessage = validateResult;
      }
    }

    this.setState({ editorErrorMessage: editorErrorMessage });

    return !editorErrorMessage;
  };

  MessageBox.prototype.handleAction = function handleAction(action) {
    var _props2 = this.props,
        modal = _props2.modal,
        promise = _props2.promise,
        showInput = _props2.showInput;


    if (modal) {
      switch (action) {
        case 'cancel':
          promise.reject();
          break;
        case 'confirm':
          if (modal === 'prompt') {
            if (this.validate(this.state.inputValue || '')) {
              if (showInput) {
                promise.resolve({ value: this.state.inputValue, action: action });
              } else {
                promise.resolve(action);
              }
            } else {
              return;
            }
          } else {
            promise.resolve();
          }
          break;
        default:
          break;
      }
    } else {
      promise.resolve(action);
    }

    this.close();
  };

  MessageBox.prototype.close = function close() {
    this.setState({
      visible: false
    });
  };

  MessageBox.prototype.render = function render() {
    var _props3 = this.props,
        willUnmount = _props3.willUnmount,
        title = _props3.title,
        showClose = _props3.showClose,
        message = _props3.message,
        showInput = _props3.showInput,
        inputPlaceholder = _props3.inputPlaceholder,
        showCancelButton = _props3.showCancelButton,
        cancelButtonClass = _props3.cancelButtonClass,
        showConfirmButton = _props3.showConfirmButton,
        confirmButtonClass = _props3.confirmButtonClass,
        inputType = _props3.inputType;
    var _state = this.state,
        visible = _state.visible,
        editorErrorMessage = _state.editorErrorMessage;


    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { style: { position: 'absolute', zIndex: 2001 } },
        React.createElement(
          Transition,
          {
            name: 'msgbox-fade',
            onAfterLeave: function onAfterLeave() {
              willUnmount && willUnmount();
            }
          },
          React.createElement(
            View,
            { show: visible },
            React.createElement(
              'div',
              { className: 'el-message-box__wrapper' },
              React.createElement(
                'div',
                { className: 'el-message-box' },
                title && React.createElement(
                  'div',
                  { className: 'el-message-box__header' },
                  React.createElement(
                    'div',
                    { className: 'el-message-box__title' },
                    title
                  ),
                  showClose && React.createElement(
                    'button',
                    { type: 'button', className: 'el-message-box__headerbtn', 'aria-label': 'Close', onClick: this.handleAction.bind(this, 'cancel') },
                    React.createElement('i', { className: 'el-message-box__close el-icon-close' })
                  )
                ),
                message && React.createElement(
                  'div',
                  { className: 'el-message-box__content' },
                  React.createElement('div', { className: this.classNames('el-message-box__status', this.typeClass()) }),
                  React.createElement(
                    'div',
                    { className: 'el-message-box__message', style: { marginLeft: this.typeClass() ? '50px' : '0' } },
                    React.createElement(
                      'p',
                      null,
                      message
                    )
                  ),
                  React.createElement(
                    View,
                    { show: showInput },
                    React.createElement(
                      'div',
                      { className: 'el-message-box__input' },
                      React.createElement(Input, {
                        className: this.classNames({
                          'invalid': editorErrorMessage
                        }),
                        type: inputType,
                        value: this.state.inputValue,
                        placeholder: inputPlaceholder,
                        onChange: this.onChange.bind(this)
                      }),
                      React.createElement(
                        'div',
                        { className: 'el-message-box__errormsg', style: {
                            visibility: editorErrorMessage ? 'visible' : 'hidden'
                          } },
                        editorErrorMessage
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'el-message-box__btns' },
                  React.createElement(
                    View,
                    { show: showCancelButton },
                    React.createElement(
                      Button,
                      { className: cancelButtonClass, onClick: this.handleAction.bind(this, 'cancel') },
                      this.cancelButtonText()
                    )
                  ),
                  React.createElement(
                    View,
                    { show: showConfirmButton },
                    React.createElement(
                      Button,
                      { className: this.classNames('el-button--primary', confirmButtonClass), onClick: this.handleAction.bind(this, 'confirm') },
                      this.confirmButtonText()
                    )
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement(
        Transition,
        { name: 'v-modal' },
        React.createElement(
          View,
          { show: visible },
          React.createElement('div', { className: 'v-modal', style: { zIndex: 1006 } })
        )
      )
    );
  };

  return MessageBox;
}(Component);

export default MessageBox;


MessageBox.propTypes = {
  modal: PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  showInput: PropTypes.bool,
  showClose: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showConfirmButton: PropTypes.bool,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  confirmButtonClass: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputPattern: PropTypes.regex,
  inputValidator: PropTypes.func,
  inputErrorMessage: PropTypes.string,
  inputValue: PropTypes.any,
  inputType: PropTypes.string,
  promise: PropTypes.object,
  onClose: PropTypes.func
};

MessageBox.defaultProps = {
  title: '提示',
  showClose: true,
  showConfirmButton: true
};