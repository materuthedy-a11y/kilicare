'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { destinations } from '@/data/site';

const N = destinations.length;
const STEP = 360 / N;
const DURATION = 5200;
const pad = (n: number) => String(n).padStart(2, '0');

export default function DestinationOrbit() {
  const [idx, setIdx] = useState(0);
  const [tick, setTick] = useState(0);
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef(0);
  const anim = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const busy = useRef(false);
  const reduce = useRef(false);

  const active = destinations[idx];

  const place = () => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const w = orbit.clientWidth, h = orbit.clientHeight;
    const vw = window.innerWidth;
    const radius = w * (vw <= 1000 ? 0.4 : vw < 1400 ? 0.37 : 0.4);
    orbRefs.current.forEach((el, j) => {
      if (!el) return;
      let a = ((j - pos.current) * -STEP) % 360;
      if (a > 180) a -= 360;
      if (a < -180) a += 360;
      const r = (a * Math.PI) / 180;
      const z = (Math.cos(r) + 1) / 2;
      const scale = 0.3 + 0.7 * Math.pow(z, 3.2);
      const x = Math.sin(r) * radius;
      const y = (1 - z) * h * 0.24;
      el.style.transform = `translate(${x.toFixed(1)}px, calc(-50% + ${y.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
      el.style.zIndex = String(Math.round(z * 100));
      el.style.opacity = String(Math.min(1, Math.max(0, (z - 0.12) * 3)).toFixed(3));
      el.classList.toggle('is-front', j === idx);
    });
  };

  const go = (i: number, dir = 1) => {
    i = ((i % N) + N) % N;
    if (i === idx || busy.current) return;
    let delta = dir ? dir * ((((dir > 0 ? i - idx : idx - i) % N) + N) % N) : ((((i - idx + N + Math.floor(N / 2)) % N) - Math.floor(N / 2)) || i - idx);
    if (!delta) delta = dir;
    const from = pos.current, to = pos.current + delta;
    const target = i;
    setIdx(target);
    if (reduce.current) { pos.current = to; place(); return; }
    busy.current = true;
    const t0 = performance.now(), dur = 1100;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const frame = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      pos.current = from + (to - from) * ease(k);
      place();
      if (k < 1) anim.current = requestAnimationFrame(frame);
      else busy.current = false;
    };
    cancelAnimationFrame(anim.current);
    anim.current = requestAnimationFrame(frame);
  };

  const restart = () => {
    clearTimeout(timer.current);
    if (reduce.current) return;
    setTick((t) => t + 1);
    timer.current = setTimeout(() => { go(idx + 1, 1); restart(); }, DURATION);
  };

  useEffect(() => {
    reduce.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    place();
    restart();
    const ro = new ResizeObserver(place);
    if (orbitRef.current) ro.observe(orbitRef.current);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { go(idx + 1, 1); restart(); }
      if (e.key === 'ArrowLeft') { go(idx - 1, -1); restart(); }
    };
    const section = orbitRef.current?.closest('section');
    const stop = () => clearTimeout(timer.current);
    const onVis = () => (document.hidden ? stop() : restart());
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVis);
    section?.addEventListener('pointerenter', stop);
    section?.addEventListener('pointerleave', restart);
    return () => {
      ro.disconnect();
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVis);
      section?.removeEventListener('pointerenter', stop);
      section?.removeEventListener('pointerleave', restart);
      clearTimeout(timer.current);
      cancelAnimationFrame(anim.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { place(); }, [idx]);

  return <section className="orbit-section" id="destinations">
    <div className="orbit-head">
      <span className="eyebrow eyebrow-light">A whole world in one country</span>
      <h2>Find your kind<br />of wild.</h2>
    </div>

    <div className="orbit-stage">
      <div className="orbit-info">
        <span className="orbit-tag"><i />{active.region} · Tanzania</span>
        <h3>{active.name}</h3>
        <p>{active.detail}</p>
        <a className="orbit-cta" href="#booking">Plan this trip <span aria-hidden="true">↗</span></a>
      </div>

      <div className="orbit-ring" ref={orbitRef} aria-label="Tanzania destinations">
        {destinations.map((d, j) => <div className="dorbit" key={d.name} ref={(el) => { orbRefs.current[j] = el; }} aria-hidden={j !== idx} tabIndex={j === idx ? 0 : -1}>
          <div className="dorbit-in">
            <Image src={`/img/destinations/${d.image}.webp`} alt={j === idx ? `${d.name}, ${d.region}` : ''} width={220} height={220} sizes="(max-width: 1000px) 40vw, 22vw" />
            <span className="dorbit-name">{d.name}</span>
          </div>
          <div className="dorbit-info"><strong>{d.name}</strong><span>{d.region} · {d.detail}</span></div>
        </div>)}
      </div>

      <div className="orbit-buy">
        <span className="orbit-label">Selected</span>
        <strong>{active.name}</strong>
        <span className="orbit-detail">{active.detail}</span>
        <div className="orbit-sizes" role="radiogroup" aria-label="Choose destination">
          {destinations.map((d, j) => <button key={d.name} role="radio" aria-checked={j === idx} aria-label={d.name} onClick={() => { go(j, j > idx ? 1 : -1); restart(); }}>{pad(j + 1)}</button>)}
        </div>
      </div>
    </div>

    <div className="orbit-bottom">
      <div className="orbit-arrows">
        <button type="button" aria-label="Previous destination" onClick={() => { go(idx - 1, -1); restart(); }}>←</button>
        <button type="button" aria-label="Next destination" onClick={() => { go(idx + 1, 1); restart(); }}>→</button>
      </div>
      <p className="orbit-motto">From the roof of Africa to the quiet blue of the Indian Ocean.</p>
      <div className="orbit-count" aria-live="polite">
        <span className="orbit-count-name">{active.name}</span>
        <div className="orbit-count-row"><b>{pad(idx + 1)}</b><span className="orbit-timebar" aria-hidden="true"><i key={tick} /></span><span>{pad(N)}</span></div>
      </div>
    </div>
  </section>;
}
