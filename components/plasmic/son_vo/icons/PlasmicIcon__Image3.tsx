/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Image3IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Image3Icon(props: Image3IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      xmlnsXlink={"http://www.w3.org/1999/xlink"}
      fill={"none"}
      viewBox={"0 0 14 14"}
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
            "M6.925 14a.54.54 0 0 1-.373-.153.52.52 0 0 1-.155-.371V9.04l-3.716-.001a.53.53 0 0 1-.453-.257.52.52 0 0 1-.01-.518L6.589.274a.527.527 0 0 1 .991.25v4.444h3.739a.53.53 0 0 1 .453.257.52.52 0 0 1 .01.519l-4.395 7.983a.52.52 0 0 1-.462.273"
          }
        ></path>
      </g>

      <defs>
        <clipPath id={"a"}>
          <path fill={"currentColor"} d={"M0 0h14v14H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Image3Icon;
/* prettier-ignore-end */
