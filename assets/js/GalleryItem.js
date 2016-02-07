var React    = require('react');
var ReactDOM = require('react-dom');

require('./util')();

'use strict';

var GalleryItem = React.createClass({
  getInitialState: function() {
    return {
      hidden: true,
    };
  },

  createImagePath: function(index) {
    return 'img/'+index.padding(2)+'.gif';
  },

  onLoad: function(e) {
    console.info('loaded: "'+e.target.src+'"');

    this.props.onLoad(e, this.props.index);

    this.setState({hidden: false});
  },

  render: function() {
    var className = 'grid-item';
    if (this.state.hidden) { className += ' hidden'; }

    var index = this.props.index;

    return (
      <li className={className}>
        <img
          src={this.createImagePath(index)}
          alt={index}
          onLoad={this.onLoad}
        />
      </li>
    );
  },
});

module.exports = GalleryItem;
