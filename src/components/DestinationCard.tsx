'use client';

import { useRef } from 'react';
import type { PointerEvent } from 'react';

type Props = {
  href: string;
  className: string;
  style: React.CSSProperties;
  index: number;
  region: string;
  detail: string;
  name: string;
  badge?: string;
};

export default function DestinationCard({ href, className, style, index, region, detail, name, badge }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-5px)`;
  };

  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  return <a ref={ref} className={`destination-card ${className}`} href={href} style={style}
    onPointerMove={onMove} onPointerLeave={onLeave}>
    <span className="card-index">0{index + 1} / {region}</span>
    <div className="destination-copy"><span>{detail}</span><h3>{name}</h3><span className="card-arrow" aria-hidden="true">↗</span></div>
    {badge && <span className="card-badge">{badge}</span>}
  </a>;
}
