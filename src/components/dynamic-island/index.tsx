"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Transition, Variants } from "motion/react";
import { Timer } from "./timer";
import Cycling from "./cycling";
import { Calling } from "./calling";

export default function DynamicIsland() {
  const [view, setView] = useState("idle");
  const [variantKey, setVariantKey] = useState("idle");
  const [splitMode, setSplitMode] = useState(false);

  const content = useMemo(() => {
    switch (view) {
      case "timer":
        return <Timer />;
      case "cycle":
        return <Cycling />;
      case "calling":
        return <Calling setIdle={() => setView("idle")} />;
      case "idle":
        return <div className="h-[32px] w-[128px]" />;
    }

    console.log(view);
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
            animate={{ x: splitMode ? "-21px" : 0 }}
            transition={{
              // delay: 0.1,
              duration: 1.5,
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

          <AnimatePresence mode="popLayout">
            {splitMode && (
              <motion.div
                key="icon"
                className="absolute top-0 right-0 h-full aspect-square rounded-full bg-black z-[-1] flex items-center justify-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: "calc(50% + 10px)", opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{
                  // delay: 0.1,
                  duration: 1.5,
                  type: "spring",
                  bounce: 0.35,
                }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <path
                    fill="#90C9F9"
                    d="M1.731 14.703c.563 0 .94-.395.94-.958 0-.334-.025-.677-.025-1.16 0-2.953 1.037-4.148 3.963-4.148h5.704l2.101-.132-2.62 2.39-1.959 1.978a.955.955 0 0 0-.281.685c0 .528.395.923.949.923.237 0 .474-.096.685-.299L16.98 8.19a.974.974 0 0 0 .317-.72.988.988 0 0 0-.317-.721L11.206.975c-.229-.211-.466-.317-.703-.317-.554 0-.95.396-.95.923 0 .273.106.51.282.686l1.96 1.986 2.61 2.382-2.091-.123H6.485c-4.069 0-5.783 1.872-5.783 6.011 0 .519.018.967.088 1.319.08.422.343.861.94.861Z"
                  />
                </motion.svg>
              </motion.div>
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
          {["idle", "cycle", "calling", "timer"].map((v) => (
            <button
              type="button"
              className="rounded-full capitalize h-10 bg-white px-6 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
              onClick={() => {
                setView(v);
                setVariantKey(`${view}-${v}`);
                if (v === "timer") {
                  setSplitMode(false);
                }
              }}
              key={v}
            >
              {v}
            </button>
          ))}
          <button
            type="button"
            className="rounded-full capitalize h-10 bg-white px-6 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
            disabled={view === "timer"}
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
  "cycle-idle": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "calling-cycle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "cycle-calling": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "calling-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
};

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "cycle-idle": 0.5,
  "calling-cycle": 0.35,
  "cycle-calling": 0.35,
  "calling-idle": 0.3,
  "idle-calling": 0.3,
  "idle-cycle": 0.5,
};
