export const siteConfig = {
  whatsappNumber: '255XXXXXXXXX',
  whatsappMessage: "Hello Kilicare, I'd like to plan a trip",
  whatsappUrl: `https://wa.me/255XXXXXXXXX?text=${encodeURIComponent("Hello Kilicare, I'd like to plan a trip")}`,
};

export const destinations = [
  { name: 'Kilimanjaro', region: 'Moshi', detail: '5,895 m · 6–9 days', image: 'kilimanjaro' },
  { name: 'Serengeti', region: 'Mara', detail: 'The great migration', image: 'serengeti' },
  { name: 'Zanzibar', region: 'Unguja', detail: 'Indian Ocean · 3–7 days', image: 'zanzibar' },
  { name: 'Ngorongoro', region: 'Arusha', detail: 'A world within a crater', image: 'ngorongoro' },
  { name: 'Tarangire', region: 'Manyara', detail: 'Baobabs & big herds', image: 'tarangire' },
  { name: 'Materuni', region: 'Kilimanaro', detail: 'Waterfalls · day trip', image: 'materuni-waterfalls', badge: 'Hidden gem' },
];

export const packages = [
  { name: 'Machame Climb', category: 'Kilimanjaro', description: 'A beautiful, gradual ascent with time to find your pace.', duration: '7 days', level: 'Challenging', price: '$2,150', featured: true },
  { name: 'Serengeti Safari', category: 'Wildlife', description: 'Golden plains, open skies and wildlife at every turn.', duration: '5 days', level: 'Easy-going', price: '$1,890', featured: false },
  { name: 'Zanzibar Escape', category: 'Island life', description: 'Slow mornings, warm water and nowhere else to be.', duration: '4 days', level: 'Relaxed', price: '$980', featured: false },
];

export const reasons = [
  { icon: '✳', title: 'Local, always', body: 'Our guides grew up here. Their knowledge goes well beyond the map.' },
  { icon: '↗', title: 'Small by design', body: 'A little more room to breathe, connect and travel at your own pace.' },
  { icon: '＋', title: 'Ready for the trail', body: 'Thoughtful preparation, trusted equipment and care at every altitude.' },
  { icon: '◌', title: 'Leave it better', body: 'We work with local communities and tread lightly in wild places.' },
];

export const stats = [
  { value: '12+', label: 'years on the trail' },
  { value: '4.8k', label: 'happy travellers' },
  { value: '94%', label: 'summit success rate' },
  { value: '18', label: 'countries reached' },
];

export const steps = [
  { title: 'Choose your adventure', body: 'Pick a route, safari or island escape. Or let us help you dream it up.' },
  { title: 'Tell us what you love', body: 'A quick chat helps us shape the trip around your pace and interests.' },
  { title: 'Get ready together', body: 'We take care of the details and help you feel prepared before you go.' },
  { title: 'Come feel Tanzania', body: 'Meet your guide, take a deep breath and let the good days begin.' },
];

export const routeInfo = [
  { name: 'Machame', days: '7 days', difficulty: 'Challenging', success: 'High', description: 'The scenic favourite. A varied trail with a rewarding climb-high, sleep-low rhythm.' },
  { name: 'Marangu', days: '6 days', difficulty: 'Moderate', success: 'Good', description: 'The classic hut route. A steady, well-known path with simple mountain refuges.' },
  { name: 'Lemosho', days: '8 days', difficulty: 'Moderate+', success: 'Very high', description: 'A quieter western approach, wide open views and excellent time to acclimatise.' },
  { name: 'Rongai', days: '7 days', difficulty: 'Moderate', success: 'High', description: 'A gentle northern trail with a wilder feel and a lovely descent through Marangu.' },
];

export const reviews = [
  { name: 'Amara & Daniel', trip: 'Machame Route · sample story', quote: 'Our guide knew when to encourage us and when to let the mountain do the talking. We still talk about summit morning.' },
  { name: 'Sophie Laurent', trip: 'Serengeti Safari · sample story', quote: 'The kind of trip that makes you forget to check your phone. Every day brought a new little wonder.' },
  { name: 'Lucas Bennett', trip: 'Zanzibar Escape · sample story', quote: 'A few days by the ocean was exactly what we needed after the climb. It felt like the perfect exhale.' },
];

export const gallery = [
  { src: '/img/gallery/g1.webp', alt: 'Mount Kilimanjaro rising above the clouds', caption: 'The roof of Africa', className: 'gallery-wide' },
  { src: '/img/gallery/g2.webp', alt: 'Safari vehicle on the Serengeti at sunset', caption: 'Golden hour on safari', className: '' },
  { src: '/img/gallery/g3.webp', alt: 'Turquoise ocean and white sand in Zanzibar', caption: 'A slower kind of day', className: '' },
  { src: '/img/gallery/g4.webp', alt: 'Giraffe moving through green woodland', caption: 'A quiet encounter', className: '' },
  { src: '/img/gallery/g5.webp', alt: 'Flamingos gathered along a Rift Valley lake', caption: 'Life along the lake', className: 'gallery-wide' },
  { src: '/img/gallery/g6.webp', alt: 'A tent under a brilliant night sky', caption: 'Under a million stars', className: '' },
];

export const faqs = [
  { question: 'Do I need a visa to visit Tanzania?', answer: 'Visa requirements depend on your nationality and travel plans. Check the latest guidance from your nearest Tanzanian embassy or official immigration website before travelling.' },
  { question: 'Are any vaccinations required?', answer: 'Requirements vary by origin and itinerary, and can change. Speak with a travel health clinic well before departure for advice tailored to you.' },
  { question: 'What travel insurance should I get?', answer: 'Choose a policy that covers your planned activities. For Kilimanjaro, check that high-altitude trekking, evacuation and medical costs are explicitly included.' },
  { question: 'What should I pack for the climb?', answer: 'Layered clothing, broken-in hiking boots, sun protection and a warm sleeping setup are a good start. We share a full packing guide based on your route.' },
  { question: 'How do payments work?', answer: 'Payment schedules depend on the trip. We will share a clear written quote, inclusions and payment dates before you confirm any booking.' },
];
