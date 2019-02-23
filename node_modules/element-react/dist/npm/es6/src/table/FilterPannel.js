import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { Component, Transition, View } from '../../libs';
import Checkbox from '../checkbox';

import { FilterProps, FilterState } from './Types';
import local from '../locale';

function getPopupContainer() {
  var container = document.createElement('div');
  container.className = 'el-table-poper';
  container.style.zIndex = 999;
  document.body.appendChild(container);
  return container;
}

var FilterPannel = function (_Component) {
  _inherits(FilterPannel, _Component);

  function FilterPannel(props) {
    _classCallCheck(this, FilterPannel);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.container = getPopupContainer();
    ['handleClickOutside', 'onEnter', 'onAfterLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });

    _this.state = {
      filteredValue: props.filteredValue
    };
    return _this;
  }

  FilterPannel.prototype.componentDidMount = function componentDidMount() {
    this.renderPortal(this.renderContent(), this.container);

    document.addEventListener('click', this.handleClickOutside);
  };

  FilterPannel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.filteredValue !== nextProps.filteredValue) {
      this.setState({ filteredValue: nextProps.filteredValue });
    }
  };

  FilterPannel.prototype.componentDidUpdate = function componentDidUpdate() {
    this.renderPortal(this.renderContent(), this.container);
  };

  FilterPannel.prototype.componentWillUnmount = function componentWillUnmount() {
    this.poperIns && this.poperIns.destroy();
    ReactDOM.unmountComponentAtNode(this.container);
    document.removeEventListener('click', this.handleClickOutside);
    document.body.removeChild(this.container);
  };

  FilterPannel.prototype.handleFiltersChange = function handleFiltersChange(value) {
    this.setState({
      filteredValue: value
    });
  };

  FilterPannel.prototype.changeFilteredValue = function changeFilteredValue(value) {
    this.props.onFilterChange(value);
    this.props.toggleFilter();
  };

  FilterPannel.prototype.handleClickOutside = function handleClickOutside() {
    if (this.props.visible) {
      this.props.toggleFilter();
    }
  };

  FilterPannel.prototype.onEnter = function onEnter() {
    this.poperIns = new Popper(this.refer, this.container, {
      placement: this.props.placement
    });
  };

  FilterPannel.prototype.onAfterLeave = function onAfterLeave() {
    this.poperIns.destroy();
  };

  FilterPannel.prototype.renderPortal = function renderPortal(element, container) {
    ReactDOM.render(element, container);
  };

  FilterPannel.prototype.renderContent = function renderContent() {
    var _this2 = this;

    var _props = this.props,
        multiple = _props.multiple,
        filters = _props.filters,
        visible = _props.visible;
    var filteredValue = this.state.filteredValue;


    var content = void 0;
    if (multiple) {
      content = [React.createElement(
        'div',
        { className: 'el-table-filter__content', key: 'content' },
        React.createElement(
          Checkbox.Group,
          { value: filteredValue || [], onChange: this.handleFiltersChange.bind(this), className: 'el-table-filter__checkbox-group' },
          filters && filters.map(function (filter) {
            return React.createElement(Checkbox, { value: filter.value, label: filter.text, key: filter.value });
          })
        )
      ), React.createElement(
        'div',
        { className: 'el-table-filter__bottom', key: 'bottom' },
        React.createElement(
          'button',
          {
            className: this.classNames({ 'is-disabled': !filteredValue || !filteredValue.length }),
            disabled: !filteredValue || !filteredValue.length,
            onClick: this.changeFilteredValue.bind(this, filteredValue)
          },
          local.t('el.table.confirmFilter')
        ),
        React.createElement(
          'button',
          { onClick: this.changeFilteredValue.bind(this, null) },
          local.t('el.table.resetFilter')
        )
      )];
    } else {
      content = React.createElement(
        'ul',
        { className: 'el-table-filter__list' },
        React.createElement(
          'li',
          {
            className: this.classNames('el-table-filter__list-item', { 'is-active': !filteredValue }),
            onClick: this.changeFilteredValue.bind(this, null)
          },
          local.t('el.table.clearFilter')
        ),
        filters && filters.map(function (filter) {
          return React.createElement(
            'li',
            {
              key: filter.value,
              className: _this2.classNames('el-table-filter__list-item', { 'is-active': filter.value === filteredValue }),
              onClick: _this2.changeFilteredValue.bind(_this2, filter.value)
            },
            filter.text
          );
        })
      );
    }

    return React.createElement(
      Transition,
      {
        name: 'el-zoom-in-top',
        onEnter: this.onEnter,
        onAfterLeave: this.onAfterLeave
      },
      React.createElement(
        View,
        { show: visible },
        React.createElement(
          'div',
          {
            className: 'el-table-filter',
            ref: function ref(dom) {
              _this2.poper = dom;
            },
            onClick: function onClick(e) {
              e.nativeEvent.stopImmediatePropagation();
            } // prevent document click event
          },
          content
        )
      )
    );
  };

  FilterPannel.prototype.render = function render() {
    var _this3 = this;

    return React.cloneElement(this.props.children, {
      ref: function ref(dom) {
        _this3.refer = dom;
      }
    });
  };

  return FilterPannel;
}(Component);

export default FilterPannel;