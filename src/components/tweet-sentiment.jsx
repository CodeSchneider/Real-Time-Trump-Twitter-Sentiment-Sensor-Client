import React, { Component } from 'react';

class TweetSentiment extends Component {
  render () {
    let sentiment = this.props.sentiment;
    let sentimentMessage;
    if (sentiment === 'P') {
      sentimentMessage = 'Good Sentiment';
    } else if (sentiment === 'N') {
      sentimentMessage = 'Bad Sentiment';
    } else {
      sentimentMessage = 'Neutral Sentiment';
    }
    return (
      <span className={`sentiment${sentiment} sentiment`}>{sentimentMessage}</span>
    )
  }
}

TweetSentiment.propTypes = {
  sentiment: React.PropTypes.string,
}

TweetSentiment.defaultProps = {
  sentiment: 'S',
}

export default TweetSentiment;
