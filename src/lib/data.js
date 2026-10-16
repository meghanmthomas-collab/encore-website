// Sample content for the preview build. Replace with real data from your backend later.

export const STYLES = ['Ballet', 'Contemporary', 'Hip-hop', 'Jazz', 'Flamenco', 'Pointe', 'Musical theatre']
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Pre-professional']

export const instructors = [
  {
    id: 'margot',
    name: 'Margot Fairway',
    initials: 'MF',
    styles: ['Ballet', 'Contemporary'],
    location: 'Chicago, IL',
    headline: 'Former soloist · 14 seasons on stage',
    bio: 'Margot danced 14 seasons as a company soloist before moving into teaching. Her classes focus on clean classical technique, musicality and building the strength to dance injury-free for decades.',
    students: 412,
    rating: 4.9,
    reviews: 112,
    subscription: 24,
  },
  {
    id: 'dante',
    name: 'Dante Okoye',
    initials: 'DO',
    styles: ['Hip-hop'],
    location: 'Atlanta, GA',
    headline: 'Touring dancer & music-video choreographer',
    bio: 'Dante spent a decade on arena tours and music-video sets. He teaches grooves, foundations and choreography with an eye on performance and camera presence.',
    students: 688,
    rating: 4.8,
    reviews: 203,
    subscription: 19,
  },
  {
    id: 'lucia',
    name: 'Lucía Romero',
    initials: 'LR',
    styles: ['Flamenco'],
    location: 'Seville, Spain',
    headline: 'Tablao soloist · 20 years in flamenco',
    bio: 'Lucía grew up in the tablaos of Seville and toured internationally as a soloist. Her courses break down compás, footwork and braceo for dancers at every level.',
    students: 274,
    rating: 5.0,
    reviews: 88,
    subscription: 22,
  },
  {
    id: 'kenji',
    name: 'Kenji Hara',
    initials: 'KH',
    styles: ['Contemporary'],
    location: 'Los Angeles, CA',
    headline: 'Contemporary company dancer & rehearsal director',
    bio: 'Kenji danced with contemporary companies across Asia and North America and later ran rehearsals. Expect floor work, release technique and improvisation tools.',
    students: 359,
    rating: 4.9,
    reviews: 97,
    subscription: 21,
  },
  {
    id: 'amara',
    name: 'Amara Bell',
    initials: 'AB',
    styles: ['Jazz', 'Musical theatre'],
    location: 'New York, NY',
    headline: 'Broadway ensemble & dance captain',
    bio: 'Amara performed in eight productions and served as dance captain on two. She coaches jazz technique, audition combinations and how to pick up choreography fast.',
    students: 531,
    rating: 4.9,
    reviews: 154,
    subscription: 24,
  },
  {
    id: 'sofia',
    name: 'Sofia Petrova',
    initials: 'SP',
    styles: ['Pointe', 'Ballet'],
    location: 'Toronto, Canada',
    headline: 'Former principal · pointe & variations coach',
    bio: 'Sofia retired as a principal dancer and now coaches pointe work and classical variations, with a strong focus on foot and ankle strength.',
    students: 296,
    rating: 4.8,
    reviews: 71,
    subscription: 26,
  },
]

// type: 'video' (single class), 'course' (multi-lesson program), 'live' (scheduled live session)
export const classes = [
  { id: 'c1', title: 'Barre fundamentals: placement & turnout', instructor: 'margot', style: 'Ballet', level: 'Beginner', type: 'video', minutes: 45, price: 12, lessons: 1, sales: 318, rating: 4.9 },
  { id: 'c2', title: 'Adagio & control: 6-week program', instructor: 'margot', style: 'Ballet', level: 'Intermediate', type: 'course', minutes: 270, price: 89, lessons: 12, sales: 96, rating: 5.0 },
  { id: 'c3', title: 'Contemporary floor work flow', instructor: 'margot', style: 'Contemporary', level: 'Intermediate', type: 'video', minutes: 38, price: 14, lessons: 1, sales: 141, rating: 4.8 },
  { id: 'c4', title: 'Grooves & foundations', instructor: 'dante', style: 'Hip-hop', level: 'Beginner', type: 'video', minutes: 40, price: 10, lessons: 1, sales: 702, rating: 4.8 },
  { id: 'c5', title: 'Music-video choreography lab', instructor: 'dante', style: 'Hip-hop', level: 'Advanced', type: 'course', minutes: 180, price: 59, lessons: 8, sales: 188, rating: 4.9 },
  { id: 'c6', title: 'Compás & footwork essentials', instructor: 'lucia', style: 'Flamenco', level: 'Beginner', type: 'course', minutes: 150, price: 49, lessons: 6, sales: 133, rating: 5.0 },
  { id: 'c7', title: 'Release technique: weight & momentum', instructor: 'kenji', style: 'Contemporary', level: 'Advanced', type: 'video', minutes: 50, price: 15, lessons: 1, sales: 167, rating: 4.9 },
  { id: 'c8', title: 'Improvisation tools for performers', instructor: 'kenji', style: 'Contemporary', level: 'Intermediate', type: 'live', minutes: 60, price: 25, lessons: 1, sales: 42, rating: 4.9, date: 'Thu, Oct 22 · 6:00 PM CT' },
  { id: 'c9', title: 'Audition prep: jazz combinations', instructor: 'amara', style: 'Jazz', level: 'Pre-professional', type: 'course', minutes: 210, price: 79, lessons: 9, sales: 221, rating: 4.9 },
  { id: 'c10', title: 'Turns & leaps clinic', instructor: 'amara', style: 'Musical theatre', level: 'Intermediate', type: 'video', minutes: 35, price: 12, lessons: 1, sales: 389, rating: 4.8 },
  { id: 'c11', title: 'Pointe strength & conditioning', instructor: 'sofia', style: 'Pointe', level: 'Intermediate', type: 'course', minutes: 160, price: 55, lessons: 8, sales: 147, rating: 4.8 },
  { id: 'c12', title: 'Private coaching: classical variation', instructor: 'sofia', style: 'Pointe', level: 'Pre-professional', type: 'live', minutes: 45, price: 95, lessons: 1, sales: 38, rating: 5.0, date: 'Sat, Oct 24 · 10:00 AM CT' },
]

