"use client";
import { interpolate } from "flubber";
import React, { useState, useEffect } from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";

//  i want it to take all the path attributes as props

export default function SVGMorph({
  paths,
  delay = 0,
  ...props
}: { paths: string[]; delay?: number } & React.SVGProps<SVGPathElement>) {
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);

  const arrayOfIndex = paths.map((_, i) => i);
  const path = useTransform(progress, arrayOfIndex, paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 5 }),
  });

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.2,
      ease: "easeInOut",
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      },
      onUpdate: (latest) => {
        // console.log(animation.duration);
      },
    });
    return () => {
      animation.stop();
    };
  }, [pathIndex]);

  // Only pass compatible props to motion.path
  const {
    className,
    style,
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    opacity,
  } = props;

  return (
    <motion.path
      d={path}
      className={className}
      style={style}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      opacity={opacity}
    />
  );
}
