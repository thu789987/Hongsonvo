/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Component1IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Component1Icon(props: Component1IconProps) {
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
          "M12.5 17.5v-6.667a.833.833 0 0 0-.833-.833H8.333a.833.833 0 0 0-.833.833V17.5"
        }
      ></path>

      <path
        stroke={"currentColor"}
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"1.667"}
        d={
          "M2.5 8.333a1.67 1.67 0 0 1 .59-1.273l5.834-5a1.67 1.67 0 0 1 2.152 0l5.833 5a1.67 1.67 0 0 1 .591 1.273v7.5a1.666 1.666 0 0 1-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 15.833z"
        }
      ></path>
    </svg>
  );
}

export default Component1Icon;
/* prettier-ignore-end */
