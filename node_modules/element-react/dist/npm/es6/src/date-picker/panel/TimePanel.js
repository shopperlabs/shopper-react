import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { PropTypes } from '../../../libs';
import { limitRange } from '../utils';
import TimeSpinner from '../basic/TimeSpinner';
import Locale from '../../locale';

import { PopperBase } from './PopperBase';

var mapPropsToState = function mapPropsToState(props) {
  var state = {
    format: props.format || 'HH:mm:ss',
    currentDate: props.currentDate || new Date()
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;
  return state;
};

var TimePanel = function (_PopperBase) {
  _inherits(TimePanel, _PopperBase);

  _createClass(TimePanel, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, {
        selectableRange: TimeSpinner.propTypes.selectableRange,
        onSelectRangeChange: TimeSpinner.propTypes.onSelectRangeChange
      }, {
        pickerWidth: PropTypes.number,
        currentDate: PropTypes.instanceOf(Date),
        /*
        onPicked: (value, isKeepPannelOpen)=>()
         @param value: Date|null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: PropTypes.func.isRequired
      }, PopperBase.propTypes);
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        popperMixinOption: {}
      };
    }
  }]);

  function TimePanel(props) {
    _classCallCheck(this, TimePanel);

    var _this = _possibleConstructorReturn(this, _PopperBase.call(this, props));

    _this.state = mapPropsToState(props);
    return _this;
  }

  TimePanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(mapPropsToState(nextProps));
  };

  // type: string,  one of [hours, minutes, seconds]
  // date: {type: number}


  TimePanel.prototype.handleChange = function handleChange(date) {
    var currentDate = this.state.currentDate;


    if (date.hours !== undefined) {
      currentDate.setHours(date.hours);
    }

    if (date.minutes !== undefined) {
      currentDate.setMinutes(date.minutes);
    }

    if (date.seconds !== undefined) {
      currentDate.setSeconds(date.seconds);
    }
    this.setState({});
    this.handleConfirm(true);
  };

  TimePanel.prototype.handleConfirm = function handleConfirm() {
    var isKeepPannelOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var currentDate = this.state.currentDate;
    var _props = this.props,
        onPicked = _props.onPicked,
        selectableRange = _props.selectableRange;


    var date = new Date(limitRange(currentDate, selectableRange, 'HH:mm:ss'));
    onPicked(date, isKeepPannelOpen);
  };

  TimePanel.prototype.render = function render() {
    var _this2 = this;

    var _state = this.state,
        isShowSeconds = _state.isShowSeconds,
        currentDate = _state.currentDate;
    var _props2 = this.props,
        onSelectRangeChange = _props2.onSelectRangeChange,
        selectableRange = _props2.selectableRange;


    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    var $t = Locale.t;

    return React.createElement(
      'div',
      {
        ref: 'root',
        className: 'el-time-panel' },
      React.createElement(
        'div',
        { className: this.classNames('el-time-panel__content', { 'has-seconds': isShowSeconds }) },
        React.createElement(TimeSpinner, {
          ref: 'spinner',
          onChange: this.handleChange.bind(this),
          isShowSeconds: isShowSeconds,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          selectableRange: selectableRange,
          onSelectRangeChange: onSelectRangeChange
        })
      ),
      React.createElement(
        'div',
        { className: 'el-time-panel__footer' },
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'el-time-panel__btn cancel',
            onClick: function onClick() {
              return _this2.props.onCancel();
            } },
          $t('el.datepicker.cancel')
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'el-time-panel__btn confirm',
            onClick: function onClick() {
              return _this2.handleConfirm();
            } },
          $t('el.datepicker.confirm')
        )
      )
    );
  };

  return TimePanel;
}(PopperBase);

export default TimePanel;