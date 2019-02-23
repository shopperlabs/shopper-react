import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, View } from '../../libs';

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var children = props.children,
        activeName = props.activeName,
        value = props.value;


    children = React.Children.toArray(children);

    _this.state = {
      children: children,
      currentName: value || activeName || children[0].props.name,
      barStyle: {},
      navStyle: {
        transform: ''
      },
      scrollable: false,
      scrollNext: false,
      scrollPrev: false
    };
    return _this;
  }

  Tabs.prototype.componentDidMount = function componentDidMount() {
    this.calcBarStyle(true);
    this.update();
  };

  Tabs.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.scrollable !== this.state.scrollable) {
      this.scrollToActiveTab();
    }
  };

  Tabs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    if (nextProps.activeName !== this.props.activeName) {
      this.setState({
        currentName: nextProps.activeName
      }, function () {
        return _this2.calcBarStyle();
      });
    }

    if (nextProps.value !== this.props.value) {
      this.setState({
        currentName: nextProps.value
      }, function () {
        return _this2.calcBarStyle();
      });
    }

    if (nextProps.children !== this.props.children) {
      this.setState({
        children: React.Children.toArray(nextProps.children)
      }, function () {
        return _this2.update();
      });
    }
  };

  Tabs.prototype.handleTabAdd = function handleTabAdd() {
    var _props = this.props,
        onTabAdd = _props.onTabAdd,
        onTabEdit = _props.onTabEdit;


    onTabEdit && onTabEdit('add');
    onTabAdd && onTabAdd();
  };

  Tabs.prototype.handleTabRemove = function handleTabRemove(tab, index, e) {
    var _state = this.state,
        children = _state.children,
        currentName = _state.currentName;
    var _props2 = this.props,
        onTabRemove = _props2.onTabRemove,
        onTabEdit = _props2.onTabEdit;


    e.stopPropagation();

    if (children[index].props.name === currentName) {
      var nextChild = children[index + 1];
      var prevChild = children[index - 1];

      this.setState({
        currentName: nextChild ? nextChild.props.name : prevChild ? prevChild.props.name : '-1'
      });
    }

    children.splice(index, 1);

    this.setState({
      children: children
    }, function () {
      onTabEdit && onTabEdit('remove', tab);
      onTabRemove && onTabRemove(tab, e);
    });
  };

  Tabs.prototype.handleTabClick = function handleTabClick(tab, e) {
    var _this3 = this;

    if (tab.props.disabled) {
      return false;
    }

    this.setState({
      currentName: tab.props.name
    }, function () {
      var onTabClick = _this3.props.onTabClick;


      _this3.calcBarStyle();
      _this3.scrollToActiveTab();
      onTabClick && onTabClick(tab, e);
    });
  };

  Tabs.prototype.calcBarStyle = function calcBarStyle(firstRendering) {
    var _this4 = this;

    if (this.props.type || !this.tabs.length) return {};

    var style = {};
    var offset = 0;
    var tabWidth = 0;
    var children = this.state.children instanceof Array ? this.state.children : [this.state.children];

    children.every(function (item, index) {
      var $el = _this4.tabs[index];

      if (item.props.name !== _this4.state.currentName) {
        offset += $el.clientWidth;
        return true;
      } else {
        tabWidth = $el.clientWidth;
        return false;
      }
    });

    style.width = tabWidth + 'px';
    style.transform = 'translateX(' + offset + 'px)';

    if (!firstRendering) {
      style.transition = 'transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1)';
    }

    this.setState({
      barStyle: style
    });
  };

  Tabs.prototype.scrollPrev = function scrollPrev() {
    var containerWidth = this.refs.navScroll.offsetWidth;
    var currentOffset = this.getCurrentScrollOffset();
    if (!currentOffset) return;
    var newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;
    this.setOffset(newOffset);
  };

  Tabs.prototype.scrollNext = function scrollNext() {
    var navWidth = this.refs.nav.offsetWidth;
    var containerWidth = this.refs.navScroll.offsetWidth;
    var currentOffset = this.getCurrentScrollOffset();
    if (navWidth - currentOffset <= containerWidth) return;
    var newOffset = navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : navWidth - containerWidth;
    this.setOffset(newOffset);
  };

  Tabs.prototype.scrollToActiveTab = function scrollToActiveTab() {
    if (!this.state.scrollable) return;

    var nav = this.refs.nav;
    var activeTab = nav.querySelector('.is-active');
    var navScroll = this.refs.navScroll;
    var activeTabBounding = activeTab.getBoundingClientRect();
    var navScrollBounding = navScroll.getBoundingClientRect();
    var navBounding = nav.getBoundingClientRect();
    var currentOffset = this.getCurrentScrollOffset();
    var newOffset = currentOffset;

    if (activeTabBounding.left < navScrollBounding.left) {
      newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
    }

    if (activeTabBounding.right > navScrollBounding.right) {
      newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
    }

    if (navBounding.right < navScrollBounding.right) {
      newOffset = nav.offsetWidth - navScrollBounding.width;
    }

    this.setOffset(Math.max(newOffset, 0));
  };

  Tabs.prototype.getCurrentScrollOffset = function getCurrentScrollOffset() {
    var navStyle = this.state.navStyle;

    return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
  };

  Tabs.prototype.setOffset = function setOffset(value) {
    this.setState({
      navStyle: {
        transform: 'translateX(-' + value + 'px)'
      }
    });
  };

  Tabs.prototype.update = function update() {
    var navWidth = this.refs.nav.offsetWidth;
    var containerWidth = this.refs.navScroll.offsetWidth;
    var currentOffset = this.getCurrentScrollOffset();

    if (containerWidth < navWidth) {
      var _currentOffset = this.getCurrentScrollOffset();
      this.setState({
        scrollable: true,
        scrollablePrev: _currentOffset,
        scrollableNext: _currentOffset + containerWidth < navWidth
      });

      if (navWidth - _currentOffset < containerWidth) {
        this.setOffset(navWidth - containerWidth);
      }
    } else {
      this.setState({
        scrollable: false
      });

      if (currentOffset > 0) {
        this.setOffset(0);
      }
    }
  };

  Tabs.prototype.render = function render() {
    var _this5 = this;

    var _state2 = this.state,
        children = _state2.children,
        currentName = _state2.currentName,
        barStyle = _state2.barStyle,
        navStyle = _state2.navStyle,
        scrollable = _state2.scrollable,
        scrollNext = _state2.scrollNext,
        scrollPrev = _state2.scrollPrev;
    var _props3 = this.props,
        type = _props3.type,
        addable = _props3.addable,
        closable = _props3.closable,
        editable = _props3.editable;

    var tabsCls = this.classNames({
      'el-tabs': true,
      'el-tabs--card': type === 'card',
      'el-tabs--border-card': type === 'border-card'
    });
    var addButton = editable || addable ? React.createElement(
      'span',
      {
        className: 'el-tabs__new-tab',
        onClick: function onClick() {
          return _this5.handleTabAdd();
        }
      },
      React.createElement('i', { className: 'el-icon-plus' })
    ) : null;
    var scrollBtn = scrollable ? [React.createElement(
      'span',
      { key: 'el-tabs__nav-prev',
        className: scrollable.prev ? 'el-tabs__nav-prev' : 'el-tabs__nav-prev is-disabled',
        onClick: function onClick() {
          return _this5.scrollPrev();
        }
      },
      React.createElement('i', { className: 'el-icon-arrow-left' })
    ), React.createElement(
      'span',
      { key: 'el-tabs__nav-next',
        className: scrollable.next ? 'el-tabs__nav-next' : 'el-tabs__nav-next is-disabled',
        onClick: function onClick() {
          return _this5.scrollNext();
        }
      },
      React.createElement('i', { className: 'el-icon-arrow-right' })
    )] : null;
    this.tabs = [];

    return React.createElement(
      'div',
      { style: this.style(), className: this.className(tabsCls) },
      React.createElement(
        'div',
        { className: 'el-tabs__header' },
        addButton,
        React.createElement(
          'div',
          { className: scrollable ? 'el-tabs__nav-wrap is-scrollable' : 'el-tabs__nav-wrap' },
          scrollBtn,
          React.createElement(
            'div',
            { className: 'el-tabs__nav-scroll', ref: 'navScroll' },
            React.createElement(
              'div',
              { className: 'el-tabs__nav', ref: 'nav', style: navStyle },
              React.Children.map(children, function (item, index) {
                var _item$props = item.props,
                    name = _item$props.name,
                    label = _item$props.label,
                    disabled = _item$props.disabled;

                var tabCls = _this5.classNames({
                  'el-tabs__item': true,
                  'is-active': name === currentName,
                  'is-disabled': disabled,
                  'is-closable': closable || item.props.closable
                });

                return React.createElement(
                  'div',
                  { key: 'el-tabs__item-' + index, ref: function ref(tab) {
                      return tab && _this5.tabs.push(tab);
                    }, name: name, className: tabCls, onClick: function onClick(e) {
                      return _this5.handleTabClick(item, e);
                    } },
                  label,
                  React.createElement(
                    View,
                    { show: editable || closable || item.props.closable },
                    React.createElement('span', { className: 'el-icon-close', onClick: function onClick(e) {
                        return _this5.handleTabRemove(item, index, e);
                      } })
                  )
                );
              }),
              React.createElement(
                View,
                { show: !type },
                React.createElement('div', { className: 'el-tabs__active-bar', style: barStyle })
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'el-tabs__content' },
        React.Children.map(children, function (item) {
          var name = item.props.name;

          // let transitionName = '';
          //
          // if (name === currentName) {
          //   transitionName = 'slideInRight';
          // }

          return React.createElement(
            View,
            { show: name === currentName },
            item
          );
        })
      )
    );
  };

  return Tabs;
}(Component);

export default Tabs;


Tabs.propTypes = {
  type: PropTypes.oneOf(['card', 'border-card']),
  activeName: PropTypes.string,
  value: PropTypes.string,
  closable: PropTypes.bool,
  addable: PropTypes.bool,
  editable: PropTypes.bool,
  onTabClick: PropTypes.func,
  onTabRemove: PropTypes.func,
  onTabAdd: PropTypes.func,
  onTabEdit: PropTypes.func
};

Tabs.defaultProps = {
  closable: false,
  addable: false,
  edidable: false
};