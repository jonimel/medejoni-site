// English text for the services (the /en/services/ page). Ids, icons and photos come from services.ts.
import { services, type Service } from './services';

const en: Record<string, Omit<Service, 'id' | 'image' | 'icon'>> = {
  'airport-transfer': {
    title: 'Airport transfers',
    short: 'Pickup at the Medellín, Cartagena or Bogotá airport, straight to your hotel, with a driver waiting for you.',
    intro: 'Landing in Colombia? A driver waits for you at the exit with a sign and takes you straight to your hotel. No taxis, no haggling and no stress after a long flight.',
    points: ['Driver waits at the exit with a sign', 'Flight tracking, even when it’s delayed', 'Medellín, Cartagena and Bogotá', 'Vehicles for couples, families and groups'],
    formTitle: 'Book an airport transfer',
    fields: [
      { name: 'landing_date', label: 'When do you land?', type: 'date' },
      { name: 'landing_airport', label: 'Where do you land?', type: 'select', options: ['Medellín', 'Cartagena', 'Bogotá'] },
      { name: 'destination', label: 'Where are you going?', type: 'text', placeholder: 'Address or hotel name', full: true },
    ],
  },
  transfers: {
    title: 'City-to-city transfers',
    short: 'Private rides between cities: Medellín, Salento and the coffee region, Guatapé, Jardín and more.',
    intro: 'Moving to another city? A private door-to-door ride with a local driver who knows the way. You can stop on the way for a view, food or an attraction.',
    points: ['Door to door, hotel to hotel', 'Stops on the way on request', 'Fixed price agreed in advance', 'Arranged personally with Yonatan'],
    formTitle: 'Book a city-to-city transfer',
    routes: [{ from: 'Medellín', to: 'Salento', image: 'salento-colombia-wax-palm', note: 'Cocora Valley and the wax palms, about 6–7 hours' }],
    fields: [
      { name: 'from', label: 'From', type: 'text', placeholder: 'e.g. Medellín' },
      { name: 'to', label: 'To', type: 'text', placeholder: 'e.g. Guatapé' },
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  flights: {
    title: 'Flight booking',
    short: 'Domestic flights in Colombia and international flights: we find the right flight and book it for you.',
    intro: 'Need a flight within Colombia or abroad? We find the flight that fits your route, compare prices and times, and book it for you.',
    points: ['Domestic and international flights', 'Compare airlines, prices and times', 'Matched to your route and tours', 'Help with baggage and changes'],
    formTitle: 'Flight booking request',
    fields: [
      { name: 'from', label: 'Flying from', type: 'text', placeholder: 'e.g. Medellín' },
      { name: 'to', label: 'Flying to', type: 'text', placeholder: 'e.g. Cartagena' },
      { name: 'date', label: 'Date', type: 'date' },
    ],
  },
  'trip-planning': {
    title: 'Trip planning',
    short: 'Not sure where to start? We’ll build you a personal itinerary for Colombia.',
    intro: 'Confused? Not sure where to start? That’s what we’re here for! Talk to me, and I’ll build an itinerary that fits you exactly: destinations, order, stays, tours, transfers and flights.',
    points: ['Personal itinerary for your time and budget', 'Recommendations I actually know', 'Transfers, flights and tours arranged', 'Personal support from me on WhatsApp throughout your trip'],
    formTitle: 'Let’s plan your trip',
    fields: [
      { name: 'arrival_date', label: 'When do you arrive?', type: 'date' },
      { name: 'days', label: 'For how many days?', type: 'text', placeholder: 'e.g. two weeks' },
      { name: 'message', label: 'Tell us a bit: what you love and what matters to you', type: 'textarea', full: true, required: false },
    ],
  },
};

export const servicesEn: Service[] = services.map((s) => ({ ...s, ...en[s.id] }));

/** English destination names (cards and filters on the English site). */
export const destNamesEn: Record<string, string> = {
  medellin: 'Medellín',
  guatape: 'Guatapé',
  jardin: 'Jardín',
  antioquia: 'Antioquia countryside',
  salento: 'Salento',
  cartagena: 'Cartagena',
  'santa-marta': 'Santa Marta',
};
