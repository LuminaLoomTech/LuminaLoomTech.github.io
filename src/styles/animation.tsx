import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";

// 粒子動畫配置預設
export const particlePresets = {
  // 預設配置 - 簡單網格
  default: {
    particles: {
      number: { value: 60 },
      color: { value: "#ffffff" },
      links: { 
        enable: true, 
        color: "#5ecfff",
        distance: 150,
        opacity: 0.5
      },
      move: { 
        enable: true, 
        speed: 1,
        direction: "none" as const,
        outModes: { default: "bounce" as const }
      },
      size: { value: 3 }
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false }
      }
    }
  },

  // 雪花效果
  snow: {
    particles: {
      number: { value: 100 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.8,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      move: {
        enable: true,
        speed: 1,
        direction: "bottom" as const,
        straight: false,
        outModes: { default: "out" as const }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false }
      }
    }
  },

  // 星空效果
  stars: {
    particles: {
      number: { value: 150 },
      color: { value: ["#ffffff", "#5ecfff", "#ffd700"] },
      shape: { type: "circle" },
      opacity: {
        value: 1,
        random: true,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1
        }
      },
      size: {
        value: 2,
        random: true
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none" as const
      }
    },
    interactivity: {
      events: {
        onHover: { enable: false },
        onClick: { enable: false }
      }
    }
  },

  // 泡泡效果
  bubbles: {
    particles: {
      number: { value: 40 },
      color: { value: ["#5ecfff", "#79c5ff", "#a8e0ff"] },
      shape: { type: "circle" },
      opacity: {
        value: 0.6,
        random: true
      },
      size: {
        value: 20,
        random: true
      },
      move: {
        enable: true,
        speed: 2,
        direction: "top" as const,
        outModes: { default: "out" as const }
      }
    },
    interactivity: {
      events: {
        onHover: { 
          enable: true,
          mode: "repulse"
        },
        onClick: { enable: false }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    }
  },

  // 互動網格
  interactive: {
    particles: {
      number: { 
        value: 30,
        limit: {
          mode: "delete" as const,
          value: 50
        }
      },
      color: { value: "#5ecfff" },
      opacity: {
        value: 0
      },
      links: { 
        enable: true, 
        color: "#5ecfff",
        distance: 200,
        opacity: 0.6,
        frequency: 0.5,
        warp: false
      },
      move: { 
        enable: true, 
        speed: 0.8,
      },
      size: { value: 3 }
    },
    interactivity: {
      events: {
        onHover: { 
          enable: true,
          mode: "grab"
        },
        onClick: { 
          enable: true,
          mode: "push"
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1
          }
        },
        push: {
          quantity: 2
        }
      }
    }
  },

  // 互動網格（含三角形填充）
  interactiveTriangles: {
    particles: {
      number: { value: 80 },
      color: { value: "#5ecfff" },
      opacity: {
        value: 0
      },
      links: { 
        enable: true, 
        color: "#5ecfff",
        distance: 200,
        opacity: 0.6,
        triangles: {
          enable: true,
          opacity: 0.05
        }
      },
      move: { 
        enable: true, 
        speed: 0.5,
      },
      size: { value: 3 }
    },
    interactivity: {
      events: {
        onHover: { 
          enable: true,
          mode: "grab"
        },
        onClick: { 
          enable: true,
          mode: "push"
        }
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1
          }
        },
        push: {
          quantity: 2
        }
      }
    }
  }
};

// 粒子背景組件 Props
type ParticleBackgroundProps = {
  preset?: keyof typeof particlePresets;
  customOptions?: ISourceOptions;
  id?: string;
};

export default function ParticleBackground({ 
  preset = "default", 
  customOptions,
  id = "tsparticles"
}: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  const options = customOptions || particlePresets[preset];

  return (
    <Particles
      id={id}
      options={options}
    />
  );
}
