'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _default = function _default(min, max) {
  return (0, _utils.createPropType)(function (props, propName, componentName) {
    var value = props[propName];

    if (value < min || value > max) {
      return new Error('Invalid prop ' + propName + ' of ' + componentName + ', should between ' + min + ' and ' + max + '.');
    }
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/props/range.js');
}();

;