import React, { Component } from 'react';
import * as d3 from "d3";
import Axis from './axis.jsx';
import Grid from './grid.jsx';
import Ring from 'ringjs'
import $ from 'jquery';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TweetTime from './tweet-time.jsx';
import TweetSentiment from './tweet-sentiment.jsx';
import io from './socketSDK.js';

class RecentTweets extends Component {
  constructor() {
    super();
    this.state = {
      recentTweets: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.serverRequest =
      $
        .get("https://rtttss-api.herokuapp.com/twitter/recent")
        .then(function(recentTweets) {
          this.setState({
            recentTweets: recentTweets
          });
        }.bind(this))

    io.socket.on('newRecentTweets', (data) => {
      this.setState({
        recentTweets: data
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render () {
    return (
      <ul id="recentTweetsList" className="collection">
        <ReactCSSTransitionGroup
          transitionName="recentTweet"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.state.recentTweets.map((recentTweet) => {
            return (<li key={recentTweet.id} className="collection-item avatar">
                      <img src={recentTweet.picture} className="circle"/>
                      <span className="title tweetText">{recentTweet.text}</span>
                      <div>
                        <TweetSentiment sentiment={recentTweet.sentiment}/>
                        <TweetTime time={recentTweet.createdAt}/>
                      </div>
                    </li>)
          })}
        </ReactCSSTransitionGroup>
      </ul>
    )
  }
}

export default RecentTweets;
