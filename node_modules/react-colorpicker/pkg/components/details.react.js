'use strict';

var React = require('../util/react');
var Colr = require('colr');

var Input = require('./input.react');
var OnChangeMixin = require('../mixin/onchange.react');

var Details = React.createClass({displayName: "Details",

  mixins: [OnChangeMixin],

  propTypes: {
    color: React.PropTypes.instanceOf(Colr).isRequired,
    hsv: React.PropTypes.object.isRequired,
  },

  handleRgb: function (id) {
    var self = this;
    return function (value) {
      var number = parseInt(value, 10);
      if (isNaN(number)) { return null; }
      var rgb = self.props.color.toRgbObject();
      rgb[id] = number;
      return Colr.fromRgbObject(rgb);
    };
  },

  handleHsv: function (id) {
    var self = this;
    return function (value) {
      var number = parseInt(value, 10);
      if (isNaN(number)) { return null; }
      var hsv = self.props.color.toHsvObject();
      hsv[id] = number;
      return Colr.fromHsvObject(hsv);
    };
  },

  handleHex: function (value) {
    try {
      return Colr.fromHex(value);
    } catch (e) {
      return null;
    }
  },

  render: function () {
    var hex = this.props.color.toHex().slice(1);
    var rgb = this.props.color.toRgbObject();
    var hsv = this.props.color.toHsvObject();

    return (
      /* jshint ignore: start */
      React.createElement("div", {className: "details"}, 
        React.createElement("ul", {className: "hex"}, 
          React.createElement(Input, {
            label: "#", value: hex, 
            fn: this.handleHex, 
            onChange: this.props.onChange}
          )
        ), 
        React.createElement("ul", {className: "rgb"}, 
          React.createElement(Input, {
            label: "R:", value: rgb.r, 
            fn: this.handleRgb('r'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "G:", value: rgb.g, 
            fn: this.handleRgb('g'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "B:", value: rgb.b, 
            fn: this.handleRgb('b'), 
            onChange: this.props.onChange}
          )
        ), 
        React.createElement("ul", {className: "hsv"}, 
          React.createElement(Input, {
            label: "H:", value: hsv.h, 
            fn: this.handleHsv('h'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "S:", value: hsv.s, 
            fn: this.handleHsv('s'), 
            onChange: this.props.onChange}
          ), 
          React.createElement(Input, {
            label: "B:", value: hsv.v, 
            fn: this.handleHsv('v'), 
            onChange: this.props.onChange}
          )
        )
      )
      /* jshint ignore: end */
    );
  }

});

module.exports = Details;
