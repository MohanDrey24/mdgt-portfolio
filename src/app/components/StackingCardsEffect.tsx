import { Card } from "./Card";
import { projects } from "../utils/data";
import { useEffect, useRef, useState } from "react";

export const StackingCardsEffect = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<number>(
    projects[0]?.projectId ?? 0
  );
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [hasFullyVisibleCard, setHasFullyVisibleCard] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    const el = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = Boolean(entry?.isIntersecting);
        setIsSectionInView(intersecting);

        if (!intersecting) {
          setHasFullyVisibleCard(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showOverlay = isSectionInView && hasFullyVisibleCard;

  const handleFullyInView = (projectId: number) => {
    setActiveProjectId(projectId);
    setHasFullyVisibleCard(true);
  };

  return (
    <main ref={rootRef} className="bg-black opacity-[0.85]">
      {showOverlay && (
        <div className="fixed top-30 left-30 z-50 pointer-events-none">
          <div className="rounded-full flex flex-col items-center justify-center w-35 h-35 bg-black/60 px-3 py-2 text-white backdrop-blur">
            <span className="text-lg uppercase tracking-wider opacity-70">
              Project
            </span>

            <div className="flex items-baseline gap-1">
              <div className="text-2xl font-black opacity-70">{activeProjectId}</div>
              <div className="text-2xl font-black opacity-70 border-l-3 border-white/70 pl-1">
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
    </main>
  );
};
