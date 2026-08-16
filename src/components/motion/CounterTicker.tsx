import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // seconds, default 1.8
  className?: string;
  decimals?: number;
}

/**
 * CounterTicker
 * Smoothly animates numbers upwards when scrolled into view.
 */
export const CounterTicker: React.FC<Props> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className = '',
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const end = value;
      const startTime = performance.now();
      const durationMs = duration * 1000;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        // Ease out expo curve: 1 - Math.pow(2, -10 * progress)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = start + (end - start) * easeProgress;

        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(end);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  const formattedNumber = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={`inline-block tabular-nums font-mono ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
