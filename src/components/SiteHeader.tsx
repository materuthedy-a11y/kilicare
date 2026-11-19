'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site';

const WhatsAppIcon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3a8.1 8.1 0 1 1 6.6 3.5Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.2-.8l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>;

const links = [
  ['Destinations', '#destinations'], ['Packages', '#packages'], ['About', '#about'], ['Routes', '#routes'], ['FAQs', '#faq'],
];
const trackedSections = ['destinations', 'packages', 'about', 'routes', 'booking', 'faq'];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'SW'>('EN');
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
          <div className="lang-switch">
            <button type="button" className="lang-toggle" aria-haspopup="listbox" aria-expanded={langOpen} onClick={() => setLangOpen((v) => !v)}>{lang}<span aria-hidden="true">▾</span></button>
            {langOpen && <div className="lang-menu" role="listbox" aria-label="Language">
              {(['EN', 'SW'] as const).map((code) => <button type="button" key={code} role="option" aria-selected={lang === code} className={lang === code ? 'is-active' : ''} onClick={() => { setLang(code); setLangOpen(false); }}>{code === 'EN' ? 'English' : 'Kiswahili'}</button>)}
            </div>}
          </div>
          <a className="header-cta" href="#booking">Book your trip <span className="cta-arrow" aria-hidden="true">↗</span></a>
          <a className="wa-link" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"><WhatsAppIcon /></a>
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
      <a className="mobile-wa" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}><WhatsAppIcon /> Chat on WhatsApp</a>
    </div>
    <a className="wa-float" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"><WhatsAppIcon /></a>
  </>;
}
