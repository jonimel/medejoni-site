// English text for the tours (the /en/ pages). Prices, photos, slugs and settings come from tours.ts,
// so a price change there updates both languages. Only the words live here.
// A tour that has no entry here is not shown on the English site. IsraeLoco is called GringoLoco in English.
import { tours, type Tour, type TourKind } from './tours';

type TourText = Pick<Tour, 'title' | 'place' | 'short' | 'intro' | 'includes' | 'excludes' | 'pickup' | 'duration' | 'tags' | 'faq'> &
  Partial<Pick<Tour, 'schedule' | 'highlights' | 'start' | 'end' | 'guide' | 'ages' | 'bring' | 'goodToKnow' | 'addOnsNote' | 'badge' | 'warning'>> & {
    /** Add-on names by id. */
    addOns?: Record<string, string>;
    videoTitle?: string;
  };

export const kindLabelEn: Record<TourKind, string> = { group: 'Group', private: 'Private', evening: 'Evening' };

const hotel = 'Hotel pickup';
const guideEn = 'Local English-speaking guide';
const commonFaq = [
  { q: 'How late can I cancel?', a: 'You can cancel up to 12 hours before the tour starts.' },
  { q: 'Is the price per person?', a: 'Yes. All prices on the site are per person, in Colombian pesos (COP).' },
];
const privateBoat = { q: 'Can we book a private boat?', a: 'Yes. Private boats for 16 to 38 people are available, and you choose the beaches. Price on request.' };
const tayronaBring = ['Swimsuit and towel', 'Sunscreen and a hat', 'Water and food for the day (or cash to buy at the beach)', 'Cash'];
const santaMartaBay = 'Meeting point: Santa Marta bay';

