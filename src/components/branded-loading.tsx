import { useEffect, useState } from "react";
import loadingSymbol from "@/assets/ramon-loading-symbol.png";

export function BrandedLoading() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    setStarted(true);
    const timer = window.setTimeout(() => setFinished(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);
  if (finished) return null;
  return <div aria-hidden="true" data-started={started} className="branded-loading pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-brand-surface"><img src={loadingSymbol} alt="" width={979} height={883} className="branded-loading-symbol w-40 max-w-[50%]" /></div>;
}