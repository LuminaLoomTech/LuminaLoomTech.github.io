import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";
import { particlePresets } from "../../styles/animation";
import type { ISourceOptions } from "@tsparticles/engine";

type ParticleBackgroundProps = {
  preset?: keyof typeof particlePresets;
};

export default function ParticleBackground({ preset = "interactive" }: ParticleBackgroundProps) {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    console.log('🎨 ParticleBackground 載入，當前 preset:', preset);
    // 當 preset 改變時，強制重新渲染
    setKey(prev => prev + 1);
    // 檢測螢幕尺寸
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [preset]);

  if (!init) return null;

  let options = particlePresets[preset] as ISourceOptions;
  
  // 手機版優化：減少粒子數量
  if (isMobile) {
    const mobileOptions = JSON.parse(JSON.stringify(options));
    
    if (mobileOptions.particles?.number?.value) {
      mobileOptions.particles.number.value = Math.floor(mobileOptions.particles.number.value * 0.4);
    }
    
    if (!mobileOptions.particles?.number?.limit) {
      mobileOptions.particles.number.limit = {
        mode: "delete" as const,
        value: 25
      };
    }
    
    options = mobileOptions;
  }

  // 添加全屏和樣式配置
  const finalOptions = {
    ...options,
    fullScreen: { enable: false }
  };

  return (
    <Particles
      key={`${preset}-${key}`}
      id="tsparticles"
      options={finalOptions}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none"
      }}
    />
  );
}
