/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg10673152612572Clip06130304IconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Svg10673152612572Clip06130304Icon(
  props: Svg10673152612572Clip06130304IconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 15 15"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M15 0H0v15h15z"}></path>
    </svg>
  );
}

export default Svg10673152612572Clip06130304Icon;
/* prettier-ignore-end */
