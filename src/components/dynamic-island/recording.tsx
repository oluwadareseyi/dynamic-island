import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function Recording() {
  const [isRecording, setIsRecording] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsRecording((r) => !r);
    }, 3000);

    const id2 = setTimeout(() => {
      setHasMounted(true);
    }, 1000);

    return () => clearTimeout(id);
  }, [isRecording]);

  return (
    <div className="flex w-[320px] items-center gap-2 py-3 px-5 recording">
      <div className="mr-auto">
        <div
          className={clsx(
            "flex gap-1.5 items-center mb-1.5 recording-text",
            isRecording && "active"
          )}
        >
          <div className="w-4 h-4 rounded-full bg-[#FA3532]" />
          <div className="text-sm font-normal leading-none tracking-[-0.24px] text-[#FA3532]">
            00:06
          </div>
        </div>
        <div className="text-sm font-normal leading-none tracking-[-0.24px] text-white">
          <AnimatePresence initial={false} mode="popLayout">
            {isRecording && (
              <motion.div
                key="recording"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                }}
              >
                Screen Recording
              </motion.div>
            )}
            {!isRecording && (
              <motion.div
                key="saved"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                }}
              >
                Recording saved
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-10 h-10 relative flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {isRecording && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
              }}
            >
              <svg viewBox="0 0 210 210" className="spin absolute inset-0">
                <circle cx="105" cy="105" r="100"></circle>
                <circle
                  cx="105"
                  cy="105"
                  r="100"
                  style={{ "--percent": 85 } as React.CSSProperties}
                ></circle>
              </svg>

              <svg
                viewBox="0 0 210 210"
                className="absolute inset-0 hide-delay"
              >
                <circle cx="105" cy="105" r="100"></circle>
                <circle
                  cx="105"
                  cy="105"
                  r="100"
                  style={{ "--percent": 100 } as React.CSSProperties}
                ></circle>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={clsx(!hasMounted && "bg-[#FA3532]")}
          style={{
            borderRadius: !hasMounted ? "4px" : "unset",
          }}
        >
          <motion.div
            className="overflow-hidden"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              !isRecording
                ? {
                    type: "spring",
                    bounce: 0.5,
                    visualDuration: 0.5,
                  }
                : {
                    type: "spring",
                    bounce: 0,
                    visualDuration: 0.4,
                  }
            }
            style={{
              borderRadius: "4px",
              width: isRecording ? "20px" : "40px",
              height: isRecording ? "20px" : "40px",
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="bg-[#FA3532] w-full h-full"
                ></motion.div>
              )}
              {!isRecording && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                  }}
                  className="w-full h-full object-cover"
                  src="/images/glass-animals.jpg"
                ></motion.img>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
