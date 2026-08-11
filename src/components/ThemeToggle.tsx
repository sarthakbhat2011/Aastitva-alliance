import React from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', variant = 'full' }) => {
  const { theme, setTheme } = useTheme();

  const options: { id: ThemeMode; label: string; icon: React.ReactNode; tooltip: string }[] = [
    {
      id: 'original',
      label: 'Original',
      icon: <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />,
      tooltip: 'Original Obsidian Gold Aesthetic',
    },
    {
      id: 'light',
      label: 'Light',
      icon: <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EAB308]" />,
      tooltip: 'Executive Light Mode',
    },
    {
      id: 'dark',
      label: 'Dark',
      icon: <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A855F7]" />,
      tooltip: 'Pitch Midnight Dark Mode',
    },
  ];

  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-xl bg-var-nav-bg border border-var-border backdrop-blur-md shadow-sm transition-all duration-300 ${className}`}
      aria-label="Theme Selector"
      role="region"
    >
      {options.map((opt) => {
        const isActive = theme === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            title={opt.tooltip}
            className={`flex items-center gap-1 px-1.5 py-1 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 ${
              isActive
                ? 'bg-gradient-to-r from-[#16203B] to-[#243563] text-[#FAF5EF] border border-[#D4AF37]/50 shadow-[0_2px_10px_rgba(212,175,55,0.25)] scale-[1.02]'
                : 'text-var-text-muted hover:text-var-text-primary hover:bg-white/5'
            }`}
          >
            {opt.icon}
            {variant === 'full' && (
              <span className="font-medium tracking-wide text-[10px] sm:text-xs">
                {opt.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
