'use strict';

var React = require('../util/react');
var Colr = require('colr');

var OnChangeMixin = require('../mixin/onchange.react');

var Input = React.createClass({displayName: "Input",

  mixins: [OnChangeMixin],

  propTypes: {
    fn: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]).isRequired,
  },

  getInitialState: function () {
    return {
      value: '',
      isFocused: false
    };
  },

  componentDidMount: function () {
    this.setState({ value: this.props.value });
  },

  componentWillReceiveProps: function (props) {
    if (! this.state.isFocused) {
      this.setState({ value: props.value });
    }
  },

  handleChange: function (event) {
    var value = event.target.value;
    var color = this.props.fn(value);
    if (color !== null) {
      this.props.onChange(color.toHex());
    }
    this.setState({ value: value });
  },

  handleFocus: function () {
    this.setState({ isFocused: true });
  },

  handleBlur: function () {
    this.setState({ isFocused: false });
  },

  render: function () {
    return (
      /* jshint ignore: start */
      React.createElement("li", null, 
        React.createElement("label", null, this.props.label), 
        React.createElement("input", {
          value: this.state.value, 
          onFocus: this.handleFocus, 
          onBlur: this.handleBlur, 
          onChange: this.handleChange}
        )
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Input;
