"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CycleIcon from "../icons/cycle-icon";

export default function Cycling() {
  const [isSilent, setIsSilent] = useState(false);

  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setIsSilent((s) => !s);
  //   }, 2000);

  //   return () => clearTimeout(id);
  // }, [isSilent]);

  return (
    <motion.div
      className="relative flex h-7 items-center justify-between px-2.5"
      animate={{ width: isSilent ? 148 : 128 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <div className="h-[20px] w-[20px]">
        <CycleIcon />
      </div>
      <div className="ml-auto flex items-center">
        <span className="text-xs font-medium text-[#9EFE00]">
          1.9{" "}
          <sup className="text-[8px] font-normal text-[#9EFE00] -left-[3px]">
            MI
          </sup>
        </span>
      </div>
    </motion.div>
  );
}
