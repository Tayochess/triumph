var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loadData = function loadData(dataname) {
  try {
    var data = localStorage.getItem(dataname);
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

var saveData = function saveData(data) {
  try {
    var encodedData = JSON.stringify(data);
    localStorage.setItem('tableEditor', encodedData);
  } catch (err) {
    return undefined;
  }
};

var Line = function (_React$Component) {
  _inherits(Line, _React$Component);

  function Line() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Line);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Line.__proto__ || Object.getPrototypeOf(Line)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      e.preventDefault();
      _this.props.selectLine(_this.props.index);
    }, _this.moveUp = function (e) {
      e.preventDefault();
      _this.props.moveLineUp(_this.props.index);
    }, _this.moveDown = function (e) {
      e.preventDefault();
      _this.props.moveLineDown(_this.props.index);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Line, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'editor__line ' + (this.props.isActive ? 'active' : '') },
        React.createElement(
          'div',
          { 'class': 'editor__line-navigation' },
          React.createElement('button', { 'class': 'editor__line-navbutton editor__line-navbutton-up', type: 'button', onClick: this.moveUp }),
          React.createElement('button', { 'class': 'editor__line-navbutton editor__line-navbutton-down', type: 'button', onClick: this.moveDown })
        ),
        React.createElement(
          'div',
          { 'class': 'editor__line-fields', onClick: this.handleClick },
          React.createElement(
            'div',
            { 'class': 'editor__field' },
            ' ',
            this.props.data.name,
            ' '
          ),
          React.createElement(
            'div',
            { 'class': 'editor__field' },
            ' ',
            this.props.data.type,
            ' '
          ),
          React.createElement(
            'div',
            { 'class': 'editor__field' },
            ' ',
            this.props.data.color,
            ' '
          )
        )
      );
    }
  }]);

  return Line;
}(React.Component);