const en: Record<string, TourText> = {
  'guatape-group': {
    title: 'Guatapé & El Peñol Rock – Group Day Trip',
    place: 'Guatapé, Antioquia',
    short: 'Full day: lake boat ride, El Peñol Rock, the colorful town, breakfast and lunch.',
    intro:
      "A full day in one of Colombia's most beautiful places. Drive from Medellín through the green hills of Antioquia, cruise Guatapé's lake among islands and villas, climb El Peñol Rock for a breathtaking view of the whole region, and finish with a walk through the colorful town. A traditional Colombian lunch is included along the way.",
    includes: [
      'Round-trip air-conditioned transport from Medellín',
      'Local breakfast',
      'Local lunch',
      'Boat ride on the lake (about 1 hour)',
      'About 1.5 hours at El Peñol Rock',
      'Walking tour of Guatapé town',
      'Professional English and Spanish-speaking guide all day',
    ],
    excludes: ['El Peñol Rock entrance (35,000 COP, only if you want to climb)'],
    schedule: [
      { title: '7:00 AM departure from Parque El Poblado', text: 'Please arrive at least 10 minutes early.' },
      { title: 'Local breakfast on the way' },
      { title: 'Boat ride on Guatapé lake', text: 'About an hour on the boat, with views of the islands and lakeside villas.' },
      { title: 'El Peñol Rock (La Piedra del Peñol)', text: 'About 1.5 hours to climb up and down the famous rock. Entrance is 35,000 COP, for those who want to climb.' },
      { title: 'Traditional Colombian lunch' },
      { title: 'The colorful town', text: 'Umbrella Street (Calle de las Sombrillas), Calle del Recuerdo and Plaza de los Zócalos.' },
      { title: 'Back in Medellín around 6:00 PM' },
    ],
    pickup: 'Departure from Parque El Poblado',
    duration: 'Full day',
    tags: ['Full day', 'Meals included', 'Boat ride included'],
    highlights: ['Guatapé lake boat ride', 'View from El Peñol Rock', 'The colorful town', 'Breakfast and lunch'],
    start: '7:00 AM',
    end: 'around 6:00 PM',
    guide: 'English and Spanish-speaking guide',
    ages: 'All ages',
    bring: ['Comfortable shoes (about 700 steps to the top of the rock)', 'Sunscreen and a hat', 'A light jacket for the boat', 'Cash for the rock entrance (35,000)'],
    goodToKnow: ['Climbing the rock is optional. If you stay down, you wait with a view of the lake.'],
    faq: [
      { q: 'Where does the tour start?', a: 'The group tour leaves from Parque El Poblado in Medellín.' },
      { q: 'Is the El Peñol Rock entrance included?', a: 'No. If you want to climb the rock, you pay 35,000 COP on site.' },
      { q: 'When do we get back?', a: 'We leave at 7:00 AM and get back to Medellín around 6:00 PM.' },
      { q: 'How far in advance should I book?', a: 'At least 36 hours ahead. I take care of the registration and reserve your seats.' },
      ...commonFaq,
    ],
  },
  'guatape-private': {
    title: 'Guatapé – Private Day Trip',
    place: 'Guatapé, Antioquia',
    short: 'Your own driver and guide, with optional wakeboarding, jet skis, a helicopter ride and more.',
    intro:
      'A private trip to Guatapé at your own pace: a private car, driver and local guide just for you. The day is similar to the group trip, and you can change it however you like and add activities on the lake.',
    includes: ['Private hotel pickup and return', 'Driver', 'Local English-speaking guide', 'Breakfast', 'Light snacks'],
    excludes: ['El Peñol Rock entrance (35,000)', 'Lake activities (extra cost)'],
    schedule: [
      { title: 'Morning hotel pickup' },
      { title: 'Local breakfast on the way' },
      { title: 'El Peñol Rock', text: 'Climb up for the view of the lake and islands, if you want.' },
      { title: 'Lake activities', text: 'Jet skis, wakeboarding, water skiing and more, your choice.' },
      { title: 'The colorful town of Guatapé', text: 'Umbrella Street and the main square.' },
      { title: 'Back to Medellín in the evening' },
    ],
    highlights: ['Car and guide just for you', 'Flexible itinerary', 'Lake activities of your choice'],
    guide: guideEn,
    ages: 'All ages',
    bring: ['Comfortable shoes', 'Swimsuit, if you add a water activity', 'Sunscreen and a hat', 'Cash'],
    addOns: { jetski: 'Jet skis', wakeboard: 'Wakeboarding', waterski: 'Water skiing', helicopter: 'Helicopter ride over the rock', horses: 'Horseback riding', paintball: 'Paintball' },
    addOnsNote: 'Activity prices are agreed in advance.',
    pickup: hotel,
    duration: 'Full day',
    tags: [hotel, 'Private guide', 'Breakfast'],
    faq: [
      { q: 'Can we add activities?', a: 'Yes. Jet skis, wakeboarding, water skiing and more, arranged in advance at an extra cost.' },
      { q: 'How far in advance should I book?', a: 'We recommend at least 48 hours ahead.' },
      ...commonFaq,
    ],
  },
  'pablo-escobar-tour': {
    title: 'Pablo Escobar History Tour',
    place: 'Medellín',
    short: "His grave, the Pablo Escobar neighborhood, the house where he was killed and Parque Inflexión.",
    intro: 'A private Pablo Escobar tour in Medellín, with a local guide who knows the story up close. Hotel pickup at a time that suits you.',
    includes: [hotel, 'Driver', 'Local English-speaking guide'],
    excludes: [],
    schedule: [
      { title: "Pablo Escobar's grave", text: 'At Jardines Montesacro cemetery.' },
      { title: 'Barrio Pablo Escobar', text: 'The neighborhood he built for poor families.' },
      { title: 'The house where he was killed', text: 'In the Los Olivos neighborhood, 1993.' },
      { title: 'Parque Inflexión', text: 'Built where his luxury building once stood, in memory of the victims of terrorism.' },
    ],
    highlights: ['His grave', 'Barrio Pablo Escobar', 'The house where he was killed', 'Parque Inflexión'],
    start: 'At a time that suits you',
    guide: guideEn,
    pickup: hotel,
    duration: 'Half day',
    tags: [hotel, 'Private guide'],
    faq: [
      { q: 'Is the Pablo Escobar tour safe?', a: 'Yes. All the places on the tour are open to the public.' },
      { q: 'Can I combine it with Comuna 13?', a: 'Yes. There is a combined Pablo Escobar and Comuna 13 tour in one day.' },
      ...commonFaq,
    ],
  },
  'comuna-13-tour': {
    title: 'Comuna 13 Graffiti & Street Food Tour',
    place: 'Medellín',
    short: "Graffiti, hip-hop, outdoor escalators and the story of the neighborhood that became Medellín's symbol.",
    intro:
      "A tour of Comuna 13, Medellín's most famous neighborhood: street art, hip-hop shows, the outdoor escalators, and the moving story of how the neighborhood transformed.",
    includes: [hotel, 'Local food tastings', 'Local English-speaking guide'],
    excludes: [],
    highlights: ['Graffiti and street art', 'Hip-hop shows', 'The outdoor escalators', 'Local food tastings'],
    guide: guideEn,
    ages: 'All ages',
    bring: ['Comfortable shoes (there are hills and stairs)', 'Sunscreen and a hat', 'Cash for tips and souvenirs'],
    pickup: hotel,
    duration: '4 to 6 hours',
    tags: [hotel, 'Food tastings', '4 to 6 hours'],
    faq: [{ q: 'How long is the tour?', a: 'Between 4 and 6 hours, including hotel pickup and return.' }, ...commonFaq],
  },
  'pablo-escobar-comuna-13': {
    title: 'Pablo Escobar + Comuna 13 Combo Tour',
    place: 'Medellín',
    short: "Medellín's two big stories in one day: following Pablo Escobar, then the graffiti and hip-hop of Comuna 13.",
    intro:
      'A day that connects both sides of Medellín. First, follow the story of Pablo Escobar: his grave, the neighborhood named after him, the place where he was killed and Parque Inflexión. Then head to Comuna 13 for the street art, hip-hop shows, outdoor escalators and the story of the neighborhood that became a symbol of the city’s change.',
    includes: [hotel, 'Driver', 'Local English-speaking guide'],
    excludes: [],
    schedule: [
      { title: 'Hotel pickup' },
      { title: 'Following Pablo Escobar', text: 'His grave, Barrio Pablo Escobar, the house where he was killed and Parque Inflexión.' },
      { title: 'Comuna 13', text: 'Graffiti, hip-hop and the outdoor escalators.' },
      { title: 'Back to your hotel' },
    ],
    highlights: ['Pablo Escobar tour', 'Comuna 13', 'Two tours in one day'],
    guide: guideEn,
    bring: ['Comfortable shoes', 'Sunscreen and a hat', 'Cash'],
    pickup: hotel,
    duration: 'Full day',
    tags: [hotel, 'Private guide', 'Two tours in one day'],
    faq: [...commonFaq],
  },
  'colombian-for-a-day': {
    title: 'Colombian for a Day',
    place: 'Antioquia',
    short: 'Paragliding or paintball, the village of San Pedro, catch your own trout for lunch, and sunset over Medellín.',
    intro: 'A countryside day outside Medellín: adrenaline in the morning, a mountain village at noon and a sunset over the city in the evening.',
    includes: ['Private round-trip transport', 'Driver', 'Local English-speaking guide', 'Breakfast'],
    excludes: ['Lunch', 'The activity: paragliding (230,000) or paintball (79,000)'],
    schedule: [
      { title: 'Hotel pickup at 8:00 AM' },
      { title: 'Paragliding or paintball', text: 'Choose one activity.' },
      { title: 'San Pedro de los Milagros', text: 'Nature, local atmosphere and a short walk around the village.' },
      { title: 'Lunch at a trout farm', text: 'Catch your own fish, and it goes straight to your plate.' },
      { title: 'Sunset at a viewpoint over Medellín' },
      { title: 'Back to your hotel around 8:00 PM' },
    ],
    highlights: ['Paragliding or paintball', 'San Pedro village', 'Catch your own lunch', 'Sunset viewpoint'],
    start: '8:00 AM',
    end: 'around 8:00 PM',
    guide: guideEn,
    bring: ['Closed shoes', 'A light jacket (San Pedro is cool)', 'Sunscreen', 'Cash'],
    addOns: { paragliding: 'Paragliding', paintball: 'Paintball' },
    addOnsNote: 'Choose one activity. Price per person.',
    pickup: hotel,
    duration: 'Full day',
    tags: ['Paragliding or paintball', 'Fishing and lunch', 'Sunset'],
    videoTitle: 'Paragliding over Medellín – video from the Colombian for a Day tour',
    faq: [
      { q: 'Can we do both paragliding and paintball?', a: 'No. You choose one activity.' },
      { q: 'Who goes with us?', a: 'A local English-speaking guide. I take care of every detail and I’m available to you on WhatsApp all day.' },
      ...commonFaq,
    ],
  },
  'atletico-nacional-match': {
    title: 'Atlético Nacional Football Match',
    place: 'Medellín',
    short: 'Ticket, transport, guide and your first beer, at one of the best football atmospheres in South America.',
    intro: 'Experience one of the best football atmospheres in South America, at Atlético Nacional’s stadium.',
    includes: ['Match ticket', 'Round-trip transport', 'Local English-speaking guide', 'First beer'],
    excludes: [],
    highlights: ['Atanasio Girardot Stadium', 'Real fan-stand atmosphere', 'Transport and first beer'],
    start: 'Depends on kick-off time',
    guide: guideEn,
    bring: ['Passport', 'A green or white shirt', 'Some small cash'],
    goodToKnow: ['Don’t wear the rival team’s shirt.'],
    pickup: hotel,
    duration: 'Evening',
    tags: ['Ticket included', 'Transport included'],
    videoTitle: 'The atmosphere in the stands at an Atlético Nacional match in Medellín – video',
    faq: [{ q: 'When are the matches?', a: 'It depends on the league schedule. Message me and I’ll check available dates.' }, ...commonFaq],
  },
  'medellin-viewpoints-tour': {
    title: 'Medellín Viewpoints Sunset Tour',
    place: 'Medellín',
    short: "Medellín's two main viewpoints, from sunset until the city lights up.",
    intro: 'An evening above Medellín: visit the city’s two main viewpoints and watch the sunset and the lights come on across the whole valley.',
    includes: ['Round-trip transport', 'Local English-speaking guide', 'Viewpoint entrance'],
    excludes: [],
    schedule: [
      { title: 'Hotel pickup at 5:00 PM' },
      { title: 'First viewpoint', text: 'Sunset over the city.' },
      { title: 'Second viewpoint', text: 'The city lights at night.' },
      { title: 'Back to your hotel around 10:00 PM' },
    ],
    highlights: ['Two main viewpoints', 'Sunset', 'City lights at night'],
    start: '5:00 PM',
    end: 'around 10:00 PM',
    guide: guideEn,
    ages: 'All ages',
    bring: ['A light jacket (it gets cool up there in the evening)', 'A camera or a charged phone'],
    pickup: hotel,
    duration: 'Evening',
    tags: ['5:00 to 10:00 PM', 'Entrance included', 'Sunset'],
    faq: [{ q: 'Is there a minimum group size?', a: 'Yes, a minimum of three people.' }, ...commonFaq],
  },
  'israeloco-medellin-barrio-tour': {
    title: 'GringoLoco: The Real Medellín, for the Brave',
    place: 'Medellín',
    short: 'An evening in the most local neighborhoods in the hills of Medellín: a barrio bar, street food and the view from the highest viewpoint in the city.',
    intro:
      "There's the Medellín everyone sees, and there's the Medellín only locals know. On this tour you go with a private guide into the barrios, the most local neighborhoods in the hills above the city: music in the street, a neighborhood bar, food from the street stalls, and at the end of the night the whole city below you from the highest viewpoint in Medellín. This tour is not for everyone, and that's exactly what makes it special.",
    includes: ['Hotel pickup and return', 'Private local English-speaking guide', 'El Picacho viewpoint entrance', 'First beer at the bar'],
    excludes: ['Street-stall food (everyone buys their own)'],
    schedule: [
      { title: 'Hotel pickup around 5:00 PM' },
      { title: 'Into the barrio', text: 'By car and on foot, through the neighborhoods in the hills of Medellín.' },
      { title: 'Neighborhood bar', text: 'An hour with the locals; the first beer is on us.' },
      { title: 'Street-food dinner', text: 'The food the neighborhood really eats.' },
      { title: 'El Picacho viewpoint', text: 'The highest viewpoint in Medellín, with a view over the whole city and Bello.' },
      { title: 'Back to your hotel around 11:00 PM' },
    ],
    badge: '🔥 For the crazy ones only',
    highlights: ['Barrios in the hills of Medellín', 'Neighborhood bar', 'Street food', 'The highest viewpoint in the city'],
    start: 'around 5:00 PM',
    end: 'around 11:00 PM',
    guide: 'Private local English-speaking guide',
    ages: 'Adults only, for those ready to follow the rules',
    bring: ['Simple, comfortable clothes', 'Some small cash for street food', 'A light jacket (it’s cool at the viewpoint)'],
    warning: {
      title: 'Before you book: this tour is not for everyone',
      text: 'This tour takes you to areas tourists usually don’t visit. To keep the experience good and safe, there are a few clear rules:',
      rules: [
        'No expensive jewelry',
        'Stay close to the guide for the whole tour',
        'No phones out and no photos in the street, only at the spots the guide shows you',
        'Simple clothes, a low profile and respectful behavior',
      ],
      note: 'There is some risk on this tour, and it’s important to take that into account before booking. If you’re ready to follow the rules, you’ll see a side of Colombia most travelers never will.',
    },
    pickup: hotel,
    duration: '5 to 6 hours',
    tags: ['5:00 to 11:00 PM', 'Beer included', 'For the crazy ones only'],
    videoTitle: 'Street party in a Medellín barrio – video',
    faq: [
      { q: 'Is the tour safe?', a: 'You go with a local guide who knows the neighborhoods and the people. There is some risk on this tour, which is why it’s important to follow its rules.' },
      { q: 'Can I take photos?', a: 'Yes, at the spots the guide shows you. In the street itself, phones stay in your pocket.' },
      ...commonFaq,
    ],
  },
  'jardin-day-trip': {
    title: 'Jardín Day Trip: Jeeps, Cave & Horseback Riding',
    place: 'Jardín, Antioquia',
    short: 'Jeeps, a cave with a waterfall, and horseback riding at sunset, in one of the prettiest towns in Antioquia.',
    intro:
      'A day in one of the most beautiful and authentic towns near Medellín. Jardín is about two hours from the city, surrounded by green mountains, streams and stunning views. Travel by private car, take a jeep tour through nature to a cave with a waterfall, where you can get in the water and cool off. Then enjoy free time and lunch in town, and toward sunset ride horses through the mountains with stops at viewpoints.',
    includes: ['Pickup from your hotel or apartment and return by private car', 'English-speaking driver', 'Jeep tour and cave visit', 'Sunset horseback ride'],
    excludes: ['Lunch'],
    schedule: [
      { title: 'Pickup from your hotel or apartment at 7:00 AM', text: 'Drive to Jardín through the green landscapes of Antioquia.' },
      { title: 'Arrive in Jardín around 9:30 AM' },
      { title: 'Jeep tour and cave visit, 10:00 AM to 1:30 PM', text: 'A nature trip to a cave with a waterfall, streams and views. You can get in the water and cool off.' },
      { title: 'Free time and lunch, 1:30 to 3:00 PM', text: 'Relax in town, local food and the calm atmosphere of Jardín.' },
      { title: 'Sunset horseback ride, 3:30 to 5:30 PM', text: 'Ride through the mountains with stops at several viewpoints.' },
      { title: 'Leave for Medellín at 6:30 PM', text: 'Arrive around 9:00 PM.' },
    ],
    pickup: 'Pickup from your hotel or apartment',
    duration: 'Full day',
    tags: ['Private car', 'Jeeps and cave', 'Sunset horseback ride'],
    highlights: ['Jeep tour', 'Cave with a waterfall', 'The town of Jardín', 'Sunset horseback ride'],
    start: '7:00 AM',
    end: 'around 9:00 PM',
    guide: 'English-speaking driver',
    bring: ['Swimsuit and towel (you get in the water at the cave)', 'Shoes that can get wet', 'A light jacket', 'Cash for lunch'],
    faq: [
      { q: 'When do we leave and come back?', a: 'Pickup at 7:00 AM, and we get back to Medellín around 9:00 PM.' },
      { q: 'Are the activities included?', a: 'Yes. The jeep tour, the cave and the horseback ride are included. Lunch is paid separately.' },
      { q: 'We are more than eight people. Is that possible?', a: 'Yes. Message me and we’ll agree on a group price.' },
      ...commonFaq,
    ],
  },
  'chiva-rumbera': {
    title: 'Chiva Rumbera Party Bus',
    place: 'Medellín',
    short: 'A Colombian party bus with music and stops at the main spots in the city.',
    intro: 'A Colombian party bus: music, stops at the main spots in the city and a local atmosphere.',
    includes: ['Chiva ticket', 'Local English-speaking guide', 'First drink'],
    excludes: [],
    highlights: ['Colorful party bus', 'Latin music', 'Stops around the city'],
    start: '6:00 PM',
    end: 'Depends on the route',
    guide: guideEn,
    bring: ['Cash for drinks', 'Comfortable clothes for dancing'],
    pickup: hotel,
    duration: 'Evening',
    tags: ['First drink', 'Guide'],
    faq: [{ q: 'When do we leave and come back?', a: 'We leave at 6:00 PM. The return time depends on that evening’s route.' }, ...commonFaq],
  },
  'caldas-river-farm-day-trip': {
    title: 'Paseo al Río: Countryside Day in Caldas',
    place: 'Caldas, Antioquia',
    short: 'A relaxed day outside the city: a farm full of animals, horseback riding, a country lunch and swimming in a clear river.',
    intro:
      'Want to see how locals from Medellín spend their weekend? Head to Caldas, in the south of the Aburrá Valley, for a "paseo al río": a day in nature by the river, with no rush and no clock. A farm with animals, horseback riding through the hills, a country lunch, and the rest of the day in the clear water of the river.',
    includes: ['Hotel pickup and return by private car', 'Driver', 'Local English-speaking guide', 'Farm entrance'],
    excludes: ['Lunch', 'Horseback riding (price depends on how long you ride)'],
    schedule: [
      { title: 'Hotel pickup at 7:00 AM', text: 'Drive to Caldas, in the south of the Aburrá Valley.' },
      { title: 'La Clarita Granja', text: 'A farm full of animals, fun for all ages.' },
      { title: 'Horseback riding', text: 'Through the green hills.' },
      { title: 'Country lunch' },
      { title: 'Chill at the river', text: 'Spend the rest of the day in the clear water, and swim if you like.' },
      { title: 'Back to Medellín toward sunset' },
    ],
    highlights: ['Farm with animals', 'Horseback riding', 'Country lunch', 'River swimming'],
    start: '7:00 AM',
    end: 'toward sunset',
    guide: guideEn,
    ages: 'All ages',
    bring: ['Swimsuit and towel', 'Shoes that can get wet', 'Sunscreen', 'Cash for lunch and riding'],
    addOns: { horses: 'Horseback riding' },
    addOnsNote: 'Riding price depends on the length of the ride, agreed in advance.',
    pickup: hotel,
    duration: 'Full day',
    tags: ['Farm with animals', 'Horseback riding', 'River swimming'],
    faq: [
      { q: 'Is it good for kids?', a: 'Yes. The farm, the horses and the river are suitable for all ages.' },
      { q: 'Is horseback riding included?', a: 'No. The price depends on how long you ride, and can be arranged in advance.' },
      ...commonFaq,
    ],
  },
  'tayrona-cabo-san-juan': {
    title: 'Tayrona – Cabo San Juan Boat Trip',
    place: 'Tayrona Park, Santa Marta',
    short: 'A speedboat to the most famous beach in Tayrona, jungle trails and viewpoints.',
    intro:
      'A day at the most famous beach in Tayrona National Park. Meet at Santa Marta bay; the boat leaves at 9:30 AM and arrives after about an hour, straight to Cabo San Juan. From there you can walk the trails to more beaches and enjoy nature and amazing views. Return at 3:30 PM to Santa Marta bay.',
    includes: ['Round-trip boat ride', 'Travel insurance', 'Tayrona Park insurance'],
    excludes: ['Meals and drinks'],
    pickup: santaMartaBay,
    start: '9:30 AM',
    end: '3:30 PM',
    bring: tayronaBring,
    duration: 'Full day',
    tags: ['Boat ride', 'Leaves at 9:30 AM', 'Trails and viewpoints'],
    faq: [
      { q: 'Can I go one way only?', a: 'Yes. Outbound only: 159,000 COP per person. Return only: 119,000 COP per person.' },
      { q: 'Where does it leave from?', a: 'From Santa Marta bay. The boat leaves at 9:30 AM and returns at 3:30 PM.' },
      privateBoat,
      ...commonFaq,
    ],
  },
  'super-tayrona': {
    title: 'Super Tayrona – Bahía Cinto & Playa Cristal',
    place: 'Tayrona Park, Santa Marta',
    short: 'Two exotic beaches in one day, Bahía Cinto and Playa Cristal, snorkel mask included.',
    intro:
      'The two most exotic beaches in Tayrona in one day. The boat leaves Santa Marta bay at 9:30 AM for Bahía Cinto, and at 12:30 PM continues to Playa Cristal and its crystal-clear water. Back in Santa Marta at 3:30 PM.',
    includes: ['Round-trip boat ride', 'Snorkel mask', 'Travel insurance', 'Tayrona Park insurance'],
    excludes: ['Meals and drinks'],
    pickup: santaMartaBay,
    start: '9:30 AM',
    end: '3:30 PM',
    bring: tayronaBring,
    duration: 'Full day',
    tags: ['2 beaches', 'Snorkel included', 'Leaves at 9:30 AM'],
    faq: [{ q: 'Where does it leave from?', a: 'From Santa Marta bay. The boat leaves at 9:30 AM and returns at 3:30 PM.' }, privateBoat, ...commonFaq],
  },
  'tayrona-bahia-cinto': {
    title: 'Tayrona – Bahía Cinto Boat Trip',
    place: 'Tayrona Park, Santa Marta',
    short: 'One of the most untouched beaches in Tayrona: quiet, lush and crystal clear.',
    intro:
      'Bahía Cinto is one of the most untouched beaches in Tayrona National Park, with quiet, lush vegetation and a beautiful shore. Meet at Santa Marta bay; the boat leaves at 9:30 AM, and after about 40 scenic minutes you arrive straight at the beach. Return at 4:00 PM.',
    includes: ['Round-trip boat ride', 'Travel insurance'],
    excludes: ['Meals and drinks'],
    pickup: santaMartaBay,
    start: '9:30 AM',
    end: '4:00 PM',
    bring: tayronaBring,
    duration: 'Full day',
    tags: ['Boat ride', 'Leaves at 9:30 AM', 'Quiet beach'],
    faq: [{ q: 'Can I go one way only?', a: 'Yes. One way (outbound or return): 119,000 COP per person.' }, privateBoat, ...commonFaq],
  },
  'tayrona-playa-cristal': {
    title: 'Tayrona – Playa Cristal Boat Trip',
    place: 'Tayrona Park, Santa Marta',
    short: 'The clearest beach in Tayrona: golden sand, transparent water and snorkeling among the corals.',
    intro:
      'The clearest spot in Tayrona National Park. Golden sand, transparent water, and snorkeling among corals and a huge variety of marine life. Meet at Santa Marta bay; the boat leaves at 9:30 AM and arrives after about 30 minutes. Return at 3:30 PM to Taganga or the Santa Marta marina.',
    includes: ['Round-trip boat ride', 'Travel insurance', 'Tayrona Park insurance'],
    excludes: ['Meals and drinks'],
    pickup: santaMartaBay,
    start: '9:30 AM',
    end: '3:30 PM',
    bring: tayronaBring,
    duration: 'Full day',
    tags: ['Boat ride', 'Snorkeling', 'Leaves at 9:30 AM'],
    faq: [
      { q: 'Can I go one way only?', a: 'Yes. One way (outbound or return): 119,000 COP per person.' },
      { q: 'Where does the boat return to?', a: 'To Taganga or the Santa Marta marina, at 3:30 PM.' },
      privateBoat,
      ...commonFaq,
    ],
  },
  'tayrona-bahia-concha': {
    title: 'Tayrona – Bahía Concha Boat Trip',
    place: 'Tayrona Park, Santa Marta',
    short: 'The closest beach in Tayrona: turquoise sea, golden sand and a trail to a viewpoint.',
    intro:
      'The closest beach in Tayrona National Park, a tropical paradise with a turquoise sea, golden sand and trails leading to a beautiful viewpoint. Meet at Santa Marta bay; the boat leaves at 9:30 AM and arrives after about 20 minutes. Return at 4:00 PM.',
    includes: ['Round-trip boat ride', 'Travel insurance', 'Tayrona Park insurance'],
    excludes: ['Meals and drinks'],
    pickup: santaMartaBay,
    start: '9:30 AM',
    end: '4:00 PM',
    bring: tayronaBring,
    duration: 'Full day',
    tags: ['20-minute boat ride', 'Leaves at 9:30 AM', 'Viewpoint'],
    faq: [privateBoat, ...commonFaq],
  },
};

