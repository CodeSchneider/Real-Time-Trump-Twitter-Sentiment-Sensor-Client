import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import LineChart from './components/line-chart.jsx';
import RecentTweets from './components/recent-tweets.jsx';

ReactDOM.render( <LineChart />, document.getElementById('main_chart') );
ReactDOM.render( <RecentTweets />, document.getElementById('recent_tweets') );