var Editor = function (_React$Component2) {
  _inherits(Editor, _React$Component2);

  function Editor(props) {
    _classCallCheck(this, Editor);

    var _this2 = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

    _this2.state = {
      data: [],
      name_value: '',
      type_value: '',
      color_value: '',
      current_line: null,
      inputBlockActive: false
    };

    _this2.setupBeforeUnloadListener = function () {
      window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        saveData(_this2.state.data);
      });
    };

    _this2.updateName = function () {
      _this2.setState({ name_value: event.target.value });
    };

    _this2.updateType = function () {
      _this2.setState({ type_value: event.target.value });
    };

    _this2.updateColor = function () {
      _this2.setState({ color_value: event.target.value });
    };

    _this2.selectLine = function (num) {
      _this2.setState(function (prevState) {
        var new_data = [].concat(_toConsumableArray(prevState.data));

        new_data[_this2.state.current_line] = {
          name: _this2.state.name_value,
          type: _this2.state.type_value,
          color: _this2.state.color_value
        };

        return {
          current_line: num,
          data: new_data,
          name_value: _this2.state.data[num].name,
          type_value: _this2.state.data[num].type,
          color_value: _this2.state.data[num].color,
          inputBlockActive: true
        };
      });
    };

    _this2.saveInput = function () {
      _this2.setState(function (prevState) {
        var new_data = [].concat(_toConsumableArray(prevState.data));

        new_data[_this2.state.current_line] = {
          name: _this2.state.name_value,
          type: _this2.state.type_value,
          color: _this2.state.color_value
        };

        return {
          data: new_data,
          inputBlockActive: false
        };
      });
    };

    _this2.closeInput = function () {
      _this2.setState({
        inputBlockActive: false
      });
    };

    _this2.moveLineUp = function (current_index) {
      _this2.setState(function (prevState) {
        var new_data = [].concat(_toConsumableArray(prevState.data));

        if (current_index > 0) {
          var temp = new_data[current_index - 1];
          new_data[current_index - 1] = new_data[current_index];
          new_data[current_index] = temp;
        }

        return {
          current_line: current_index > 0 ? current_index - 1 : current_index,
          data: new_data
        };
      });
    };

    _this2.moveLineDown = function (current_index) {
      _this2.setState(function (prevState) {
        var new_data = [].concat(_toConsumableArray(prevState.data));

        if (current_index < new_data.length - 1) {
          var temp = new_data[current_index + 1];
          new_data[current_index + 1] = new_data[current_index];
          new_data[current_index] = temp;
        }

        return {
          current_line: current_index < new_data.length - 1 ? current_index + 1 : current_index,
          data: new_data
        };
      });
    };

    _this2.saveDataLocally = function () {
      saveData(_this2.state.data);
    };

    _this2.restoreData = function () {
      _this2.setState({
        data: init_data
      });
    };

    _this2.addLine = function () {
      _this2.setState(function (prevState) {
        var new_data = [].concat(_toConsumableArray(prevState.data));
        new_data.push({
          name: '',
          type: '',
          color: ''
        });

        return {
          data: new_data
        };
      });
    };

    _this2.removeLine = function () {
      _this2.setState(function (prevState) {
        var new_data = [].concat(_toConsumableArray(prevState.data));

        if (!_this2.state.current_line) {
          return;
        } else {
          new_data.splice(_this2.state.current_line, 1);
        }

        return {
          data: new_data
        };
      });
    };

    var loaded_data = loadData('tableEditor');
    if (loaded_data !== undefined) {
      _this2.state = { data: loaded_data };
    } else {
      _this2.state = { data: init_data };
    }
    return _this2;
  }

  _createClass(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setupBeforeUnloadListener();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { 'class': 'editor__container' },
        React.createElement(
          'div',
          { 'class': 'editor__header' },
          React.createElement(
            'button',
            { 'class': 'editor__header-button', type: 'button', onClick: this.saveDataLocally },
            'Save data'
          ),
          React.createElement(
            'button',
            { 'class': 'editor__header-button', type: 'button', onClick: this.restoreData },
            'Restore data'
          )
        ),
        React.createElement(
          'div',
          { 'class': 'editor__table' },
          this.state.data.map(function (item, index) {
            return React.createElement(Line, { data: item, index: index, isActive: index == _this3.state.current_line, selectLine: _this3.selectLine, moveLineUp: _this3.moveLineUp, moveLineDown: _this3.moveLineDown });
          })
        ),
        React.createElement(
          'div',
          { 'class': 'editor__footer' },
          React.createElement(
            'button',
            { 'class': 'editor__footer-button', type: 'button', onClick: this.addLine },
            'Add line'
          ),
          React.createElement(
            'button',
            { 'class': 'editor__footer-button', type: 'button', onClick: this.removeLine },
            'Remove line'
          )
        ),
        React.createElement(
          'div',
          { className: 'editor__input-block ' + (this.state.inputBlockActive ? 'active' : '') },
          React.createElement(
            'label',
            { 'class': 'editor__input-label', 'for': 'name_field' },
            'Name'
          ),
          React.createElement('input', { id: 'name_field', 'class': 'editor__input-text', type: 'text', value: this.state.name_value, onChange: this.updateName }),
          React.createElement(
            'label',
            { 'class': 'editor__input-label', 'for': 'type_field' },
            'Type'
          ),
          React.createElement('input', { id: 'type_field', 'class': 'editor__input-text', type: 'text', value: this.state.type_value, onChange: this.updateType }),
          React.createElement(
            'label',
            { 'class': 'editor__input-label', 'for': 'color_field' },
            React.createElement(
              'span',
              null,
              'Color'
            ),
            React.createElement('input', { id: 'color_field', 'class': 'editor__input-color', type: 'color', value: this.state.color_value, onChange: this.updateColor })
          ),
          React.createElement(
            'div',
            { 'class': 'editor__input-buttons' },
            React.createElement(
              'button',
              { 'class': 'editor__input-button', type: 'button', onClick: this.saveInput },
              'OK'
            ),
            React.createElement(
              'button',
              { 'class': 'editor__input-button', type: 'button', onClick: this.closeInput },
              'Cancel'
            )
          )
        )
      );
    }
  }]);

  return Editor;
}(React.Component);

var init_data = [{
  name: "name1",
  type: "main",
  color: "#f4f4f4"
}, {
  name: "name2",
  type: "main",
  color: "#f4f4f4"
}, {
  name: "name3",
  type: "main",
  color: "#f4f4f4"
}, {
  name: "name4",
  type: "main",
  color: "#f4f4f4"
}, {
  name: "name5",
  type: "main",
  color: "#f4f4f4"
}, {
  name: "name6",
  type: "main",
  color: "#f4f4f4"
}];

var el = document.querySelector('#editor');
ReactDOM.render(React.createElement(Editor, null), el);