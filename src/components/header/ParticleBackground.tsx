import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="header-particles"
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 80 },
          color: { value: "#6ec6ff" },
          opacity: { value: 0.5 },
          size: { value: 2 },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            straight: false
          },
          links: {
            enable: true,
            color: "#6ec6ff",
            opacity: 0.3
          }
        }
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0
      }}
    />
  );
}
