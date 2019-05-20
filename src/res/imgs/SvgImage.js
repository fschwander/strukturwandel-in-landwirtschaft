import * as React from "react";

export default class SvgImage extends React.Component {

  constructor(params) {
    super(params);

    this.style = {
      background: '#fff',
      viewBox: "0 0 155 143"
    }
  }

  render() {
    const {style, style: {className, viewBox}} = this;
    const {width, fill} = this.props;

    return (
        <svg
          width={width}
          style={style}
          height={width}
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          className={`icon ${className || ""}`}
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="farm" stroke="none" strokeWidth="1" fill={fill} fillRule="evenodd">{this.props.src}</g>
        </svg>)

  }
}