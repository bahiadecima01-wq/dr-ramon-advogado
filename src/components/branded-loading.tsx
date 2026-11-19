import { useEffect, useState } from "react";
import officialLogo from "@/assets/ramon-alves-logo-oficial.png";

export function BrandedLoading() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const finish = () => setReady(true);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    // Safety limit only: real readiness normally dismisses the screen immediately.
    const safety = window.setTimeout(finish, 6000);
    return () => { window.removeEventListener("load", finish); window.clearTimeout(safety); };
  }, []);
  return <div aria-hidden="true" data-ready={ready} className="branded-loading pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-brand-surface"><img src={officialLogo} alt="" width={387} height={173} className="w-60 max-w-[70%] animate-in fade-in duration-500" /></div>;
}