// Runs inline in <head> before first paint and decides whether the intro
// plays, by setting <html data-intro="play" | "skip">. It plays once per tab
// session, never on /lab or with reduced motion; add ?intro to force a replay.
// CSS in index.css shows the loader and hides the navbar logo only on "play".
export const INTRO_SCRIPT = `try{var d=document.documentElement,q=/[?&]intro\\b/.test(location.search),l=location.pathname.indexOf('/lab')===0,r=matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=!l&&(q||(!r&&!sessionStorage.getItem('pp-intro')))?'play':'skip'}catch(e){document.documentElement.dataset.intro='skip'}`;
