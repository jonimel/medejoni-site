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

### הוספת תמונה

1. שומרים את התמונה כ־`.jpg` בתיקייה `public/images/` (שם באנגלית, בלי רווחים).
2. מריצים פעם אחת: `python3 scripts/optimize-images.py`
   הסקריפט מכין גרסת WebP גדולה (למחשב), גרסה קטנה ב־`public/images/sm/` (לטלפון ולכרטיסים), ומקטין את ה־jpg (משמש רק לתצוגה מקדימה בוואטסאפ/פייסבוק).
   האתר בוחר לבד את הגודל המתאים לכל מסך.

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

## Hosting on Railway

`server.mjs` serves `dist/` and emails every form submission (POST `/`) through Resend.
Railway builds with `npm run build` and starts with `node server.mjs` (see `railway.json`).
Set these variables on the Railway service: `RESEND_API_KEY` (required), `LEAD_EMAIL` (default yonimelmel@gmail.com), `MAIL_FROM` (optional).
The same forms keep working on Netlify (Netlify Forms) because both receive POST `/`.

## מעקב שותפים (אגל ועוד)

- קישור לשותף: `https://medejoni.com/?utm_source=agal&utm_medium=referral` (לשותף אחר מחליפים את `agal`).
- כל כניסה דרך קישור כזה נשמרת ב־Supabase בטבלה `referral_visits` (רענון ומעבר בין עמודים לא נספרים שוב). לחיצות על וואטסאפ נשמרות ב־`whatsapp_clicks`.
- דוחות מוכנים: `referral_report` (לכל שותף) ו־`referral_daily` (לפי יום).
- שותף חדש: Supabase ← Table Editor ← `referral_partners` ← Insert row עם `code` (אותיות באנגלית קטנות) ו־`name`. להשבתה: `is_active` = false.
- הקמה חד־פעמית: מריצים את `supabase/referrals.sql` ב־SQL Editor, ומוסיפים ב־Railway את `SUPABASE_URL` ו־`SUPABASE_SERVICE_KEY`. בלי המשתנים האלה האתר עובד רגיל, רק בלי רישום.
- בטפסים יש שדה "איך הגעתם אלינו?", ומי שהגיע דרך שותף רואה במייל של הליד גם "הגיע דרך שותף".
