/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg12625118677119Clip06130364IconProps =
  React.ComponentProps<"svg"> & {
    title?: string;
  };

export function Svg12625118677119Clip06130364Icon(
  props: Svg12625118677119Clip06130364IconProps
) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 126 16"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path fill={"currentColor"} d={"M126 0H0v16h126z"}></path>
    </svg>
  );
}

export default Svg12625118677119Clip06130364Icon;
/* prettier-ignore-end */
