import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { AstitvaLogo } from './AstitvaLogo';
import { Astitva3DCanvas } from './Astitva3DCanvas';
import {
  Monitor,
  Terminal,
  FileText,
  Globe,
  Compass,
  Sparkles,
  Play,
  X,
  Minus,
  Square,
  Power,
  Wifi,
  Cpu,
  Clock,
  Layers,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { COMMITTEES, INITIAL_SUMMIT_CONFIG } from '../data';

interface Props {
  onEnterSite: (targetPage?: Page) => void;
  onOpenRegister?: () => void;
}

interface OSWindow {
  id: string;
  title: string;
  icon: any;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export const AstitvaOSLoader: React.FC<Props> = ({ onEnterSite, onOpenRegister }) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [bootComplete, setBootComplete] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<string>('summit');
  const [timeString, setTimeString] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ text: string; type: 'cmd' | 'resp' | 'sys' }>>([
    { text: 'Aastitva OS v2.4.0 [Quantum Diplomatic Core]', type: 'sys' },
    { text: 'Type "help" for a list of available system commands.', type: 'sys' },
  ]);

  const [highestZ, setHighestZ] = useState(10);

  // OS Windows configuration
  const [windows, setWindows] = useState<Record<string, OSWindow>>({
    summit: {
      id: 'summit',
      title: 'Aequitas_Summit_2026.exe',
      icon: Globe,
      isOpen: true,
      isMinimized: false,
      zIndex: 10,
    },
    founder: {
      id: 'founder',
      title: 'Founder_Chronicle.sys',
      icon: FileText,
      isOpen: false,
      isMinimized: false,
      zIndex: 8,
    },
    offerings: {
      id: 'offerings',
      title: 'Offerings_Catalog.dll',
      icon: Layers,
      isOpen: false,
      isMinimized: false,
      zIndex: 7,
    },
    map: {
      id: 'map',
      title: 'Regional_Network_Matrix.map',
      icon: Compass,
      isOpen: false,
      isMinimized: false,
      zIndex: 6,
    },
    terminal: {
      id: 'terminal',
      title: 'Astitva_Terminal.sh',
      icon: Terminal,
      isOpen: false,
      isMinimized: false,
      zIndex: 9,
    },
  });

  // Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Boot sequence animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBootComplete(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 110);

    return () => clearInterval(interval);
  }, []);

  const bringToFront = (id: string) => {
    setHighestZ((prev) => prev + 1);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: highestZ + 1,
      },
    }));
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
  };

  const toggleMinimize = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: !prev[id].isMinimized,
      },
    }));
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newHistory = [...terminalHistory, { text: `> ${terminalInput}`, type: 'cmd' as const }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: 'Available Commands:', type: 'resp' },
          { text: '  summit     - Launch Aequitas 2026 Summit dossier', type: 'resp' },
          { text: '  founder    - Open Founder philosophy & reach chronicle', type: 'resp' },
          { text: '  about      - Launch About & Founder chronicle', type: 'resp' },
          { text: '  offerings  - View full academic & debate service matrix', type: 'resp' },
          { text: '  map        - Inspect 13-city Northern India network map', type: 'resp' },
          { text: '  register   - Trigger official delegate application modal', type: 'resp' },
          { text: '  enter      - Launch the complete Aastitva Alliance website', type: 'resp' },
          { text: '  clear      - Clear terminal screen buffer', type: 'resp' }
        );
        break;
      case 'summit':
        bringToFront('summit');
        newHistory.push({ text: 'Opening Aequitas Summit 2026 Window...', type: 'resp' });
        break;
      case 'founder':
      case 'about':
        bringToFront('founder');
        newHistory.push({ text: 'Opening About & Founder Chronicle Window...', type: 'resp' });
        break;
      case 'offerings':
        bringToFront('offerings');
        newHistory.push({ text: 'Opening Offerings Catalog Window...', type: 'resp' });
        break;
      case 'map':
        bringToFront('map');
        newHistory.push({ text: 'Opening Regional Network Matrix Window...', type: 'resp' });
        break;
      case 'register':
        onOpenRegister && onOpenRegister();
        newHistory.push({ text: 'Launching Delegate Registration Gateway...', type: 'resp' });
        break;
      case 'enter':
      case 'home':
        onEnterSite('home');
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          text: `Command not recognized: "${cmd}". Type "help" for valid commands.`,
          type: 'resp',
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#050811] text-[#FAF5EF] font-mono select-none overflow-hidden w-full h-full">
      {/* 1. INITIAL RETRO BIOS BOOT OVERLAY */}
      {!bootComplete && (
        <div className="absolute inset-0 z-50 bg-[#070A14] flex flex-col items-center justify-center p-4 sm:p-6 text-left space-y-6">
          <div className="max-w-md w-full space-y-4 font-mono text-xs px-2">
            <div className="flex items-center gap-3">
              <AstitvaLogo size="md" variant="mark-only" showSubtitle={false} />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-[#D4AF37]">AASTITVA OS v2.4.0</h1>
                <p className="text-[10px] text-[#C4BBA3]">Academic & Leadership Infrastructure Kernel</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1427] border border-[#D4AF37]/40 space-y-2 text-[#C4BBA3] shadow-2xl text-[11px] sm:text-xs">
              <p className="text-[#FAF5EF]">BIOS Date: 08/16/2026 00:00:00</p>
              <p>CPU: Quantum Diplomatic Core @ 4.80GHz [OK]</p>
              <p>RAM: 32768MB High-Speed Logic Buffer [OK]</p>
              <p>Security: 256-Bit SSL Diplomatic Gateway [ACTIVE]</p>
              <p>Network: 13 Northern Subcontinent Regional Hubs [ONLINE]</p>
              <p className="text-[#D4AF37]">Loading Aastitva Desktop Environment...</p>
            </div>

            {/* Boot Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-2.5 rounded-full bg-[#16203B] overflow-hidden border border-[#D4AF37]/30">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF5DC] to-[#D4AF37] transition-all duration-150 shadow-[0_0_12px_#D4AF37]"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#C4BBA3]">
                <span>INITIALIZING SUBSYSTEMS</span>
                <span className="text-[#D4AF37] font-bold">{bootProgress}%</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setBootComplete(true)}
                className="text-[11px] text-[#D4AF37] hover:text-[#FAF5EF] underline font-bold px-3 py-1 rounded min-touch"
              >
                Skip Boot Sequence [Enter] ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. OS DESKTOP ENVIRONMENT */}
      <div className="relative flex-1 bg-gradient-to-b from-[#070A14] via-[#0D1427] to-[#050811] overflow-hidden p-3 sm:p-6 flex flex-col justify-between">
        {/* Subtle Desktop Wallpaper Grid & Cosmic Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:36px_36px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#52459E]/20 rounded-full blur-[130px] pointer-events-none" />

        {/* Desktop Central Fused 3D Saturn Celestial Orb & Watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center z-0">
          <div className="w-80 h-80 sm:w-96 sm:h-96 opacity-40">
            <Astitva3DCanvas variant="hero" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#D4AF37] mt-2 opacity-30">AASTITVA ALLIANCE</h2>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C4BBA3] opacity-30">Collapsing the Distance to Existence</p>
        </div>

        {/* DESKTOP SHORTCUT ICONS (Top / Left on mobile vs Left column on desktop) */}
        <div className="relative z-10 flex flex-row sm:flex-col flex-wrap gap-2.5 sm:gap-4 w-full sm:w-fit overflow-x-auto pb-2 sm:pb-0">
          {/* Icon 1: Launch Web Homepage */}
          <button
            onDoubleClick={() => onEnterSite('home')}
            onClick={() => onEnterSite('home')}
            className="group flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl bg-[#0D1427]/80 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all w-20 sm:w-24 text-center cursor-pointer shadow-lg backdrop-blur-md shrink-0"
          >
            <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B89220] text-[#070A14] shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold text-[#FAF5EF] group-hover:text-[#D4AF37] leading-tight">
              ENTER SITE
            </span>
          </button>

          {/* Icon 2: Summit Window */}
          <button
            onDoubleClick={() => bringToFront('summit')}
            onClick={() => bringToFront('summit')}
            className="group flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl bg-[#0D1427]/80 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all w-20 sm:w-24 text-center cursor-pointer shadow-lg backdrop-blur-md shrink-0"
          >
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xl group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#C4BBA3] group-hover:text-[#D4AF37] leading-tight">
              Summit 2026
            </span>
          </button>

          {/* Icon 3: Founder & About Chronicle */}
          <button
            onDoubleClick={() => bringToFront('founder')}
            onClick={() => bringToFront('founder')}
            className="group flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl bg-[#0D1427]/80 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all w-20 sm:w-24 text-center cursor-pointer shadow-lg backdrop-blur-md shrink-0"
          >
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xl group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#C4BBA3] group-hover:text-[#D4AF37] leading-tight">
              About/Founder
            </span>
          </button>

          {/* Icon 4: Regional Map */}
          <button
            onDoubleClick={() => bringToFront('map')}
            onClick={() => bringToFront('map')}
            className="group flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl bg-[#0D1427]/80 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all w-20 sm:w-24 text-center cursor-pointer shadow-lg backdrop-blur-md shrink-0"
          >
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xl group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#C4BBA3] group-hover:text-[#D4AF37] leading-tight">
              Network Map
            </span>
          </button>

          {/* Icon 5: Terminal */}
          <button
            onDoubleClick={() => bringToFront('terminal')}
            onClick={() => bringToFront('terminal')}
            className="group flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl bg-[#0D1427]/80 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all w-20 sm:w-24 text-center cursor-pointer shadow-lg backdrop-blur-md shrink-0"
          >
            <div className="p-2.5 sm:p-3 rounded-2xl bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xl group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold text-[#C4BBA3] group-hover:text-[#D4AF37] leading-tight">
              Terminal
            </span>
          </button>
        </div>

        {/* 3. RETRO-MODERN RESPONSIVE WINDOWS (Centered and perfectly aligned on all screens) */}

        {/* WINDOW 1: AEQUITAS SUMMIT 2026 */}
        {windows.summit.isOpen && !windows.summit.isMinimized && (
          <div
            onClick={() => bringToFront('summit')}
            style={{ zIndex: windows.summit.zIndex }}
            className={`fixed sm:absolute inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-16 sm:top-10 max-w-2xl w-auto sm:w-[640px] max-h-[72vh] sm:max-h-[80vh] rounded-3xl bg-[#0D1427]/95 border-2 border-[#D4AF37]/65 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden transition-all font-sans ${
              activeWindowId === 'summit' ? 'ring-2 ring-[#D4AF37]/50' : 'opacity-90'
            }`}
          >
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#16203B] to-[#0D1427] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] truncate">
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">Aequitas_Summit_2026.exe</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize('summit');
                  }}
                  className="p-1 rounded hover:bg-[#16203B] text-[#C4BBA3]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow('summit');
                  }}
                  className="p-1 rounded hover:bg-rose-950 text-rose-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-left overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between gap-3 flex-wrap pb-2 border-b border-[#D4AF37]/20">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider">
                    Official Partnered Summit
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold gold-gradient-text mt-1">
                    {INITIAL_SUMMIT_CONFIG.name}
                  </h3>
                </div>
                <button
                  onClick={() => onEnterSite('summit')}
                  className="px-4 py-2 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <span>Open Full Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-[#C4BBA3] leading-relaxed font-jakarta">
                {INITIAL_SUMMIT_CONFIG.tagline} Partnered exclusively with <strong>{INITIAL_SUMMIT_CONFIG.partnerSchool}</strong>.
              </p>

              {/* Committee Roster */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Debate Committees Roster
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COMMITTEES.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-[#070A14]/80 border border-[#D4AF37]/25 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FAF5EF]">{c.code}</span>
                        <span className="text-[10px] text-[#D4AF37] font-mono">{c.seats} Seats</span>
                      </div>
                      <p className="text-[10px] text-[#C4BBA3] line-clamp-1 italic">"{c.agenda}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 flex-wrap border-t border-[#D4AF37]/20">
                <button
                  onClick={() => onOpenRegister && onOpenRegister()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#070A14] font-extrabold text-xs shadow-lg"
                >
                  Quick Register Delegate Seat ✦
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 2: FOUNDER & ABOUT CHRONICLE */}
        {windows.founder.isOpen && !windows.founder.isMinimized && (
          <div
            onClick={() => bringToFront('founder')}
            style={{ zIndex: windows.founder.zIndex }}
            className={`fixed sm:absolute inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-16 sm:top-14 max-w-2xl w-auto sm:w-[640px] max-h-[72vh] sm:max-h-[80vh] rounded-3xl bg-[#0D1427]/95 border-2 border-[#D4AF37]/65 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden transition-all font-sans ${
              activeWindowId === 'founder' ? 'ring-2 ring-[#D4AF37]/50' : 'opacity-90'
            }`}
          >
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#16203B] to-[#0D1427] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] truncate">
                <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">About_Founder_Chronicle.sys</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize('founder');
                  }}
                  className="p-1 rounded hover:bg-[#16203B] text-[#C4BBA3]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow('founder');
                  }}
                  className="p-1 rounded hover:bg-rose-950 text-rose-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-left overflow-y-auto custom-scrollbar font-jakarta">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-bold block">
                The Philosophy of Existence
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF5EF]">
                "Collapsing the distance between ideas and full existence."
              </h3>
              <p className="text-xs text-[#C4BBA3] leading-relaxed">
                Aastitva translates to existence, the state of truly being, fully and completely. We exist to give events and the people behind them the infrastructure to become fully what they were always meant to be.
              </p>

              <div className="p-4 rounded-xl bg-[#070A14]/80 border-l-4 border-[#D4AF37] text-xs space-y-1">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase">The Conscience of Aastitva</span>
                <p className="italic text-[#FAF5EF]">
                  "Existence isn't a privilege reserved for the schools that can already afford it. It should be something every student gets a chance at."
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-[#D4AF37]/20">
                <button
                  onClick={() => onEnterSite('about')}
                  className="px-5 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg flex items-center gap-1.5"
                >
                  <span>Read Full Chronicle (8 Chapters)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 3: REGIONAL NETWORK MATRIX */}
        {windows.map.isOpen && !windows.map.isMinimized && (
          <div
            onClick={() => bringToFront('map')}
            style={{ zIndex: windows.map.zIndex }}
            className={`fixed sm:absolute inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-16 sm:top-14 max-w-2xl w-auto sm:w-[640px] max-h-[72vh] sm:max-h-[80vh] rounded-3xl bg-[#0D1427]/95 border-2 border-[#D4AF37]/65 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden transition-all font-sans ${
              activeWindowId === 'map' ? 'ring-2 ring-[#D4AF37]/50' : 'opacity-90'
            }`}
          >
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#16203B] to-[#0D1427] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] truncate">
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">Regional_Network_Matrix.map</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMinimize('map');
                  }}
                  className="p-1 rounded hover:bg-[#16203B] text-[#C4BBA3]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow('map');
                  }}
                  className="p-1 rounded hover:bg-rose-950 text-rose-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 text-left overflow-y-auto custom-scrollbar font-jakarta">
              <h3 className="text-xl font-serif font-bold text-[#FAF5EF]">
                13 Interconnected Regional Hubs
              </h3>
              <p className="text-xs text-[#C4BBA3] leading-relaxed">
                Beyond Jammu, professional alliances established across Delhi, Pune, Jaipur, Abohar (Rajasthan), Haryana, Dehradun (Uttarakhand), Amritsar, Ludhiana (Punjab), Kashmir, Chandigarh, Meerut (UP), and Himachal Pradesh.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Jammu', 'Kashmir', 'Himachal Pradesh', 'Amritsar', 'Ludhiana', 'Chandigarh', 'Abohar', 'Dehradun', 'Haryana', 'Delhi', 'Meerut', 'Jaipur', 'Pune'].map((city) => (
                  <span
                    key={city}
                    className="px-2.5 py-1 rounded-lg bg-[#070A14] border border-[#D4AF37]/35 text-[#D4AF37] text-xs font-semibold"
                  >
                    • {city}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-[#D4AF37]/20">
                <button
                  onClick={() => onEnterSite('about')}
                  className="px-5 py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-lg flex items-center gap-1.5"
                >
                  <span>Explore Interactive Map on Site</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 4: CLI TERMINAL */}
        {windows.terminal.isOpen && !windows.terminal.isMinimized && (
          <div
            onClick={() => bringToFront('terminal')}
            style={{ zIndex: windows.terminal.zIndex }}
            className={`fixed sm:absolute inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-16 sm:top-14 max-w-xl w-auto sm:w-[580px] max-h-[70vh] rounded-3xl bg-[#050811]/98 border-2 border-[#D4AF37]/65 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden transition-all font-mono ${
              activeWindowId === 'terminal' ? 'ring-2 ring-[#D4AF37]/50' : 'opacity-90'
            }`}
          >
            <div className="px-4 py-2.5 bg-[#0D1427] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37] truncate">
                <Terminal className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">Astitva_Terminal.sh</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow('terminal');
                  }}
                  className="p-1 rounded hover:bg-rose-950 text-rose-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3 text-xs text-left overflow-y-auto custom-scrollbar flex-1">
              {terminalHistory.map((item, idx) => (
                <p
                  key={idx}
                  className={`leading-relaxed ${
                    item.type === 'cmd'
                      ? 'text-[#FAF5EF] font-bold'
                      : item.type === 'sys'
                      ? 'text-[#D4AF37]'
                      : 'text-emerald-400'
                  }`}
                >
                  {item.text}
                </p>
              ))}

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-[#16203B]">
                <span className="text-[#D4AF37] font-bold">{'>'}</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type command (help, summit, about, enter)..."
                  className="flex-1 bg-transparent text-[#FAF5EF] focus:outline-none placeholder-[#C4BBA3]/40 text-xs"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </div>

      {/* 4. RETRO-MODERN RESPONSIVE TASKBAR (Bottom OS Bar) */}
      <div className="relative z-50 h-14 bg-gradient-to-r from-[#070A14] via-[#0D1427] to-[#070A14] border-t-2 border-[#D4AF37]/45 px-3 sm:px-6 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Left: START Menu Button */}
        <div className="relative">
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 transition-all min-touch ${
              startMenuOpen
                ? 'bg-[#D4AF37] text-[#070A14] shadow-[0_0_15px_rgba(212,175,55,0.8)] scale-105'
                : 'bg-gradient-to-r from-[#16203B] to-[#0D1427] text-[#FAF5EF] border border-[#D4AF37]/50 hover:border-[#D4AF37]'
            }`}
          >
            <AstitvaLogo size="sm" variant="mark-only" showSubtitle={false} />
            <span className="hidden xs:inline">START</span>
          </button>

          {/* START MENU POPUP */}
          {startMenuOpen && (
            <div className="absolute bottom-14 left-0 w-72 sm:w-80 rounded-2xl bg-[#0D1427]/98 border-2 border-[#D4AF37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-4 space-y-3 backdrop-blur-2xl animate-page-enter font-sans text-left z-50">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D4AF37]/30">
                <AstitvaLogo size="md" variant="mark-only" showSubtitle={false} />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#FAF5EF]">Aastitva Alliance</h4>
                  <span className="text-[10px] text-[#D4AF37] font-mono">Academic OS v2.4.0</span>
                </div>
              </div>

              <div className="space-y-1 text-xs max-h-64 overflow-y-auto custom-scrollbar">
                {[
                  { page: 'home', label: '🏠 Homepage (Main Portal)' },
                  { page: 'summit', label: '🌐 Live Summit (Aequitas 2026)' },
                  { page: 'about', label: '📜 About & Founder (The Chronicle)' },
                  { page: 'offerings', label: '💼 Core Offerings & Directorship' },
                  { page: 'how-it-works', label: '⚙️ How It Works (6-Stage Pipeline)' },
                  { page: 'sponsors', label: '🤝 Sponsors & Partners' },
                  { page: 'faq', label: '❓ Frequently Asked Questions' },
                ].map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      setStartMenuOpen(false);
                      onEnterSite(item.page as Page);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-[#C4BBA3] hover:text-[#FAF5EF] hover:bg-[#16203B] hover:border hover:border-[#D4AF37]/40 flex items-center justify-between transition-all"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#D4AF37]/20">
                <button
                  onClick={() => onEnterSite('home')}
                  className="w-full py-2.5 rounded-xl shimmer-btn text-[#070A14] font-bold text-xs shadow-md"
                >
                  🚀 Launch Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Center: Running Task Tabs */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto">
          {Object.values(windows).map((win) => {
            const IconComp = win.icon;
            if (!win.isOpen) return null;

            return (
              <button
                key={win.id}
                onClick={() => bringToFront(win.id)}
                className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
                  activeWindowId === win.id && !win.isMinimized
                    ? 'bg-[#16203B] text-[#D4AF37] border border-[#D4AF37]/60 font-bold shadow-md'
                    : 'bg-[#070A14]/80 text-[#C4BBA3] border border-[#243563]/40 hover:text-[#FAF5EF]'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px]">{win.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right: System Tray & Direct Website Launch Pill */}
        <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2 text-[#C4BBA3] text-[11px]">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{timeString}</span>
          </div>

          <button
            onClick={() => onEnterSite('home')}
            className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89220] text-[#070A14] font-extrabold text-xs shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 min-touch"
          >
            <span>ENTER SITE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
