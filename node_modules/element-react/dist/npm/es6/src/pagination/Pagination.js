import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';
import Pager from './Pager';
import Select from '../select';
import locale from '../locale';

var Pre = function Pre(props) {
  var disabled = props.internalCurrentPage <= 1 ? 'disabled' : '';
  return React.createElement(
    'button',
    { type: 'button', className: 'btn-prev ' + disabled, onClick: props.prev },
    React.createElement('i', { className: 'el-icon el-icon-arrow-left' })
  );
};

var Next = function Next(props) {
  var disabled = props.internalCurrentPage === props.internalPageCount || props.internalPageCount === 0 ? 'disabled' : '';

  return React.createElement(
    'button',
    { type: 'button', className: 'btn-next ' + disabled, onClick: props.next },
    React.createElement('i', { className: 'el-icon el-icon-arrow-right' })
  );
};

var Sizes = function (_Component) {
  _inherits(Sizes, _Component);

  function Sizes() {
    _classCallCheck(this, Sizes);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Sizes.prototype.render = function render() {
    var _props = this.props,
        onSizeChange = _props.onSizeChange,
        internalPageSize = _props.internalPageSize;


    return React.createElement(
      'span',
      { className: 'el-pagination__sizes' },
      React.createElement(
        Select,
        {
          size: 'small',
          value: internalPageSize,
          onChange: onSizeChange,
          width: 110
        },
        this.props.pageSizes.map(function (item, idx) {
          return React.createElement(Select.Option, {
            key: idx,
            value: item,
            label: item + ' ' + locale.t('el.pagination.pagesize')
          });
        })
      )
    );
  };

  return Sizes;
}(Component);

var Total = function Total(props) {
  return typeof props.total === 'number' ? React.createElement(
    'span',
    { className: 'el-pagination__total' },
    locale.t('el.pagination.total', { total: props.total })
  ) : React.createElement('span', null);
};

var Jumper = function (_Component2) {
  _inherits(Jumper, _Component2);

  function Jumper() {
    _classCallCheck(this, Jumper);

    return _possibleConstructorReturn(this, _Component2.apply(this, arguments));
  }

  Jumper.prototype.handleChange = function handleChange(_ref) {
    var target = _ref.target;
    var jumper = this.props.jumper;

    jumper(target.value);
  };

  Jumper.prototype.handleFocus = function handleFocus() {};

  Jumper.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      'span',
      { className: 'el-pagination__jump' },
      locale.t('el.pagination.goto'),
      React.createElement('input', {
        className: 'el-pagination__editor',
        type: 'number',
        min: 1,
        max: this.props.internalPageCount,
        defaultValue: this.props.internalCurrentPage,
        onBlur: this.handleChange.bind(this),
        onKeyUp: function onKeyUp(e) {
          if (e.keyCode == 13) {
            _this3.handleChange(e);
          }
        },
        onFocus: this.handleFocus.bind(this),
        style: { width: '30px' }
      }),
      locale.t('el.pagination.pageClassifier')
    );
  };

  return Jumper;
}(Component);

