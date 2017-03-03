'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragHandle = function (_React$Component) {
  (0, _inherits3.default)(DragHandle, _React$Component);

  function DragHandle() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DragHandle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DragHandle.__proto__ || (0, _getPrototypeOf2.default)(DragHandle)).call.apply(_ref, [this].concat(args))), _this), _this._onMouseDown = function (e) {
      _this.props.onMouseDown.call(null, e);
    }, _this._onTouchStart = function (e) {
      _this.props.onTouchStart.call(null, e);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DragHandle, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = (0, _reactDom.findDOMNode)(this);
      node.addEventListener('mousedown', this._onMouseDown);
      node.addEventListener('touchstart', this._onTouchStart);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var node = (0, _reactDom.findDOMNode)(this);
      node.removeEventListener('mousedown', this._onMouseDown);
      node.removeEventListener('touchstart', this._onTouchStart);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);
  return DragHandle;
}(_react2.default.Component);

DragHandle.propTypes = {
  onMouseDown: _react2.default.PropTypes.func.isRequired,
  onTouchStart: _react2.default.PropTypes.func.isRequired,
  children: _react2.default.PropTypes.element.isRequired
};
exports.default = DragHandle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EcmFnSGFuZGxlLmpzIl0sIm5hbWVzIjpbIkRyYWdIYW5kbGUiLCJfb25Nb3VzZURvd24iLCJlIiwicHJvcHMiLCJvbk1vdXNlRG93biIsImNhbGwiLCJfb25Ub3VjaFN0YXJ0Iiwib25Ub3VjaFN0YXJ0Iiwibm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQ2hpbGRyZW4iLCJvbmx5IiwiY2hpbGRyZW4iLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImVsZW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7b05BbUJuQkMsWSxHQUF5QixVQUFDQyxDQUFELEVBQU87QUFDOUIsWUFBS0MsS0FBTCxDQUFXQyxXQUFYLENBQXVCQyxJQUF2QixDQUE0QixJQUE1QixFQUFrQ0gsQ0FBbEM7QUFDRCxLLFFBRURJLGEsR0FBMEIsVUFBQ0osQ0FBRCxFQUFPO0FBQy9CLFlBQUtDLEtBQUwsQ0FBV0ksWUFBWCxDQUF3QkYsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUNILENBQW5DO0FBQ0QsSzs7Ozs7d0NBbEJtQjtBQUNsQixVQUFNTSxPQUFPLDJCQUFZLElBQVosQ0FBYjtBQUNBQSxXQUFLQyxnQkFBTCxDQUFzQixXQUF0QixFQUFtQyxLQUFLUixZQUF4QztBQUNBTyxXQUFLQyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQyxLQUFLSCxhQUF6QztBQUNEOzs7MkNBRXNCO0FBQ3JCLFVBQU1FLE9BQU8sMkJBQVksSUFBWixDQUFiO0FBQ0FBLFdBQUtFLG1CQUFMLENBQXlCLFdBQXpCLEVBQXNDLEtBQUtULFlBQTNDO0FBQ0FPLFdBQUtFLG1CQUFMLENBQXlCLFlBQXpCLEVBQXVDLEtBQUtKLGFBQTVDO0FBQ0Q7Ozs2QkFVUTtBQUNQLGFBQU8sZ0JBQU1LLFFBQU4sQ0FBZUMsSUFBZixDQUFvQixLQUFLVCxLQUFMLENBQVdVLFFBQS9CLENBQVA7QUFDRDs7O0VBN0JxQyxnQkFBTUMsUzs7QUFBekJkLFUsQ0FDWmUsUyxHQUFZO0FBQ2pCWCxlQUFhLGdCQUFNWSxTQUFOLENBQWdCQyxJQUFoQixDQUFxQkMsVUFEakI7QUFFakJYLGdCQUFjLGdCQUFNUyxTQUFOLENBQWdCQyxJQUFoQixDQUFxQkMsVUFGbEI7QUFHakJMLFlBQVUsZ0JBQU1HLFNBQU4sQ0FBZ0JHLE9BQWhCLENBQXdCRDtBQUhqQixDO2tCQURBbEIsVSIsImZpbGUiOiJEcmFnSGFuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdIYW5kbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uTW91c2VEb3duOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uVG91Y2hTdGFydDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZSh0aGlzKTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duKTtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9vblRvdWNoU3RhcnQpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKHRoaXMpO1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24pO1xuICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uVG91Y2hTdGFydCk7XG4gIH1cblxuICBfb25Nb3VzZURvd246IEZ1bmN0aW9uID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uTW91c2VEb3duLmNhbGwobnVsbCwgZSk7XG4gIH07XG5cbiAgX29uVG91Y2hTdGFydDogRnVuY3Rpb24gPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25Ub3VjaFN0YXJ0LmNhbGwobnVsbCwgZSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICB9XG59XG4iXX0=