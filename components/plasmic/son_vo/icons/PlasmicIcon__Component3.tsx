/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Component3IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Component3Icon(props: Component3IconProps) {
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
          "M10 5.833V17.5M2.5 15a.833.833 0 0 1-.833-.833V3.333A.833.833 0 0 1 2.5 2.5h4.167A3.333 3.333 0 0 1 10 5.833 3.333 3.333 0 0 1 13.333 2.5H17.5a.833.833 0 0 1 .833.833v10.834A.834.834 0 0 1 17.5 15h-5a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 7.5 15z"
        }
      ></path>
    </svg>
  );
}

export default Component3Icon;
/* prettier-ignore-end */
