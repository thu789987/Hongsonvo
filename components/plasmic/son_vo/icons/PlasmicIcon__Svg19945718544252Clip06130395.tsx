/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg19945718544252Clip06130395IconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Svg19945718544252Clip06130395Icon(
  props: Svg19945718544252Clip06130395IconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 85 16"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M85 0H0v16h85z"}></path>
    </svg>
  );
}

export default Svg19945718544252Clip06130395Icon;
/* prettier-ignore-end */
