/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg3470087764138Clip06130381IconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Svg3470087764138Clip06130381Icon(
  props: Svg3470087764138Clip06130381IconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 64 20"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M64 0H0v20h64z"}></path>
    </svg>
  );
}

export default Svg3470087764138Clip06130381Icon;
/* prettier-ignore-end */
