// Services beyond tours. No fixed prices yet: each service has a quote-request form
// (Netlify Forms, emailed to Jonathan). Name, phone and number of people are always asked.

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
}

export interface Service {
  id: string;
  title: string;
  short: string;
  intro: string;
  points: string[];
  image: string;
  icon: string;
  blob: string;
  formTitle: string;
  routes?: { from: string; to: string; image: string; note: string }[];
  fields: FormField[];
}

export const services: Service[] = [
  {
    id: 'airport-transfer',
    title: 'הסעות משדה התעופה',
    short: "איסוף משדה התעופה במדג'ין, בקרטחנה או בבוגוטה, ישר למלון, עם נהג שמחכה לכם.",
    intro:
      'נוחתים בקולומביה? נהג מחכה לכם ביציאה עם שלט, ומסיע אתכם ישר למלון. בלי מוניות, בלי מיקוח ובלי לחץ אחרי טיסה ארוכה.',
    points: ['נהג מחכה ביציאה עם שלט', 'מעקב אחרי הטיסה, גם כשהיא מתעכבת', "מדג'ין, קרטחנה ובוגוטה", 'רכבים לזוגות, למשפחות ולקבוצות'],
    image: 'van',
    icon: '✈',
    blob: '#DCE7FF',
    formTitle: 'הזמנת הסעה משדה התעופה',
    fields: [
      { name: 'landing_date', label: 'מתי נוחתים?', type: 'date' },
      { name: 'landing_airport', label: 'איפה נוחתים?', type: 'select', options: ["מדג'ין", 'קרטחנה', 'בוגוטה'] },
      { name: 'destination', label: 'לאן נוסעים?', type: 'text', placeholder: 'הזינו כתובת או שם מלון', full: true },
    ],
  },
  {
    id: 'transfers',
    title: 'מעברים בין ערים',
    short: "נסיעה פרטית בין ערים: מדג'ין, סלנטו ואזור הקפה, גואטפה, חרדין ועוד.",
    intro:
      'עוברים עיר? נסיעה פרטית מדלת לדלת, עם נהג מקומי שמכיר את הדרך. אפשר לעצור בדרך לנוף, לאוכל או לאטרקציה.',
    points: ['מדלת לדלת, מהמלון למלון', 'עצירות בדרך לפי בקשה', 'מחיר סגור מראש', 'תיאום מלא בעברית'],
    image: 'salento',
    icon: '⇄',
    blob: '#D9F7EF',
    formTitle: 'הזמנת מעבר בין ערים',
    routes: [{ from: "מדג'ין", to: 'סלנטו', image: 'salento2', note: 'עמק קוקורה ודקלי השעווה, כ־6–7 שעות נסיעה' }],
    fields: [
      { name: 'from', label: 'מאיפה יוצאים?', type: 'text', placeholder: "למשל: מדג'ין" },
      { name: 'to', label: 'לאן נוסעים?', type: 'text', placeholder: 'למשל: גואטפה' },
      { name: 'date', label: 'תאריך', type: 'date' },
    ],
  },
  {
    id: 'flights',
    title: 'סגירת טיסות',
    short: 'טיסות פנים בקולומביה וטיסות לחו"ל: מוצאים את הטיסה שמתאימה לכם וסוגרים אותה בשבילכם.',
    intro:
      'צריכים טיסה בתוך קולומביה או טיסה לחו"ל? אנחנו מוצאים את הטיסה שמתאימה למסלול שלכם, משווים מחירים ושעות, וסוגרים אותה בשבילכם.',
    points: ['טיסות פנים וטיסות לחו"ל', 'השוואת חברות, מחירים ושעות', 'התאמה למסלול ולטיולים שהזמנתם', 'עזרה עם כבודה ושינויים'],
    image: 'meddusk',
    icon: '✓',
    blob: '#FFF3B0',
    formTitle: 'בקשה לסגירת טיסה',
    fields: [
      { name: 'from', label: 'מאיפה ממריאים?', type: 'text', placeholder: "למשל: מדג'ין" },
      { name: 'to', label: 'איפה נוחתים?', type: 'text', placeholder: 'למשל: קרטחנה' },
      { name: 'date', label: 'תאריך', type: 'date' },
    ],
  },
  {
    id: 'trip-planning',
    title: 'תכנון טיולים',
    short: 'מבולבלים? לא יודעים איפה להתחיל? נבנה לכם מסלול אישי בקולומביה.',
    intro:
      'מבולבלים? לא יודעים איפה להתחיל? בשביל זה אנחנו כאן! דברו איתי, ואבנה לכם מסלול שמתאים בדיוק לכם: יעדים, סדר, לינה, טיולים, הסעות וטיסות.',
    points: ['מסלול אישי לפי הזמן והתקציב', 'המלצות שאני באמת מכיר', 'סידור הסעות, טיסות וטיולים', 'ליווי בעברית לאורך כל הטיול'],
    image: 'lake',
    icon: '★',
    blob: '#FDE2EC',
    formTitle: 'בואו נתכנן לכם טיול',
    fields: [
      { name: 'arrival_date', label: 'מתי מגיעים?', type: 'date' },
      { name: 'days', label: 'לכמה ימים?', type: 'text', placeholder: 'למשל: שבועיים' },
      { name: 'message', label: 'ספרו לנו קצת: מה אתם אוהבים, מה חשוב לכם', type: 'textarea', full: true, required: false },
    ],
  },
];
