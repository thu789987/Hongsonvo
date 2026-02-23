/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg951113762254IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Svg951113762254Icon(props: Svg951113762254IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      xmlnsXlink={"http://www.w3.org/1999/xlink"}
      fill={"none"}
      viewBox={"0 0 13 13"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <g clipPath={"url(#a)"}>
        <path
          fill={"currentColor"}
          d={
            "M7.336 3.11V13H5.664V3.111L1.182 7.469 0 6.319 6.5 0 13 6.32l-1.182 1.149z"
          }
        ></path>
      </g>

      <defs>
        <clipPath id={"a"}>
          <path fill={"currentColor"} d={"M0 0h13v13H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Svg951113762254Icon;
/* prettier-ignore-end */
