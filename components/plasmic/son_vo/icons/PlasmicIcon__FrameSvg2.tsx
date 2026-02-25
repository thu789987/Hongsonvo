/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type FrameSvg2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function FrameSvg2Icon(props: FrameSvg2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 24 24"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeOpacity={".5"}
        strokeWidth={"2"}
        d={"m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"}
      ></path>
    </svg>
  );
}

export default FrameSvg2Icon;
/* prettier-ignore-end */
