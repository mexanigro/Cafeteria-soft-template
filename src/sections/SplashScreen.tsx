import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startExit = window.setTimeout(() => {
      setIsExiting(true);
    }, 1500);

    const finish = window.setTimeout(() => {
      onComplete();
    }, 2100);

    return () => {
      window.clearTimeout(startExit);
      window.clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-mocha transition-transform duration-700 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="text-center">
        <p className="text-xs tracking-[8px] uppercase text-caramel/70">Specialty Coffee</p>
        <h1 className="mt-6 font-serif text-6xl md:text-8xl leading-[0.95] text-latte">
          Aroma
          <span className="block italic text-caramel">Vivo</span>
        </h1>
      </div>
    </div>
  );
}
