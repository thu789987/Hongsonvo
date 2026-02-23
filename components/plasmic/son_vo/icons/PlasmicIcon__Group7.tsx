/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group7IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group7Icon(props: Group7IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 700 451"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M697.122 13.821C725.68 66.076 501.24 258.614 386.487 328.218S31.396 487.197 2.834 434.943c-28.561-52.254 165.47-226.349 280.223-295.953S668.553-38.433 697.122 13.821"
        }
        opacity={".31"}
      ></path>
    </svg>
  );
}

export default Group7Icon;
/* prettier-ignore-end */
