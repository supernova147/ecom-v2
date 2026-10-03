import { useMemo, useSyncExternalStore } from 'react';
const KEY = 'aurion-builds-v1';
const EVENT = 'aurion-builds-changed';
const empty = '[]';
function snapshot() { try { return localStorage.getItem(KEY) || empty; } catch { return empty; } }
function subscribe(callback) {
  const storage = (event) => { if (event.key === KEY) callback(); };
  window.addEventListener('storage', storage);
  window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener('storage', storage); window.removeEventListener(EVENT, callback); };
}
export function useBuilds() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => empty);
  const builds = useMemo(() => {
    try { const value = JSON.parse(raw); return Array.isArray(value) ? value.filter((build) => build && typeof build.id === 'string') : []; } catch { return []; }
  }, [raw]);
  function write(next) {
    try { localStorage.setItem(KEY, JSON.stringify(next)); window.dispatchEvent(new Event(EVENT)); return true; } catch { return false; }
  }
  return { builds, save: (build) => write([build, ...builds.filter((item) => item.id !== build.id)].slice(0, 12)), remove: (id) => write(builds.filter((item) => item.id !== id)) };
}
