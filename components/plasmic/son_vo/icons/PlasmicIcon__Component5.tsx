/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Component5IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Component5Icon(props: Component5IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 20 20"}
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
        strokeWidth={"1.667"}
        d={
          "M5 1.667 2.5 5v11.667a1.667 1.667 0 0 0 1.667 1.666h11.666a1.667 1.667 0 0 0 1.667-1.666V5L15 1.667zM2.5 5h15m-4.167 3.333a3.334 3.334 0 0 1-6.666 0"
        }
      ></path>
    </svg>
  );
}

export default Component5Icon;
/* prettier-ignore-end */
