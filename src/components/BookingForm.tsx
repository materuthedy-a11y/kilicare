'use client';

import { FormEvent, useState } from 'react';

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
  }

  if (sent) return <div className="booking-done" role="status" aria-live="polite"><h3>Asante sana.</h3><p>Your trip enquiry is ready. This preview does not send or store it yet; connect the booking form to the Kilicare team before launch.</p><button className="reset-form" type="button" onClick={() => setSent(false)}>Send another enquiry</button></div>;

  return <form className="booking-form" onSubmit={handleSubmit}>
    <label>Your name<input name="name" autoComplete="name" placeholder="e.g. Amani Mushi" required /></label>
    <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
    <div className="form-row"><label>When are you thinking?<input type="month" name="month" /></label><label>Your kind of trip<select name="trip" defaultValue=""><option value="" disabled>Choose a trip</option><option>Kilimanjaro climb</option><option>Wildlife safari</option><option>Zanzibar escape</option><option>A little of everything</option></select></label></div>
    <button type="submit" className="submit-button">Plan my trip <span>↗</span></button>
    <small className="form-footnote">A quick preview only. Your enquiry will not be sent or saved yet.</small>
  </form>;
}