var Pagination = function (_Component3) {
  _inherits(Pagination, _Component3);

  function Pagination(props, context) {
    _classCallCheck(this, Pagination);

    var _this4 = _possibleConstructorReturn(this, _Component3.call(this, props, context));

    var _this4$props = _this4.props,
        currentPage = _this4$props.currentPage,
        pageSizes = _this4$props.pageSizes,
        pageSize = _this4$props.pageSize,
        total = _this4$props.total,
        pageCount = _this4$props.pageCount,
        layout = _this4$props.layout;

    var internalPageSize = 0;
    if (layout.split(',').indexOf('sizes') > -1 && Array.isArray(pageSizes)) {
      internalPageSize = pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0];
    } else {
      internalPageSize = pageSize;
    }

    _this4.state = {
      internalPageSize: internalPageSize,
      total: total,
      pageCount: pageCount,
      internalCurrentPage: currentPage ? _this4.getValidCurrentPage(currentPage) : 1
    };
    return _this4;
  }

  Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this5 = this;

    var _props2 = this.props,
        currentPage = _props2.currentPage,
        pageSizes = _props2.pageSizes,
        pageSize = _props2.pageSize,
        total = _props2.total,
        pageCount = _props2.pageCount;


    if (nextProps.currentPage != currentPage || nextProps.pageSizes != pageSizes || nextProps.pageSize != pageSize || nextProps.total != total || nextProps.pageCount != pageCount) {
      var _internalPageSize = this.state.internalPageSize;
      if (nextProps.layout.split(',').indexOf('sizes') > -1 && Array.isArray(nextProps.pageSizes)) {
        _internalPageSize = nextProps.pageSizes.indexOf(nextProps.pageSize) > -1 ? nextProps.pageSize : nextProps.pageSizes[0];
      }

      this.setState({
        internalPageSize: _internalPageSize,
        total: nextProps.total,
        pageCount: nextProps.pageCount
      }, function () {
        _this5.setState({
          internalCurrentPage: nextProps.currentPage ? _this5.getValidCurrentPage(nextProps.currentPage) : 1
        });
      });
    }
  };

  Pagination.prototype.pre = function pre() {
    var _this6 = this;

    var oldPage = this.state.internalCurrentPage;
    var newVal = this.state.internalCurrentPage - 1;

    this.setState({
      internalCurrentPage: this.getValidCurrentPage(newVal)
    }, function () {
      if (_this6.state.internalCurrentPage !== oldPage) {
        var onCurrentChange = _this6.props.onCurrentChange;
        onCurrentChange && onCurrentChange(_this6.state.internalCurrentPage);
      }
    });
  };

  Pagination.prototype.next = function next() {
    var _this7 = this;

    var oldPage = this.state.internalCurrentPage;
    var newVal = this.state.internalCurrentPage + 1;

    this.setState({
      internalCurrentPage: this.getValidCurrentPage(newVal)
    }, function () {
      if (_this7.state.internalCurrentPage !== oldPage) {
        var onCurrentChange = _this7.props.onCurrentChange;
        onCurrentChange && onCurrentChange(_this7.state.internalCurrentPage);
      }
    });
  };

  Pagination.prototype.getValidCurrentPage = function getValidCurrentPage(value) {
    value = parseInt(value, 10);

    var internalPageCount = this.internalPageCount();

    var resetValue = void 0;
    if (!internalPageCount) {
      if (isNaN(value) || value < 1) resetValue = 1;
    } else {
      if (value < 1) {
        resetValue = 1;
      } else if (value > internalPageCount) {
        resetValue = internalPageCount;
      }
    }

    if (resetValue === undefined && isNaN(value)) {
      resetValue = 1;
    } else if (resetValue === 0) {
      resetValue = 1;
    }

    return resetValue === undefined ? value : resetValue;
  };

  Pagination.prototype.internalPageCount = function internalPageCount() {
    if (this.state) {
      if (typeof this.state.total === 'number') {
        return Math.ceil(this.state.total / this.state.internalPageSize);
      } else if (typeof this.state.pageCount === 'number') {
        return this.state.pageCount;
      }
    }

    return null;
  };

  Pagination.prototype.jumperToPage = function jumperToPage(page) {
    var _this8 = this;

    var oldPage = this.state.internalCurrentPage;
    this.setState({
      internalCurrentPage: this.getValidCurrentPage(page)
    }, function () {
      if (oldPage !== _this8.state.internalCurrentPage) {
        var onCurrentChange = _this8.props.onCurrentChange;
        onCurrentChange && onCurrentChange(_this8.state.internalCurrentPage);
      }
    });

    //this.oldValue = null;
  };

  Pagination.prototype.handleCurrentChange = function handleCurrentChange(val) {
    var _this9 = this;

    var oldPage = this.state.internalCurrentPage;
    this.setState({
      internalCurrentPage: this.getValidCurrentPage(val)
    }, function () {
      if (oldPage !== _this9.state.internalCurrentPage) {
        var onCurrentChange = _this9.props.onCurrentChange;
        onCurrentChange && onCurrentChange(_this9.state.internalCurrentPage);
      }
    });
  };

  Pagination.prototype.onSizeChange = function onSizeChange(val) {
    var _this10 = this;

    if (val !== this.state.internalPageSize) {
      val = parseInt(val, 10);

      this.setState({
        internalPageSize: val
      }, function () {
        _this10.setState({
          internalCurrentPage: _this10.getValidCurrentPage(_this10.state.internalCurrentPage)
        });
        var onSizeChange = _this10.props.onSizeChange;

        onSizeChange && onSizeChange(val);
      });
    }
  };

  Pagination.prototype.render = function render() {
    var _state = this.state,
        internalCurrentPage = _state.internalCurrentPage,
        internalPageSize = _state.internalPageSize;


    var className = this.classNames({
      'el-pagination': true,
      'el-pagination__rightwrapper': false,
      'el-pagination--small': this.props.small
    });

    var children = [];
    var layout = this.props.layout || '';

    if (!layout) return null;

    var components = layout.split(',').map(function (item) {
      return item.trim();
    });
    var TEMPLATE_MAP = {
      prev: React.createElement(Pre, {
        key: 'pre',
        internalCurrentPage: internalCurrentPage,
        prev: this.pre.bind(this)
      }),
      jumper: React.createElement(Jumper, {
        key: 'jumper',
        jumper: this.jumperToPage.bind(this),
        internalPageCount: this.internalPageCount(),
        internalCurrentPage: internalCurrentPage
      }),
      pager: React.createElement(Pager, {
        key: 'pager',
        currentPage: internalCurrentPage,
        pageCount: this.internalPageCount(),
        onChange: this.handleCurrentChange.bind(this)
      }),
      next: React.createElement(Next, {
        key: 'next',
        internalCurrentPage: internalCurrentPage,
        internalPageCount: this.internalPageCount(),
        next: this.next.bind(this)
      }),
      sizes: React.createElement(Sizes, {
        key: 'sizes',
        internalPageSize: internalPageSize,
        pageSizes: this.props.pageSizes,
        onSizeChange: this.onSizeChange.bind(this)
      }),
      total: React.createElement(Total, { key: 'total', total: this.state.total })
    };

    components.forEach(function (compo) {
      if (compo !== '->') {
        children.push(TEMPLATE_MAP[compo]);
      }
    });

    return React.createElement(
      'div',
      { style: this.style(), className: this.className(className) },
      children
    );
  };

  return Pagination;
}(Component);

export default Pagination;


Pagination.propTypes = {
  pageSize: PropTypes.number,
  small: PropTypes.bool,
  total: PropTypes.number,
  pageCount: PropTypes.number,
  currentPage: PropTypes.number,
  layout: PropTypes.string,
  pageSizes: PropTypes.array,

  //Event
  onCurrentChange: PropTypes.func,
  onSizeChange: PropTypes.func
};

Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
};