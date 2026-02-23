/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type Svg19614699972257IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function Svg19614699972257Icon(props: Svg19614699972257IconProps) {
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
        d={
          "M17.5 3.75H9.911A2.5 2.5 0 0 0 7.5 1.875c-1.161 0-2.132.8-2.411 1.875H2.5A.625.625 0 0 0 2.5 5h2.589A2.5 2.5 0 0 0 7.5 6.875c1.161 0 2.132-.8 2.411-1.875H17.5a.625.625 0 1 0 0-1.25m-10 1.875a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m10 3.75h-2.589A2.5 2.5 0 0 0 12.5 7.5c-1.161 0-2.132.8-2.411 1.875H2.5a.625.625 0 0 0 0 1.25h7.589A2.5 2.5 0 0 0 12.5 12.5c1.161 0 2.132-.8 2.411-1.875H17.5a.624.624 0 1 0 0-1.25m-5 1.875a1.251 1.251 0 0 1 0-2.5 1.251 1.251 0 0 1 0 2.5m5 3.75H9.911A2.5 2.5 0 0 0 7.5 13.125c-1.161 0-2.132.8-2.411 1.875H2.5a.625.625 0 1 0 0 1.25h2.589A2.5 2.5 0 0 0 7.5 18.125c1.161 0 2.132-.8 2.411-1.875H17.5a.624.624 0 1 0 0-1.25m-10 1.875a1.251 1.251 0 0 1 0-2.5 1.251 1.251 0 0 1 0 2.5"
        }
      ></path>
    </svg>
  );
}

export default Svg19614699972257Icon;
/* prettier-ignore-end */
