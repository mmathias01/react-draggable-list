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

var _TemplateContainer = require('./TemplateContainer');

var _TemplateContainer2 = _interopRequireDefault(_TemplateContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MoveContainer = function (_React$Component) {
  (0, _inherits3.default)(MoveContainer, _React$Component);

  function MoveContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MoveContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MoveContainer.__proto__ || (0, _getPrototypeOf2.default)(MoveContainer)).call.apply(_ref, [this].concat(args))), _this), _this._dragHandle = function (el) {
      return _this.props.makeDragHandle(el, function () {
        return _this.props.y;
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MoveContainer, [{
    key: 'getTemplate',
    value: function getTemplate() {
      return this.refs.templateContainer.getTemplate();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.anySelected !== nextProps.anySelected || this.props.itemSelected !== nextProps.itemSelected || this.props.item !== nextProps.item || this.props.template !== nextProps.template || this.props.y !== nextProps.y || this.props.height !== nextProps.height || this.props.zIndex !== nextProps.zIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          item = _props.item,
          y = _props.y,
          padding = _props.padding,
          itemSelected = _props.itemSelected,
          anySelected = _props.anySelected,
          height = _props.height,
          zIndex = _props.zIndex,
          template = _props.template,
          additionalProps = _props.additionalProps;


      return _react2.default.createElement(
        'div',
        {
          style: {
            position: y == null ? 'relative' : 'absolute',
            boxSizing: 'border-box',
            left: '0px',
            right: '0px',
            top: y == null ? '0px' : y + 'px',
            marginBottom: padding + 'px',
            height: y == null ? 'auto' : anySelected * (height.drag - height.natural) + height.natural + 'px',
            zIndex: zIndex
          }
        },
        _react2.default.createElement(_TemplateContainer2.default, {
          ref: 'templateContainer',
          item: item,
          template: template,
          itemSelected: itemSelected,
          anySelected: anySelected,
          dragHandle: this._dragHandle,
          additionalProps: additionalProps
        })
      );
    }
  }]);
  return MoveContainer;
}(_react2.default.Component);

MoveContainer.propTypes = {
  item: _react.PropTypes.object.isRequired,
  template: _react.PropTypes.func.isRequired,
  padding: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number,
  itemSelected: _react.PropTypes.number.isRequired,
  anySelected: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.object.isRequired,
  zIndex: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  makeDragHandle: _react.PropTypes.func.isRequired,
  additionalProps: _react.PropTypes.object
};
exports.default = MoveContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb3ZlQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIk1vdmVDb250YWluZXIiLCJfZHJhZ0hhbmRsZSIsImVsIiwicHJvcHMiLCJtYWtlRHJhZ0hhbmRsZSIsInkiLCJyZWZzIiwidGVtcGxhdGVDb250YWluZXIiLCJnZXRUZW1wbGF0ZSIsIm5leHRQcm9wcyIsImFueVNlbGVjdGVkIiwiaXRlbVNlbGVjdGVkIiwiaXRlbSIsInRlbXBsYXRlIiwiaGVpZ2h0IiwiekluZGV4IiwicGFkZGluZyIsImFkZGl0aW9uYWxQcm9wcyIsInBvc2l0aW9uIiwiYm94U2l6aW5nIiwibGVmdCIsInJpZ2h0IiwidG9wIiwibWFyZ2luQm90dG9tIiwiZHJhZyIsIm5hdHVyYWwiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZnVuYyIsIm51bWJlciIsIm9uZU9mVHlwZSIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7SUFjcUJBLGE7Ozs7Ozs7Ozs7Ozs7OzBOQWdDbkJDLFcsR0FBd0IsVUFBQ0MsRUFBRDtBQUFBLGFBQVEsTUFBS0MsS0FBTCxDQUFXQyxjQUFYLENBQTBCRixFQUExQixFQUE4QjtBQUFBLGVBQUksTUFBS0MsS0FBTCxDQUFXRSxDQUFmO0FBQUEsT0FBOUIsQ0FBUjtBQUFBLEs7Ozs7O2tDQWRvQjtBQUMxQyxhQUFPLEtBQUtDLElBQUwsQ0FBVUMsaUJBQVYsQ0FBNEJDLFdBQTVCLEVBQVA7QUFDRDs7OzBDQUVxQkMsUyxFQUEyQjtBQUMvQyxhQUFPLEtBQUtOLEtBQUwsQ0FBV08sV0FBWCxLQUEyQkQsVUFBVUMsV0FBckMsSUFDTCxLQUFLUCxLQUFMLENBQVdRLFlBQVgsS0FBNEJGLFVBQVVFLFlBRGpDLElBRUwsS0FBS1IsS0FBTCxDQUFXUyxJQUFYLEtBQW9CSCxVQUFVRyxJQUZ6QixJQUdMLEtBQUtULEtBQUwsQ0FBV1UsUUFBWCxLQUF3QkosVUFBVUksUUFIN0IsSUFJTCxLQUFLVixLQUFMLENBQVdFLENBQVgsS0FBaUJJLFVBQVVKLENBSnRCLElBS0wsS0FBS0YsS0FBTCxDQUFXVyxNQUFYLEtBQXNCTCxVQUFVSyxNQUwzQixJQU1MLEtBQUtYLEtBQUwsQ0FBV1ksTUFBWCxLQUFzQk4sVUFBVU0sTUFObEM7QUFPRDs7OzZCQUlRO0FBQUEsbUJBR0gsS0FBS1osS0FIRjtBQUFBLFVBRUxTLElBRkssVUFFTEEsSUFGSztBQUFBLFVBRUNQLENBRkQsVUFFQ0EsQ0FGRDtBQUFBLFVBRUlXLE9BRkosVUFFSUEsT0FGSjtBQUFBLFVBRWFMLFlBRmIsVUFFYUEsWUFGYjtBQUFBLFVBRTJCRCxXQUYzQixVQUUyQkEsV0FGM0I7QUFBQSxVQUV3Q0ksTUFGeEMsVUFFd0NBLE1BRnhDO0FBQUEsVUFFZ0RDLE1BRmhELFVBRWdEQSxNQUZoRDtBQUFBLFVBRXdERixRQUZ4RCxVQUV3REEsUUFGeEQ7QUFBQSxVQUVrRUksZUFGbEUsVUFFa0VBLGVBRmxFOzs7QUFLUCxhQUNFO0FBQUE7QUFBQTtBQUNFLGlCQUFPO0FBQ0xDLHNCQUFVYixLQUFLLElBQUwsR0FBWSxVQUFaLEdBQXlCLFVBRDlCO0FBRUxjLHVCQUFXLFlBRk47QUFHTEMsa0JBQU0sS0FIRDtBQUlMQyxtQkFBTyxLQUpGO0FBS0xDLGlCQUFLakIsS0FBSyxJQUFMLEdBQVksS0FBWixHQUF1QkEsQ0FBdkIsT0FMQTtBQU1Ma0IsMEJBQWlCUCxPQUFqQixPQU5LO0FBT0xGLG9CQUFRVCxLQUFLLElBQUwsR0FBWSxNQUFaLEdBQ0hLLGVBQWFJLE9BQU9VLElBQVAsR0FBWVYsT0FBT1csT0FBaEMsSUFBeUNYLE9BQU9XLE9BRDdDLE9BUEg7QUFTTFY7QUFUSztBQURUO0FBYUU7QUFDRSxlQUFJLG1CQUROO0FBRUUsZ0JBQU1ILElBRlI7QUFHRSxvQkFBVUMsUUFIWjtBQUlFLHdCQUFjRixZQUpoQjtBQUtFLHVCQUFhRCxXQUxmO0FBTUUsc0JBQVksS0FBS1QsV0FObkI7QUFPRSwyQkFBaUJnQjtBQVBuQjtBQWJGLE9BREY7QUF5QkQ7OztFQWhFd0MsZ0JBQU1TLFM7O0FBQTVCMUIsYSxDQUVaMkIsUyxHQUFZO0FBQ2pCZixRQUFNLGlCQUFVZ0IsTUFBVixDQUFpQkMsVUFETjtBQUVqQmhCLFlBQVUsaUJBQVVpQixJQUFWLENBQWVELFVBRlI7QUFHakJiLFdBQVMsaUJBQVVlLE1BQVYsQ0FBaUJGLFVBSFQ7QUFJakJ4QixLQUFHLGlCQUFVMEIsTUFKSTtBQUtqQnBCLGdCQUFjLGlCQUFVb0IsTUFBVixDQUFpQkYsVUFMZDtBQU1qQm5CLGVBQWEsaUJBQVVxQixNQUFWLENBQWlCRixVQU5iO0FBT2pCZixVQUFRLGlCQUFVYyxNQUFWLENBQWlCQyxVQVBSO0FBUWpCZCxVQUFRLGlCQUFVaUIsU0FBVixDQUFvQixDQUMxQixpQkFBVUMsTUFEZ0IsRUFFMUIsaUJBQVVGLE1BRmdCLENBQXBCLEVBR0xGLFVBWGM7QUFZakJ6QixrQkFBZ0IsaUJBQVUwQixJQUFWLENBQWVELFVBWmQ7QUFhakJaLG1CQUFpQixpQkFBVVc7QUFiVixDO2tCQUZBNUIsYSIsImZpbGUiOiJNb3ZlQ29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgVGVtcGxhdGVDb250YWluZXIgZnJvbSAnLi9UZW1wbGF0ZUNvbnRhaW5lcic7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGl0ZW06IE9iamVjdDtcbiAgdGVtcGxhdGU6IEZ1bmN0aW9uO1xuICBwYWRkaW5nOiBudW1iZXI7XG4gIHk6ID9udW1iZXI7XG4gIGl0ZW1TZWxlY3RlZDogbnVtYmVyO1xuICBhbnlTZWxlY3RlZDogbnVtYmVyO1xuICBoZWlnaHQ6IE9iamVjdDtcbiAgekluZGV4OiBudW1iZXJ8c3RyaW5nO1xuICBtYWtlRHJhZ0hhbmRsZTogRnVuY3Rpb247XG4gIGFkZGl0aW9uYWxQcm9wczogT2JqZWN0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmVDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwcm9wczogUHJvcHM7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaXRlbTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRlbXBsYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHBhZGRpbmc6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGl0ZW1TZWxlY3RlZDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGFueVNlbGVjdGVkOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgekluZGV4OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBtYWtlRHJhZ0hhbmRsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBhZGRpdGlvbmFsUHJvcHM6IFByb3BUeXBlcy5vYmplY3RcbiAgfTtcblxuICBnZXRUZW1wbGF0ZSgpOiBSZWFjdC5Db21wb25lbnQ8YW55LGFueSxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZWZzLnRlbXBsYXRlQ29udGFpbmVyLmdldFRlbXBsYXRlKCk7XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzOiBQcm9wcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmFueVNlbGVjdGVkICE9PSBuZXh0UHJvcHMuYW55U2VsZWN0ZWQgfHxcbiAgICAgIHRoaXMucHJvcHMuaXRlbVNlbGVjdGVkICE9PSBuZXh0UHJvcHMuaXRlbVNlbGVjdGVkIHx8XG4gICAgICB0aGlzLnByb3BzLml0ZW0gIT09IG5leHRQcm9wcy5pdGVtIHx8XG4gICAgICB0aGlzLnByb3BzLnRlbXBsYXRlICE9PSBuZXh0UHJvcHMudGVtcGxhdGUgfHxcbiAgICAgIHRoaXMucHJvcHMueSAhPT0gbmV4dFByb3BzLnkgfHxcbiAgICAgIHRoaXMucHJvcHMuaGVpZ2h0ICE9PSBuZXh0UHJvcHMuaGVpZ2h0IHx8XG4gICAgICB0aGlzLnByb3BzLnpJbmRleCAhPT0gbmV4dFByb3BzLnpJbmRleDtcbiAgfVxuXG4gIF9kcmFnSGFuZGxlOiBGdW5jdGlvbiA9IChlbCkgPT4gdGhpcy5wcm9wcy5tYWtlRHJhZ0hhbmRsZShlbCwgKCk9PnRoaXMucHJvcHMueSk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGl0ZW0sIHksIHBhZGRpbmcsIGl0ZW1TZWxlY3RlZCwgYW55U2VsZWN0ZWQsIGhlaWdodCwgekluZGV4LCB0ZW1wbGF0ZSwgYWRkaXRpb25hbFByb3BzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiB5ID09IG51bGwgPyAncmVsYXRpdmUnIDogJ2Fic29sdXRlJyxcbiAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICBsZWZ0OiAnMHB4JyxcbiAgICAgICAgICByaWdodDogJzBweCcsXG4gICAgICAgICAgdG9wOiB5ID09IG51bGwgPyAnMHB4JyA6IGAke3l9cHhgLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogYCR7cGFkZGluZ31weGAsXG4gICAgICAgICAgaGVpZ2h0OiB5ID09IG51bGwgPyAnYXV0bycgOlxuICAgICAgICAgICAgYCR7YW55U2VsZWN0ZWQqKGhlaWdodC5kcmFnLWhlaWdodC5uYXR1cmFsKStoZWlnaHQubmF0dXJhbH1weGAsXG4gICAgICAgICAgekluZGV4XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxUZW1wbGF0ZUNvbnRhaW5lclxuICAgICAgICAgIHJlZj1cInRlbXBsYXRlQ29udGFpbmVyXCJcbiAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgIHRlbXBsYXRlPXt0ZW1wbGF0ZX1cbiAgICAgICAgICBpdGVtU2VsZWN0ZWQ9e2l0ZW1TZWxlY3RlZH1cbiAgICAgICAgICBhbnlTZWxlY3RlZD17YW55U2VsZWN0ZWR9XG4gICAgICAgICAgZHJhZ0hhbmRsZT17dGhpcy5fZHJhZ0hhbmRsZX1cbiAgICAgICAgICBhZGRpdGlvbmFsUHJvcHM9e2FkZGl0aW9uYWxQcm9wc31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==