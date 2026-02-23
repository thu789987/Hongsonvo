/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type LogoSvg2IconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function LogoSvg2Icon(props: LogoSvg2IconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 53 60"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        fill={"#ED6124"}
        fillRule={"evenodd"}
        d={"m41.79 21.054 10.421-6.38-13.646-7.655 3.138 13.987z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#F39720"}
        fillRule={"evenodd"}
        d={"m26.194 12.443 15.596 8.611L38.564 7.02z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#FCB33F"}
        fillRule={"evenodd"}
        d={"m26.053 0 .14 12.443 12.371-5.424z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#F9E500"}
        fillRule={"evenodd"}
        d={"m13.034 7.47 13.16 4.973L26.053 0z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#E3E01D"}
        fillRule={"evenodd"}
        d={"M13.034 7.47 10.74 21.284l1.143-.669 14.31-8.173z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#99C03C"}
        fillRule={"evenodd"}
        d={"M13.034 7.47.106 14.886v.04l10.635 6.377-.001-.037v.037z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#128E45"}
        fillRule={"evenodd"}
        d={"M.107 14.887.052 30.212h.049l10.646-8.669-.006-.24z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#3BAF6F"}
        fillRule={"evenodd"}
        d={"M10.74 21.267.054 30.212l11.094 8.692h-.001l-.03-1.219z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#23A39B"}
        fillRule={"evenodd"}
        d={"M.052 30.212 0 44.98l.225.128 10.92-6.214z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#56ABDC"}
        fillRule={"evenodd"}
        d={"m0 44.98 13.764 7.8-2.62-13.885z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#1D75B7"}
        fillRule={"evenodd"}
        d={"m11.147 38.904 2.58 13.855.189.107 12.531-5.201-14.148-8.11z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#232357"}
        fillRule={"evenodd"}
        d={"M13.727 52.76 26.504 60l-.057-12.335z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#662B7E"}
        fillRule={"evenodd"}
        d={"M26.447 47.665 26.504 60l12.84-7.342z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#8B277C"}
        fillRule={"evenodd"}
        d={
          "m39.344 52.659.008-.005L41.424 39.1l-.158-.088-1.001.584-13.818 8.068z"
        }
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#9C1F61"}
        fillRule={"evenodd"}
        d={"m41.266 39.013-1.922 13.645L52.21 45.3z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#DD0A86"}
        fillRule={"evenodd"}
        d={"m52.108 30.218-10.467 8.29-.375.504.157.089 10.788 6.198z"}
        clipRule={"evenodd"}
      ></path>

      <path
        fill={"#B21F32"}
        fillRule={"evenodd"}
        d={"m35.383 30.147 5.883 8.865 10.842-8.794-.001-.072z"}
        clipRule={"evenodd"}
      ></path>
    </svg>
  );
}

export default LogoSvg2Icon;
/* prettier-ignore-end */
