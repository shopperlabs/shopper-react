import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes } from '../../libs';

var Pager = function (_Component) {
  _inherits(Pager, _Component);

  function Pager(props, context) {
    _classCallCheck(this, Pager);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

    _this.state = {
      internalCurrentPage: 1,
      internalPageSize: 0,

      quickprevIconClass: 'el-icon-more',
      quicknextIconClass: 'el-icon-more',
      showPrevMore: false,
      showNextMore: false
    };
    return _this;
  }

  Pager.prototype.onPagerClick = function onPagerClick(e) {
    var target = e.target;
    if (target instanceof HTMLElement) {
      if (target.tagName === 'UL') {
        return;
      }
      var newPage = Number(target.textContent);
      var pageCount = this.props.pageCount;
      var currentPage = this.props.currentPage;

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - 5;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + 5;
        }
      }
      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.props.onChange(newPage);
      }
    }
  };

  Pager.prototype.getPages = function getPages() {
    var pagerCount = 7;
    var currentPage = Number(this.props.currentPage);
    var pageCount = Number(this.props.pageCount);

    var showPrevMore = false;
    var showNextMore = false;

    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - 2) {
        showPrevMore = true;
      }
      if (currentPage < pageCount - 2) {
        showNextMore = true;
      }
    }

    var array = [];

    if (showPrevMore && !showNextMore) {
      var startPage = pageCount - (pagerCount - 2);
      for (var i = startPage; i < pageCount; i++) {
        array.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (var _i = 2; _i < pagerCount; _i++) {
        array.push(_i);
      }
    } else if (showPrevMore && showNextMore) {
      var offset = Math.floor(pagerCount / 2) - 1;
      for (var _i2 = currentPage - offset; _i2 <= currentPage + offset; _i2++) {
        array.push(_i2);
      }
    } else {
      for (var _i3 = 2; _i3 < pageCount; _i3++) {
        array.push(_i3);
      }
    }

    this.state.showPrevMore = showPrevMore;
    this.state.showNextMore = showNextMore;
    this.state.quickprevIconClass = showPrevMore ? this.state.quickprevIconClass : 'el-icon-more';
    this.state.quicknextIconClass = showNextMore ? this.state.quicknextIconClass : 'el-icon-more';

    return array;
  };

  Pager.prototype.render = function render() {
    var _this2 = this;

    var pagers = this.getPages();
    var _props = this.props,
        currentPage = _props.currentPage,
        pageCount = _props.pageCount;
    var _state = this.state,
        quickprevIconClass = _state.quickprevIconClass,
        quicknextIconClass = _state.quicknextIconClass;


    return React.createElement(
      'ul',
      { onClick: this.onPagerClick.bind(this), className: 'el-pager' },
      pageCount > 0 && React.createElement(
        'li',
        {
          className: this.classNames('number', { active: currentPage === 1 })
        },
        '1'
      ),
      this.state.showPrevMore && React.createElement('li', {
        className: this.classNames('el-icon more btn-quickprev', quickprevIconClass),
        onMouseEnter: function onMouseEnter() {
          _this2.setState({ quickprevIconClass: 'el-icon-d-arrow-left' });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({ quickprevIconClass: 'el-icon-more' });
        }
      }),
      pagers.map(function (pager, idx) {
        return React.createElement(
          'li',
          {
            key: idx,
            className: _this2.classNames('number', {
              active: currentPage === pager
            })
          },
          pager
        );
      }),
      this.state.showNextMore && React.createElement('li', {
        className: this.classNames('el-icon more btn-quicknext', quicknextIconClass),
        onMouseEnter: function onMouseEnter() {
          _this2.setState({ quicknextIconClass: 'el-icon-d-arrow-right' });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({ quicknextIconClass: 'el-icon-more' });
        }
      }),
      pageCount > 1 && React.createElement(
        'li',
        {
          className: this.classNames('number', {
            active: currentPage === pageCount
          })
        },
        pageCount
      )
    );
  };

  return Pager;
}(Component);

export default Pager;


Pager.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number
};