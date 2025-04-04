import { Html, useProgress } from "@react-three/drei";
import useProgressStore from "@/app/stores/useProgressStore";
import { useEffect } from "react";

const CanvasLoader = () => {
  const { progress } = useProgress();
  const setProgress = useProgressStore((state) => state.setProgress);

  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
