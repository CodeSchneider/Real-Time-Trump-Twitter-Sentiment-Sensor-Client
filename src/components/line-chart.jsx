import React, { Component } from 'react';
import * as d3 from "d3";
import Axis from './axis.jsx';
import Grid from './grid.jsx';
import Ring from 'ringjs';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import io from './socketSDK.js';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      data: new Ring(30)
    };
  }

  componentDidMount() {
    //GET INITIAL DATA
    this.serverRequest =
      $.get("https://rtttss-api.herokuapp.com/twitter/history")
      .then(function(resp) {
        let data = this.state.data;
        for (var i=0; i<resp.length; i++) {
          data.push(resp[i]);
        }
        this.setState({
          data: data
        });
        }.bind(this))

    //LISTEN FOR SOCKET, UPDATE CHART
    io.socket.on('tick', (tick) => {
      let data = this.state.data;
      data.push(tick);
      this.setState({
        data: data
      });
    });

    this.updateSize();

  }

  componentWillMount() {
    var _self=this;
    $(window).on('resize', function(e) {
        _self.updateSize();
    });
    this.setState({width:this.props.width});
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  updateSize() {
    var node = ReactDOM.findDOMNode(this);
    var parentWidth=$(node).width();

    if(parentWidth>this.props.width){
        this.setState({width:parentWidth-20});
    }else{
        this.setState({width:this.props.width});
    }
  }

  render() {
    var margin = {top: 5, right: 50, bottom: 20, left: 50},
             w = this.state.width - (margin.left + margin.right),
             h = this.props.height - (margin.top + margin.bottom);

    var parseDate = d3.time.format("%H:%M:%S").parse;

    this.state.data.toArray().forEach(function (d) {
      d.date = parseDate(d.time);
    });

    var x = d3.time.scale()
      .domain(d3.extent(this.state.data.toArray(), function (d) {
        return d.date;
      })).rangeRound([0, w]);

    var y = d3.scale.linear()
      .domain([0,d3.max(this.state.data.toArray(),function(d){
        return ( d3.max([d.P,d.S,d.N], function(e){
          return e + 10;
        }));
      })]).range([h, 0]);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(5);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom')
      .ticks(3)

    var yGrid = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(5)
      .tickSize(-w, 0, 0)
      .tickFormat("");

    var lineP = d3.svg.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.P);
      }).interpolate('monotone');

    var lineN = d3.svg.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.N);
      }).interpolate('monotone');

    var lineS = d3.svg.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.S);
      }).interpolate('monotone');

    var transform='translate(' + margin.left + ',' + margin.top + ')';

    return (
      <div>
        <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
          <g transform={transform}>
            <path className="lineP shadow" d={lineP(this.state.data.toArray())} strokeLinecap="round"/>
            <path className="lineN shadow" d={lineN(this.state.data.toArray())} strokeLinecap="round"/>
            <path className="lineS shadow" d={lineS(this.state.data.toArray())} strokeLinecap="round"/>
            <Grid h={h} grid={yGrid} gridType="y"/>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x"/>
          </g>
        </svg>
      </div>
    )
  }
}

LineChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  chartId: React.PropTypes.string,
}

LineChart.defaultProps = {
  width: 50,
  height: 300,
  chartId: 'v1_chart',
}

export default LineChart;
