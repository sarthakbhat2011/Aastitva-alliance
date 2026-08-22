import React from 'react';
import { ViewportTraverser } from './ViewportTraverser';
import { SpatialFloatingElement } from './SpatialFloatingElement';
import { Sparkles, Globe, Award, Shield, Compass, Landmark } from 'lucide-react';

export const SpatialAtmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Deep Background: Ambient Floating Galactic Gradients */}
      <div className="absolute top-[15%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-[#16203B]/12 blur-[140px] animate-pulse-glow" />
      <div className="absolute top-[60%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#D4AF37]/6 blur-[150px] animate-float" />
      <div className="absolute top-[85%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-[#52459E]/8 blur-[130px] animate-pulse-glow" />

      {/* 2. Autonomous Viewport Traversers: Crossing the screen behind interface cards */}
      {/* Traverser A: Golden Coordinate Ring traveling diagonally up */}
      <ViewportTraverser direction="diagonal-up" duration={58} delay={2} startY="70%" opacityRange={[0.03, 0.14]}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1427]/40 border border-[#D4AF37]/20 backdrop-blur-sm shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[9px] font-mono text-[#D4AF37]/60 tracking-widest uppercase">
            32.7266° N, 74.8570° E • AASTITVA CONCLAVE
          </span>
        </div>
      </ViewportTraverser>

      {/* Traverser B: Philosophical Node traveling left to right */}
      <ViewportTraverser direction="left-to-right" duration={68} delay={10} startY="25%" opacityRange={[0.02, 0.12]}>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#070A14]/50 border border-[#D4AF37]/15 backdrop-blur-sm">
          <Compass className="w-3 h-3 text-[#D4AF37]/50" />
          <span className="text-[9px] font-cormorant italic text-[#FAF5EF]/60 tracking-wider">
            "Collapsing the distance to existence"
          </span>
        </div>
      </ViewportTraverser>

      {/* Traverser C: Diplomatic Seal Token traveling right to left */}
      <ViewportTraverser direction="right-to-left" duration={62} delay={20} startY="52%" opacityRange={[0.03, 0.14]}>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#16203B]/40 border border-[#D4AF37]/20 backdrop-blur-sm shadow-md">
          <Shield className="w-3 h-3 text-[#D4AF37]/70" />
          <span className="text-[8px] font-mono text-[#D4AF37]/70 font-bold tracking-widest uppercase">
            AEQUITAS PROTOCOL // ROP STANDARDIZED
          </span>
        </div>
      </ViewportTraverser>

      {/* 3. Floating Spatial Ambient Micro-Orbs & Edge Beacons (Layered across the full screen) */}
      {/* Top Left Corner Ambient Beacon */}
      <div className="absolute top-[8%] left-[3%]">
        <SpatialFloatingElement preset="orbital" speed={0.8} depthLayer="background" amplitudeX={8} amplitudeY={8}>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D1427]/60 border border-[#D4AF37]/25 backdrop-blur-md opacity-40 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[7.5px] font-mono text-[#D4AF37] tracking-widest uppercase">JAMMU HQ // 32.72°N</span>
          </div>
        </SpatialFloatingElement>
      </div>

      {/* Top Right Corner Ambient Beacon */}
      <div className="absolute top-[12%] right-[3%]">
        <SpatialFloatingElement preset="wave" speed={0.7} depthLayer="deep-background" amplitudeX={6} amplitudeY={8}>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#16203B]/50 border border-[#A855F7]/30 opacity-35 shadow-md">
            <Sparkles className="w-2.5 h-2.5 text-[#E9D5FF]" />
            <span className="text-[7.5px] font-mono text-[#E9D5FF] tracking-wider uppercase">CIRCUIT ACTIVE</span>
          </div>
        </SpatialFloatingElement>
      </div>

      {/* Far-Left Vertical Edge Coordinate Marker */}
      <div className="absolute top-[48%] -left-1">
        <SpatialFloatingElement preset="gentle" speed={0.6} depthLayer="background" amplitudeX={4} amplitudeY={12}>
          <div className="py-2 px-1 rounded-r-lg bg-[#070A14]/80 border-y border-r border-[#D4AF37]/30 text-[7px] font-mono text-[#D4AF37]/50 [writing-mode:vertical-lr] tracking-[0.25em] opacity-40 select-none">
            AASTITVA // PROTOCOL
          </div>
        </SpatialFloatingElement>
      </div>

      {/* Far-Right Vertical Edge Coordinate Marker */}
      <div className="absolute top-[55%] -right-1">
        <SpatialFloatingElement preset="gentle" speed={0.6} depthLayer="background" amplitudeX={4} amplitudeY={12}>
          <div className="py-2 px-1 rounded-l-lg bg-[#070A14]/80 border-y border-l border-[#D4AF37]/30 text-[7px] font-mono text-[#D4AF37]/50 [writing-mode:vertical-lr] tracking-[0.25em] opacity-40 select-none">
            13 CIRCUIT HUBS
          </div>
        </SpatialFloatingElement>
      </div>

      {/* Bottom Left Corner Ambient Node */}
      <div className="absolute bottom-[18%] left-[4%]">
        <SpatialFloatingElement preset="deep-drift" speed={0.75} depthLayer="background" amplitudeX={8} amplitudeY={10}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 shadow-[0_0_14px_rgba(212,175,55,0.5)] opacity-30" />
        </SpatialFloatingElement>
      </div>

      {/* Bottom Right Corner Ambient Beacon */}
      <div className="absolute bottom-[12%] right-[4%]">
        <SpatialFloatingElement preset="orbital" speed={0.65} depthLayer="deep-background" amplitudeX={7} amplitudeY={7}>
          <div className="w-4 h-4 rounded-full border border-[#D4AF37]/35 flex items-center justify-center opacity-30 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>
        </SpatialFloatingElement>
      </div>
    </div>
  );
};
