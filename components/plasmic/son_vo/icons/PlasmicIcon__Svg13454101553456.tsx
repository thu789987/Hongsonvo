/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg13454101553456IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Svg13454101553456Icon(props: Svg13454101553456IconProps) {
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
        fill={"currentColor"}
        fillRule={"evenodd"}
        d={
          "M11.725 5.4a1.784 1.784 0 0 1 3.53.364v3.553l1.445.614a2.29 2.29 0 0 1 1.283 2.817l-1.084 3.331a3.125 3.125 0 0 1-2.972 2.159h-2.569a3.125 3.125 0 0 1-2.897-1.954l-1.847-4.569a.87.87 0 0 1 .262-1.002 2.24 2.24 0 0 1 2.542-.182V7.073A1.76 1.76 0 0 1 11.725 5.4m1.213 4.683a.625.625 0 0 1-1.25 0V7.074a.51.51 0 0 0-1.02 0v4.856c0 .705-.918.978-1.302.386l-.256-.394a.99.99 0 0 0-1.215-.375l1.725 4.27a1.875 1.875 0 0 0 1.74 1.172h2.568a1.875 1.875 0 0 0 1.783-1.295l1.083-3.332a1.04 1.04 0 0 0-.583-1.28l-1.825-.776a.63.63 0 0 1-.38-.575V5.764a.534.534 0 0 0-1.068 0zM4.025 8.198a1.04 1.04 0 0 0 1.478 0l1.844-1.855a.625.625 0 0 0-.887-.881L4.763 7.169 3.067 5.461a.625.625 0 0 0-.887.882z"
        }
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"currentColor"}
        fillRule={"evenodd"}
        d={"M5.388 2.292v5.231h-1.25V2.292a.625.625 0 0 1 1.25 0"}
        clipRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default Svg13454101553456Icon;
/* prettier-ignore-end */
