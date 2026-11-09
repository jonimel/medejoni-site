// Online deposit, paid with Bold (bold.co). Used by the booking page (to show it) and by server.mjs
// (which works the amount out again from the price list, so a visitor can't change it).
// The rest of the price is paid in Colombia, in cash or to the guide.

/** Share of the trip price paid online when booking. */
export const DEPOSIT_RATE = 0.4;
/** Bold charges 5% on card payments; the customer pays it, on the deposit only. */
export const CARD_FEE_RATE = 0.05;

const up1000 = (n) => Math.ceil(n / 1000) * 1000;

/** Price per person for a group of n (the tier with the biggest "min" that n reaches). */
export function perPerson(tiers, n) {
  return [...tiers].sort((a, b) => b.min - a.min).find((x) => n >= x.min)?.price ?? tiers[0].price;
}

/**
 * tour: { tiers, min, addOns } (same shape as the booking page data). addonIds: ids the customer picked.
 * Returns the trip total and the deposit split. All amounts in COP, rounded up to whole thousands.
 */
export function quote(tour, people, addonIds = []) {
  const n = Math.max(tour.min, Math.floor(Number(people)) || tour.min);
  const pp = perPerson(tour.tiers, n);
  const extras = tour.addOns.filter((a) => addonIds.includes(a.id));
  const total = (pp + extras.reduce((s, a) => s + (a.price ?? 0), 0)) * n;
  const deposit = up1000(total * DEPOSIT_RATE);
  const fee = up1000(deposit * CARD_FEE_RATE);
  return { n, pp, extras, total, deposit, fee, charge: deposit + fee, remainder: total - deposit };
}
