var React    = require('react');
var ReactDOM = require('react-dom');
var _        = require('lodash');

require('./util')();

var PcGallery = require('./PcGallery');
var SpGallery = require('./SpGallery');

'use strict';

console.info([
  '   _____       _______',
  '  / ____|   /\\|__   __|',
  ' | |       /  \\  | |___',
  ' | |      / /\\ \\ | / __|',
  ' | |____ / ____ \\| \\__ \\',
  '  \\_____/_/    \\_\\_|___/',
  '           Version 1.1.0',
].join('\n'));

var CONTAINER = document.querySelector('.container');

var Gallery = React.createClass({
  render: function() {
    if (window.ua.Mobile) {
      return (<SpGallery />);
    } else {
      return (<PcGallery />);
    }
  },
});

ReactDOM.render(
  <Gallery />,
  CONTAINER
);
