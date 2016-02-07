var React    = require('react');
var ReactDOM = require('react-dom');
var _        = require('lodash');

var GalleryItem = require('./GalleryItem');
var Loader      = require('./Loader');

'use strict';

var CONTAINER = document.querySelector('.container');
var PRELOAD   = document.querySelector('div.preload');

var SpGallery = React.createClass({
  fetch: function() {
    var chunk   = this.state.restChunk;

    if (!_.isEmpty(chunk)) {
      var nextIndexes = chunk.shift();

      this.setState({
        restChunk: chunk,
        imageIndexes: this.state.imageIndexes.concat(nextIndexes),
        waiting: this.state.waiting + nextIndexes.length,
      });
    }

    return this;
  },

  onLoad: function(e, index) {
    this.setState({
      waiting: this.state.waiting - 1,
    })
  },

  componentDidUpdate: function(prevProps, prevState) {
    // console.log('waiting: ', this.state.waiting);

    if (0 === this.state.waiting && !PRELOAD.classList.contains('hidden')) {
      PRELOAD.classList.add('hidden');
    }

    if (0 === this.state.waiting && !this.isWindowFilled()) {
      this.fetch();
    }
  },

  scrollTimer: false,
  onScroll: function() {
    if (this.scrollTimer !== false) { clearTimeout(this.scrollTimer); }
    this.scrollTimer = setTimeout(function() {
      var scrollHeight   = CONTAINER.clientHeight
      var scrollTop      = document.documentElement.scrollTop || document.body.scrollTop;
      var scrollPosition = window.innerHeight + scrollTop;

      // console.log('scrollHeight: ', scrollHeight);
      // console.log('scrollPosition: ', scrollPosition);

      if (scrollHeight - scrollPosition < 200 && 0 === this.state.waiting) {
        this.fetch();
      }
    }.bind(this), 50);
  },

  isWindowFilled: function() {
    var windowHeight = window.innerHeight;
    var gridHeight   = CONTAINER.clientHeight;

    console.log('windowHeight: ', windowHeight);
    console.log('gridHeight: ', gridHeight);

    return windowHeight < gridHeight;
  },

  IMAGES: parseInt(document.querySelector('meta[name=images]').content, 10),
  CHUNK:  parseInt(document.querySelector('meta[name=chunk]').content, 10),
  getInitialState: function() {
    console.info('images: ', this.IMAGES);
    console.info('chunk: ', this.CHUNK);

    var chunk      = _(_.range(this.IMAGES)).shuffle().chunk(this.CHUNK).value();
    var initIndexes = chunk.shift();

    return {
      restChunk: chunk,
      imageIndexes: initIndexes,
      waiting: initIndexes.length,
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.onScroll);
  },

  render: function() {
    var galleryItems = this.state.imageIndexes.map(function(index) {
      return (
        <GalleryItem
          index={index}
          onLoad={this.onLoad}
          onError={this.onLoad}
          key={index}
        />
      );
    }.bind(this));

    var className = 'grid';

    return (
      <div>
        <ul className={className}>
          {galleryItems}
        </ul>
        <Loader waiting={this.state.waiting} />
      </div>
    );
  },
});

module.exports = SpGallery;
