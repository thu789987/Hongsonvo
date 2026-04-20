/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type SSvgIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function SSvgIcon(props: SSvgIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 17 23"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"currentColor"}
        d={
          "M8.56 22.463q-2.405 0-4.311-.782-1.905-.78-3.062-2.311Q.063 17.84 0 15.683h5.686q.125 1.218.843 1.875.72.625 1.875.625 1.187 0 1.874-.532.688-.562.688-1.53 0-.813-.563-1.344-.53-.53-1.343-.875-.78-.343-2.25-.78-2.124-.657-3.467-1.313-1.344-.656-2.312-1.937Q.062 8.592.062 6.53q0-3.06 2.219-4.78Q4.498 0 8.06 0q3.623 0 5.841 1.75 2.219 1.718 2.375 4.81h-5.78q-.063-1.061-.78-1.655-.72-.625-1.844-.625-.97 0-1.562.531-.594.5-.594 1.469 0 1.062 1 1.655 1 .594 3.124 1.281 2.124.719 3.437 1.375a6.5 6.5 0 0 1 2.311 1.906q.969 1.25.969 3.217 0 1.875-.969 3.406-.936 1.53-2.749 2.436-1.811.906-4.28.906"
        }
      ></path>
    </svg>
  );
}

export default SSvgIcon;
/* prettier-ignore-end */