/** English price-tier labels, built from the group sizes ("3 people", "5–8 people", "per person"). */
function tierLabels(t: Tour) {
  if (t.tiers.length === 1) return t.tiers.map((x) => ({ ...x, label: 'per person' }));
  return t.tiers.map((x, i) => {
    const next = t.tiers[i + 1];
    const to = next ? next.min - 1 : 8;
    return { ...x, label: to > x.min ? `${x.min}–${to} people` : `${x.min} people` };
  });
}

/** English tours, in the same order as the Hebrew site. Same slugs, prices and photos. */
export const toursEn: Tour[] = tours
  .filter((t) => en[t.slug])
  .map((t) => {
    const x = en[t.slug];
    return {
      ...t,
      ...x,
      badge: x.badge,
      warning: x.warning,
      tiers: tierLabels(t),
      addOns: t.addOns.map((a) => ({ ...a, name: x.addOns?.[a.id] ?? a.name })),
      video: t.video && { ...t.video, title: x.videoTitle ?? t.video.title },
    };
  });

export const getTourEn = (slug: string) => toursEn.find((t) => t.slug === slug);
/** Does this tour pick people up at their hotel (shows the "hotel" field when booking)? */
export const hotelPickup = (slug: string) => tours.find((t) => t.slug === slug)?.pickup === 'איסוף מהמלון';
