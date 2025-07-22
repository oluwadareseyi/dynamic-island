import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type CallingProps = {
  setIdle: () => void;
};

export function Calling({ setIdle }: CallingProps) {
  return (
    <div className="flex w-[284px] items-center gap-2 py-3 pl-3.5 pr-5">
      <div className="flex items-center gap-2 mr-auto">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/images/fayemi.jpg"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-xs font-normal leading-none text-[#A4A4A9] mb-1 tracking-[-0.24px]">
            Mobile
          </div>
          <div className="text-sm font-normal leading-none text-white tracking-[-0.24px]">
            Group 256
          </div>
        </div>
      </div>

      <motion.button
        aria-label="End call"
        whileTap={{ scale: 0.9 }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FA3532] transition-colors hover:bg-[#FA3532]/95"
        onClick={setIdle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="11"
          fill="none"
          viewBox="0 0 28 11"
        >
          <path
            fill="#fff"
            d="M13.56.466c4.956 0 9.545 1.04 11.868 3.364 1.03 1.03 1.625 2.3 1.59 3.845-.023.938-.32 1.74-.858 2.266-.446.435-1.018.675-1.694.56l-4.188-.709c-.64-.103-1.087-.297-1.385-.595-.366-.366-.48-.915-.492-1.636l-.011-1.168a.657.657 0 0 0-.183-.423 1.072 1.072 0 0 0-.4-.217c-.79-.23-2.358-.367-4.246-.367-1.889 0-3.468.172-4.246.355-.126.034-.297.092-.412.229a.595.595 0 0 0-.194.435V7.56c0 .72-.115 1.27-.493 1.636-.286.298-.732.492-1.373.595l-4.245.721a1.802 1.802 0 0 1-1.614-.538C.446 9.437.16 8.613.114 7.687.046 6.153.572 4.883 1.624 3.83 3.949 1.507 8.607.466 13.562.466Z"
          />
        </svg>
      </motion.button>
      <button
        aria-label="Exit"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#37C058] text-white transition-colors hover:bg-[#37C058]/95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="22"
          fill="none"
          viewBox="0 0 22 22"
        >
          <path
            fill="#fff"
            d="M6.157 15.696C2.849 12.4.343 8.418.343 5.134c0-1.454.492-2.77 1.602-3.834C2.621.648 3.4.304 4.154.304c.618 0 1.179.24 1.58.79l2.46 3.468c.377.537.572.984.572 1.396 0 .526-.31.984-.813 1.51l-.812.836a.578.578 0 0 0-.172.423c0 .172.069.332.126.458.366.71 1.408 1.922 2.53 3.044 1.132 1.121 2.345 2.163 3.055 2.54.114.057.286.126.457.126a.617.617 0 0 0 .435-.183l.813-.801c.526-.515.995-.813 1.51-.813.412 0 .858.184 1.396.55l3.514 2.494c.537.39.755.939.755 1.511 0 .778-.378 1.568-.984 2.243-1.042 1.144-2.335 1.66-3.811 1.66-3.284 0-7.301-2.553-10.608-5.86Z"
          />
        </svg>
      </button>
    </div>
  );
}

function Counter({ paused }: { paused?: boolean }) {
  const [count, setCount] = useState(60);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setCount((c) => {
        if (c === 0) {
          return 60;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [paused]);

  const countArray = count.toString().padStart(2, "0").split("");

  return (
    <div className="relative w-[64px] overflow-hidden whitespace-nowrap text-3xl font-light">
      0:
      <AnimatePresence initial={false} mode="popLayout">
        {countArray.map((n, i) => (
          <motion.div
            className="inline-block tabular-nums"
            key={n + i}
            initial={{ y: "12px", filter: "blur(2px)", opacity: 0 }}
            animate={{ y: "0", filter: "blur(0px)", opacity: 1 }}
            exit={{ y: "-12px", filter: "blur(2px)", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.35 }}
          >
            {n}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
