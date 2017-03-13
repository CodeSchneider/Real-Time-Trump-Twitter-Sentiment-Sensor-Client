import React from 'react';
import * as d3 from "d3";
import ReactDOM from 'react-dom';

class Grid extends React.Component {
  componentDidUpdate() {
    this.renderGrid();
  }

  componentDidMount() {
    this.renderGrid();
  }

  renderGrid() {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.grid);
  }

  render() {
    var translate = "translate(0,"+(this.props.h)+")";
    return (<g className="y-grid" transform={this.props.gridType=='x'?translate:""}></g>);
  }
}

Grid.propTypes = {
  h:React.PropTypes.number,
  grid:React.PropTypes.func,
  gridType:React.PropTypes.oneOf(['x','y'])
}

export default Grid
