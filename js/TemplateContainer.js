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
          dragHandle = _props.dragHandle,
          additionalProps = _props.additionalProps;

      var Template = this.props.template;

      return _react2.default.createElement(Template, {
        ref: "template",
        item: item,
        itemSelected: itemSelected,
        anySelected: anySelected,
        dragHandle: dragHandle,
        additionalProps: additionalProps
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
  additionalProps: _react.PropTypes.object
};
exports.default = TemplateContainer;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UZW1wbGF0ZUNvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZUNvbnRhaW5lciIsIm5leHRQcm9wcyIsInByb3BzIiwiYW55U2VsZWN0ZWQiLCJpdGVtU2VsZWN0ZWQiLCJpdGVtIiwidGVtcGxhdGUiLCJyZWZzIiwiZHJhZ0hhbmRsZSIsImFkZGl0aW9uYWxQcm9wcyIsIlRlbXBsYXRlIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztJQVVxQkEsaUI7Ozs7Ozs7Ozs7MENBV0dDLFMsRUFBMkI7QUFDL0MsYUFBTyxLQUFLQyxLQUFMLENBQVdDLFdBQVgsS0FBMkJGLFVBQVVFLFdBQXJDLElBQ0wsS0FBS0QsS0FBTCxDQUFXRSxZQUFYLEtBQTRCSCxVQUFVRyxZQURqQyxJQUVMLEtBQUtGLEtBQUwsQ0FBV0csSUFBWCxLQUFvQkosVUFBVUksSUFGekIsSUFHTCxLQUFLSCxLQUFMLENBQVdJLFFBQVgsS0FBd0JMLFVBQVVLLFFBSHBDO0FBSUQ7OztrQ0FFMkM7QUFDMUMsYUFBTyxLQUFLQyxJQUFMLENBQVVELFFBQWpCO0FBQ0Q7Ozs2QkFFUTtBQUFBLG1CQUNnRSxLQUFLSixLQURyRTtBQUFBLFVBQ0FHLElBREEsVUFDQUEsSUFEQTtBQUFBLFVBQ01ELFlBRE4sVUFDTUEsWUFETjtBQUFBLFVBQ29CRCxXQURwQixVQUNvQkEsV0FEcEI7QUFBQSxVQUNpQ0ssVUFEakMsVUFDaUNBLFVBRGpDO0FBQUEsVUFDNkNDLGVBRDdDLFVBQzZDQSxlQUQ3Qzs7QUFFUCxVQUFNQyxXQUFXLEtBQUtSLEtBQUwsQ0FBV0ksUUFBNUI7O0FBRUEsYUFDRSw4QkFBQyxRQUFEO0FBQ0UsYUFBSSxVQUROO0FBRUUsY0FBTUQsSUFGUjtBQUdFLHNCQUFjRCxZQUhoQjtBQUlFLHFCQUFhRCxXQUpmO0FBS0Usb0JBQVlLLFVBTGQ7QUFNRSx5QkFBaUJDO0FBTm5CLFFBREY7QUFVRDs7O0VBcEM0QyxnQkFBTUUsUzs7QUFBaENYLGlCLENBRVpZLFMsR0FBWTtBQUNqQlAsUUFBTSxpQkFBVVEsTUFBVixDQUFpQkMsVUFETjtBQUVqQlIsWUFBVSxpQkFBVVMsSUFBVixDQUFlRCxVQUZSO0FBR2pCVixnQkFBYyxpQkFBVVksTUFBVixDQUFpQkYsVUFIZDtBQUlqQlgsZUFBYSxpQkFBVWEsTUFBVixDQUFpQkYsVUFKYjtBQUtqQk4sY0FBWSxpQkFBVU8sSUFBVixDQUFlRCxVQUxWO0FBTWpCTCxtQkFBaUIsaUJBQVVJO0FBTlYsQztrQkFGQWIsaUIiLCJmaWxlIjoiVGVtcGxhdGVDb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcblxudHlwZSBQcm9wcyA9IHtcbiAgaXRlbTogT2JqZWN0O1xuICB0ZW1wbGF0ZTogRnVuY3Rpb247XG4gIGl0ZW1TZWxlY3RlZDogbnVtYmVyO1xuICBhbnlTZWxlY3RlZDogbnVtYmVyO1xuICBkcmFnSGFuZGxlOiBGdW5jdGlvbjtcbiAgYWRkaXRpb25hbFByb3BzOiBPYmplY3Q7XG59O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGVDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwcm9wczogUHJvcHM7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaXRlbTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRlbXBsYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGl0ZW1TZWxlY3RlZDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGFueVNlbGVjdGVkOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZHJhZ0hhbmRsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhZGRpdGlvbmFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzOiBQcm9wcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmFueVNlbGVjdGVkICE9PSBuZXh0UHJvcHMuYW55U2VsZWN0ZWQgfHxcbiAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGVkICE9PSBuZXh0UHJvcHMuaXRlbVNlbGVjdGVkIHx8XG4gICAgICB0aGlzLnByb3BzLml0ZW0gIT09IG5leHRQcm9wcy5pdGVtIHx8XG4gICAgICB0aGlzLnByb3BzLnRlbXBsYXRlICE9PSBuZXh0UHJvcHMudGVtcGxhdGU7XG4gIH1cblxuICBnZXRUZW1wbGF0ZSgpOiBSZWFjdC5Db21wb25lbnQ8YW55LGFueSxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZWZzLnRlbXBsYXRlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpdGVtLCBpdGVtU2VsZWN0ZWQsIGFueVNlbGVjdGVkLCBkcmFnSGFuZGxlLCBhZGRpdGlvbmFsUHJvcHN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBUZW1wbGF0ZSA9IHRoaXMucHJvcHMudGVtcGxhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFRlbXBsYXRlXG4gICAgICAgIHJlZj1cInRlbXBsYXRlXCJcbiAgICAgICAgaXRlbT17aXRlbX1cbiAgICAgICAgaXRlbVNlbGVjdGVkPXtpdGVtU2VsZWN0ZWR9XG4gICAgICAgIGFueVNlbGVjdGVkPXthbnlTZWxlY3RlZH1cbiAgICAgICAgZHJhZ0hhbmRsZT17ZHJhZ0hhbmRsZX1cbiAgICAgICAgYWRkaXRpb25hbFByb3BzPXthZGRpdGlvbmFsUHJvcHN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cbn1cbiJdfQ==