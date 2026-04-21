import { useEffect, useState } from 'react';
import { siteConfig } from '@/src/config/site';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const { splash, brand } = siteConfig;

  useEffect(() => {
    const startExit = window.setTimeout(() => {
      setIsExiting(true);
    }, splash.exitAfterMs);

    const finish = window.setTimeout(() => {
      onComplete();
    }, splash.completeAfterMs);

    return () => {
      window.clearTimeout(startExit);
      window.clearTimeout(finish);
    };
  }, [onComplete, splash.completeAfterMs, splash.exitAfterMs]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-mocha will-change-transform transition-transform duration-700 ease-in-out motion-reduce:transition-none ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="text-center">
        <p className="text-xs tracking-[8px] uppercase text-caramel/70">{splash.subtitle}</p>
        <h1 className="mt-6 font-serif text-6xl md:text-8xl leading-[0.95] text-latte">
          {brand.splashTitleLine1}
          <span className="block italic text-caramel">{brand.splashTitleLine2}</span>
        </h1>
      </div>
    </div>
  );
}
