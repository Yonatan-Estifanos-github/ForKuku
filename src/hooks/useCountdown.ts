import { useState, useEffect } from 'react';

// COUNTDOWN TARGET: September 4, 2026 at 12:00 PM EDT
const TARGET_DATE = new Date('2026-09-04T12:00:00-04:00');

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function calculateTimeRemaining(): TimeRemaining {
  const now = new Date().getTime();
  const target = TARGET_DATE.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isComplete: false };
}

export function useCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeRemaining, mounted };
}

export const formatNumber = (num: number): string => num.toString().padStart(2, '0');
