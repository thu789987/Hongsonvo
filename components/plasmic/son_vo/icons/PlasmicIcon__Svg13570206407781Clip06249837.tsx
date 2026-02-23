/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg13570206407781Clip06249837IconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Svg13570206407781Clip06249837Icon(
  props: Svg13570206407781Clip06249837IconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 332 404"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M332 0H0v404h332z"}></path>
    </svg>
  );
}

export default Svg13570206407781Clip06249837Icon;
/* prettier-ignore-end */
