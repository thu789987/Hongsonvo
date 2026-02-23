/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg3805297237725Clip0621118IconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Svg3805297237725Clip0621118Icon(
  props: Svg3805297237725Clip0621118IconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 910 656"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M910 0H0v656h910z"}></path>
    </svg>
  );
}

export default Svg3805297237725Clip0621118Icon;
/* prettier-ignore-end */
