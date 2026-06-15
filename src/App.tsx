import { useRef } from "react";
import LiquidGlass from "liquid-glass-react";

const BACKGROUND_URL = "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      console.warn("Audio blocked by gesture limits", e);
    }
  };

  const handleButtonClick = () => {
    playSound();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-zinc-950 select-none"
      id="root-container"
    >
      <img
        src={BACKGROUND_URL}
        alt="Sleek Wallpaper"
        className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none scale-102"
        referrerPolicy="no-referrer"
        id="background-minimal-backdrop"
      />

      <div className="absolute inset-0 bg-black/10 pointer-events-none z-0" />

      <LiquidGlass
        mouseContainer={containerRef}
        displacementScale={80}
        blurAmount={0.05}
        saturation={150}
        aberrationIntensity={3.5}
        elasticity={0.25}
        cornerRadius={999}
        padding="18px 48px"
        onClick={handleButtonClick}
        mode="standard"
        style={{ position: "absolute", top: "50%", left: "50%" }}
        className="cursor-pointer select-none rounded-full border border-white/30 hover:border-white/50 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] shadow-2xl transition-all duration-300"
      >
        <div className="flex flex-col items-center justify-center text-center text-white" id="inner-button">
          <span className="text-3xl font-serif italic font-medium tracking-wide text-zinc-100 select-none">
            Saint
          </span>
        </div>
      </LiquidGlass>
    </div>
  );
}
