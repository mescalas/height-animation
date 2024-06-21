import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();

        setHeight(rect.height);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid h-[100vh] w-[100vw] place-items-center bg-zinc-800 text-black">
      <button
        className="bg-white rounded text-sm py-2 px-4"
        onClick={() => setShowExtraContent((b) => !b)}
      >
        Toggle height
      </button>
      <motion.div
        className="bg-white rounded-2xl w-[320px] flex flex-col gap-2 overflow-hidden"
        animate={{ height }}
      >
        <div className="py-3 px-4" ref={elementRef}>
          <h1 className="font-semibold text-black">Fake Family/ Drawer</h1>
          <p className="text-gray-400">
            This is a fake family drawer. Animating height is tricky, but
            satisfying when it works.
          </p>
          <AnimatePresence initial={false} mode="popLayout">
            {showExtraContent ? (
              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                This extra content will change the height of the drawer. Some
                even more content to make the drawer taller and taller and
                taller...
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
