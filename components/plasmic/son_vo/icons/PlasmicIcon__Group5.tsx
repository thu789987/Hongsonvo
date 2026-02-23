/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Group5IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Group5Icon(props: Group5IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 285 187"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M283.103 5.725c11.598 21.646-79.548 101.402-126.15 130.234-46.601 28.833-144.203 65.855-155.802 44.209-11.6-21.645 67.198-93.762 113.799-122.594S271.502-15.92 283.103 5.725"
        }
        opacity={".31"}
      ></path>
    </svg>
  );
}

export default Group5Icon;
/* prettier-ignore-end */
