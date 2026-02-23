/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group6IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group6Icon(props: Group6IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 293 189"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M291.631 5.782c11.947 21.86-81.945 102.405-129.95 131.523S13.134 203.812 1.186 181.952c-11.95-21.86 69.221-94.69 117.227-123.808C166.418 29.027 279.68-16.078 291.631 5.782"
        }
        opacity={".31"}
      ></path>
    </svg>
  );
}

export default Group6Icon;
/* prettier-ignore-end */
