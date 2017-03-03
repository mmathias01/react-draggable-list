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
          eventHandlers = _props.eventHandlers;
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
              eventHandlers: eventHandlers
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
  eventHandlers: _react.PropTypes.object
};
DraggableList.defaultProps = {
  springConfig: { stiffness: 300, damping: 50 },
  padding: 10,
  unsetZIndex: false
};
exports.default = DraggableList;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0hFSUdIVCIsIm5hdHVyYWwiLCJkcmFnIiwiQVVUT1NDUk9MTF9SRUdJT05fU0laRSIsIkFVVE9TQ1JPTExfTUFYX1NQRUVEIiwiZ2V0U2Nyb2xsU3BlZWQiLCJkaXN0YW5jZSIsIk1hdGgiLCJyb3VuZCIsIkRyYWdnYWJsZUxpc3QiLCJwcm9wcyIsIl9pdGVtUmVmcyIsIl9oZWlnaHRzIiwiX2hhbmRsZVRvdWNoTW92ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIl9oYW5kbGVNb3VzZU1vdmUiLCJ0b3VjaGVzIiwicGFnZVkiLCJjbGllbnRZIiwicGFkZGluZyIsInN0YXRlIiwibGlzdCIsImRyYWdnaW5nIiwibGFzdERyYWciLCJjb250YWluZXJFbCIsIl9nZXRDb250YWluZXIiLCJkcmFnSW5kZXgiLCJfZ2V0RHJhZ0luZGV4IiwibmF0dXJhbFBvc2l0aW9uIiwiX2dldERpc3RhbmNlRHVyaW5nRHJhZyIsImNsZWFySW50ZXJ2YWwiLCJfYXV0b1Njcm9sbGVyVGltZXIiLCJsZW5ndGgiLCJzY3JvbGxTcGVlZCIsImNvbnRhaW5lclJlY3QiLCJkb2N1bWVudCIsImJvZHkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJib3R0b20iLCJJbmZpbml0eSIsIm1heCIsImRpc3RhbmNlRnJvbVRvcCIsIm1pbiIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiZGlzdGFuY2VGcm9tQm90dG9tIiwiX3Njcm9sbENvbnRhaW5lciIsInNldFRpbWVvdXQiLCJjb250YWluZXJTY3JvbGwiLCJzY3JvbGxUb3AiLCJtb3VzZVkiLCJtb3VzZU9mZnNldCIsIm1vdmVtZW50RnJvbU5hdHVyYWwiLCJkaXJlY3Rpb24iLCJuZXdJbmRleCIsImtleUZuIiwiX2dldEtleUZuIiwicmVhY2giLCJhYnMiLCJpIiwiaURyYWdIZWlnaHQiLCJnZXQiLCJuZXdMaXN0IiwiJHNwbGljZSIsInNldFN0YXRlIiwiX2hhbmRsZU1vdXNlVXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJjdXJzb3IiLCJfbGFzdFNjcm9sbERlbHRhIiwib25Nb3ZlRW5kIiwic3RhcnRJbmRleCIsInVzZUFic29sdXRlUG9zaXRpb25pbmciLCJrZXkiLCJyZWYiLCJFcnJvciIsImdldFRlbXBsYXRlIiwibmV3UHJvcHMiLCJjaGVjayIsIm5ld0RyYWdJbmRleCIsImVyciIsImN1cnJlbnREcmFnSW5kZXgiLCJpdGVtS2V5IiwicHJlc3NZIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJfaGFuZGxlU3RhcnREcmFnIiwiYWRkRXZlbnRMaXN0ZW5lciIsImxpc3RFbCIsImNvbnRhaW5zIiwiYWN0aXZlRWxlbWVudCIsImJsdXIiLCJzaXplIiwibWFwIiwiaXRlbSIsImNvbnRhaW5lclJlZiIsIm9mZnNldEhlaWdodCIsImdldERyYWdIZWlnaHQiLCJpdGVtSW5kZXgiLCJpbmRleE9mIiwic3RhcnRZIiwiX2dldERpc3RhbmNlIiwiZm9yY2VVcGRhdGUiLCJzdGFydExpc3RLZXlzIiwiZGVsdGEiLCJzY3JvbGxCeSIsImZyYW1lRGVsdGEiLCJsZW4iLCJzdGFydCIsImVuZCIsImhlaWdodCIsImluZGV4Iiwib2Zmc2V0IiwiZHJhZ0l0ZW1IZWlnaHQiLCJuZXdDZW50ZXJIZWlnaHQiLCJjb250YWluZXIiLCJ4Iiwic3ByaW5nQ29uZmlnIiwidGVtcGxhdGUiLCJ1bnNldFpJbmRleCIsImV2ZW50SGFuZGxlcnMiLCJhbnlTZWxlY3RlZCIsImNoaWxkcmVuIiwic2VsZWN0ZWRTdHlsZSIsIml0ZW1TZWxlY3RlZCIsInkiLCJtYWtlRHJhZ0hhbmRsZSIsImVsIiwiZ2V0WSIsIl9oYW5kbGVNb3VzZURvd24iLCJfaGFuZGxlVG91Y2hTdGFydCIsImFkanVzdFNjcm9sbCIsImZ1bGxDb250YWluZXJIZWlnaHQiLCJwb3NpdGlvbiIsImNsZWFyIiwiZGlzcGxheSIsIl9hZGp1c3RTY3JvbGxBdEVuZCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXkiLCJvYmplY3QiLCJudW1iZXIiLCJib29sIiwiZGVmYXVsdFByb3BzIiwic3RpZmZuZXNzIiwiZGFtcGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLEVBQUNDLFNBQVMsR0FBVixFQUFlQyxNQUFNLEVBQXJCLEVBQXZCOztBQUVBLElBQU1DLHlCQUF5QixFQUEvQjtBQUNBLElBQU1DLHVCQUF1QixFQUE3Qjs7QUFFQSxTQUFTQyxjQUFULENBQXdCQyxRQUF4QixFQUFrQztBQUNoQztBQUNBO0FBQ0E7QUFDQSxTQUFPQyxLQUFLQyxLQUFMLENBQVdKLHVCQUNmQSx1QkFBcUJELHNCQUF0QixHQUFnREcsUUFEM0MsQ0FBUDtBQUVEOztJQWlDb0JHLGE7OztBQTBCbkIseUJBQVlDLEtBQVosRUFBMEI7QUFBQTs7QUFBQSxvSkFDbEJBLEtBRGtCOztBQUFBLFVBSjFCQyxTQUkwQixHQUpjLG1CQUlkO0FBQUEsVUFIMUJDLFFBRzBCLEdBSCtCLG1CQUcvQjs7QUFBQSxVQXlIMUJDLGdCQXpIMEIsR0F5SEcsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2xDQSxRQUFFQyxjQUFGO0FBQ0EsWUFBS0MsZ0JBQUwsQ0FBc0JGLEVBQUVHLE9BQUYsQ0FBVSxDQUFWLENBQXRCO0FBQ0QsS0E1SHlCOztBQUFBLFVBOEgxQkQsZ0JBOUgwQixHQThIRyxnQkFBc0I7QUFBQSxVQUFwQkUsS0FBb0IsUUFBcEJBLEtBQW9CO0FBQUEsVUFBYkMsT0FBYSxRQUFiQSxPQUFhO0FBQUEsVUFDMUNDLE9BRDBDLEdBQy9CLE1BQUtWLEtBRDBCLENBQzFDVSxPQUQwQztBQUFBLHdCQUVkLE1BQUtDLEtBRlM7QUFBQSxVQUUxQ0Ms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QUY7QUFBQSxtQkFDUjtBQUFBO0FBQUE7QUFDRSx1QkFBTztBQUNMSSwyQkFBUy9ELHlCQUF5QixPQUF6QixHQUFtQyxNQUR2QztBQUVMc0MsMEJBQVF0Qyx5QkFBeUI0RCxtQkFBekIsR0FBK0M7QUFGbEQ7QUFEVDtBQU1HakIsMkJBQWEsb0RBQVUsSUFBSSxjQUFNO0FBQ2hDLHNCQUFJLENBQUMvRixRQUFELElBQWFDLFFBQWIsSUFBeUJtRCxzQkFBN0IsRUFBcUQ7QUFDbkQsMkJBQUtnRSxrQkFBTCxDQUF3QkwsWUFBeEI7QUFDRDtBQUNGLGlCQUphO0FBTmhCLGFBRFE7QUFBQTtBQVJaLFVBREY7QUF3QkdUO0FBeEJILE9BREY7QUE0QkQ7OztFQXBhd0MsZ0JBQU1lLFM7O0FBQTVCbkksYSxDQUdab0ksUyxHQUFZO0FBQ2pCeEQsV0FBUyxpQkFBVXlELFNBQVYsQ0FBb0IsQ0FDM0IsaUJBQVVDLE1BRGlCLEVBRTNCLGlCQUFVQyxJQUZpQixDQUFwQixFQUdOQyxVQUpjO0FBS2pCeEIsWUFBVSxpQkFBVXVCLElBTEg7QUFNakIxSCxRQUFNLGlCQUFVNEgsS0FBVixDQUFnQkQsVUFOTDtBQU9qQnhFLGFBQVcsaUJBQVV1RSxJQVBKO0FBUWpCMUIsYUFBVyxpQkFBVTBCLElBUko7QUFTakJ4QixnQkFBYyxpQkFBVTJCLE1BVFA7QUFVakIvSCxXQUFTLGlCQUFVZ0ksTUFWRjtBQVdqQjFCLGVBQWEsaUJBQVUyQixJQVhOO0FBWWpCMUIsaUJBQWUsaUJBQVV3QjtBQVpSLEM7QUFIQTFJLGEsQ0FpQlo2SSxZLEdBQTZCO0FBQ2xDOUIsZ0JBQWMsRUFBQytCLFdBQVcsR0FBWixFQUFpQkMsU0FBUyxFQUExQixFQURvQjtBQUVsQ3BJLFdBQVMsRUFGeUI7QUFHbENzRyxlQUFhO0FBSHFCLEM7a0JBakJqQmpILGEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge01vdGlvbiwgc3ByaW5nfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuaW1wb3J0IHVwZGF0ZSBmcm9tICdyZWFjdC1hZGRvbnMtdXBkYXRlJztcbmltcG9ydCBzYXZlUmVmcyBmcm9tICdyZWFjdC1zYXZlLXJlZnMnO1xuaW1wb3J0IERyYWdIYW5kbGUgZnJvbSAnLi9EcmFnSGFuZGxlJztcbmltcG9ydCBPblVwZGF0ZSBmcm9tICcuL09uVXBkYXRlJztcbmltcG9ydCBNb3ZlQ29udGFpbmVyIGZyb20gJy4vTW92ZUNvbnRhaW5lcic7XG5cbmNvbnN0IERFRkFVTFRfSEVJR0hUID0ge25hdHVyYWw6IDIwMCwgZHJhZzogMzB9O1xuXG5jb25zdCBBVVRPU0NST0xMX1JFR0lPTl9TSVpFID0gMzA7XG5jb25zdCBBVVRPU0NST0xMX01BWF9TUEVFRCA9IDE1O1xuXG5mdW5jdGlvbiBnZXRTY3JvbGxTcGVlZChkaXN0YW5jZSkge1xuICAvLyBJZiBkaXN0YW5jZSBpcyB6ZXJvLCB0aGVuIHRoZSByZXN1bHQgaXMgdGhlIG1heCBzcGVlZC4gT3RoZXJ3aXNlLFxuICAvLyB0aGUgcmVzdWx0IHRhcGVycyB0b3dhcmQgemVybyBhcyBpdCBnZXRzIGNsb3NlciB0byB0aGUgb3Bwb3NpdGVcbiAgLy8gZWRnZSBvZiB0aGUgcmVnaW9uLlxuICByZXR1cm4gTWF0aC5yb3VuZChBVVRPU0NST0xMX01BWF9TUEVFRCAtXG4gICAgKEFVVE9TQ1JPTExfTUFYX1NQRUVEL0FVVE9TQ1JPTExfUkVHSU9OX1NJWkUpICogZGlzdGFuY2UpO1xufVxuXG50eXBlIERyYWcgPSB7XG4gIGl0ZW1LZXk6IHN0cmluZztcbiAgc3RhcnRJbmRleDogbnVtYmVyO1xuICBzdGFydExpc3RLZXlzOiBBcnJheTxzdHJpbmc+O1xuICBzdGFydFk6IG51bWJlcjtcbiAgbW91c2VZOiBudW1iZXI7XG4gIG1vdXNlT2Zmc2V0OiBudW1iZXI7XG59O1xuXG50eXBlIFByb3BzID0ge1xuICBpdGVtS2V5OiBzdHJpbmd8KGl0ZW06IE9iamVjdCk9PnN0cmluZztcbiAgdGVtcGxhdGU6IEZ1bmN0aW9uO1xuICBsaXN0OiBBcnJheTxPYmplY3Q+O1xuICBvbk1vdmVFbmQ/OiA/KG5ld0xpc3Q6IEFycmF5PE9iamVjdD4sIG1vdmVkSXRlbTogT2JqZWN0LCBvbGRJbmRleDogbnVtYmVyLCBuZXdJbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICBjb250YWluZXI/OiA/KCkgPT4gP0hUTUxFbGVtZW50O1xuICBzcHJpbmdDb25maWc6IE9iamVjdDtcbiAgcGFkZGluZzogbnVtYmVyO1xuICB1bnNldFpJbmRleDogYm9vbGVhbjtcbiAgZXZlbnRIYW5kbGVyczogT2JqZWN0O1xufTtcbnR5cGUgU3RhdGUgPSB7XG4gIGxpc3Q6IEFycmF5PE9iamVjdD47XG4gIHVzZUFic29sdXRlUG9zaXRpb25pbmc6IGJvb2xlYW47XG4gIGRyYWdnaW5nOiBib29sZWFuO1xuICBsYXN0RHJhZzogP0RyYWc7XG59O1xudHlwZSBEZWZhdWx0UHJvcHMgPSB7XG4gIHNwcmluZ0NvbmZpZzogT2JqZWN0O1xuICBwYWRkaW5nOiBudW1iZXI7XG4gIHVuc2V0WkluZGV4OiBib29sZWFuO1xufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwcm9wczogUHJvcHM7XG4gIHN0YXRlOiBTdGF0ZTtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpdGVtS2V5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMuZnVuY1xuICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgdGVtcGxhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIG9uTW92ZUVuZDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzcHJpbmdDb25maWc6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcGFkZGluZzogUHJvcFR5cGVzLm51bWJlcixcbiAgICB1bnNldFpJbmRleDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZXZlbnRIYW5kbGVyczogUHJvcFR5cGVzLm9iamVjdFxuICB9O1xuICBzdGF0aWMgZGVmYXVsdFByb3BzOiBEZWZhdWx0UHJvcHMgPSB7XG4gICAgc3ByaW5nQ29uZmlnOiB7c3RpZmZuZXNzOiAzMDAsIGRhbXBpbmc6IDUwfSxcbiAgICBwYWRkaW5nOiAxMCxcbiAgICB1bnNldFpJbmRleDogZmFsc2VcbiAgfTtcbiAgX2l0ZW1SZWZzOiBNYXA8c3RyaW5nLCBNb3ZlQ29udGFpbmVyPiA9IG5ldyBNYXAoKTtcbiAgX2hlaWdodHM6IE1hcDxzdHJpbmcsIHtuYXR1cmFsOiBudW1iZXIsIGRyYWc6IG51bWJlcn0+ID0gbmV3IE1hcCgpO1xuICBfYXV0b1Njcm9sbGVyVGltZXI6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxpc3Q6IHByb3BzLmxpc3QsXG4gICAgICB1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nOiBmYWxzZSxcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGxhc3REcmFnOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIGdldEl0ZW1JbnN0YW5jZShrZXk6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgY29uc3QgcmVmID0gdGhpcy5faXRlbVJlZnMuZ2V0KGtleSk7XG4gICAgaWYgKCFyZWYpIHRocm93IG5ldyBFcnJvcigna2V5IG5vdCBmb3VuZCcpO1xuICAgIHJldHVybiByZWYuZ2V0VGVtcGxhdGUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHM6IFByb3BzKSB7XG4gICAgbGV0IHtkcmFnZ2luZywgbGFzdERyYWd9ID0gdGhpcy5zdGF0ZTtcbiAgICBsZXQge2xpc3R9ID0gbmV3UHJvcHM7XG5cbiAgICBjaGVjazogaWYgKGxhc3REcmFnKSB7XG4gICAgICBsZXQgbmV3RHJhZ0luZGV4O1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3RHJhZ0luZGV4ID0gdGhpcy5fZ2V0RHJhZ0luZGV4KGxpc3QpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIGxhc3REcmFnID0gbnVsbDtcbiAgICAgICAgYnJlYWsgY2hlY2s7XG4gICAgICB9XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBjdXJyZW50RHJhZ0luZGV4ID0gdGhpcy5fZ2V0RHJhZ0luZGV4KCk7XG4gICAgICAgIGlmIChjdXJyZW50RHJhZ0luZGV4ICE9PSBuZXdEcmFnSW5kZXgpIHtcbiAgICAgICAgICAvLyBMZXQncyBjaGFuZ2UgdGhlIGxpc3Qgc28gdGhhdCB0aGUgbmV3IGRyYWcgaW5kZXggd2lsbCBiZSB0aGUgc2FtZSBhc1xuICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHNvIHRoYXQgdGhlIGRyYWdnZWQgaXRlbSBkb2Vzbid0IGp1bXAgb24gdGhlIHNjcmVlbi5cbiAgICAgICAgICBsaXN0ID0gdXBkYXRlKGxpc3QsIHtcbiAgICAgICAgICAgICRzcGxpY2U6IFtbbmV3RHJhZ0luZGV4LCAxXSwgW2N1cnJlbnREcmFnSW5kZXgsIDAsIGxpc3RbbmV3RHJhZ0luZGV4XV1dXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ2dpbmcsIGxhc3REcmFnLCBsaXN0fSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLl9oYW5kbGVNb3VzZVVwKCk7XG4gIH1cblxuICBfaGFuZGxlVG91Y2hTdGFydChpdGVtS2V5OiBzdHJpbmcsIHByZXNzWTogP251bWJlciwgZTogT2JqZWN0KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5faGFuZGxlU3RhcnREcmFnKGl0ZW1LZXksIHByZXNzWSwgZS50b3VjaGVzWzBdLnBhZ2VZKTtcbiAgfVxuXG4gIF9oYW5kbGVNb3VzZURvd24oaXRlbUtleTogc3RyaW5nLCBwcmVzc1k6ID9udW1iZXIsIGV2ZW50OiBPYmplY3QpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX2hhbmRsZVN0YXJ0RHJhZyhpdGVtS2V5LCBwcmVzc1ksIGV2ZW50LnBhZ2VZKTtcbiAgfVxuXG4gIF9oYW5kbGVTdGFydERyYWcoaXRlbUtleTogc3RyaW5nLCBwcmVzc1k6ID9udW1iZXIsIHBhZ2VZOiBudW1iZXIpIHtcbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSk7XG5cbiAgICAvLyBJZiBhbiBlbGVtZW50IGhhcyBmb2N1cyB3aGlsZSB3ZSBkcmFnIGFyb3VuZCB0aGUgcGFyZW50LCBzb21lIGJyb3dzZXJzXG4gICAgLy8gdHJ5IHRvIHNjcm9sbCB0aGUgcGFyZW50IGVsZW1lbnQgdG8ga2VlcCB0aGUgZm9jdXNlZCBlbGVtZW50IGluIHZpZXcuXG4gICAgLy8gU3RvcCB0aGF0LlxuICAgIHtcbiAgICAgIGNvbnN0IGxpc3RFbCA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgICAgaWYgKFxuICAgICAgICBsaXN0RWwuY29udGFpbnMgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxuICAgICAgICBsaXN0RWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudClcbiAgICAgICkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBrZXlGbiA9IHRoaXMuX2dldEtleUZuKCk7XG5cbiAgICBpZiAodGhpcy5faGVpZ2h0cy5zaXplID09PSAwKSB7XG4gICAgICB0aGlzLl9oZWlnaHRzID0gbmV3IE1hcChcbiAgICAgICAgdGhpcy5zdGF0ZS5saXN0Lm1hcChpdGVtID0+IHtcbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlGbihpdGVtKTtcbiAgICAgICAgICBjb25zdCBjb250YWluZXJSZWYgPSB0aGlzLl9pdGVtUmVmcy5nZXQoa2V5KTtcbiAgICAgICAgICBjb25zdCByZWYgPSBjb250YWluZXJSZWYgPyBjb250YWluZXJSZWYuZ2V0VGVtcGxhdGUoKSA6IG51bGw7XG4gICAgICAgICAgY29uc3QgbmF0dXJhbCA9IHJlZiA/XG4gICAgICAgICAgICBmaW5kRE9NTm9kZShyZWYpLm9mZnNldEhlaWdodCA6IERFRkFVTFRfSEVJR0hULm5hdHVyYWw7XG4gICAgICAgICAgY29uc3QgZHJhZyA9IHJlZiAmJiAodHlwZW9mIHJlZi5nZXREcmFnSGVpZ2h0ID09PSAnZnVuY3Rpb24nKSAmJiByZWYuZ2V0RHJhZ0hlaWdodCgpIHx8IG5hdHVyYWw7XG4gICAgICAgICAgcmV0dXJuIFtrZXksIHtuYXR1cmFsLCBkcmFnfV07XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1JbmRleCA9IHRoaXMuc3RhdGUubGlzdC5tYXAoa2V5Rm4pLmluZGV4T2YoaXRlbUtleSk7XG5cbiAgICBjb25zdCBzdGFydFkgPSBwcmVzc1kgPT0gbnVsbCA/XG4gICAgICB0aGlzLl9nZXREaXN0YW5jZSgwLCBpdGVtSW5kZXgsIGZhbHNlKSA6IHByZXNzWTtcblxuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy5fZ2V0Q29udGFpbmVyKCk7XG4gICAgY29uc3QgY29udGFpbmVyU2Nyb2xsID0gIWNvbnRhaW5lckVsIHx8IGNvbnRhaW5lckVsID09PSBkb2N1bWVudC5ib2R5ID9cbiAgICAgIDAgOiBjb250YWluZXJFbC5zY3JvbGxUb3A7XG5cbiAgICAvLyBOZWVkIHRvIHJlLXJlbmRlciBvbmNlIGJlZm9yZSB3ZSBzdGFydCBkcmFnZ2luZyBzbyB0aGF0IHRoZSBgeWAgdmFsdWVzXG4gICAgLy8gYXJlIHNldCB1c2luZyB0aGUgY29ycmVjdCBfaGVpZ2h0cyBhbmQgdGhlbiBjYW4gYW5pbWF0ZSBmcm9tIHRoZXJlLlxuICAgIHRoaXMuZm9yY2VVcGRhdGUoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVzZUFic29sdXRlUG9zaXRpb25pbmc6IHRydWUsXG4gICAgICAgIGRyYWdnaW5nOiB0cnVlLFxuICAgICAgICBsYXN0RHJhZzoge1xuICAgICAgICAgIGl0ZW1LZXk6IGl0ZW1LZXksXG4gICAgICAgICAgc3RhcnRJbmRleDogaXRlbUluZGV4LFxuICAgICAgICAgIHN0YXJ0TGlzdEtleXM6IHRoaXMuc3RhdGUubGlzdC5tYXAoa2V5Rm4pLFxuICAgICAgICAgIHN0YXJ0WSxcbiAgICAgICAgICBtb3VzZVk6IHN0YXJ0WSxcbiAgICAgICAgICBtb3VzZU9mZnNldDogcGFnZVkgLSBzdGFydFkgKyBjb250YWluZXJTY3JvbGxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfaGFuZGxlVG91Y2hNb3ZlOiBGdW5jdGlvbiA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlTW92ZShlLnRvdWNoZXNbMF0pO1xuICB9O1xuXG4gIF9oYW5kbGVNb3VzZU1vdmU6IEZ1bmN0aW9uID0gKHtwYWdlWSwgY2xpZW50WX0pID0+IHtcbiAgICBjb25zdCB7cGFkZGluZ30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtsaXN0LCBkcmFnZ2luZywgbGFzdERyYWd9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAoIWRyYWdnaW5nIHx8ICFsYXN0RHJhZykgcmV0dXJuO1xuXG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLl9nZXRDb250YWluZXIoKTtcbiAgICBjb25zdCBkcmFnSW5kZXggPSB0aGlzLl9nZXREcmFnSW5kZXgoKTtcbiAgICBjb25zdCBuYXR1cmFsUG9zaXRpb24gPSB0aGlzLl9nZXREaXN0YW5jZUR1cmluZ0RyYWcobGFzdERyYWcsIGRyYWdJbmRleCk7XG5cbiAgICBjbGVhckludGVydmFsKHRoaXMuX2F1dG9TY3JvbGxlclRpbWVyKTtcblxuICAgIC8vIElmIHRoZSB1c2VyIGhhcyB0aGUgbW91c2UgbmVhciB0aGUgdG9wIG9yIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyIGFuZFxuICAgIC8vIG5vdCBhdCB0aGUgZW5kIG9mIHRoZSBsaXN0LCB0aGVuIGF1dG9zY3JvbGwuXG4gICAgaWYgKGRyYWdJbmRleCAhPT0gMCAmJiBkcmFnSW5kZXggIT09IGxpc3QubGVuZ3RoLTEpIHtcbiAgICAgIGxldCBzY3JvbGxTcGVlZCA9IDA7XG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXJFbCAmJiBjb250YWluZXJFbCAhPT0gZG9jdW1lbnQuYm9keSAmJlxuICAgICAgICBjb250YWluZXJFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgP1xuICAgICAgICAgIGNvbnRhaW5lckVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDpcbiAgICAgICAgICB7dG9wOiAwLCBib3R0b206IEluZmluaXR5fTtcblxuICAgICAgLy8gR2V0IHRoZSBsb3dlc3Qgb2YgdGhlIHNjcmVlbiB0b3AgYW5kIHRoZSBjb250YWluZXIgdG9wLlxuICAgICAgY29uc3QgdG9wID0gTWF0aC5tYXgoMCwgY29udGFpbmVyUmVjdC50b3ApO1xuXG4gICAgICBjb25zdCBkaXN0YW5jZUZyb21Ub3AgPSBjbGllbnRZLXRvcDtcbiAgICAgIGlmIChkaXN0YW5jZUZyb21Ub3AgPiAwICYmIGRpc3RhbmNlRnJvbVRvcCA8IEFVVE9TQ1JPTExfUkVHSU9OX1NJWkUpIHtcbiAgICAgICAgc2Nyb2xsU3BlZWQgPSAtMSAqIGdldFNjcm9sbFNwZWVkKGRpc3RhbmNlRnJvbVRvcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgdGhlIGxvd2VzdCBvZiB0aGUgc2NyZWVuIGJvdHRvbSBhbmQgdGhlIGNvbnRhaW5lciBib3R0b20uXG4gICAgICAgIGNvbnN0IGJvdHRvbSA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCwgY29udGFpbmVyUmVjdC5ib3R0b20pO1xuICAgICAgICBjb25zdCBkaXN0YW5jZUZyb21Cb3R0b20gPSBib3R0b20tY2xpZW50WTtcbiAgICAgICAgaWYgKGRpc3RhbmNlRnJvbUJvdHRvbSA+IDAgJiYgZGlzdGFuY2VGcm9tQm90dG9tIDwgQVVUT1NDUk9MTF9SRUdJT05fU0laRSkge1xuICAgICAgICAgIHNjcm9sbFNwZWVkID0gZ2V0U2Nyb2xsU3BlZWQoZGlzdGFuY2VGcm9tQm90dG9tKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsU3BlZWQgIT09IDApIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ29udGFpbmVyKHNjcm9sbFNwZWVkKTtcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbGVyVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVNb3VzZU1vdmUoe1xuICAgICAgICAgICAgcGFnZVk6IHBhZ2VZICsgKGNvbnRhaW5lckVsPT09ZG9jdW1lbnQuYm9keT9zY3JvbGxTcGVlZDowKSxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNvbnRhaW5lclNjcm9sbCA9ICFjb250YWluZXJFbCB8fCBjb250YWluZXJFbCA9PT0gZG9jdW1lbnQuYm9keSA/XG4gICAgICAwIDogY29udGFpbmVyRWwuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IG1vdXNlWSA9IHBhZ2VZIC0gbGFzdERyYWcubW91c2VPZmZzZXQgKyBjb250YWluZXJTY3JvbGw7XG5cbiAgICBjb25zdCBtb3ZlbWVudEZyb21OYXR1cmFsID0gbW91c2VZLW5hdHVyYWxQb3NpdGlvbjtcbiAgICAvLyAxIGRvd24sIC0xIHVwLCAwIG5laXRoZXJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBtb3ZlbWVudEZyb21OYXR1cmFsID4gMCA/IDEgOlxuICAgICAgbW92ZW1lbnRGcm9tTmF0dXJhbCA8IDAgPyAtMSA6IDA7XG4gICAgbGV0IG5ld0luZGV4ID0gZHJhZ0luZGV4O1xuICAgIGlmIChkaXJlY3Rpb24gIT09IDApIHtcbiAgICAgIGNvbnN0IGtleUZuID0gdGhpcy5fZ2V0S2V5Rm4oKTtcbiAgICAgIGxldCByZWFjaCA9IE1hdGguYWJzKG1vdmVtZW50RnJvbU5hdHVyYWwpO1xuICAgICAgZm9yIChsZXQgaT1kcmFnSW5kZXgrZGlyZWN0aW9uOyBpIDwgbGlzdC5sZW5ndGggJiYgaSA+PSAwOyBpICs9IGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBpRHJhZ0hlaWdodCA9ICh0aGlzLl9oZWlnaHRzLmdldChrZXlGbihsaXN0W2ldKSkgfHwgREVGQVVMVF9IRUlHSFQpLmRyYWc7XG4gICAgICAgIGlmIChyZWFjaCA8IGlEcmFnSGVpZ2h0LzIgKyBwYWRkaW5nKSBicmVhaztcbiAgICAgICAgcmVhY2ggLT0gaURyYWdIZWlnaHQgKyBwYWRkaW5nO1xuICAgICAgICBuZXdJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5ld0xpc3QgPSBsaXN0O1xuICAgIGlmIChuZXdJbmRleCAhPT0gZHJhZ0luZGV4KSB7XG4gICAgICBuZXdMaXN0ID0gdXBkYXRlKGxpc3QsIHtcbiAgICAgICAgJHNwbGljZTogW1tkcmFnSW5kZXgsIDFdLCBbbmV3SW5kZXgsIDAsIGxpc3RbZHJhZ0luZGV4XV1dXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtsYXN0RHJhZzogey4uLmxhc3REcmFnLCBtb3VzZVl9LCBsaXN0OiBuZXdMaXN0fSk7XG4gIH07XG5cbiAgX2hhbmRsZU1vdXNlVXA6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fYXV0b1Njcm9sbGVyVGltZXIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5faGFuZGxlTW91c2VVcCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX2hhbmRsZVRvdWNoTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuX2hhbmRsZU1vdXNlTW92ZSk7XG5cbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgdGhpcy5fbGFzdFNjcm9sbERlbHRhID0gMDtcblxuICAgIGNvbnN0IHtvbk1vdmVFbmR9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7ZHJhZ2dpbmcsIGxhc3REcmFnLCBsaXN0fSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKGRyYWdnaW5nICYmIGxhc3REcmFnICYmIG9uTW92ZUVuZCkge1xuICAgICAgY29uc3QgZHJhZ0luZGV4ID0gdGhpcy5fZ2V0RHJhZ0luZGV4KCk7XG4gICAgICBpZiAobGFzdERyYWcuc3RhcnRJbmRleCAhPT0gZHJhZ0luZGV4KSB7XG4gICAgICAgIG9uTW92ZUVuZChsaXN0LCBsaXN0W2RyYWdJbmRleF0sIGxhc3REcmFnLnN0YXJ0SW5kZXgsIGRyYWdJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdnaW5nOiBmYWxzZX0pO1xuICB9O1xuXG4gIF9zY3JvbGxDb250YWluZXIoZGVsdGE6IG51bWJlcikge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy5fZ2V0Q29udGFpbmVyKCk7XG4gICAgaWYgKCFjb250YWluZXJFbCkgcmV0dXJuO1xuICAgIGlmICh3aW5kb3cuc2Nyb2xsQnkgJiYgY29udGFpbmVyRWwgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxCeSgwLCBkZWx0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lckVsLnNjcm9sbFRvcCArPSBkZWx0YTtcbiAgICB9XG4gIH1cblxuICBfbGFzdFNjcm9sbERlbHRhOiBudW1iZXIgPSAwO1xuICBfYWRqdXN0U2Nyb2xsQXRFbmQoZGVsdGE6IG51bWJlcikge1xuICAgIGNvbnN0IGZyYW1lRGVsdGEgPSBNYXRoLnJvdW5kKGRlbHRhIC0gdGhpcy5fbGFzdFNjcm9sbERlbHRhKTtcbiAgICB0aGlzLl9zY3JvbGxDb250YWluZXIoZnJhbWVEZWx0YSk7XG4gICAgdGhpcy5fbGFzdFNjcm9sbERlbHRhICs9IGZyYW1lRGVsdGE7XG4gIH1cblxuICBfZ2V0RHJhZ0luZGV4KGxpc3Q6ID9BcnJheTxPYmplY3Q+LCBsYXN0RHJhZzogP0RyYWcpOiBudW1iZXIge1xuICAgIGlmICghbGlzdCkgbGlzdCA9IHRoaXMuc3RhdGUubGlzdDtcbiAgICBpZiAoIWxhc3REcmFnKSBsYXN0RHJhZyA9IHRoaXMuc3RhdGUubGFzdERyYWc7XG4gICAgaWYgKCFsYXN0RHJhZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBkcmFnIGhhcHBlbmVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGtleUZuID0gdGhpcy5fZ2V0S2V5Rm4oKTtcbiAgICBjb25zdCB7aXRlbUtleX0gPSBsYXN0RHJhZztcbiAgICBmb3IgKGxldCBpPTAsIGxlbj1saXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoa2V5Rm4obGlzdFtpXSkgPT09IGl0ZW1LZXkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZpbmQgZHJhZyBpbmRleCcpO1xuICB9XG5cbiAgX2dldERpc3RhbmNlKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLCBkcmFnZ2luZzogYm9vbGVhbik6IG51bWJlciB7XG4gICAgaWYgKGVuZCA8IHN0YXJ0KSB7XG4gICAgICByZXR1cm4gLXRoaXMuX2dldERpc3RhbmNlKGVuZCwgc3RhcnQsIGRyYWdnaW5nKTtcbiAgICB9XG5cbiAgICBjb25zdCB7cGFkZGluZ30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtsaXN0fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qga2V5Rm4gPSB0aGlzLl9nZXRLZXlGbigpO1xuICAgIGxldCBkaXN0YW5jZSA9IDA7XG4gICAgZm9yIChsZXQgaT1zdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9oZWlnaHRzLmdldChrZXlGbihsaXN0W2ldKSkgfHwgREVGQVVMVF9IRUlHSFQ7XG4gICAgICBkaXN0YW5jZSArPSAoZHJhZ2dpbmcgPyBoZWlnaHQuZHJhZyA6IGhlaWdodC5uYXR1cmFsKSArIHBhZGRpbmc7XG4gICAgfVxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxuXG4gIF9nZXREaXN0YW5jZUR1cmluZ0RyYWcobGFzdERyYWc6IERyYWcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGtleUZuID0gdGhpcy5fZ2V0S2V5Rm4oKTtcbiAgICBjb25zdCB7bGlzdH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgaWYgKHRoaXMuX2dldERyYWdJbmRleCgpIDwgbGFzdERyYWcuc3RhcnRJbmRleCkge1xuICAgICAgY29uc3QgZHJhZ0l0ZW1IZWlnaHQgPSB0aGlzLl9oZWlnaHRzLmdldChsYXN0RHJhZy5pdGVtS2V5KSB8fCBERUZBVUxUX0hFSUdIVDtcbiAgICAgIGNvbnN0IG5ld0NlbnRlckhlaWdodCA9XG4gICAgICAgIHRoaXMuX2hlaWdodHMuZ2V0KGtleUZuKGxpc3RbbGFzdERyYWcuc3RhcnRJbmRleF0pKSB8fCBERUZBVUxUX0hFSUdIVDtcbiAgICAgIG9mZnNldCA9IGRyYWdJdGVtSGVpZ2h0LmRyYWcgLSBuZXdDZW50ZXJIZWlnaHQuZHJhZztcbiAgICB9XG4gICAgcmV0dXJuIGxhc3REcmFnLnN0YXJ0WSArIG9mZnNldCArXG4gICAgICB0aGlzLl9nZXREaXN0YW5jZShsYXN0RHJhZy5zdGFydEluZGV4LCBpbmRleCwgdHJ1ZSk7XG4gIH1cblxuICBfZ2V0Q29udGFpbmVyKCk6ID9IVE1MRWxlbWVudCB7XG4gICAgY29uc3Qge2NvbnRhaW5lcn0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBjb250YWluZXIgPyBjb250YWluZXIoKSA6IG51bGw7XG4gIH1cblxuICBfZ2V0S2V5Rm4oKTogKGl0ZW06IE9iamVjdCkgPT4gc3RyaW5nIHtcbiAgICBjb25zdCB7aXRlbUtleX0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB0eXBlb2YgaXRlbUtleSA9PT0gJ2Z1bmN0aW9uJyA/IGl0ZW1LZXkgOiB4ID0+IHhbaXRlbUtleV07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3NwcmluZ0NvbmZpZywgY29udGFpbmVyLCBwYWRkaW5nLCB0ZW1wbGF0ZSwgdW5zZXRaSW5kZXgsIGV2ZW50SGFuZGxlcnN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7bGlzdCwgZHJhZ2dpbmcsIGxhc3REcmFnLCB1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBrZXlGbiA9IHRoaXMuX2dldEtleUZuKCk7XG4gICAgY29uc3QgYW55U2VsZWN0ZWQgPSBzcHJpbmcoZHJhZ2dpbmcgPyAxIDogMCwgc3ByaW5nQ29uZmlnKTtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gbGlzdC5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGtleUZuKGl0ZW0pO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRTdHlsZSA9IGRyYWdnaW5nICYmIGxhc3REcmFnICYmIGxhc3REcmFnLml0ZW1LZXkgPT09IGtleVxuICAgICAgICA/IHtcbiAgICAgICAgICBpdGVtU2VsZWN0ZWQ6IHNwcmluZygxLCBzcHJpbmdDb25maWcpLFxuICAgICAgICAgIHk6IGxhc3REcmFnLm1vdXNlWVxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgIGl0ZW1TZWxlY3RlZDogc3ByaW5nKDAsIHNwcmluZ0NvbmZpZyksXG4gICAgICAgICAgeTogKHVzZUFic29sdXRlUG9zaXRpb25pbmcgPyBzcHJpbmcgOiB4PT54KShkcmFnZ2luZyAmJiBsYXN0RHJhZyA/XG4gICAgICAgICAgICAgIHRoaXMuX2dldERpc3RhbmNlRHVyaW5nRHJhZyhsYXN0RHJhZywgaSlcbiAgICAgICAgICAgICAgOiB0aGlzLl9nZXREaXN0YW5jZSgwLCBpLCBmYWxzZSksIHNwcmluZ0NvbmZpZylcbiAgICAgICAgfTtcbiAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICBhbnlTZWxlY3RlZCxcbiAgICAgICAgLi4uc2VsZWN0ZWRTdHlsZVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1ha2VEcmFnSGFuZGxlID0gKGVsLCBnZXRZOiAoKT0+P251bWJlcikgPT4gKFxuICAgICAgICA8RHJhZ0hhbmRsZVxuICAgICAgICAgIG9uTW91c2VEb3duPXtlID0+IHRoaXMuX2hhbmRsZU1vdXNlRG93bihrZXksIGdldFkoKSwgZSl9XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0PXtlID0+IHRoaXMuX2hhbmRsZVRvdWNoU3RhcnQoa2V5LCBnZXRZKCksIGUpfVxuICAgICAgICAgID5cbiAgICAgICAgICB7ZWx9XG4gICAgICAgIDwvRHJhZ0hhbmRsZT5cbiAgICAgICk7XG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9oZWlnaHRzLmdldChrZXkpIHx8IERFRkFVTFRfSEVJR0hUO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE1vdGlvblxuICAgICAgICAgIHN0eWxlPXtzdHlsZX0ga2V5PXtrZXl9XG4gICAgICAgICAgY2hpbGRyZW49eyh7aXRlbVNlbGVjdGVkLCBhbnlTZWxlY3RlZCwgeX0pID0+XG4gICAgICAgICAgICA8TW92ZUNvbnRhaW5lclxuICAgICAgICAgICAgICByZWY9e3NhdmVSZWZzKHRoaXMuX2l0ZW1SZWZzLCBrZXkpfVxuICAgICAgICAgICAgICB5PXt1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nID8geSA6IG51bGx9XG4gICAgICAgICAgICAgIHRlbXBsYXRlPXt0ZW1wbGF0ZX1cbiAgICAgICAgICAgICAgcGFkZGluZz17cGFkZGluZ31cbiAgICAgICAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgICAgICAgaXRlbVNlbGVjdGVkPXtpdGVtU2VsZWN0ZWR9XG4gICAgICAgICAgICAgIGFueVNlbGVjdGVkPXthbnlTZWxlY3RlZH1cbiAgICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICAgIHpJbmRleD17dW5zZXRaSW5kZXggJiYgIXVzZUFic29sdXRlUG9zaXRpb25pbmcgPyAnYXV0bycgOlxuICAgICAgICAgICAgICAgIChsYXN0RHJhZyAmJiBsYXN0RHJhZy5pdGVtS2V5ID09PSBrZXkgPyBsaXN0Lmxlbmd0aCA6IGkpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbWFrZURyYWdIYW5kbGU9e21ha2VEcmFnSGFuZGxlfVxuICAgICAgICAgICAgICBldmVudEhhbmRsZXJzPXtldmVudEhhbmRsZXJzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgbGV0IGFkanVzdFNjcm9sbCA9IDA7XG4gICAgaWYgKCFkcmFnZ2luZyAmJiBsYXN0RHJhZyAmJiB1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nKSB7XG4gICAgICBjb25zdCBkcmFnSW5kZXggPSB0aGlzLl9nZXREcmFnSW5kZXgoKTtcbiAgICAgIGFkanVzdFNjcm9sbCA9IHNwcmluZyhcbiAgICAgICAgdGhpcy5fZ2V0RGlzdGFuY2UoMCwgZHJhZ0luZGV4LCBmYWxzZSlcbiAgICAgICAgLSBsYXN0RHJhZy5tb3VzZVksXG4gICAgICAgIHNwcmluZ0NvbmZpZ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBmdWxsQ29udGFpbmVySGVpZ2h0ID0gYCR7dGhpcy5fZ2V0RGlzdGFuY2UoMCwgbGlzdC5sZW5ndGgsIGZhbHNlKX1weGA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjogJ3JlbGF0aXZlJ319PlxuICAgICAgICA8TW90aW9uXG4gICAgICAgICAgc3R5bGU9e3thZGp1c3RTY3JvbGwsIGFueVNlbGVjdGVkfX1cbiAgICAgICAgICBvblJlc3Q9eygpID0+IHtcbiAgICAgICAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0cy5jbGVhcigpO1xuICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nOiBmYWxzZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgY2hpbGRyZW49eyh7YWRqdXN0U2Nyb2xsfSkgPT5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiB1c2VBYnNvbHV0ZVBvc2l0aW9uaW5nID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHVzZUFic29sdXRlUG9zaXRpb25pbmcgPyBmdWxsQ29udGFpbmVySGVpZ2h0IDogJzBweCdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvbnRhaW5lciAmJiA8T25VcGRhdGUgY2I9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRyYWdnaW5nICYmIGxhc3REcmFnICYmIHVzZUFic29sdXRlUG9zaXRpb25pbmcpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2FkanVzdFNjcm9sbEF0RW5kKGFkanVzdFNjcm9sbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fSAvPn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19