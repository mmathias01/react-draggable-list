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
          eventHandlers = _props.eventHandlers;


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
          eventHandlers: eventHandlers
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
  eventHandlers: _react.PropTypes.object
};
exports.default = MoveContainer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb3ZlQ29udGFpbmVyLmpzIl0sIm5hbWVzIjpbIk1vdmVDb250YWluZXIiLCJfZHJhZ0hhbmRsZSIsImVsIiwicHJvcHMiLCJtYWtlRHJhZ0hhbmRsZSIsInkiLCJyZWZzIiwidGVtcGxhdGVDb250YWluZXIiLCJnZXRUZW1wbGF0ZSIsIm5leHRQcm9wcyIsImFueVNlbGVjdGVkIiwiaXRlbVNlbGVjdGVkIiwiaXRlbSIsInRlbXBsYXRlIiwiaGVpZ2h0IiwiekluZGV4IiwicGFkZGluZyIsImV2ZW50SGFuZGxlcnMiLCJwb3NpdGlvbiIsImJveFNpemluZyIsImxlZnQiLCJyaWdodCIsInRvcCIsIm1hcmdpbkJvdHRvbSIsImRyYWciLCJuYXR1cmFsIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJudW1iZXIiLCJvbmVPZlR5cGUiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0lBY3FCQSxhOzs7Ozs7Ozs7Ozs7OzswTkFnQ25CQyxXLEdBQXdCLFVBQUNDLEVBQUQ7QUFBQSxhQUFRLE1BQUtDLEtBQUwsQ0FBV0MsY0FBWCxDQUEwQkYsRUFBMUIsRUFBOEI7QUFBQSxlQUFJLE1BQUtDLEtBQUwsQ0FBV0UsQ0FBZjtBQUFBLE9BQTlCLENBQVI7QUFBQSxLOzs7OztrQ0Fkb0I7QUFDMUMsYUFBTyxLQUFLQyxJQUFMLENBQVVDLGlCQUFWLENBQTRCQyxXQUE1QixFQUFQO0FBQ0Q7OzswQ0FFcUJDLFMsRUFBMkI7QUFDL0MsYUFBTyxLQUFLTixLQUFMLENBQVdPLFdBQVgsS0FBMkJELFVBQVVDLFdBQXJDLElBQ0wsS0FBS1AsS0FBTCxDQUFXUSxZQUFYLEtBQTRCRixVQUFVRSxZQURqQyxJQUVMLEtBQUtSLEtBQUwsQ0FBV1MsSUFBWCxLQUFvQkgsVUFBVUcsSUFGekIsSUFHTCxLQUFLVCxLQUFMLENBQVdVLFFBQVgsS0FBd0JKLFVBQVVJLFFBSDdCLElBSUwsS0FBS1YsS0FBTCxDQUFXRSxDQUFYLEtBQWlCSSxVQUFVSixDQUp0QixJQUtMLEtBQUtGLEtBQUwsQ0FBV1csTUFBWCxLQUFzQkwsVUFBVUssTUFMM0IsSUFNTCxLQUFLWCxLQUFMLENBQVdZLE1BQVgsS0FBc0JOLFVBQVVNLE1BTmxDO0FBT0Q7Ozs2QkFJUTtBQUFBLG1CQUdILEtBQUtaLEtBSEY7QUFBQSxVQUVMUyxJQUZLLFVBRUxBLElBRks7QUFBQSxVQUVDUCxDQUZELFVBRUNBLENBRkQ7QUFBQSxVQUVJVyxPQUZKLFVBRUlBLE9BRko7QUFBQSxVQUVhTCxZQUZiLFVBRWFBLFlBRmI7QUFBQSxVQUUyQkQsV0FGM0IsVUFFMkJBLFdBRjNCO0FBQUEsVUFFd0NJLE1BRnhDLFVBRXdDQSxNQUZ4QztBQUFBLFVBRWdEQyxNQUZoRCxVQUVnREEsTUFGaEQ7QUFBQSxVQUV3REYsUUFGeEQsVUFFd0RBLFFBRnhEO0FBQUEsVUFFa0VJLGFBRmxFLFVBRWtFQSxhQUZsRTs7O0FBS1AsYUFDRTtBQUFBO0FBQUE7QUFDRSxpQkFBTztBQUNMQyxzQkFBVWIsS0FBSyxJQUFMLEdBQVksVUFBWixHQUF5QixVQUQ5QjtBQUVMYyx1QkFBVyxZQUZOO0FBR0xDLGtCQUFNLEtBSEQ7QUFJTEMsbUJBQU8sS0FKRjtBQUtMQyxpQkFBS2pCLEtBQUssSUFBTCxHQUFZLEtBQVosR0FBdUJBLENBQXZCLE9BTEE7QUFNTGtCLDBCQUFpQlAsT0FBakIsT0FOSztBQU9MRixvQkFBUVQsS0FBSyxJQUFMLEdBQVksTUFBWixHQUNISyxlQUFhSSxPQUFPVSxJQUFQLEdBQVlWLE9BQU9XLE9BQWhDLElBQXlDWCxPQUFPVyxPQUQ3QyxPQVBIO0FBU0xWO0FBVEs7QUFEVDtBQWFFO0FBQ0UsZUFBSSxtQkFETjtBQUVFLGdCQUFNSCxJQUZSO0FBR0Usb0JBQVVDLFFBSFo7QUFJRSx3QkFBY0YsWUFKaEI7QUFLRSx1QkFBYUQsV0FMZjtBQU1FLHNCQUFZLEtBQUtULFdBTm5CO0FBT0UseUJBQWVnQjtBQVBqQjtBQWJGLE9BREY7QUF5QkQ7OztFQWhFd0MsZ0JBQU1TLFM7O0FBQTVCMUIsYSxDQUVaMkIsUyxHQUFZO0FBQ2pCZixRQUFNLGlCQUFVZ0IsTUFBVixDQUFpQkMsVUFETjtBQUVqQmhCLFlBQVUsaUJBQVVpQixJQUFWLENBQWVELFVBRlI7QUFHakJiLFdBQVMsaUJBQVVlLE1BQVYsQ0FBaUJGLFVBSFQ7QUFJakJ4QixLQUFHLGlCQUFVMEIsTUFKSTtBQUtqQnBCLGdCQUFjLGlCQUFVb0IsTUFBVixDQUFpQkYsVUFMZDtBQU1qQm5CLGVBQWEsaUJBQVVxQixNQUFWLENBQWlCRixVQU5iO0FBT2pCZixVQUFRLGlCQUFVYyxNQUFWLENBQWlCQyxVQVBSO0FBUWpCZCxVQUFRLGlCQUFVaUIsU0FBVixDQUFvQixDQUMxQixpQkFBVUMsTUFEZ0IsRUFFMUIsaUJBQVVGLE1BRmdCLENBQXBCLEVBR0xGLFVBWGM7QUFZakJ6QixrQkFBZ0IsaUJBQVUwQixJQUFWLENBQWVELFVBWmQ7QUFhakJaLGlCQUFlLGlCQUFVVztBQWJSLEM7a0JBRkE1QixhIiwiZmlsZSI6Ik1vdmVDb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUZW1wbGF0ZUNvbnRhaW5lciBmcm9tICcuL1RlbXBsYXRlQ29udGFpbmVyJztcblxudHlwZSBQcm9wcyA9IHtcbiAgaXRlbTogT2JqZWN0O1xuICB0ZW1wbGF0ZTogRnVuY3Rpb247XG4gIHBhZGRpbmc6IG51bWJlcjtcbiAgeTogP251bWJlcjtcbiAgaXRlbVNlbGVjdGVkOiBudW1iZXI7XG4gIGFueVNlbGVjdGVkOiBudW1iZXI7XG4gIGhlaWdodDogT2JqZWN0O1xuICB6SW5kZXg6IG51bWJlcnxzdHJpbmc7XG4gIG1ha2VEcmFnSGFuZGxlOiBGdW5jdGlvbjtcbiAgZXZlbnRIYW5kbGVyczogT2JqZWN0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdmVDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwcm9wczogUHJvcHM7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaXRlbTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIHRlbXBsYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHBhZGRpbmc6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGl0ZW1TZWxlY3RlZDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGFueVNlbGVjdGVkOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgekluZGV4OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubnVtYmVyXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBtYWtlRHJhZ0hhbmRsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBldmVudEhhbmRsZXJzOiBQcm9wVHlwZXMub2JqZWN0XG4gIH07XG5cbiAgZ2V0VGVtcGxhdGUoKTogUmVhY3QuQ29tcG9uZW50PGFueSxhbnksYW55PiB7XG4gICAgcmV0dXJuIHRoaXMucmVmcy50ZW1wbGF0ZUNvbnRhaW5lci5nZXRUZW1wbGF0ZSgpO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wczogUHJvcHMpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5hbnlTZWxlY3RlZCAhPT0gbmV4dFByb3BzLmFueVNlbGVjdGVkIHx8XG4gICAgICB0aGlzLnByb3BzLml0ZW1TZWxlY3RlZCAhPT0gbmV4dFByb3BzLml0ZW1TZWxlY3RlZCB8fFxuICAgICAgdGhpcy5wcm9wcy5pdGVtICE9PSBuZXh0UHJvcHMuaXRlbSB8fFxuICAgICAgdGhpcy5wcm9wcy50ZW1wbGF0ZSAhPT0gbmV4dFByb3BzLnRlbXBsYXRlIHx8XG4gICAgICB0aGlzLnByb3BzLnkgIT09IG5leHRQcm9wcy55IHx8XG4gICAgICB0aGlzLnByb3BzLmhlaWdodCAhPT0gbmV4dFByb3BzLmhlaWdodCB8fFxuICAgICAgdGhpcy5wcm9wcy56SW5kZXggIT09IG5leHRQcm9wcy56SW5kZXg7XG4gIH1cblxuICBfZHJhZ0hhbmRsZTogRnVuY3Rpb24gPSAoZWwpID0+IHRoaXMucHJvcHMubWFrZURyYWdIYW5kbGUoZWwsICgpPT50aGlzLnByb3BzLnkpO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpdGVtLCB5LCBwYWRkaW5nLCBpdGVtU2VsZWN0ZWQsIGFueVNlbGVjdGVkLCBoZWlnaHQsIHpJbmRleCwgdGVtcGxhdGUsIGV2ZW50SGFuZGxlcnNcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246IHkgPT0gbnVsbCA/ICdyZWxhdGl2ZScgOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgIGxlZnQ6ICcwcHgnLFxuICAgICAgICAgIHJpZ2h0OiAnMHB4JyxcbiAgICAgICAgICB0b3A6IHkgPT0gbnVsbCA/ICcwcHgnIDogYCR7eX1weGAsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBgJHtwYWRkaW5nfXB4YCxcbiAgICAgICAgICBoZWlnaHQ6IHkgPT0gbnVsbCA/ICdhdXRvJyA6XG4gICAgICAgICAgICBgJHthbnlTZWxlY3RlZCooaGVpZ2h0LmRyYWctaGVpZ2h0Lm5hdHVyYWwpK2hlaWdodC5uYXR1cmFsfXB4YCxcbiAgICAgICAgICB6SW5kZXhcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPFRlbXBsYXRlQ29udGFpbmVyXG4gICAgICAgICAgcmVmPVwidGVtcGxhdGVDb250YWluZXJcIlxuICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgdGVtcGxhdGU9e3RlbXBsYXRlfVxuICAgICAgICAgIGl0ZW1TZWxlY3RlZD17aXRlbVNlbGVjdGVkfVxuICAgICAgICAgIGFueVNlbGVjdGVkPXthbnlTZWxlY3RlZH1cbiAgICAgICAgICBkcmFnSGFuZGxlPXt0aGlzLl9kcmFnSGFuZGxlfVxuICAgICAgICAgIGV2ZW50SGFuZGxlcnM9e2V2ZW50SGFuZGxlcnN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=