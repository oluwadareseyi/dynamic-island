"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CycleIcon from "../icons/cycle-icon";

export default function Cycling() {
  const [isSilent, setIsSilent] = useState(false);
  const [distance, setDistance] = useState(1.2);

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setIsSilent((s) => !s);
  //   }, 2000);

  //   return () => clearTimeout(id);
  // }, [isSilent]);

  useEffect(() => {
    const id = setInterval(() => {
      setDistance((d) => d + 0.1);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  const distanceArray = distance
    .toFixed(1)
    .toString()
    .padStart(2, "0")
    .split("");

  return (
    <motion.div
      initial={false}
      className="relative flex h-[32px] items-center justify-between px-2.5"
      animate={{ width: 148 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <AnimatePresence>
        <motion.div
          className="w-[18px]"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
        >
          <CycleIcon />
        </motion.div>
      </AnimatePresence>
      <div className="ml-auto flex items-center">
        <div className="text-xs font-medium text-[#9EFE00]">
          <AnimatePresence initial={false} mode="popLayout">
            {distanceArray.map((n, i) => (
              <motion.div
                className="inline-block tabular-nums"
                key={n + i}
                initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
                animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
                exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
                transition={{
                  type: "spring",
                  bounce: 0.25,
                  visualDuration: 0.5,
                }}
              >
                {n}
              </motion.div>
            ))}
          </AnimatePresence>
          <sup className="text-[8px] font-normal text-[#9EFE00]">MI</sup>
        </div>
      </div>
    </motion.div>
  );
}
