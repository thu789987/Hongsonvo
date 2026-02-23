/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg245451326771IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Svg245451326771Icon(props: Svg245451326771IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      xmlnsXlink={"http://www.w3.org/1999/xlink"}
      fill={"none"}
      viewBox={"0 0 8 13"}
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
            "M8 6.47a.9.9 0 0 1-.074.358.9.9 0 0 1-.216.304l-5.997 5.594a1.04 1.04 0 0 1-.71.274c-.266 0-.52-.099-.71-.274A.9.9 0 0 1 0 12.064c0-.248.106-.486.294-.662L5.59 6.47.304 1.54a.9.9 0 0 1-.24-.643.9.9 0 0 1 .292-.623C.534.107.773.01 1.025.001c.251-.01.497.07.688.223L7.71 5.818A.9.9 0 0 1 8 6.47"
          }
        ></path>
      </g>

      <defs>
        <clipPath id={"a"}>
          <path fill={"currentColor"} d={"M0 0h8v13H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Svg245451326771Icon;
/* prettier-ignore-end */
