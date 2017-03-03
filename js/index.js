'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactMotion = require('react-motion');

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _reactSaveRefs = require('react-save-refs');

var _reactSaveRefs2 = _interopRequireDefault(_reactSaveRefs);

var _DragHandle = require('./DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

var _OnUpdate = require('./OnUpdate');

var _OnUpdate2 = _interopRequireDefault(_OnUpdate);

var _MoveContainer = require('./MoveContainer');

var _MoveContainer2 = _interopRequireDefault(_MoveContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_HEIGHT = { natural: 200, drag: 30 };

var AUTOSCROLL_REGION_SIZE = 30;
var AUTOSCROLL_MAX_SPEED = 15;

function getScrollSpeed(distance) {
  // If distance is zero, then the result is the max speed. Otherwise,
  // the result tapers toward zero as it gets closer to the opposite
  // edge of the region.
  return Math.round(AUTOSCROLL_MAX_SPEED - AUTOSCROLL_MAX_SPEED / AUTOSCROLL_REGION_SIZE * distance);
}

var DraggableList = function (_React$Component) {
  (0, _inherits3.default)(DraggableList, _React$Component);

  function DraggableList(props) {
    (0, _classCallCheck3.default)(this, DraggableList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DraggableList.__proto__ || (0, _getPrototypeOf2.default)(DraggableList)).call(this, props));

    _this._itemRefs = new _map2.default();
    _this._heights = new _map2.default();

    _this._handleTouchMove = function (e) {
      e.preventDefault();
      _this._handleMouseMove(e.touches[0]);
    };

    _this._handleMouseMove = function (_ref) {
      var pageY = _ref.pageY,
          clientY = _ref.clientY;
      var padding = _this.props.padding;
      var _this$state = _this.state,
          list = _this$state.list,
          dragging = _this$state.dragging,
          lastDrag = _this$state.lastDrag;

      if (!dragging || !lastDrag) return;

      var containerEl = _this._getContainer();
      var dragIndex = _this._getDragIndex();
      var naturalPosition = _this._getDistanceDuringDrag(lastDrag, dragIndex);

      clearInterval(_this._autoScrollerTimer);

      // If the user has the mouse near the top or bottom of the container and
      // not at the end of the list, then autoscroll.
      if (dragIndex !== 0 && dragIndex !== list.length - 1) {
        var scrollSpeed = 0;

        var containerRect = containerEl && containerEl !== document.body && containerEl.getBoundingClientRect ? containerEl.getBoundingClientRect() : { top: 0, bottom: Infinity };

        // Get the lowest of the screen top and the container top.
        var top = Math.max(0, containerRect.top);

        var distanceFromTop = clientY - top;
        if (distanceFromTop > 0 && distanceFromTop < AUTOSCROLL_REGION_SIZE) {
          scrollSpeed = -1 * getScrollSpeed(distanceFromTop);
        } else {
          // Get the lowest of the screen bottom and the container bottom.
          var bottom = Math.min(window.innerHeight, containerRect.bottom);
          var distanceFromBottom = bottom - clientY;
          if (distanceFromBottom > 0 && distanceFromBottom < AUTOSCROLL_REGION_SIZE) {
            scrollSpeed = getScrollSpeed(distanceFromBottom);
          }
        }

        if (scrollSpeed !== 0) {
          _this._scrollContainer(scrollSpeed);
          _this._autoScrollerTimer = setTimeout(function () {
            _this._handleMouseMove({
              pageY: pageY + (containerEl === document.body ? scrollSpeed : 0),
              clientY: clientY
            });
          }, 16);
        }
      }

      var containerScroll = !containerEl || containerEl === document.body ? 0 : containerEl.scrollTop;
      var mouseY = pageY - lastDrag.mouseOffset + containerScroll;

      var movementFromNatural = mouseY - naturalPosition;
      // 1 down, -1 up, 0 neither
      var direction = movementFromNatural > 0 ? 1 : movementFromNatural < 0 ? -1 : 0;
      var newIndex = dragIndex;
      if (direction !== 0) {
        var keyFn = _this._getKeyFn();
        var reach = Math.abs(movementFromNatural);
        for (var i = dragIndex + direction; i < list.length && i >= 0; i += direction) {
          var iDragHeight = (_this._heights.get(keyFn(list[i])) || DEFAULT_HEIGHT).drag;
          if (reach < iDragHeight / 2 + padding) break;
          reach -= iDragHeight + padding;
          newIndex = i;
        }
      }

      var newList = list;
      if (newIndex !== dragIndex) {
        newList = (0, _reactAddonsUpdate2.default)(list, {
          $splice: [[dragIndex, 1], [newIndex, 0, list[dragIndex]]]
        });
      }

      _this.setState({ lastDrag: (0, _extends3.default)({}, lastDrag, { mouseY: mouseY }), list: newList });
    };

    _this._handleMouseUp = function () {
      clearInterval(_this._autoScrollerTimer);
      window.removeEventListener('mouseup', _this._handleMouseUp);
      window.removeEventListener('touchend', _this._handleMouseUp);
      window.removeEventListener('touchmove', _this._handleTouchMove);
      window.removeEventListener('mousemove', _this._handleMouseMove);

      if (document.documentElement) document.documentElement.style.cursor = '';
      _this._lastScrollDelta = 0;

      var onMoveEnd = _this.props.onMoveEnd;
      var _this$state2 = _this.state,
          dragging = _this$state2.dragging,
          lastDrag = _this$state2.lastDrag,
          list = _this$state2.list;

      if (dragging && lastDrag && onMoveEnd) {
        var dragIndex = _this._getDragIndex();
        if (lastDrag.startIndex !== dragIndex) {
          onMoveEnd(list, list[dragIndex], lastDrag.startIndex, dragIndex);
        }
      }
      _this.setState({ dragging: false });
    };

    _this._lastScrollDelta = 0;

    _this.state = {
      list: props.list,
      useAbsolutePositioning: false,
      dragging: false,
      lastDrag: null
    };
    return _this;
  }

  (0, _createClass3.default)(DraggableList, [{
    key: 'getItemInstance',
    value: function getItemInstance(key) {
      var ref = this._itemRefs.get(key);
      if (!ref) throw new Error('key not found');
      return ref.getTemplate();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _state = this.state,
          dragging = _state.dragging,
          lastDrag = _state.lastDrag;
      var list = newProps.list;


      check: if (lastDrag) {
        var newDragIndex = void 0;
        try {
          newDragIndex = this._getDragIndex(list);
        } catch (err) {
          dragging = false;
          lastDrag = null;
          break check;
        }

        if (dragging) {
          var currentDragIndex = this._getDragIndex();
          if (currentDragIndex !== newDragIndex) {
            // Let's change the list so that the new drag index will be the same as
            // the current so that the dragged item doesn't jump on the screen.
            list = (0, _reactAddonsUpdate2.default)(list, {
              $splice: [[newDragIndex, 1], [currentDragIndex, 0, list[newDragIndex]]]
            });
          }
        }
      }
      this.setState({ dragging: dragging, lastDrag: lastDrag, list: list });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._handleMouseUp();
    }
  }, {
    key: '_handleTouchStart',
    value: function _handleTouchStart(itemKey, pressY, e) {
      event.stopPropagation();
      this._handleStartDrag(itemKey, pressY, e.touches[0].pageY);
    }
  }, {
    key: '_handleMouseDown',
    value: function _handleMouseDown(itemKey, pressY, event) {
      event.preventDefault();
      this._handleStartDrag(itemKey, pressY, event.pageY);
    }
  }, {
    key: '_handleStartDrag',
    value: function _handleStartDrag(itemKey, pressY, pageY) {
      var _this2 = this;

      if (document.documentElement) document.documentElement.style.cursor = 'move';
      window.addEventListener('mouseup', this._handleMouseUp);
      window.addEventListener('touchend', this._handleMouseUp);
      window.addEventListener('touchmove', this._handleTouchMove);
      window.addEventListener('mousemove', this._handleMouseMove);

      // If an element has focus while we drag around the parent, some browsers
      // try to scroll the parent element to keep the focused element in view.
      // Stop that.
      {
        var listEl = (0, _reactDom.findDOMNode)(this);
        if (listEl.contains && document.activeElement && listEl.contains(document.activeElement)) {
          document.activeElement.blur();
        }
      }

      var keyFn = this._getKeyFn();

      if (this._heights.size === 0) {
        this._heights = new _map2.default(this.state.list.map(function (item) {
          var key = keyFn(item);
          var containerRef = _this2._itemRefs.get(key);
          var ref = containerRef ? containerRef.getTemplate() : null;
          var natural = ref ? (0, _reactDom.findDOMNode)(ref).offsetHeight : DEFAULT_HEIGHT.natural;
          var drag = ref && typeof ref.getDragHeight === 'function' && ref.getDragHeight() || natural;
          return [key, { natural: natural, drag: drag }];
        }));
      }

      var itemIndex = this.state.list.map(keyFn).indexOf(itemKey);

      var startY = pressY == null ? this._getDistance(0, itemIndex, false) : pressY;

      var containerEl = this._getContainer();
      var containerScroll = !containerEl || containerEl === document.body ? 0 : containerEl.scrollTop;

      // Need to re-render once before we start dragging so that the `y` values
      // are set using the correct _heights and then can animate from there.
      this.forceUpdate(function () {
        _this2.setState({
          useAbsolutePositioning: true,
          dragging: true,
          lastDrag: {
            itemKey: itemKey,
            startIndex: itemIndex,
            startListKeys: _this2.state.list.map(keyFn),
            startY: startY,
            mouseY: startY,
            mouseOffset: pageY - startY + containerScroll
          }
        });
      });
    }
  }, {
    key: '_scrollContainer',
    value: function _scrollContainer(delta) {
      var containerEl = this._getContainer();
      if (!containerEl) return;
      if (window.scrollBy && containerEl === document.body) {
        window.scrollBy(0, delta);
      } else {
        containerEl.scrollTop += delta;
      }
    }
  }, {
    key: '_adjustScrollAtEnd',
    value: function _adjustScrollAtEnd(delta) {
      var frameDelta = Math.round(delta - this._lastScrollDelta);
      this._scrollContainer(frameDelta);
      this._lastScrollDelta += frameDelta;
    }
  }, {
    key: '_getDragIndex',
    value: function _getDragIndex(list, lastDrag) {
      if (!list) list = this.state.list;
      if (!lastDrag) lastDrag = this.state.lastDrag;
      if (!lastDrag) {
        throw new Error('No drag happened');
      }
      var keyFn = this._getKeyFn();
      var _lastDrag = lastDrag,
          itemKey = _lastDrag.itemKey;

      for (var i = 0, len = list.length; i < len; i++) {
        if (keyFn(list[i]) === itemKey) {
          return i;
        }
      }
      throw new Error('Failed to find drag index');
    }
  }, {
    key: '_getDistance',
    value: function _getDistance(start, end, dragging) {
      if (end < start) {
        return -this._getDistance(end, start, dragging);
      }

      var padding = this.props.padding;
      var list = this.state.list;

      var keyFn = this._getKeyFn();
      var distance = 0;
      for (var i = start; i < end; i++) {
        var height = this._heights.get(keyFn(list[i])) || DEFAULT_HEIGHT;
        distance += (dragging ? height.drag : height.natural) + padding;
      }
      return distance;
    }
  }, {
    key: '_getDistanceDuringDrag',
    value: function _getDistanceDuringDrag(lastDrag, index) {
      var keyFn = this._getKeyFn();
      var list = this.state.list;


      var offset = 0;
      if (this._getDragIndex() < lastDrag.startIndex) {
        var dragItemHeight = this._heights.get(lastDrag.itemKey) || DEFAULT_HEIGHT;
        var newCenterHeight = this._heights.get(keyFn(list[lastDrag.startIndex])) || DEFAULT_HEIGHT;
        offset = dragItemHeight.drag - newCenterHeight.drag;
      }
      return lastDrag.startY + offset + this._getDistance(lastDrag.startIndex, index, true);
    }
  }, {
    key: '_getContainer',
    value: function _getContainer() {
      var container = this.props.container;

      return container ? container() : null;
    }
  }, {
    key: '_getKeyFn',
    value: function _getKeyFn() {
      var itemKey = this.props.itemKey;

      return typeof itemKey === 'function' ? itemKey : function (x) {
        return x[itemKey];
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          springConfig = _props.springConfig,
          container = _props.container,
          padding = _props.padding,
          template = _props.template,
          unsetZIndex = _props.unsetZIndex,
          additionalProps = _props.additionalProps;
      var _state2 = this.state,
          list = _state2.list,
          dragging = _state2.dragging,
          lastDrag = _state2.lastDrag,
          useAbsolutePositioning = _state2.useAbsolutePositioning;


      var keyFn = this._getKeyFn();
      var anySelected = (0, _reactMotion.spring)(dragging ? 1 : 0, springConfig);

      var children = list.map(function (item, i) {
        var key = keyFn(item);
        var selectedStyle = dragging && lastDrag && lastDrag.itemKey === key ? {
          itemSelected: (0, _reactMotion.spring)(1, springConfig),
          y: lastDrag.mouseY
        } : {
          itemSelected: (0, _reactMotion.spring)(0, springConfig),
          y: (useAbsolutePositioning ? _reactMotion.spring : function (x) {
            return x;
          })(dragging && lastDrag ? _this3._getDistanceDuringDrag(lastDrag, i) : _this3._getDistance(0, i, false), springConfig)
        };
        var style = (0, _extends3.default)({
          anySelected: anySelected
        }, selectedStyle);
        var makeDragHandle = function makeDragHandle(el, getY) {
          return _react2.default.createElement(
            _DragHandle2.default,
            {
              onMouseDown: function onMouseDown(e) {
                return _this3._handleMouseDown(key, getY(), e);
              },
              onTouchStart: function onTouchStart(e) {
                return _this3._handleTouchStart(key, getY(), e);
              }
            },
            el
          );
        };
        var height = _this3._heights.get(key) || DEFAULT_HEIGHT;
        return _react2.default.createElement(_reactMotion.Motion, {
          style: style, key: key,
          children: function children(_ref2) {
            var itemSelected = _ref2.itemSelected,
                anySelected = _ref2.anySelected,
                y = _ref2.y;
            return _react2.default.createElement(_MoveContainer2.default, {
              ref: (0, _reactSaveRefs2.default)(_this3._itemRefs, key),
              y: useAbsolutePositioning ? y : null,
              template: template,
              padding: padding,
              item: item,
              itemSelected: itemSelected,
              anySelected: anySelected,
              height: height,
              zIndex: unsetZIndex && !useAbsolutePositioning ? 'auto' : lastDrag && lastDrag.itemKey === key ? list.length : i,
              makeDragHandle: makeDragHandle,
              additionalProps: additionalProps
            });
          }
        });
      });

      var adjustScroll = 0;
      if (!dragging && lastDrag && useAbsolutePositioning) {
        var dragIndex = this._getDragIndex();
        adjustScroll = (0, _reactMotion.spring)(this._getDistance(0, dragIndex, false) - lastDrag.mouseY, springConfig);
      }

      var fullContainerHeight = this._getDistance(0, list.length, false) + 'px';
      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement(_reactMotion.Motion, {
          style: { adjustScroll: adjustScroll, anySelected: anySelected },
          onRest: function onRest() {
            if (!dragging) {
              _this3._heights.clear();
              _this3.setState({ useAbsolutePositioning: false });
            }
          },
          children: function children(_ref3) {
            var adjustScroll = _ref3.adjustScroll;
            return _react2.default.createElement(
              'div',
              {
                style: {
                  display: useAbsolutePositioning ? 'block' : 'none',
                  height: useAbsolutePositioning ? fullContainerHeight : '0px'
                }
              },
              container && _react2.default.createElement(_OnUpdate2.default, { cb: function cb() {
                  if (!dragging && lastDrag && useAbsolutePositioning) {
                    _this3._adjustScrollAtEnd(adjustScroll);
                  }
                } })
            );
          }
        }),
        children
      );
    }
  }]);
  return DraggableList;
}(_react2.default.Component);

DraggableList.propTypes = {
  itemKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]).isRequired,
  template: _react.PropTypes.func,
  list: _react.PropTypes.array.isRequired,
  onMoveEnd: _react.PropTypes.func,
  container: _react.PropTypes.func,
  springConfig: _react.PropTypes.object,
  padding: _react.PropTypes.number,
  unsetZIndex: _react.PropTypes.bool,
  additionalProps: _react.PropTypes.object
};
DraggableList.defaultProps = {
  springConfig: { stiffness: 300, damping: 50 },
  padding: 10,
  unsetZIndex: false
};
exports.default = DraggableList;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0hFSUdIVCIsIm5hdHVyYWwiLCJkcmFnIiwiQVVUT1NDUk9MTF9SRUdJT05fU0laRSIsIkFVVE9TQ1JPTExfTUFYX1NQRUVEIiwiZ2V0U2Nyb2xsU3BlZWQiLCJkaXN0YW5jZSIsIk1hdGgiLCJyb3VuZCIsIkRyYWdnYWJsZUxpc3QiLCJwcm9wcyIsIl9pdGVtUmVmcyIsIl9oZWlnaHRzIiwiX2hhbmRsZVRvdWNoTW92ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIl9oYW5kbGVNb3VzZU1vdmUiLCJ0b3VjaGVzIiwicGFnZVkiLCJjbGllbnRZIiwicGFkZGluZyIsInN0YXRlIiwibGlzdCIsImRyYWdnaW5nIiwibGFzdERyYWciLCJjb250YWluZXJFbCIsIl9nZXRDb250YWluZXIiLCJkcmFnSW5kZXgiLCJfZ2V0RHJhZ0luZGV4IiwibmF0dXJhbFBvc2l0aW9uIiwiX2dldERpc3RhbmNlRHVyaW5nRHJhZyIsImNsZWFySW50ZXJ2YWwiLCJfYXV0b1Njcm9sbGVyVGltZXIiLCJsZW5ndGgiLCJzY3JvbGxTcGVlZCIsImNvbnRhaW5lclJlY3QiLCJkb2N1bWVudCIsImJvZHkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib3R0b20iLCJJbmZpbml0eSIsIm1heCIsImRpc3RhbmNlRnJvbVRvcCIsIm1pbiIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiZGlzdGFuY2VGcm9tQm90dG9tIiwiX3Njcm9sbENvbnRhaW5lciIsInNldFRpbWVvdXQiLCJjb250YWluZXJTY3JvbGwiLCJzY3JvbGxUb3AiLCJtb3VzZVkiLCJtb3VzZU9mZnNldCIsIm1vdmVtZW50RnJvbU5hdHVyYWwiLCJkaXJlY3Rpb24iLCJuZXdJbmRleCIsImtleUZuIiwiX2dldEtleUZuIiwicmVhY2giLCJhYnMiLCJpIiwiaURyYWdIZWlnaHQiLCJnZXQiLCJuZXdMaXN0IiwiJHNwbGljZSIsInNldFN0YXRlIiwiX2hhbmRsZU1vdXNlVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJjdXJzb3IiLCJfbGFzdFNjcm9sbERlbHRhIiwib25Nb3ZlRW5kIiwic3RhcnRJbmRleCIsInVzZUFic29sdXRlUG9zaXRpb25pbmciLCJrZXkiLCJyZWYiLCJFcnJvciIsImdldFRlbXBsYXRlIiwibmV3UHJvcHMiLCJjaGVjayIsIm5ld0RyYWdJbmRleCIsImVyciIsImN1cnJlbnREcmFnSW5kZXgiLCJpdGVtS2V5IiwicHJlc3NZIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJfaGFuZGxlU3RhcnREcmFnIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpc3RFbCIsImNvbnRhaW5zIiwiYWN0aXZlRWxlbWVudCIsImJsdXIiLCJzaXplIiwibWFwIiwiaXRlbSIsImNvbnRhaW5lclJlZiIsIm9mZnNldEhlaWdodCIsImdldERyYWdIZWlnaHQiLCJpdGVtSW5kZXgiLCJpbmRleE9mIiwic3RhcnRZIiwiX2dldERpc3RhbmNlIiwiZm9yY2VVcGRhdGUiLCJzdGFydExpc3RLZXlzIiwiZGVsdGEiLCJzY3JvbGxCeSIsImZyYW1lRGVsdGEiLCJsZW4iLCJzdGFydCIsImVuZCIsImhlaWdodCIsImluZGV4Iiwib2Zmc2V0IiwiZHJhZ0l0ZW1IZWlnaHQiLCJuZXdDZW50ZXJIZWlnaHQiLCJjb250YWluZXIiLCJ4Iiwic3ByaW5nQ29uZmlnIiwidGVtcGxhdGUiLCJ1bnNldFpJbmRleCIsImFkZGl0aW9uYWxQcm9wcyIsImFueVNlbGVjdGVkIiwiY2hpbGRyZW4iLCJzZWxlY3RlZFN0eWxlIiwiaXRlbVNlbGVjdGVkIiwieSIsIm1ha2VEcmFnSGFuZGxlIiwiZWwiLCJnZXRZIiwiX2hhbmRsZU1vdXNlRG93biIsIl9oYW5kbGVUb3VjaFN0YXJ0IiwiYWRqdXN0U2Nyb2xsIiwiZnVsbENvbnRhaW5lckhlaWdodCIsInBvc2l0aW9uIiwiY2xlYXIiLCJkaXNwbGF5IiwiX2FkanVzdFNjcm9sbEF0RW5kIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJhcnJheSIsIm9iamVjdCIsIm51bWJlciIsImJvb2wiLCJkZWZhdWx0UHJvcHMiLCJzdGlmZm5lc3MiLCJkYW1waW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsRUFBQ0MsU0FBUyxHQUFWLEVBQWVDLE1BQU0sRUFBckIsRUFBdkI7O0FBRUEsSUFBTUMseUJBQXlCLEVBQS9CO0FBQ0EsSUFBTUMsdUJBQXVCLEVBQTdCOztBQUVBLFNBQVNDLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLFNBQU9DLEtBQUtDLEtBQUwsQ0FBV0osdUJBQ2ZBLHVCQUFxQkQsc0JBQXRCLEdBQWdERyxRQUQzQyxDQUFQO0FBRUQ7O0lBaUNvQkcsYTs7O0FBMEJuQix5QkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBLG9KQUNsQkEsS0FEa0I7O0FBQUEsVUFKMUJDLFNBSTBCLEdBSmMsbUJBSWQ7QUFBQSxVQUgxQkMsUUFHMEIsR0FIK0IsbUJBRy9COztBQUFBLFVBeUgxQkMsZ0JBekgwQixHQXlIRyxVQUFDQyxDQUFELEVBQU87QUFDbENBLFFBQUVDLGNBQUY7QUFDQSxZQUFLQyxnQkFBTCxDQUFzQkYsRUFBRUcsT0FBRixDQUFVLENBQVYsQ0FBdEI7QUFDRCxLQTVIeUI7O0FBQUEsVUE4SDFCRCxnQkE5SDBCLEdBOEhHLGdCQUFzQjtBQUFBLFVBQXBCRSxLQUFvQixRQUFwQkEsS0FBb0I7QUFBQSxVQUFiQyxPQUFhLFFBQWJBLE9BQWE7QUFBQSxVQUMxQ0MsT0FEMEMsR0FDL0IsTUFBS1YsS0FEMEIsQ0FDMUNVLE9BRDBDO0FBQUEsd0JBRWQsTUFBS0MsS0FGUztBQUFBLFVBRTFD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LFlBQUY7QUFBQSxtQkFDUjtBQUFBO0FBQUE7QUFDRSx1QkFBTztBQUNMSSwyQkFBUy9ELHlCQUF5QixPQUF6QixHQUFtQyxNQUR2QztBQUVMc0MsMEJBQVF0Qyx5QkFBeUI0RCxtQkFBekIsR0FBK0M7QUFGbEQ7QUFEVDtBQU1HakIsMkJBQWEsb0RBQVUsSUFBSSxjQUFNO0FBQ2hDLHNCQUFJLENBQUMvRixRQUFELElBQWFDLFFBQWIsSUFBeUJtRCxzQkFBN0IsRUFBcUQ7QUFDbkQsMkJBQUtnRSxrQkFBTCxDQUF3QkwsWUFBeEI7QUFDRDtBQUNGLGlCQUphO0FBTmhCLGFBRFE7QUFBQTtBQVJaLFVBREY7QUF3QkdUO0FBeEJILE9BREY7QUE0QkQ7OztFQXBhd0MsZ0JBQU1lLFM7O0FBQTVCbkksYSxDQUdab0ksUyxHQUFZO0FBQ2pCeEQsV0FBUyxpQkFBVXlELFNBQVYsQ0FBb0IsQ0FDM0IsaUJBQVVDLE1BRGlCLEVBRTNCLGlCQUFVQyxJQUZpQixDQUFwQixFQUdOQyxVQUpjO0FBS2pCeEIsWUFBVSxpQkFBVXVCLElBTEg7QUFNakIxSCxRQUFNLGlCQUFVNEgsS0FBVixDQUFnQkQsVUFOTDtBQU9qQnhFLGFBQVcsaUJBQVV1RSxJQVBKO0FBUWpCMUIsYUFBVyxpQkFBVTBCLElBUko7QUFTakJ4QixnQkFBYyxpQkFBVTJCLE1BVFA7QUFVakIvSCxXQUFTLGlCQUFVZ0ksTUFWRjtBQVdqQjFCLGVBQWEsaUJBQVUyQixJQVhOO0FBWWpCMUIsbUJBQWlCLGlCQUFVd0I7QUFaVixDO0FBSEExSSxhLENBaUJaNkksWSxHQUE2QjtBQUNsQzlCLGdCQUFjLEVBQUMrQixXQUFXLEdBQVosRUFBaUJDLFNBQVMsRUFBMUIsRUFEb0I7QUFFbENwSSxXQUFTLEVBRnlCO0FBR2xDc0csZUFBYTtBQUhxQixDO2tCQWpCakJqSCxhIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtNb3Rpb24sIHNwcmluZ30gZnJvbSAncmVhY3QtbW90aW9uJztcbmltcG9ydCB1cGRhdGUgZnJvbSAncmVhY3QtYWRkb25zLXVwZGF0ZSc7XG5pbXBvcnQgc2F2ZVJlZnMgZnJvbSAncmVhY3Qtc2F2ZS1yZWZzJztcbmltcG9ydCBEcmFnSGFuZGxlIGZyb20gJy4vRHJhZ0hhbmRsZSc7XG5pbXBvcnQgT25VcGRhdGUgZnJvbSAnLi9PblVwZGF0ZSc7XG5pbXBvcnQgTW92ZUNvbnRhaW5lciBmcm9tICcuL01vdmVDb250YWluZXInO1xuXG5jb25zdCBERUZBVUxUX0hFSUdIVCA9IHtuYXR1cmFsOiAyMDAsIGRyYWc6IDMwfTtcblxuY29uc3QgQVVUT1NDUk9MTF9SRUdJT05fU0laRSA9IDMwO1xuY29uc3QgQVVUT1NDUk9MTF9NQVhfU1BFRUQgPSAxNTtcblxuZnVuY3Rpb24gZ2V0U2Nyb2xsU3BlZWQoZGlzdGFuY2UpIHtcbiAgLy8gSWYgZGlzdGFuY2UgaXMgemVybywgdGhlbiB0aGUgcmVzdWx0IGlzIHRoZSBtYXggc3BlZWQuIE90aGVyd2lzZSxcbiAgLy8gdGhlIHJlc3VsdCB0YXBlcnMgdG93YXJkIHplcm8gYXMgaXQgZ2V0cyBjbG9zZXIgdG8gdGhlIG9wcG9zaXRlXG4gIC8vIGVkZ2Ugb2YgdGhlIHJlZ2lvbi5cbiAgcmV0dXJuIE1hdGgucm91bmQoQVVUT1NDUk9MTF9NQVhfU1BFRUQgLVxuICAgIChBVVRPU0NST0xMX01BWF9TUEVFRC9BVVRPU0NST0xMX1JFR0lPTl9TSVpFKSAqIGRpc3RhbmNlKTtcbn1cblxudHlwZSBEcmFnID0ge1xuICBpdGVtS2V5OiBzdHJpbmc7XG4gIHN0YXJ0SW5kZXg6IG51bWJlcjtcbiAgc3RhcnRMaXN0S2V5czogQXJyYXk8c3RyaW5nPjtcbiAgc3RhcnRZOiBudW1iZXI7XG4gIG1vdXNlWTogbnVtYmVyO1xuICBtb3VzZU9mZnNldDogbnVtYmVyO1xufTtcblxudHlwZSBQcm9wcyA9IHtcbiAgaXRlbUtleTogc3RyaW5nfChpdGVtOiBPYmplY3QpPT5zdHJpbmc7XG4gIHRlbXBsYXRlOiBGdW5jdGlvbjtcbiAgbGlzdDogQXJyYXk8T2JqZWN0PjtcbiAgb25Nb3ZlRW5kPzogPyhuZXdMaXN0OiBBcnJheTxPYmplY3Q+LCBtb3ZlZEl0ZW06IE9iamVjdCwgb2xkSW5kZXg6IG51bWJlciwgbmV3SW5kZXg6IG51bWJlcikgPT4gdm9pZDtcbiAgY29udGFpbmVyPzogPygpID0+ID9IVE1MRWxlbWVudDtcbiAgc3ByaW5nQ29uZmlnOiBPYmplY3Q7XG4gIHBhZGRpbmc6IG51bWJlcjtcbiAgdW5zZXRaSW5kZXg6IGJvb2xlYW47XG4gIGFkZGl0aW9uYWxQcm9wczogT2JqZWN0O1xufTtcbnR5cGUgU3RhdGUgPSB7XG4gIGxpc3Q6IEFycmF5PE9iamVjdD47XG4gIHVzZUFic29sdXRlUG9zaXRpb25pbmc6IGJvb2xlYW47XG4gIGRyYWdnaW5nOiBib29sZWFuO1xuICBsYXN0RHJhZzogP0RyYWc7XG59O1xudHlwZSBEZWZhdWx0UHJvcHMgPSB7XG4gIHNwcmluZ0NvbmZpZzogT2JqZWN0O1xuICBwYWRkaW5nOiBudW1iZXI7XG4gIHVuc2V0WkluZGV4OiBib29sZWFuO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwcm9wczogUHJvcHM7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpdGVtS2V5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuZnVuY1xuICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgdGVtcGxhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIG9uTW92ZUVuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzcHJpbmdDb25maWc6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcGFkZGluZzogUHJvcFR5cGVzLm51bWJlcixcbiAgICB1bnNldFpJbmRleDogUHJvcFR5cGVzLmJvb2wsXG4gICAgYWRkaXRpb25hbFByb3BzOiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6IERlZmF1bHRQcm9wcyA9IHtcbiAgICBzcHJpbmdDb25maWc6IHtzdGlmZm5lc3M6IDMwMCwgZGFtcGluZzogNTB9LFxuICAgIHBhZGRpbmc6IDEwLFxuICAgIHVuc2V0WkluZGV4OiBmYWxzZVxuICB9O1xuICBfaXRlbVJlZnM6IE1hcDxzdHJpbmcsIE1vdmVDb250YWluZXI+ID0gbmV3IE1hcCgpO1xuICBfaGVpZ2h0czogTWFwPHN0cmluZywge25hdHVyYWw6IG51bWJlciwgZHJhZzogbnVtYmVyfT4gPSBuZXcgTWFwKCk7XG4gIF9hdXRvU2Nyb2xsZXJUaW1lcjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbGlzdDogcHJvcHMubGlzdCxcbiAgICAgIHVzZUFic29sdXRlUG9zaXRpb25pbmc6IGZhbHNlLFxuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgbGFzdERyYWc6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgZ2V0SXRlbUluc3RhbmNlKGtleTogc3RyaW5nKTogT2JqZWN0IHtcbiAgICBjb25zdCByZWYgPSB0aGlzLl9pdGVtUmVmcy5nZXQoa2V5KTtcbiAgICBpZiAoIXJlZikgdGhyb3cgbmV3IEVycm9yKCdrZXkgbm90IGZvdW5kJyk7XG4gICAgcmV0dXJuIHJlZi5nZXRUZW1wbGF0ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wczogUHJvcHMpIHtcbiAgICBsZXQge2RyYWdnaW5nLCBsYXN0RHJhZ30gPSB0aGlzLnN0YXRlO1xuICAgIGxldCB7bGlzdH0gPSBuZXdQcm9wcztcblxuICAgIGNoZWNrOiBpZiAobGFzdERyYWcpIHtcbiAgICAgIGxldCBuZXdEcmFnSW5kZXg7XG4gICAgICB0cnkge1xuICAgICAgICBuZXdEcmFnSW5kZXggPSB0aGlzLl9nZXREcmFnSW5kZXgobGlzdCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgbGFzdERyYWcgPSBudWxsO1xuICAgICAgICBicmVhayBjaGVjaztcbiAgICAgIH1cblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREcmFnSW5kZXggPSB0aGlzLl9nZXREcmFnSW5kZXgoKTtcbiAgICAgICAgaWYgKGN1cnJlbnREcmFnSW5kZXggIT09IG5ld0RyYWdJbmRleCkge1xuICAgICAgICAgIC8vIExldCdzIGNoYW5nZSB0aGUgbGlzdCBzbyB0aGF0IHRoZSBuZXcgZHJhZyBpbmRleCB3aWxsIGJlIHRoZSBzYW1lIGFzXG4gICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc28gdGhhdCB0aGUgZHJhZ2dlZCBpdGVtIGRvZXNuJ3QganVtcCBvbiB0aGUgc2NyZWVuLlxuICAgICAgICAgIGxpc3QgPSB1cGRhdGUobGlzdCwge1xuICAgICAgICAgICAgJHNwbGljZTogW1tuZXdEcmFnSW5kZXgsIDFdLCBbY3VycmVudERyYWdJbmRleCwgMCwgbGlzdFtuZXdEcmFnSW5kZXhdXV1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtkcmFnZ2luZywgbGFzdERyYWcsIGxpc3R9KTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlVXAoKTtcbiAgfVxuXG4gIF9oYW5kbGVUb3VjaFN0YXJ0KGl0ZW1LZXk6IHN0cmluZywgcHJlc3NZOiA/bnVtYmVyLCBlOiBPYmplY3QpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLl9oYW5kbGVTdGFydERyYWcoaXRlbUtleSwgcHJlc3NZLCBlLnRvdWNoZXNbMF0ucGFnZVkpO1xuICB9XG5cbiAgX2hhbmRsZU1vdXNlRG93bihpdGVtS2V5OiBzdHJpbmcsIHByZXNzWTogP251bWJlciwgZXZlbnQ6IE9iamVjdCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5faGFuZGxlU3RhcnREcmFnKGl0ZW1LZXksIHByZXNzWSwgZXZlbnQucGFnZVkpO1xuICB9XG5cbiAgX2hhbmRsZVN0YXJ0RHJhZyhpdGVtS2V5OiBzdHJpbmcsIHByZXNzWTogP251bWJlciwgcGFnZVk6IG51bWJlcikge1xuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcblxuICAgIC8vIElmIGFuIGVsZW1lbnQgaGFzIGZvY3VzIHdoaWxlIHdlIGRyYWcgYXJvdW5kIHRoZSBwYXJlbnQsIHNvbWUgYnJvd3NlcnNcbiAgICAvLyB0cnkgdG8gc2Nyb2xsIHRoZSBwYXJlbnQgZWxlbWVudCB0byBrZWVwIHRoZSBmb2N1c2VkIGVsZW1lbnQgaW4gdmlldy5cbiAgICAvLyBTdG9wIHRoYXQuXG4gICAge1xuICAgICAgY29uc3QgbGlzdEVsID0gZmluZERPTU5vZGUodGhpcyk7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RFbC5jb250YWlucyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmXG4gICAgICAgIGxpc3RFbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KVxuICAgICAgKSB7XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGtleUZuID0gdGhpcy5fZ2V0S2V5Rm4oKTtcblxuICAgIGlmICh0aGlzLl9oZWlnaHRzLnNpemUgPT09IDApIHtcbiAgICAgIHRoaXMuX2hlaWdodHMgPSBuZXcgTWFwKFxuICAgICAgICB0aGlzLnN0YXRlLmxpc3QubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgIGNvbnN0IGtleSA9IGtleUZuKGl0ZW0pO1xuICAgICAgICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IHRoaXMuX2l0ZW1SZWZzLmdldChrZXkpO1xuICAgICAgICAgIGNvbnN0IHJlZiA9IGNvbnRhaW5lclJlZiA/IGNvbnRhaW5lclJlZi5nZXRUZW1wbGF0ZSgpIDogbnVsbDtcbiAgICAgICAgICBjb25zdCBuYXR1cmFsID0gcmVmID9cbiAgICAgICAgICAgIGZpbmRET01Ob2RlKHJlZikub2Zmc2V0SGVpZ2h0IDogREVGQVVMVF9IRUlHSFQubmF0dXJhbDtcbiAgICAgICAgICBjb25zdCBkcmFnID0gcmVmICYmICh0eXBlb2YgcmVmLmdldERyYWdIZWlnaHQgPT09ICdmdW5jdGlvbicpICYmIHJlZi5nZXREcmFnSGVpZ2h0KCkgfHwgbmF0dXJhbDtcbiAgICAgICAgICByZXR1cm4gW2tleSwge25hdHVyYWwsIGRyYWd9XTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbUluZGV4ID0gdGhpcy5zdGF0ZS5saXN0Lm1hcChrZXlGbikuaW5kZXhPZihpdGVtS2V5KTtcblxuICAgIGNvbnN0IHN0YXJ0WSA9IHByZXNzWSA9PSBudWxsID9cbiAgICAgIHRoaXMuX2dldERpc3RhbmNlKDAsIGl0ZW1JbmRleCwgZmFsc2UpIDogcHJlc3NZO1xuXG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLl9nZXRDb250YWluZXIoKTtcbiAgICBjb25zdCBjb250YWluZXJTY3JvbGwgPSAhY29udGFpbmVyRWwgfHwgY29udGFpbmVyRWwgPT09IGRvY3VtZW50LmJvZHkgP1xuICAgICAgMCA6IGNvbnRhaW5lckVsLnNjcm9sbFRvcDtcblxuICAgIC8vIE5lZWQgdG8gcmUtcmVuZGVyIG9uY2UgYmVmb3JlIHdlIHN0YXJ0IGRyYWdnaW5nIHNvIHRoYXQgdGhlIGB5YCB2YWx1ZXNcbiAgICAvLyBhcmUgc2V0IHVzaW5nIHRoZSBjb3JyZWN0IF9oZWlnaHRzIGFuZCB0aGVuIGNhbiBhbmltYXRlIGZyb20gdGhlcmUuXG4gICAgdGhpcy5mb3JjZVVwZGF0ZSgoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXNlQWJzb2x1dGVQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICAgICAgZHJhZ2dpbmc6IHRydWUsXG4gICAgICAgIGxhc3REcmFnOiB7XG4gICAgICAgICAgaXRlbUtleTogaXRlbUtleSxcbiAgICAgICAgICBzdGFydEluZGV4OiBpdGVtSW5kZXgsXG4gICAgICAgICAgc3RhcnRMaXN0S2V5czogdGhpcy5zdGF0ZS5saXN0Lm1hcChrZXlGbiksXG4gICAgICAgICAgc3RhcnRZLFxuICAgICAgICAgIG1vdXNlWTogc3RhcnRZLFxuICAgICAgICAgIG1vdXNlT2Zmc2V0OiBwYWdlWSAtIHN0YXJ0WSArIGNvbnRhaW5lclNjcm9sbFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9oYW5kbGVUb3VjaE1vdmU6IEZ1bmN0aW9uID0gKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5faGFuZGxlTW91c2VNb3ZlKGUudG91Y2hlc1swXSk7XG4gIH07XG5cbiAgX2hhbmRsZU1vdXNlTW92ZTogRnVuY3Rpb24gPSAoe3BhZ2VZLCBjbGllbnRZfSkgPT4ge1xuICAgIGNvbnN0IHtwYWRkaW5nfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2xpc3QsIGRyYWdnaW5nLCBsYXN0RHJhZ30gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghZHJhZ2dpbmcgfHwgIWxhc3REcmFnKSByZXR1cm47XG5cbiAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMuX2dldENvbnRhaW5lcigpO1xuICAgIGNvbnN0IGRyYWdJbmRleCA9IHRoaXMuX2dldERyYWdJbmRleCgpO1xuICAgIGNvbnN0IG5hdHVyYWxQb3NpdGlvbiA9IHRoaXMuX2dldERpc3RhbmNlRHVyaW5nRHJhZyhsYXN0RHJhZywgZHJhZ0luZGV4KTtcblxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fYXV0b1Njcm9sbGVyVGltZXIpO1xuXG4gICAgLy8gSWYgdGhlIHVzZXIgaGFzIHRoZSBtb3VzZSBuZWFyIHRoZSB0b3Agb3IgYm90dG9tIG9mIHRoZSBjb250YWluZXIgYW5kXG4gICAgLy8gbm90IGF0IHRoZSBlbmQgb2YgdGhlIGxpc3QsIHRoZW4gYXV0b3Njcm9sbC5cbiAgICBpZiAoZHJhZ0luZGV4ICE9PSAwICYmIGRyYWdJbmRleCAhPT0gbGlzdC5sZW5ndGgtMSkge1xuICAgICAgbGV0IHNjcm9sbFNwZWVkID0gMDtcblxuICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lckVsICYmIGNvbnRhaW5lckVsICE9PSBkb2N1bWVudC5ib2R5ICYmXG4gICAgICAgIGNvbnRhaW5lckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA/XG4gICAgICAgICAgY29udGFpbmVyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOlxuICAgICAgICAgIHt0b3A6IDAsIGJvdHRvbTogSW5maW5pdHl9O1xuXG4gICAgICAvLyBHZXQgdGhlIGxvd2VzdCBvZiB0aGUgc2NyZWVuIHRvcCBhbmQgdGhlIGNvbnRhaW5lciB0b3AuXG4gICAgICBjb25zdCB0b3AgPSBNYXRoLm1heCgwLCBjb250YWluZXJSZWN0LnRvcCk7XG5cbiAgICAgIGNvbnN0IGRpc3RhbmNlRnJvbVRvcCA9IGNsaWVudFktdG9wO1xuICAgICAgaWYgKGRpc3RhbmNlRnJvbVRvcCA+IDAgJiYgZGlzdGFuY2VGcm9tVG9wIDwgQVVUT1NDUk9MTF9SRUdJT05fU0laRSkge1xuICAgICAgICBzY3JvbGxTcGVlZCA9IC0xICogZ2V0U2Nyb2xsU3BlZWQoZGlzdGFuY2VGcm9tVG9wKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEdldCB0aGUgbG93ZXN0IG9mIHRoZSBzY3JlZW4gYm90dG9tIGFuZCB0aGUgY29udGFpbmVyIGJvdHRvbS5cbiAgICAgICAgY29uc3QgYm90dG9tID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCBjb250YWluZXJSZWN0LmJvdHRvbSk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlRnJvbUJvdHRvbSA9IGJvdHRvbS1jbGllbnRZO1xuICAgICAgICBpZiAoZGlzdGFuY2VGcm9tQm90dG9tID4gMCAmJiBkaXN0YW5jZUZyb21Cb3R0b20gPCBBVVRPU0NST0xMX1JFR0lPTl9TSVpFKSB7XG4gICAgICAgICAgc2Nyb2xsU3BlZWQgPSBnZXRTY3JvbGxTcGVlZChkaXN0YW5jZUZyb21Cb3R0b20pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY3JvbGxTcGVlZCAhPT0gMCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxDb250YWluZXIoc2Nyb2xsU3BlZWQpO1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSh7XG4gICAgICAgICAgICBwYWdlWTogcGFnZVkgKyAoY29udGFpbmVyRWw9PT1kb2N1bWVudC5ib2R5P3Njcm9sbFNwZWVkOjApLFxuICAgICAgICAgICAgY2xpZW50WVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxNik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY29udGFpbmVyU2Nyb2xsID0gIWNvbnRhaW5lckVsIHx8IGNvbnRhaW5lckVsID09PSBkb2N1bWVudC5ib2R5ID9cbiAgICAgIDAgOiBjb250YWluZXJFbC5zY3JvbGxUb3A7XG4gICAgY29uc3QgbW91c2VZID0gcGFnZVkgLSBsYXN0RHJhZy5tb3VzZU9mZnNldCArIGNvbnRhaW5lclNjcm9sbDtcblxuICAgIGNvbnN0IG1vdmVtZW50RnJvbU5hdHVyYWwgPSBtb3VzZVktbmF0dXJhbFBvc2l0aW9uO1xuICAgIC8vIDEgZG93biwgLTEgdXAsIDAgbmVpdGhlclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IG1vdmVtZW50RnJvbU5hdHVyYWwgPiAwID8gMSA6XG4gICAgICBtb3ZlbWVudEZyb21OYXR1cmFsIDwgMCA/IC0xIDogMDtcbiAgICBsZXQgbmV3SW5kZXggPSBkcmFnSW5kZXg7XG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gMCkge1xuICAgICAgY29uc3Qga2V5Rm4gPSB0aGlzLl9nZXRLZXlGbigpO1xuICAgICAgbGV0IHJlYWNoID0gTWF0aC5hYnMobW92ZW1lbnRGcm9tTmF0dXJhbCk7XG4gICAgICBmb3IgKGxldCBpPWRyYWdJbmRleCtkaXJlY3Rpb247IGkgPCBsaXN0Lmxlbmd0aCAmJiBpID49IDA7IGkgKz0gZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGlEcmFnSGVpZ2h0ID0gKHRoaXMuX2hlaWdodHMuZ2V0KGtleUZuKGxpc3RbaV0pKSB8fCBERUZBVUxUX0hFSUdIVCkuZHJhZztcbiAgICAgICAgaWYgKHJlYWNoIDwgaURyYWdIZWlnaHQvMiArIHBhZGRpbmcpIGJyZWFrO1xuICAgICAgICByZWFjaCAtPSBpRHJhZ0hlaWdodCArIHBhZGRpbmc7XG4gICAgICAgIG5ld0luZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV3TGlzdCA9IGxpc3Q7XG4gICAgaWYgKG5ld0luZGV4ICE9PSBkcmFnSW5kZXgpIHtcbiAgICAgIG5ld0xpc3QgPSB1cGRhdGUobGlzdCwge1xuICAgICAgICAkc3BsaWNlOiBbW2RyYWdJbmRleCwgMV0sIFtuZXdJbmRleCwgMCwgbGlzdFtkcmFnSW5kZXhdXV1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe2xhc3REcmFnOiB7Li4ubGFzdERyYWcsIG1vdXNlWX0sIGxpc3Q6IG5ld0xpc3R9KTtcbiAgfTtcblxuICBfaGFuZGxlTW91c2VVcDogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9hdXRvU2Nyb2xsZXJUaW1lcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLl9oYW5kbGVNb3VzZVVwKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5faGFuZGxlVG91Y2hNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5faGFuZGxlTW91c2VNb3ZlKTtcblxuICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSAnJztcbiAgICB0aGlzLl9sYXN0U2Nyb2xsRGVsdGEgPSAwO1xuXG4gICAgY29uc3Qge29uTW92ZUVuZH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtkcmFnZ2luZywgbGFzdERyYWcsIGxpc3R9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoZHJhZ2dpbmcgJiYgbGFzdERyYWcgJiYgb25Nb3ZlRW5kKSB7XG4gICAgICBjb25zdCBkcmFnSW5kZXggPSB0aGlzLl9nZXREcmFnSW5kZXgoKTtcbiAgICAgIGlmIChsYXN0RHJhZy5zdGFydEluZGV4ICE9PSBkcmFnSW5kZXgpIHtcbiAgICAgICAgb25Nb3ZlRW5kKGxpc3QsIGxpc3RbZHJhZ0luZGV4XSwgbGFzdERyYWcuc3RhcnRJbmRleCwgZHJhZ0luZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ2dpbmc6IGZhbHNlfSk7XG4gIH07XG5cbiAgX3Njcm9sbENvbnRhaW5lcihkZWx0YTogbnVtYmVyKSB7XG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLl9nZXRDb250YWluZXIoKTtcbiAgICBpZiAoIWNvbnRhaW5lckVsKSByZXR1cm47XG4gICAgaWYgKHdpbmRvdy5zY3JvbGxCeSAmJiBjb250YWluZXJFbCA9PT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgd2luZG93LnNjcm9sbEJ5KDAsIGRlbHRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyRWwuc2Nyb2xsVG9wICs9IGRlbHRhO1xuICAgIH1cbiAgfVxuXG4gIF9sYXN0U2Nyb2xsRGVsdGE6IG51bWJlciA9IDA7XG4gIF9hZGp1c3RTY3JvbGxBdEVuZChkZWx0YTogbnVtYmVyKSB7XG4gICAgY29uc3QgZnJhbWVEZWx0YSA9IE1hdGgucm91bmQoZGVsdGEgLSB0aGlzLl9sYXN0U2Nyb2xsRGVsdGEpO1xuICAgIHRoaXMuX3Njcm9sbENvbnRhaW5lcihmcmFtZURlbHRhKTtcbiAgICB0aGlzLl9sYXN0U2Nyb2xsRGVsdGEgKz0gZnJhbWVEZWx0YTtcbiAgfVxuXG4gIF9nZXREcmFnSW5kZXgobGlzdDogP0FycmF5PE9iamVjdD4sIGxhc3REcmFnOiA/RHJhZyk6IG51bWJlciB7XG4gICAgaWYgKCFsaXN0KSBsaXN0ID0gdGhpcy5zdGF0ZS5saXN0O1xuICAgIGlmICghbGFzdERyYWcpIGxhc3REcmFnID0gdGhpcy5zdGF0ZS5sYXN0RHJhZztcbiAgICBpZiAoIWxhc3REcmFnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGRyYWcgaGFwcGVuZWQnKTtcbiAgICB9XG4gICAgY29uc3Qga2V5Rm4gPSB0aGlzLl9nZXRLZXlGbigpO1xuICAgIGNvbnN0IHtpdGVtS2V5fSA9IGxhc3REcmFnO1xuICAgIGZvciAobGV0IGk9MCwgbGVuPWxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChrZXlGbihsaXN0W2ldKSA9PT0gaXRlbUtleSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmluZCBkcmFnIGluZGV4Jyk7XG4gIH1cblxuICBfZ2V0RGlzdGFuY2Uoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGRyYWdnaW5nOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBpZiAoZW5kIDwgc3RhcnQpIHtcbiAgICAgIHJldHVybiAtdGhpcy5fZ2V0RGlzdGFuY2UoZW5kLCBzdGFydCwgZHJhZ2dpbmcpO1xuICAgIH1cblxuICAgIGNvbnN0IHtwYWRkaW5nfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2xpc3R9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBrZXlGbiA9IHRoaXMuX2dldEtleUZuKCk7XG4gICAgbGV0IGRpc3RhbmNlID0gMDtcbiAgICBmb3IgKGxldCBpPXN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX2hlaWdodHMuZ2V0KGtleUZuKGxpc3RbaV0pKSB8fCBERUZBVUxUX0hFSUdIVDtcbiAgICAgIGRpc3RhbmNlICs9IChkcmFnZ2luZyA/IGhlaWdodC5kcmFnIDogaGVpZ2h0Lm5hdHVyYWwpICsgcGFkZGluZztcbiAgICB9XG4gICAgcmV0dXJuIGRpc3RhbmNlO1xuICB9XG5cbiAgX2dldERpc3RhbmNlRHVyaW5nRHJhZyhsYXN0RHJhZzogRHJhZywgaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3Qga2V5Rm4gPSB0aGlzLl9nZXRLZXlGbigpO1xuICAgIGNvbnN0IHtsaXN0fSA9IHRoaXMuc3RhdGU7XG5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBpZiAodGhpcy5fZ2V0RHJhZ0luZGV4KCkgPCBsYXN0RHJhZy5zdGFydEluZGV4KSB7XG4gICAgICBjb25zdCBkcmFnSXRlbUhlaWdodCA9IHRoaXMuX2hlaWdodHMuZ2V0KGxhc3REcmFnLml0ZW1LZXkpIHx8IERFRkFVTFRfSEVJR0hUO1xuICAgICAgY29uc3QgbmV3Q2VudGVySGVpZ2h0ID1cbiAgICAgICAgdGhpcy5faGVpZ2h0cy5nZXQoa2V5Rm4obGlzdFtsYXN0RHJhZy5zdGFydEluZGV4XSkpIHx8IERFRkFVTFRfSEVJR0hUO1xuICAgICAgb2Zmc2V0ID0gZHJhZ0l0ZW1IZWlnaHQuZHJhZyAtIG5ld0NlbnRlckhlaWdodC5kcmFnO1xuICAgIH1cbiAgICByZXR1cm4gbGFzdERyYWcuc3RhcnRZICsgb2Zmc2V0ICtcbiAgICAgIHRoaXMuX2dldERpc3RhbmNlKGxhc3REcmFnLnN0YXJ0SW5kZXgsIGluZGV4LCB0cnVlKTtcbiAgfVxuXG4gIF9nZXRDb250YWluZXIoKTogP0hUTUxFbGVtZW50IHtcbiAgICBjb25zdCB7Y29udGFpbmVyfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGNvbnRhaW5lciA/IGNvbnRhaW5lcigpIDogbnVsbDtcbiAgfVxuXG4gIF9nZXRLZXlGbigpOiAoaXRlbTogT2JqZWN0KSA9PiBzdHJpbmcge1xuICAgIGNvbnN0IHtpdGVtS2V5fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHR5cGVvZiBpdGVtS2V5ID09PSAnZnVuY3Rpb24nID8gaXRlbUtleSA6IHggPT4geFtpdGVtS2V5XTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7c3ByaW5nQ29uZmlnLCBjb250YWluZXIsIHBhZGRpbmcsIHRlbXBsYXRlLCB1bnNldFpJbmRleCwgYWRkaXRpb25hbFByb3BzfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2xpc3QsIGRyYWdnaW5nLCBsYXN0RHJhZywgdXNlQWJzb2x1dGVQb3NpdGlvbmluZ30gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3Qga2V5Rm4gPSB0aGlzLl9nZXRLZXlGbigpO1xuICAgIGNvbnN0IGFueVNlbGVjdGVkID0gc3ByaW5nKGRyYWdnaW5nID8gMSA6IDAsIHNwcmluZ0NvbmZpZyk7XG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IGxpc3QubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlGbihpdGVtKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkU3R5bGUgPSBkcmFnZ2luZyAmJiBsYXN0RHJhZyAmJiBsYXN0RHJhZy5pdGVtS2V5ID09PSBrZXlcbiAgICAgICAgPyB7XG4gICAgICAgICAgaXRlbVNlbGVjdGVkOiBzcHJpbmcoMSwgc3ByaW5nQ29uZmlnKSxcbiAgICAgICAgICB5OiBsYXN0RHJhZy5tb3VzZVlcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICBpdGVtU2VsZWN0ZWQ6IHNwcmluZygwLCBzcHJpbmdDb25maWcpLFxuICAgICAgICAgIHk6ICh1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nID8gc3ByaW5nIDogeD0+eCkoZHJhZ2dpbmcgJiYgbGFzdERyYWcgP1xuICAgICAgICAgICAgICB0aGlzLl9nZXREaXN0YW5jZUR1cmluZ0RyYWcobGFzdERyYWcsIGkpXG4gICAgICAgICAgICAgIDogdGhpcy5fZ2V0RGlzdGFuY2UoMCwgaSwgZmFsc2UpLCBzcHJpbmdDb25maWcpXG4gICAgICAgIH07XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgYW55U2VsZWN0ZWQsXG4gICAgICAgIC4uLnNlbGVjdGVkU3R5bGVcbiAgICAgIH07XG4gICAgICBjb25zdCBtYWtlRHJhZ0hhbmRsZSA9IChlbCwgZ2V0WTogKCk9Pj9udW1iZXIpID0+IChcbiAgICAgICAgPERyYWdIYW5kbGVcbiAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB0aGlzLl9oYW5kbGVNb3VzZURvd24oa2V5LCBnZXRZKCksIGUpfVxuICAgICAgICAgIG9uVG91Y2hTdGFydD17ZSA9PiB0aGlzLl9oYW5kbGVUb3VjaFN0YXJ0KGtleSwgZ2V0WSgpLCBlKX1cbiAgICAgICAgICA+XG4gICAgICAgICAge2VsfVxuICAgICAgICA8L0RyYWdIYW5kbGU+XG4gICAgICApO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0cy5nZXQoa2V5KSB8fCBERUZBVUxUX0hFSUdIVDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNb3Rpb25cbiAgICAgICAgICBzdHlsZT17c3R5bGV9IGtleT17a2V5fVxuICAgICAgICAgIGNoaWxkcmVuPXsoe2l0ZW1TZWxlY3RlZCwgYW55U2VsZWN0ZWQsIHl9KSA9PlxuICAgICAgICAgICAgPE1vdmVDb250YWluZXJcbiAgICAgICAgICAgICAgcmVmPXtzYXZlUmVmcyh0aGlzLl9pdGVtUmVmcywga2V5KX1cbiAgICAgICAgICAgICAgeT17dXNlQWJzb2x1dGVQb3NpdGlvbmluZyA/IHkgOiBudWxsfVxuICAgICAgICAgICAgICB0ZW1wbGF0ZT17dGVtcGxhdGV9XG4gICAgICAgICAgICAgIHBhZGRpbmc9e3BhZGRpbmd9XG4gICAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAgIGl0ZW1TZWxlY3RlZD17aXRlbVNlbGVjdGVkfVxuICAgICAgICAgICAgICBhbnlTZWxlY3RlZD17YW55U2VsZWN0ZWR9XG4gICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgICB6SW5kZXg9e3Vuc2V0WkluZGV4ICYmICF1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nID8gJ2F1dG8nIDpcbiAgICAgICAgICAgICAgICAobGFzdERyYWcgJiYgbGFzdERyYWcuaXRlbUtleSA9PT0ga2V5ID8gbGlzdC5sZW5ndGggOiBpKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG1ha2VEcmFnSGFuZGxlPXttYWtlRHJhZ0hhbmRsZX1cbiAgICAgICAgICAgICAgYWRkaXRpb25hbFByb3BzPXthZGRpdGlvbmFsUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBsZXQgYWRqdXN0U2Nyb2xsID0gMDtcbiAgICBpZiAoIWRyYWdnaW5nICYmIGxhc3REcmFnICYmIHVzZUFic29sdXRlUG9zaXRpb25pbmcpIHtcbiAgICAgIGNvbnN0IGRyYWdJbmRleCA9IHRoaXMuX2dldERyYWdJbmRleCgpO1xuICAgICAgYWRqdXN0U2Nyb2xsID0gc3ByaW5nKFxuICAgICAgICB0aGlzLl9nZXREaXN0YW5jZSgwLCBkcmFnSW5kZXgsIGZhbHNlKVxuICAgICAgICAtIGxhc3REcmFnLm1vdXNlWSxcbiAgICAgICAgc3ByaW5nQ29uZmlnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGZ1bGxDb250YWluZXJIZWlnaHQgPSBgJHt0aGlzLl9nZXREaXN0YW5jZSgwLCBsaXN0Lmxlbmd0aCwgZmFsc2UpfXB4YDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnfX0+XG4gICAgICAgIDxNb3Rpb25cbiAgICAgICAgICBzdHlsZT17e2FkanVzdFNjcm9sbCwgYW55U2VsZWN0ZWR9fVxuICAgICAgICAgIG9uUmVzdD17KCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICAgICAgICB0aGlzLl9oZWlnaHRzLmNsZWFyKCk7XG4gICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZUFic29sdXRlUG9zaXRpb25pbmc6IGZhbHNlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjaGlsZHJlbj17KHthZGp1c3RTY3JvbGx9KSA9PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHVzZUFic29sdXRlUG9zaXRpb25pbmcgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdXNlQWJzb2x1dGVQb3NpdGlvbmluZyA/IGZ1bGxDb250YWluZXJIZWlnaHQgOiAnMHB4J1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29udGFpbmVyICYmIDxPblVwZGF0ZSBjYj17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZHJhZ2dpbmcgJiYgbGFzdERyYWcgJiYgdXNlQWJzb2x1dGVQb3NpdGlvbmluZykge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fYWRqdXN0U2Nyb2xsQXRFbmQoYWRqdXN0U2Nyb2xsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19IC8+fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=