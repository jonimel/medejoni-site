// Blog / guide articles. Body sections are placeholders until Jonathan writes the content.

export interface Guide {
  slug: string;
  title: string;
  sub: string;
  image: string;
  description: string;
  tag: string;
  /** Title for the browser tab / Google, when it differs from the on-page title. */
  seoTitle?: string;
  /** Full article body lives in src/articles/<slug>.md instead of sections. */
  markdown?: boolean;
  /** Tours this guide talks about (shown as cards at the end, and links the guide from those tours/destinations). */
  tours?: string[];
  sections: { id: string; title: string; paragraphs: string[]; image?: string; tip?: string; tours?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: 'colombia-two-week-itinerary',
    title: 'מסלול טיול בקולומביה לשבועיים: ערים, קפה וחופים בלי לרוץ בין יעדים',
    seoTitle: 'מסלול טיול בקולומביה לשבועיים: ערים, קפה וחופים',
    sub: "מדג׳ין, גואטפה, אזור הקפה והקריביים",
    image: 'guatape-colorful-streets',
    tag: 'מסלולים',
    description: 'בונים מסלול לקולומביה? גלו איך לשלב מדג׳ין, גואטפה, אזור הקפה והקריביים בשבועיים, ומה כדאי לדעת על החוויות שמקבלות תשומת לב.',
    markdown: true,
    sections: [],
  },
  {
    slug: 'colombia-weather-best-time',
    title: 'מזג אוויר בקולומביה: מתי כדאי לטוס ואיך בוחרים מסלול לפי העונה?',
    seoTitle: 'מזג אוויר בקולומביה: מתי לטוס ולאיזה אזור?',
    sub: 'עונות הגשם, חודש אחרי חודש, לפי אזור',
    image: 'salento-colombia-wax-palm',
    tag: 'תכנון',
    description: 'מתי כדאי לטוס לקולומביה? מדריך לעונות הגשם, למדג׳ין, לבוגוטה ולחופים, עם חלוקה לחודשים וטיפים לבניית מסלול שמתאים לעונה.',
    markdown: true,
    sections: [],
  },
  {
    slug: 'colombia-money-budget',
    title: 'כסף בקולומביה: איך משלמים וכמה כסף צריך לטיול?',
    seoTitle: 'כסף בקולומביה: מטבע, אשראי ותכנון תקציב לטיול',
    sub: 'פזו, אשראי, כספומטים ובניית תקציב',
    image: 'cartagena-old-city-street',
    tag: 'תכנון',
    description: 'מתכננים טיול בקולומביה? הכירו את הפזו, בדקו איך להחליף ולמשוך כסף, והבינו אילו הוצאות לכלול בתקציב כדי להגיע מוכנים.',
    markdown: true,
    sections: [],
  },
  {
    slug: 'guatape-group-or-private',
    title: 'טיול לגואטפה: קבוצתי או פרטי, ומה לא לפספס',
    seoTitle: "טיול לגואטפה ממדג'ין: איך מגיעים ומה עושים",
    sub: 'מה ההבדל, כמה זה עולה ומה כדאי לכם',
    image: 'day-trips-from-medellin-guatape-lake',
    tag: 'מדריך יעד',
    description: "טיול לגואטפה (גוואטפה) ממדג'ין: איך מגיעים, טיול קבוצתי או פרטי, העלייה לסלע אל פניול, הכפר הצבעוני והאטרקציות על האגם.",
    markdown: true,
    tours: ['guatape-group', 'guatape-private'],
    sections: [],
  },
  {
    slug: 'things-to-do-in-medellin',
    title: "מה עושים במדג'ין: המדריך המלא",
    seoTitle: "מה עושים במדג'ין: אטרקציות, שכונות וטיפים",
    sub: 'שכונות, תצפיות, כדורגל וחיי לילה',
    image: 'medellin-tours-viewpoint-evening',
    tag: 'מדריך עיר',
    description: "מה עושים במדג'ין? קומונה 13, אל פובלדו ולאורלס, סיור אסקובר, תצפיות, משחק של נסיונל וחיי לילה, עם טיפים מקומיים.",
    markdown: true,
    tours: ['comuna-13-tour', 'pablo-escobar-tour', 'medellin-viewpoints-tour', 'atletico-nacional-match', 'chiva-rumbera'],
    sections: [],
  },
  {
    slug: 'nature-near-medellin',
    title: "מפלים, מערות וטבע ליד מדג'ין",
    sub: 'הטבע הכי יפה במרחק נסיעה מהעיר',
    image: 'jardin-cave-waterfall',
    tag: 'טבע',
    description: "טבע ליד מדג'ין: חרדין עם מערה ומפל, רכיבה על סוסים, כפרי אנטיוקיה, מצנח רחיפה וגואטפה. איך בוחרים את טיול היום שמתאים לכם.",
    markdown: true,
    tours: ['jardin-day-trip', 'colombian-for-a-day', 'guatape-private'],
    sections: [],
  },
  {
    slug: 'colombia-safety-israelis',
    title: 'האם בטוח לטייל בקולומביה? המדריך לישראלים',
    seoTitle: 'האם בטוח בקולומביה? טיפים לישראלים',
    sub: 'מה באמת צריך לדעת לפני שנוסעים',
    image: 'medellin-colombia',
    tag: 'תכנון',
    description: "האם בטוח לטייל בקולומביה? מה לבדוק לפני הטיסה, הכלל no dar papaya, מוניות, בילויים בלילה ואיפה לישון.",
    markdown: true,
    sections: [],
  },
  {
    slug: 'medellin-airport-transfer',
    title: "משדה התעופה למדג'ין: הסעה, מונית או אוטובוס?",
    seoTitle: "משדה התעופה ריונגרו למדג'ין: הסעה או מונית",
    sub: 'שדה התעופה חוסה מריה קורדובה (MDE) בריונגרו',
    image: 'medellin-airport-transfer-van',
    tag: 'תכנון',
    description: "איך מגיעים משדה התעופה של מדג'ין (MDE, ריונגרו) למלון: הסעה פרטית, מונית מהעמדה הרשמית, אוטובוס או אפליקציה, וטיפים לנחיתה.",
    markdown: true,
    sections: [],
  },
  {
    slug: 'where-to-stay-medellin',
    title: "איפה לישון במדג'ין: אל פובלדו, לאורלס או אנביגאדו?",
    seoTitle: "איפה לישון במדג'ין: פובלדו או לאורלס?",
    sub: 'השכונות הכי טובות לפי סוג המטייל',
    image: 'medellin-nightlife-city-lights',
    tag: 'מדריך עיר',
    description: "איפה לישון במדג'ין? השוואה בין אל פובלדו, לאורלס ואנביגאדו: למי מתאימה כל שכונה, רעש, מחירים וטיפים להזמנת מלון.",
    markdown: true,
    sections: [],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);

/**
 * A guide whose text is still placeholders ("[פסקה.]"). Such pages are hidden from Google
 * (noindex + left out of the sitemap) until Jonathan writes them, because empty pages hurt SEO.
 */
export const isDraft = (g: Guide) => !g.markdown && g.sections.every((s) => s.paragraphs.every((p) => p.trim().startsWith('[')));
