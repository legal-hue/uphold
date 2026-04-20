"use client";

import { useState, useEffect } from "react";

function AnimatedCounter({ target }: { target: string }) {
  const [displayed, setDisplayed] = useState("0");
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const duration = 1500;
    const steps = 30;
    const increment = num / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplayed(target);
        clearInterval(timer);
      } else {
        if (target.includes("m")) setDisplayed(current.toFixed(1) + "m");
        else if (target.includes(",")) setDisplayed(Math.round(current).toLocaleString());
        else setDisplayed(Math.round(current).toString());
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{displayed}</span>;
}

export function SocialProofBar() {
  return (
    <section className="bg-uphold-neutral-800 text-white py-8">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl md:text-3xl font-bold text-uphold-green-500">
            <AnimatedCounter target="515,000" />
          </div>
          <div className="text-xs md:text-sm text-uphold-neutral-400 mt-1">waiting for tribunal</div>
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-uphold-green-500">
            <AnimatedCounter target="12.4m" />
          </div>
          <div className="text-xs md:text-sm text-uphold-neutral-400 mt-1">workers affected yearly</div>
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold text-uphold-green-500">
            1 in 3
          </div>
          <div className="text-xs md:text-sm text-uphold-neutral-400 mt-1">go to tribunal alone</div>
        </div>
      </div>
    </section>
  );
}
