import { Logo } from "./Brand";

/**
 * Page-load preloader, about 12s of kinetic type (paced so every word can be read), then a shutter reveal:
 *   0.4–5.9s   the products, one at a time, in huge type: Flights, Hotels, Holidays, Transfers, Payments
 *   5.9–8s     "One platform. Your brand."
 *   8–9.6s     the Elyra logo
 *   9.7–12s    the screen splits into six shutters that lift one after another onto the page
 * Corners carry the brand, a label, "Loading" and a 0–100 counter over a filling hairline.
 * Everything moves with transform and opacity only, so it stays smooth on phones.
 *
 * It is pure CSS, so it never waits on a script. The inline script in app/layout.tsx shows it
 * on every full page load, reloads included (not on in-site navigation, where the layout stays
 * mounted), never with reduced motion: "pl-on" shows it and locks scrolling, "pl-hold" keeps the page's own
 * entrances paused until the shutters lift (resuming, not delaying, so nothing jumps).
 * Without that script it never shows. The timings match the keyframes in globals.css ("PRELOADER").
 */
const OPEN_MS = 10121;
const DONE_MS = 12000;

const products = ["Flights", "Hotels", "Holidays", "Transfers", "Payments"];
const SHUTTERS = 6;

export const preloaderScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("pl-on","pl-hold");setTimeout(function(){d.classList.remove("pl-hold")},${OPEN_MS});setTimeout(function(){d.classList.remove("pl-on");dispatchEvent(new Event("elyra:preloaded"))},${DONE_MS})}catch(e){}})()`;

const vars = (v: Record<string, number>) => v as React.CSSProperties;

export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="pl-shutters">
        {Array.from({ length: SHUTTERS }, (_, i) => <span key={i} style={vars({ "--i": i })} />)}
      </div>
      <div className="pl-ui">
        <span className="pl-glow" />
        <div className="pl-corners mono">
          <span>Elyra</span>
          <span>Travel booking software</span>
          <span className="pl-loading">Loading<i>.</i><i>.</i><i>.</i></span>
          <span className="pl-count" />
          <span className="pl-line" />
        </div>
        <div className="pl-center">
          <p className="pl-words">
            {products.map((w, i) => <span key={w} style={vars({ "--i": i })}>{w}.</span>)}
          </p>
          <p className="pl-pitch">
            <span className="pl-l"><span>One platform.</span></span>
            <span className="pl-l"><em>Your brand.</em></span>
          </p>
          <p className="pl-brand">
            <span className="pl-l"><span><Logo /></span></span>
          </p>
        </div>
      </div>
    </div>
  );
}
