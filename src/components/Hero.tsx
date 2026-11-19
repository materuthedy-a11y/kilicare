'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const MOUNTAIN_BLUR = 'data:image/webp;base64,UklGRsoAAABXRUJQVlA4IL4AAACwBACdASogABAAPu1orU2ppqSiMAgBMB2JZACsAYtgtlmq19h38HaZdvVKGhQAAP7+iMdHq/hW5nnqLEqfhffjxupbsijf5crgfSXWkVuf7UVaVqN4oo9Se2NI+bK9OmKZy0yMFid0Tj3njYkPmJOTuNPSiPOf6BuzvO4aDALGbAk4vnz+igE8w5LNpxZRkn9JPpUQbBinrsr0W3f5asDfvWtdWg5xfpflh1YIHW6gyYUVjmVLLG++CVjqnUAA';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const mountain = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    let context: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled || !section.isConnected) return;
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const vh = window.innerHeight;
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${window.innerHeight * 1.7}`, scrub: 1, invalidateOnRefresh: true },
        });
        timeline.to(intro.current, { opacity: 0, y: -40, duration: 0.35 }, 0)
          .to(photo.current, { scale: 1.12, duration: 1 }, 0)
          .to(mountain.current, { y: -vh * 0.17, scaleX: 1.45, scaleY: 1.1, transformOrigin: '50% 100%', duration: 1 }, 0)
          .to(word.current, { y: vh * 0.3, scale: 0.85, duration: 1 }, 0)
          .to(word.current, { opacity: 0, duration: 0.3 }, 0.7)
          .to(shade.current, { opacity: 0.82, duration: 0.8 }, 0.1);
      });
      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(intro.current, { opacity: 0 });
        gsap.set(mountain.current, { y: -window.innerHeight * 0.17, scaleX: 1.45, scaleY: 1.1, transformOrigin: '50% 100%' });
        gsap.set(word.current, { y: window.innerHeight * 0.3, scale: 0.85, opacity: 0 });
        gsap.set(shade.current, { opacity: 0.82 });
        if (meter.current) meter.current.textContent = '5,895 m';
      });
      return () => media.revert();
      }, section);
    })();
    return () => { cancelled = true; context?.revert(); };
  }, []);

  return <section ref={root} className="hero" aria-label="Kilicare Adventure">
    <div className="hero-pin">
      <div className="hero-top-fade" aria-hidden="true" />
      <div className="hero-photo" ref={photo} aria-hidden="true" />
      <div className="hero-sky-wash" aria-hidden="true" />
      <h1 ref={word} className="hero-word" aria-hidden="true">KILICARE</h1>
      <div className="hero-mountain" ref={mountain} aria-hidden="true"><Image src="/img/hero/snow-capped-mountain.webp" alt="" fill priority quality={80} placeholder="blur" blurDataURL={MOUNTAIN_BLUR} sizes="100vw" className="hero-mountain-image" /></div>
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-shade" ref={shade} />
      <div className="hero-intro" ref={intro}><span className="hero-tag"><i /> Karibu Kilicare</span><p>Climb higher.<br />Wander further.</p><a className="hero-button" href="#destinations">Explore Tanzania <span>↘</span></a></div>
      <div className="hero-elevation"><small>ELEVATION</small><span ref={meter}>5,895 m</span><i /></div>
      <nav className="hero-destination-nav" aria-label="Explore Tanzania destinations">
        <a className="hero-destination-link" href="#destinations" title="Photo by Halidtz, Wikimedia Commons, CC BY-SA 4.0"><Image src="/img/destinations/materuni-waterfalls.webp" alt="" width={160} height={160} /><span>Materuni</span></a>
        <a className="hero-destination-link" href="#routes"><Image src="/img/destinations/kilimanjaro.webp" alt="" width={160} height={160} /><span>Kilimanjaro</span></a>
        <a className="hero-destination-link" href="#destinations"><Image src="/img/destinations/serengeti.webp" alt="" width={160} height={160} /><span>Serengeti</span></a>
      </nav>
      <div className="hero-bottom-label"><span>TANZANIA, EAST AFRICA</span><span>03°04′ S &nbsp; 37°21′ E</span></div>
    </div>
  </section>;
}
