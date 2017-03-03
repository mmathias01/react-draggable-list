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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OnUpdate = function (_React$Component) {
  (0, _inherits3.default)(OnUpdate, _React$Component);

  function OnUpdate() {
    (0, _classCallCheck3.default)(this, OnUpdate);
    return (0, _possibleConstructorReturn3.default)(this, (OnUpdate.__proto__ || (0, _getPrototypeOf2.default)(OnUpdate)).apply(this, arguments));
  }

  (0, _createClass3.default)(OnUpdate, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.cb();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return OnUpdate;
}(_react2.default.Component);

OnUpdate.propTypes = {
  cb: _react.PropTypes.func.isRequired
};
exports.default = OnUpdate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PblVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJPblVwZGF0ZSIsInByb3BzIiwiY2IiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7O3lDQUtFO0FBQ25CLFdBQUtDLEtBQUwsQ0FBV0MsRUFBWDtBQUNEOzs7NkJBRWE7QUFDWixhQUFPLElBQVA7QUFDRDs7O0VBWG1DLGdCQUFNQyxTOztBQUF2QkgsUSxDQUNaSSxTLEdBQVk7QUFDakJGLE1BQUksaUJBQVVHLElBQVYsQ0FBZUM7QUFERixDO2tCQURBTixRIiwiZmlsZSI6Ik9uVXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uVXBkYXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjYjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnByb3BzLmNiKCk7XG4gIH1cblxuICByZW5kZXIoKTogYW55IHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19