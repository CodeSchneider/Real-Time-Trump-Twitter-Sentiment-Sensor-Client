import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";

class Axis extends React.Component {
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axis);
  }

  render() {
    var translate = "translate(0,"+(this.props.h)+")";
    return (<g className="axis" transform={this.props.axisType=='x'?translate:""} ></g>);
  }
}

Axis.propTypes = {
  h:React.PropTypes.number,
  axis:React.PropTypes.func,
  axisType:React.PropTypes.oneOf(['x','y'])
}

export default Axis
