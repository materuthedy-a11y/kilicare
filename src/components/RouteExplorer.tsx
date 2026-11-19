'use client';

import { useState } from 'react';
import { routeInfo } from '@/data/site';

export default function RouteExplorer() {
  const [active, setActive] = useState(0);
  const route = routeInfo[active];

  return <div className="route-explorer">
    <div className="route-tabs" role="tablist" aria-label="Kilimanjaro routes">{routeInfo.map((item, index) => <button type="button" role="tab" aria-selected={active === index} aria-controls="route-panel" id={`route-tab-${index}`} key={item.name} onClick={() => setActive(index)}>{item.name}<span>0{index + 1}</span></button>)}</div>
    <div className="route-panel" id="route-panel" role="tabpanel" aria-labelledby={`route-tab-${active}`} key={route.name}>
      <span className="route-overline">THE {route.name.toUpperCase()} ROUTE</span><h3>{route.name}<br />Route</h3><p>{route.description}</p>
      <div className="route-facts"><div><span>Duration</span><strong>{route.days}</strong></div><div><span>Difficulty</span><strong>{route.difficulty}</strong></div><div><span>Summit rate</span><strong>{route.success}</strong></div></div>
      <a className="route-link" href="#booking">Explore this route <span>↗</span></a>
    </div>
  </div>;
}
