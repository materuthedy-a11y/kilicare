import Hero from '@/components/Hero';
import SiteHeader from '@/components/SiteHeader';
import RouteExplorer from '@/components/RouteExplorer';
import BookingForm from '@/components/BookingForm';
import DestinationOrbit from '@/components/DestinationOrbit';
import Image from 'next/image';
import { packages, reasons, steps, reviews, gallery, faqs, stats } from '@/data/site';

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <div className="cover">
        <DestinationOrbit />

        <section className="section packages" id="packages">
          <div className="section-heading"><div><span className="eyebrow">Thoughtfully put together</span><h2>Good journeys<br />start here.</h2></div><p>Small groups, local expertise and the details already taken care of. All you have to do is show up.</p></div>
          <div className="package-grid">{packages.map((item) => <article className={`package-card ${item.featured ? 'package-featured' : ''}`} key={item.name}>
            <div className="package-top"><span className="eyebrow">{item.category}</span>{item.featured && <span className="popular">Most loved</span>}</div><h3>{item.name}</h3><p>{item.description}</p><div className="package-meta"><span>↗ {item.duration}</span><span>↗ {item.level}</span></div><div className="package-bottom"><span>From <strong>{item.price}</strong> <small>/ person</small></span><a href="#booking" aria-label={`Plan ${item.name}`}>↗</a></div>
          </article>)}</div>
        </section>

        <section className="why-section" id="about"><div className="section why-inner"><div><span className="eyebrow eyebrow-light">Made for the moments that matter</span><h2>Come for the view.<br />Leave with a story.</h2><p className="why-lead">We’re a Tanzania-based team who believe the best adventures feel personal. Every trip is led by people who call this place home.</p><a className="text-link" href="#booking">Meet your local crew <span>↗</span></a></div><div className="reason-grid">{reasons.map((reason) => <article key={reason.title}><span className="reason-icon">{reason.icon}</span><h3>{reason.title}</h3><p>{reason.body}</p></article>)}</div></div><div className="stat-row">{stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><p className="sample-data-note">Illustrative sample figures. Replace with verified Kilicare data before launch.</p></section>

        <section className="section steps-section"><div className="section-heading"><div><span className="eyebrow">Easy from the first hello</span><h2>Four steps.<br />One big adventure.</h2></div><p>We take care of the planning together, so the only thing left to do is enjoy where the day takes you.</p></div><div className="steps-grid">{steps.map((step, i) => <article key={step.title}><span className="step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>

        <section className="routes-section" id="routes"><div className="section routes-inner"><div className="routes-intro"><span className="eyebrow eyebrow-light">The mountain is calling</span><h2>Four ways<br />to the top.</h2><p>Every route has its own rhythm. Find the one that feels right for you.</p><div className="route-side-note">UHURU PEAK <span>5,895 M</span></div></div><RouteExplorer /></div></section>

        <section className="section reviews-section"><div className="section-heading"><div><span className="eyebrow">The feeling comes home with you</span><h2>Stories from<br />the summit.</h2></div><span className="sample-note">Sample traveller stories</span></div><div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.name}><span className="stars" aria-label="5 out of 5 stars">★★★★★</span><blockquote>“{review.quote}”</blockquote><div className="review-person"><span className="review-avatar">{review.name.split(' ').map((part) => part[0]).join('')}</span><div><strong>{review.name}</strong><span>{review.trip}</span></div></div></article>)}</div></section>

        <section className="section gallery-section"><div className="section-heading"><div><span className="eyebrow">A little glimpse</span><h2>Out there is<br />something else.</h2></div><p>The early starts, the long lunches, the just-one-more-photo moments.</p></div><div className="gallery-grid">{gallery.map((item) => <figure key={item.src} className={`gallery-item ${item.className}`}><Image fill sizes="(max-width: 680px) 100vw, 33vw" src={item.src} alt={item.alt} /><figcaption>{item.caption}</figcaption></figure>)}</div></section>

        <section className="booking-wrap" id="booking"><div className="booking-panel"><div className="booking-copy"><span className="eyebrow eyebrow-light">Your next chapter starts here</span><h2>Let’s plan<br />something<br /><em>unforgettable.</em></h2><p>Tell us a little about your dream trip. Our local team will help you shape it into something real.</p><div className="booking-note"><span>✳</span> No pressure. Just a good conversation.</div></div><BookingForm /></div></section>

        <section className="section faq-section" id="faq"><div className="faq-intro"><span className="eyebrow">A few good questions</span><h2>Before you<br />head out.</h2><p>Can’t find what you need? <a href="#booking">Ask our team ↗</a></p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></section>
        <footer className="site-footer"><div className="footer-top"><a className="brand brand-footer" href="#top">Kilicare<span>.</span></a><p>Made with love in Tanzania.<br />Shared with the world.</p><a className="footer-cta" href="#booking">Start planning <span>↗</span></a></div><div className="footer-bottom"><span>© 2026 Kilicare Adventure</span><nav aria-label="Footer navigation"><a href="#destinations">Destinations</a><a href="#packages">Packages</a><a href="#routes">Routes</a><a href="#faq">FAQs</a></nav><span>Arusha, Tanzania</span></div></footer>
      </div>
    </main>
  );
}
