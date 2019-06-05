import * as React from "react";

export default class SvgImage extends React.Component {

  constructor(params) {
    super(params);
    const {vbWidth, vbHeight} = this.props;

    this.style = {
      viewBox: `0 0 ${vbWidth} ${vbHeight}`
    };
    this.width = this.props.width === undefined ? 100 : this.props.width;
    this.fill = this.props.fill === undefined ? '#222' : this.props.fill;
  }

  render() {
    const {style, width, fill, style: {viewBox}} = this;

    return (
      <svg
        width={width + 'px'}
        height={width + 'px'}
        style={style}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`icon ${this.props.className || ""}`}
        xmlnsXlink="http://www.w3.org/1999/xlink">
        <g fill={fill}>{this.props.src}>
          <path d={this.props.src} fill="" fillRule="nonzero"/>
        </g>
      </svg>)

  }
}