var React    = require('react');
var ReactDOM = require('react-dom');

var Loader = React.createClass({
  render: function() {
    var className = 'loading';
    if (0 === this.props.waiting) { className += ' hidden'; }

    return (
      <div className={className}>
        <img src="img/loader.gif" alt="loader" />
      </div>
    );
  },
});

module.exports = Loader;
