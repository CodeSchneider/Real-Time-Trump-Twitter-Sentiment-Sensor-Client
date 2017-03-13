import React, { Component } from 'react';
import moment from 'moment';

class TweetTime extends Component {
  render () {
    let time = moment(this.props.time).format('MMM Do, h:mm:ss a');
    return (
      <span className="time"><i className="fa fa-clock-o"></i>&nbsp;{time}</span>
    )
  }
}

TweetTime.propTypes = {
  time: React.PropTypes.string,
}

TweetTime.defaultProps = {
  time: new Date(),
}

export default TweetTime;
