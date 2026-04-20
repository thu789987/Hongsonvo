/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type HSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function HSvgIcon(props: HSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 19 22"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={"M18.995 0v21.931h-5.343v-9.028h-8.31v9.028H0V0h5.342v8.591h8.31V0z"}
      ></path>
    </svg>
  );
}

export default HSvgIcon;
/* prettier-ignore-end */
