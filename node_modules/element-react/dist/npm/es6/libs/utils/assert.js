import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { ExtendableError } from './errors';

var ErrorConditionFailed = function (_ExtendableError) {
  _inherits(ErrorConditionFailed, _ExtendableError);

  function ErrorConditionFailed() {
    _classCallCheck(this, ErrorConditionFailed);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, _ExtendableError.call(this, args));
  }

  return ErrorConditionFailed;
}(ExtendableError);

export function require_condition(condition) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pre-condition failed';

  if (!condition) {
    throw new ErrorConditionFailed(msg);
  }
}