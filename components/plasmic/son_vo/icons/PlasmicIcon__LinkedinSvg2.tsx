/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LinkedinSvg2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LinkedinSvg2Icon(props: LinkedinSvg2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 16"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M3.6 16H.2V5.3h3.4zM1.9 3.8C.8 3.8 0 3 0 1.9S.9 0 1.9 0C3 0 3.8.8 3.8 1.9S3 3.8 1.9 3.8M16 16h-3.4v-5.8c0-1.7-.7-2.2-1.7-2.2s-2 .8-2 2.3V16H5.5V5.3h3.2v1.5C9 6.1 10.2 5 11.9 5c1.9 0 3.9 1.1 3.9 4.4V16z"
        }
      ></path>
    </svg>
  );
}

export default LinkedinSvg2Icon;
/* prettier-ignore-end */
