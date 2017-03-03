"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateContainer = function (_React$Component) {
  (0, _inherits3.default)(TemplateContainer, _React$Component);

  function TemplateContainer() {
    (0, _classCallCheck3.default)(this, TemplateContainer);
    return (0, _possibleConstructorReturn3.default)(this, (TemplateContainer.__proto__ || (0, _getPrototypeOf2.default)(TemplateContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(TemplateContainer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.anySelected !== nextProps.anySelected || this.props.itemSelected !== nextProps.itemSelected || this.props.item !== nextProps.item || this.props.template !== nextProps.template;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return this.refs.template;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          item = _props.item,
          itemSelected = _props.itemSelected,
          anySelected = _props.anySelected,
          dragHandle = _props.dragHandle;

      var Template = this.props.template;

      return _react2.default.createElement(Template, {
        ref: "template",
        item: item,
        itemSelected: itemSelected,
        anySelected: anySelected,
        dragHandle: dragHandle,
        eventHandlers: eventHandlers
      });
    }
  }]);
  return TemplateContainer;
}(_react2.default.Component);

TemplateContainer.propTypes = {
  item: _react.PropTypes.object.isRequired,
  template: _react.PropTypes.func.isRequired,
  itemSelected: _react.PropTypes.number.isRequired,
  anySelected: _react.PropTypes.number.isRequired,
  dragHandle: _react.PropTypes.func.isRequired,
  eventHandlers: _react.PropTypes.object
};
exports.default = TemplateContainer;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UZW1wbGF0ZUNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZUNvbnRhaW5lciIsIm5leHRQcm9wcyIsInByb3BzIiwiYW55U2VsZWN0ZWQiLCJpdGVtU2VsZWN0ZWQiLCJpdGVtIiwidGVtcGxhdGUiLCJyZWZzIiwiZHJhZ0hhbmRsZSIsIlRlbXBsYXRlIiwiZXZlbnRIYW5kbGVycyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7SUFVcUJBLGlCOzs7Ozs7Ozs7OzBDQVdHQyxTLEVBQTJCO0FBQy9DLGFBQU8sS0FBS0MsS0FBTCxDQUFXQyxXQUFYLEtBQTJCRixVQUFVRSxXQUFyQyxJQUNMLEtBQUtELEtBQUwsQ0FBV0UsWUFBWCxLQUE0QkgsVUFBVUcsWUFEakMsSUFFTCxLQUFLRixLQUFMLENBQVdHLElBQVgsS0FBb0JKLFVBQVVJLElBRnpCLElBR0wsS0FBS0gsS0FBTCxDQUFXSSxRQUFYLEtBQXdCTCxVQUFVSyxRQUhwQztBQUlEOzs7a0NBRTJDO0FBQzFDLGFBQU8sS0FBS0MsSUFBTCxDQUFVRCxRQUFqQjtBQUNEOzs7NkJBRVE7QUFBQSxtQkFDK0MsS0FBS0osS0FEcEQ7QUFBQSxVQUNBRyxJQURBLFVBQ0FBLElBREE7QUFBQSxVQUNNRCxZQUROLFVBQ01BLFlBRE47QUFBQSxVQUNvQkQsV0FEcEIsVUFDb0JBLFdBRHBCO0FBQUEsVUFDaUNLLFVBRGpDLFVBQ2lDQSxVQURqQzs7QUFFUCxVQUFNQyxXQUFXLEtBQUtQLEtBQUwsQ0FBV0ksUUFBNUI7O0FBRUEsYUFDRSw4QkFBQyxRQUFEO0FBQ0UsYUFBSSxVQUROO0FBRUUsY0FBTUQsSUFGUjtBQUdFLHNCQUFjRCxZQUhoQjtBQUlFLHFCQUFhRCxXQUpmO0FBS0Usb0JBQVlLLFVBTGQ7QUFNRSx1QkFBZUU7QUFOakIsUUFERjtBQVVEOzs7RUFwQzRDLGdCQUFNQyxTOztBQUFoQ1gsaUIsQ0FFWlksUyxHQUFZO0FBQ2pCUCxRQUFNLGlCQUFVUSxNQUFWLENBQWlCQyxVQUROO0FBRWpCUixZQUFVLGlCQUFVUyxJQUFWLENBQWVELFVBRlI7QUFHakJWLGdCQUFjLGlCQUFVWSxNQUFWLENBQWlCRixVQUhkO0FBSWpCWCxlQUFhLGlCQUFVYSxNQUFWLENBQWlCRixVQUpiO0FBS2pCTixjQUFZLGlCQUFVTyxJQUFWLENBQWVELFVBTFY7QUFNakJKLGlCQUFlLGlCQUFVRztBQU5SLEM7a0JBRkFiLGlCIiwiZmlsZSI6IlRlbXBsYXRlQ29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGl0ZW06IE9iamVjdDtcbiAgdGVtcGxhdGU6IEZ1bmN0aW9uO1xuICBpdGVtU2VsZWN0ZWQ6IG51bWJlcjtcbiAgYW55U2VsZWN0ZWQ6IG51bWJlcjtcbiAgZHJhZ0hhbmRsZTogRnVuY3Rpb247XG4gIGV2ZW50SGFuZGxlcnM6IE9iamVjdDtcbn07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZUNvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHByb3BzOiBQcm9wcztcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpdGVtOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdGVtcGxhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaXRlbVNlbGVjdGVkOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgYW55U2VsZWN0ZWQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBkcmFnSGFuZGxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGV2ZW50SGFuZGxlcnM6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzOiBQcm9wcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmFueVNlbGVjdGVkICE9PSBuZXh0UHJvcHMuYW55U2VsZWN0ZWQgfHxcbiAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGVkICE9PSBuZXh0UHJvcHMuaXRlbVNlbGVjdGVkIHx8XG4gICAgICB0aGlzLnByb3BzLml0ZW0gIT09IG5leHRQcm9wcy5pdGVtIHx8XG4gICAgICB0aGlzLnByb3BzLnRlbXBsYXRlICE9PSBuZXh0UHJvcHMudGVtcGxhdGU7XG4gIH1cblxuICBnZXRUZW1wbGF0ZSgpOiBSZWFjdC5Db21wb25lbnQ8YW55LGFueSxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZWZzLnRlbXBsYXRlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpdGVtLCBpdGVtU2VsZWN0ZWQsIGFueVNlbGVjdGVkLCBkcmFnSGFuZGxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgVGVtcGxhdGUgPSB0aGlzLnByb3BzLnRlbXBsYXRlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxUZW1wbGF0ZVxuICAgICAgICByZWY9XCJ0ZW1wbGF0ZVwiXG4gICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgIGl0ZW1TZWxlY3RlZD17aXRlbVNlbGVjdGVkfVxuICAgICAgICBhbnlTZWxlY3RlZD17YW55U2VsZWN0ZWR9XG4gICAgICAgIGRyYWdIYW5kbGU9e2RyYWdIYW5kbGV9XG4gICAgICAgIGV2ZW50SGFuZGxlcnM9e2V2ZW50SGFuZGxlcnN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==