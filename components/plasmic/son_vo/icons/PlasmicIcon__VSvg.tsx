/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type VSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function VSvgIcon(props: VSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 23 22"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={"m22.244 0-7.78 21.931H7.78L0 0h5.686l5.436 16.558L16.589 0z"}
      ></path>
    </svg>
  );
}

export default VSvgIcon;
/* prettier-ignore-end */
