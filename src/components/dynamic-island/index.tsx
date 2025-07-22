"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Ring } from "./ring";
import { Timer } from "./timer";
import Cycling from "./cycling";

export default function DynamicIsland() {
  const [view, setView] = useState("idle");
  const [variantKey, setVariantKey] = useState("idle");
  const [splitMode, setSplitMode] = useState(false);

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return <Ring />;
      case "timer":
        return <Timer />;
      case "cycle":
        return <Cycling />;
      case "idle":
        return <div className="h-7 w-[100px]" />;
    }
  }, [view]);

  return (
    <div className="h-[200px]">
      <div className="relative flex h-full w-full flex-col justify-between items-center">
        <motion.div
          layout
          transition={{
            type: "spring",
            bounce: BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
          }}
          initial={false}
          style={{ borderRadius: "9999px" }}
          className="relative"
        >
          <motion.div
            style={{ borderRadius: "9999px" }}
            className="bg-black"
            initial={{ x: 0 }}
            animate={{ x: splitMode ? "-10px" : 0 }}
            transition={{
              delay: 0.1,
              duration: 1.85,
              type: "spring",
              bounce: 0.35,
            }}
          >
            <motion.div
              transition={{
                type: "spring",
                bounce:
                  BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
              }}
              initial={{
                scale: 0.9,
                opacity: 0,
                filter: "blur(5px)",
                originX: 0.5,
                originY: 0.5,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                originX: 0.5,
                originY: 0.5,
                transition: {
                  delay: 0.05,
                },
              }}
              key={view}
            >
              {content}
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {splitMode && (
              <motion.div
                key="icon"
                className="absolute top-0 right-0 h-full aspect-square rounded-full bg-black z-[-1]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: "100%", opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 1.85,
                  type: "spring",
                  bounce: 0.35,
                }}
              ></motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
          <AnimatePresence
            mode="popLayout"
            custom={
              ANIMATION_VARIANTS[variantKey as keyof typeof ANIMATION_VARIANTS]
            }
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit="exit"
              variants={variants as Variants}
              key={view}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex w-full justify-center gap-4">
          {["idle", "ring", "timer", "cycle"].map((v) => (
            <button
              type="button"
              className="rounded-full capitalize w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
              onClick={() => {
                setView(v);
                setVariantKey(`${view}-${v}`);
              }}
              key={v}
            >
              {v}
            </button>
          ))}
          <button
            type="button"
            className="rounded-full capitalize w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
            onClick={() => setSplitMode(!splitMode)}
          >
            Split Mode
          </button>
        </div>
      </div>
    </div>
  );
}

const variants = {
  exit: (transition: Transition) => {
    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
    };
  },
};

const ANIMATION_VARIANTS = {
  "ring-idle": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "timer-ring": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "ring-timer": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "timer-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
};

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
};
