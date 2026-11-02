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
  sections: { id: string; title: string; paragraphs: string[]; image?: string; tip?: string; tours?: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: 'colombia-two-week-itinerary',
    title: 'מסלול טיול בקולומביה לשבועיים: ערים, קפה וחופים בלי לרוץ בין יעדים',
    seoTitle: 'מסלול טיול בקולומביה לשבועיים: ערים, קפה וחופים',
    sub: "מדג'ין, גואטפה, אזור הקפה והקריביים",
    image: 'umbrellas2',
    tag: 'מסלולים',
    description: 'בונים מסלול לקולומביה? גלו איך לשלב מדיין, גואטפה, אזור הקפה והקריביים בשבועיים, ומה כדאי לדעת על החוויות שמקבלות תשומת לב.',
    markdown: true,
    sections: [],
  },
  {
    slug: 'colombia-weather-best-time',
    title: 'מזג אוויר בקולומביה: מתי כדאי לטוס ואיך בוחרים מסלול לפי העונה?',
    seoTitle: 'מזג אוויר בקולומביה: מתי לטוס ולאיזה אזור?',
    sub: 'עונות הגשם, חודש אחרי חודש, לפי אזור',
    image: 'salento2',
    tag: 'תכנון',
    description: 'מתי כדאי לטוס לקולומביה? מדריך לעונות הגשם, למדיין, לבוגוטה ולחופים, עם חלוקה לחודשים וטיפים לבניית מסלול שמתאים לעונה.',
    markdown: true,
    sections: [],
  },
  {
    slug: 'colombia-money-budget',
    title: 'כסף בקולומביה: איך משלמים וכמה כסף צריך לטיול?',
    seoTitle: 'כסף בקולומביה: מטבע, אשראי ותכנון תקציב לטיול',
    sub: 'פזו, אשראי, כספומטים ובניית תקציב',
    image: 'ctg-street',
    tag: 'תכנון',
    description: 'מתכננים טיול בקולומביה? הכירו את הפזו, בדקו איך להחליף ולמשוך כסף, והבינו אילו הוצאות לכלול בתקציב כדי להגיע מוכנים.',
    markdown: true,
    sections: [],
  },
  {
    slug: 'guatape-group-or-private',
    title: 'טיול לגואטפה: קבוצתי או פרטי, ומה לא לפספס',
    sub: 'מה ההבדל, כמה זה עולה ומה כדאי לכם',
    image: 'lake',
    tag: 'מדריך יעד',
    description: 'מדריך לטיול לגואטפה ממדג׳ין: איך מגיעים, קבוצתי או פרטי, סלע אל פניול, הכפר הצבעוני והאטרקציות על האגם.',
    sections: [
      { id: 'getting-there', title: 'איך מגיעים לגואטפה', paragraphs: ["[פסקה: המרחק ממדג'ין, האפשרויות להגיע ומה הכי נוח.]", '[פסקה נוספת.]'], tip: '[טיפ מקומי קצר]' },
      { id: 'group-or-private', title: 'קבוצתי או פרטי?', paragraphs: ['[השוואה קצרה בין שני סוגי הטיולים.]'], tours: ['guatape-group', 'guatape-private'] },
      { id: 'el-penol', title: 'סלע אל פניול', paragraphs: ['[פסקה על הסלע, המדרגות והנוף.]'], image: 'peniol' },
      { id: 'village', title: 'הכפר הצבעוני', paragraphs: ['[פסקה על הכפר.]'], image: 'umbrellas' },
      { id: 'lake', title: 'אטרקציות על האגם', paragraphs: ['[פסקה על אופנועי ים, ווייקבורד, סקי מים ושייט.]'], image: 'wakeboard' },
    ],
  },
  {
    slug: 'things-to-do-in-medellin',
    title: "מה עושים במדג'ין: המדריך המלא",
    sub: 'שכונות, תצפיות, כדורגל וחיי לילה',
    image: 'meddusk',
    tag: 'מדריך עיר',
    description: "מה עושים במדג'ין: השכונות, התצפיות, הכדורגל וחיי הלילה, עם טיפים של ישראלי שגר בעיר.",
    sections: [
      { id: 'neighborhoods', title: 'שכונות שחייבים לראות', paragraphs: ['[פסקה.]'], image: 'valley' },
      { id: 'views', title: 'תצפיות על העיר', paragraphs: ['[פסקה.]'], tours: ['medellin-viewpoints-tour'] },
      { id: 'football', title: 'משחק כדורגל', paragraphs: ['[פסקה.]'], tours: ['atletico-nacional-match'] },
      { id: 'nightlife', title: 'חיי לילה', paragraphs: ['[פסקה.]'], tours: ['chiva-rumbera'] },
    ],
  },
  {
    slug: 'nature-near-medellin',
    title: "מפלים, מערות וטבע ליד מדג'ין",
    sub: 'הטבע הכי יפה במרחק נסיעה מהעיר',
    image: 'cave',
    tag: 'טבע',
    description: "הטבע הכי יפה ליד מדג'ין: חרדין, מפלים, מערות ורכיבה על סוסים.",
    sections: [
      { id: 'jardin', title: 'חרדין', paragraphs: ['[פסקה.]'], image: 'jardin', tours: ['jardin-day-trip'] },
      { id: 'antioquia', title: 'כפרי אנטיוקיה', paragraphs: ['[פסקה.]'], tours: ['colombian-for-a-day'] },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
