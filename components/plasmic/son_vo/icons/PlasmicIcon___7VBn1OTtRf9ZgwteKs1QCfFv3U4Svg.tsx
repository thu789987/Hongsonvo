/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type _7VBn1OTtRf9ZgwteKs1QCfFv3U4SvgIconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function _7VBn1OTtRf9ZgwteKs1QCfFv3U4SvgIcon(
  props: _7VBn1OTtRf9ZgwteKs1QCfFv3U4SvgIconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      xmlnsXlink={"http://www.w3.org/1999/xlink"}
      fill={"none"}
      viewBox={"0 0 14 15"}
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
            "M13.17 13.539 8.454 6.128l4.653-5.12a.603.603 0 0 0-.892-.812L7.783 5.071 4.733.281A.6.6 0 0 0 4.223 0H.609a.603.603 0 0 0-.51.927l4.717 7.409L.162 13.46a.603.603 0 1 0 .891.81l4.433-4.874 3.05 4.794a.6.6 0 0 0 .509.275h3.616a.602.602 0 0 0 .509-.925zm-3.794-.28L1.704 1.205h2.185l7.674 12.054z"
          }
        ></path>
      </g>

      <defs>
        <clipPath id={"a"}>
          <path fill={"currentColor"} d={"M0 0h13.929v15H0z"}></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default _7VBn1OTtRf9ZgwteKs1QCfFv3U4SvgIcon;
/* prettier-ignore-end */
