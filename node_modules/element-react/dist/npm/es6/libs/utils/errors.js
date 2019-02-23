import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
//taken from : http://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax
export var ExtendableError = function (_Error) {
  _inherits(ExtendableError, _Error);

  function ExtendableError(message) {
    _classCallCheck(this, ExtendableError);

    var _this = _possibleConstructorReturn(this, _Error.call(this, message));

    _this.name = _this.constructor.name;
    _this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  return ExtendableError;
}(Error);

export var MethodImplementationRequiredError = function (_ExtendableError) {
  _inherits(MethodImplementationRequiredError, _ExtendableError);

  function MethodImplementationRequiredError(msg) {
    _classCallCheck(this, MethodImplementationRequiredError);

    return _possibleConstructorReturn(this, _ExtendableError.call(this, msg));
  }

  return MethodImplementationRequiredError;
}(ExtendableError);