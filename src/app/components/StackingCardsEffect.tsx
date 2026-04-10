import { Card } from "./Card";
import { projects } from "../utils/data";
import { useEffect, useRef, useState } from "react";

export const StackingCardsEffect = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const startSentinelRef = useRef<HTMLDivElement | null>(null);
  const endSentinelRef = useRef<HTMLDivElement | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<number>(
    projects[0]?.projectId ?? 0,
  );
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [hasFullyVisibleCard, setHasFullyVisibleCard] = useState(false);

  useEffect(() => {
    const update = () => {
      const startTop = startSentinelRef.current?.getBoundingClientRect().top;
      const endTop = endSentinelRef.current?.getBoundingClientRect().top;

      if (typeof startTop !== "number" || typeof endTop !== "number") return;

      const inside = startTop <= 0 && endTop > 0;
      setIsSectionInView(inside);

      if (!inside) setHasFullyVisibleCard(false);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const showOverlay = isSectionInView && hasFullyVisibleCard;

  const handleFullyInView = (projectId: number) => {
    setActiveProjectId(projectId);
    setHasFullyVisibleCard(true);
  };

  return (
    <main ref={rootRef} className="bg-black opacity-[0.85]">
      <div ref={startSentinelRef} />
      {showOverlay && (
        <div className="fixed top-10 left-10 z-50 pointer-events-none">
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full text-white backdrop-blur before:absolute before:-inset-1 before:rounded-full before:bg-pink-500 before:content-[''] before:z-[-1]">
            <span className="text-sm sm:text-lg uppercase tracking-wider opacity-70">
              Project
            </span>

            <div className="flex items-baseline gap-1">
              <div className="text-xl sm:text-2xl font-bold opacity-70">
                {activeProjectId}
              </div>
              <div className="text-xl sm:text-2xl font-bold opacity-70">/</div>
              <div className="text-xl sm:text-2xl font-bold opacity-70">
                {projects.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {projects.map((proj, index) => {
        return (
          <Card
            key={proj.projectId}
            {...proj}
            index={index}
            onFullyInView={handleFullyInView}
          />
        );
      })}

      <div ref={endSentinelRef} />
    </main>
  );
};