export const lessonOutline = [
  'Warm-up and alignment check',
  'Technique breakdown at half tempo',
  'Building the combination',
  'Full-out run with music',
  'Cool-down and stretching',
]

export const getInstructor = (id) => instructors.find((i) => i.id === id)
export const getClass = (id) => classes.find((c) => c.id === id)

export const formatMoney = (n, opts = {}) =>
  (n < 0 ? '−' : '') +
  '$' +
  Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: opts.cents === false ? 0 : 2, maximumFractionDigits: opts.cents === false ? 0 : 2 })

export const formatMinutes = (m) => (m >= 60 ? `${Math.floor(m / 60)} h ${m % 60 ? (m % 60) + ' min' : ''}`.trim() : `${m} min`)

// Back-office sample data for the signed-in professional (Margot)
export const studioActivity = [
  { id: 'a1', student: 'Maya Chen', initials: 'MC', activity: 'Bought a class', item: 'Contemporary floor work flow', date: 'Oct 16, 4:12 PM', amount: 14, status: 'Paid' },
  { id: 'a2', student: 'Jordan Ellis', initials: 'JE', activity: 'Enrolled in a program', item: 'Adagio & control: 6-week program', date: 'Oct 16, 11:30 AM', amount: 89, status: 'Paid' },
  { id: 'a3', student: 'Priya Raman', initials: 'PR', activity: 'Left a 5-star review', item: 'Barre fundamentals', date: 'Oct 15, 8:47 PM', amount: null, status: 'Published' },
  { id: 'a4', student: 'Theo Martins', initials: 'TM', activity: 'Started a subscription', item: 'Margot Fairway — All access', date: 'Oct 15, 9:15 AM', amount: 24, status: 'Active' },
  { id: 'a5', student: 'Sam Okafor', initials: 'SO', activity: 'Requested a refund', item: 'Barre fundamentals', date: 'Oct 14, 2:05 PM', amount: -12, status: 'Refunded' },
  { id: 'a6', student: 'Lena Fischer', initials: 'LF', activity: 'Bought a class', item: 'Barre fundamentals', date: 'Oct 14, 7:30 PM', amount: 12, status: 'Paid' },
]

export const studioStudents = [
  { name: 'Maya Chen', initials: 'MC', joined: 'Mar 2026', level: 'Intermediate', purchases: 6, spent: 182, lastActive: 'Today' },
  { name: 'Jordan Ellis', initials: 'JE', joined: 'Oct 2026', level: 'Intermediate', purchases: 1, spent: 89, lastActive: 'Today' },
  { name: 'Priya Raman', initials: 'PR', joined: 'Jan 2026', level: 'Advanced', purchases: 9, spent: 247, lastActive: 'Yesterday' },
  { name: 'Theo Martins', initials: 'TM', joined: 'Oct 2026', level: 'Beginner', purchases: 1, spent: 24, lastActive: 'Yesterday' },
  { name: 'Lena Fischer', initials: 'LF', joined: 'Jul 2026', level: 'Beginner', purchases: 3, spent: 38, lastActive: '2 days ago' },
  { name: 'Ava Lindqvist', initials: 'AL', joined: 'May 2026', level: 'Pre-professional', purchases: 7, spent: 311, lastActive: '4 days ago' },
  { name: 'Noah Brennan', initials: 'NB', joined: 'Aug 2026', level: 'Intermediate', purchases: 2, spent: 103, lastActive: '1 week ago' },
]

export const weeklyEarnings = [
  { week: 'Jul 27', amount: 980 }, { week: 'Aug 3', amount: 1120 }, { week: 'Aug 10', amount: 1040 },
  { week: 'Aug 17', amount: 1310 }, { week: 'Aug 24', amount: 1260 }, { week: 'Aug 31', amount: 1480 },
  { week: 'Sep 7', amount: 1390 }, { week: 'Sep 14', amount: 1620 }, { week: 'Sep 21', amount: 1550 },
  { week: 'Sep 28', amount: 1710 }, { week: 'Oct 5', amount: 1680 }, { week: 'Oct 12', amount: 1840 },
]

export const payouts = [
  { id: 'po_1042', date: 'Oct 9, 2026', gross: 1680, status: 'Paid' },
  { id: 'po_1041', date: 'Oct 2, 2026', gross: 1710, status: 'Paid' },
  { id: 'po_1040', date: 'Sep 25, 2026', gross: 1550, status: 'Paid' },
  { id: 'po_1039', date: 'Sep 18, 2026', gross: 1620, status: 'Paid' },
]
