# Medejoni

אתר הזמנת טיולים בקולומביה בעברית, של יונתן מילמן. האתר בנוי ב־[Astro](https://astro.build) ויוצא אתר סטטי, כך שאפשר להעלות אותו כמעט לכל אחסון.

## הרצה על המחשב

צריך להתקין [Node.js](https://nodejs.org) בגרסה 22 ומעלה, פעם אחת.

```bash
git clone https://github.com/jonimel/medejoni-site.git
cd medejoni-site
npm install
npm run dev
```

אחרי זה פותחים בדפדפן את http://localhost:4321. כל שינוי בקבצים יופיע מיד בדפדפן.

## איפה משנים תוכן

| מה | קובץ |
|---|---|
| מספר וואטסאפ, אינסטגרם, טיקטוק | `src/data/site.ts` |
| טיולים: מחירים, תיאורים, תמונות, שאלות נפוצות | `src/data/tours.ts` |
| יעדים | `src/data/destinations.ts` |
| מדריכים (בלוג) | `src/data/guides.ts` |
| תמונות | `public/images/` (מפנים אליהן לפי שם, בלי `.jpg`) |
| צבעים וסגנון | `src/styles/global.css` |

כל טיול חדש שנוסף ל־`tours.ts` מקבל דף משלו בכתובת `/tours/<slug>/`.

## דפים

- `/` דף הבית
- `/tours/` כל הטיולים, עם סינון וחיפוש
- `/tours/<slug>/` דף טיול: גלריה, הזמנה, שאלות נפוצות
- `/destinations/` ו־`/destinations/<slug>/` יעדים
- `/guides/` ו־`/guides/<slug>/` מדריכים
- `/about/` מי אני
- `/booking/` השלמת הזמנה. כרגע ההזמנה נשלחת ליונתן בוואטסאפ. תשלום ומקדמות יתווספו בהמשך.

## העלאה לאוויר

1. מעדכנים את הדומיין ב־`astro.config.mjs` (`site`) וב־`public/robots.txt`.
2. מחברים את ה־repo ל־[Vercel](https://vercel.com) או ל־[Netlify](https://netlify.com). הם מזהים Astro לבד: פקודת build היא `npm run build` והתיקייה היא `dist`.
3. מחברים את הדומיין בהגדרות של האחסון.

## SEO שכבר בנוי

- כותרת ותיאור לכל דף, canonical, Open Graph לשיתוף ברשתות.
- סכמות Schema.org: TravelAgency, TouristTrip, FAQPage, BreadcrumbList, Article.
- `sitemap-index.xml` ו־`robots.txt` נוצרים אוטומטית.

## חסר עדיין

- מספר הוואטסאפ של יונתן (`src/data/site.ts`).
- קישורים לאינסטגרם ולטיקטוק.
- ביקורות אמיתיות (`src/pages/about.astro`).
- תוכן המדריכים ותיאורי היעדים (מסומנים בסוגריים מרובעים).
- לוגו, אם יש.
