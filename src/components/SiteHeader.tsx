'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';

const links = [
  ['Destinations', '#destinations'], ['Packages', '#packages'], ['About', '#about'], ['Routes', '#routes'], ['FAQs', '#faq'],
];
const trackedSections = ['destinations', 'packages', 'about', 'routes', 'booking', 'faq'];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const progress = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 200 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y <= 200) setHidden(false);
      lastY.current = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-35% 0px -55% 0px' });
    trackedSections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });

    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>('a')?.focus();
  }, [open]);

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Tab' || !menuRef.current) return;
    const focusables = [...menuRef.current.querySelectorAll<HTMLElement>('a[href]')];
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 767) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${hidden ? ' is-hidden' : ''}`}>
      <div className="header-bar">
        <a href="#top" className="brand" aria-label="Kilicare Adventure home"><Image className="brand-mark" src="/kilicare-logo.png" alt="" width={34} height={34} priority /><span className="brand-word">Kilicare<span className="brand-dot">.</span></span></a>
        <nav className="main-nav" aria-label="Main">
          {links.map(([label, href]) => <a href={href} key={label} className={active === href.slice(1) ? 'is-active' : ''}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-cta" href="#booking">Book your trip <span className="cta-arrow" aria-hidden="true">↗</span></a>
          <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true"><i ref={progress} /></div>
    </header>
    <div className={`mobile-menu${open ? ' is-open' : ''}`} id="mobile-menu" aria-hidden={!open} ref={menuRef} onKeyDown={onMenuKeyDown} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
      <nav aria-label="Mobile navigation">
        {links.map(([label, href], index) => <a href={href} key={label} style={{ '--i': index } as CSSProperties} onClick={closeMenu}>{label}</a>)}
      </nav>
      <a className="mobile-cta" href="#booking" onClick={closeMenu}>Book your trip <span aria-hidden="true">↗</span></a>
    </div>
  </>;
}
