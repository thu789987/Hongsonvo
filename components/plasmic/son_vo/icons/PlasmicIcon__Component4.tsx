/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Component4IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Component4Icon(props: Component4IconProps) {
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
          "M16.667 3.333H3.333c-.92 0-1.666.747-1.666 1.667v10c0 .92.746 1.667 1.666 1.667h13.334c.92 0 1.666-.747 1.666-1.667V5c0-.92-.746-1.667-1.666-1.667"
        }
      ></path>

      <path
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"1.667"}
        d={"m18.333 5.833-7.475 4.75a1.62 1.62 0 0 1-1.716 0l-7.475-4.75"}
      ></path>
    </svg>
  );
}

export default Component4Icon;
/* prettier-ignore-end */
