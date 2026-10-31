// All the text on the site lives here. Edit this file to update your portfolio.

// Files in /public are served under the site's base path (/portfolio/).
const asset = (path) => import.meta.env.BASE_URL + path

export const profile = {
  name: 'Davin Chen',
  tagline:
    "a Cognitive Science student who builds clean, intuitive software. I care about how people actually use what I make, so every interaction should feel designed with intention.",
  resume: asset('resume.pdf'),
}

export const links = {
  email: 'davinatcollege@gmail.com',
  github: 'https://github.com/dayxchen',
  linkedin: 'https://www.linkedin.com/in/davin-chen-508594399/',
}

export const projects = [
  {
    title: 'Flight Passport',
    date: 'Sep 2026',
    kind: 'Web app',
    // A short silent teaser. It plays once when the card scrolls into view and rests on its last frame (the poster).
    video: asset('projects/flight-passport-teaser.mp4'),
    poster: asset('projects/flight-passport-teaser.jpg'),
    description:
      'A travel log for every flight you have taken. Add past flights, watch your routes light up on an interactive 3D globe, and attach photos from each trip.',
    points: [
      'Interactive 3D globe that draws each route between airports',
      'Flights grouped into trips, with photo uploads and travel stats',
      'Accounts and storage with Supabase, end-to-end tests with Playwright',
    ],
    tags: ['JavaScript', 'Three.js', 'Globe.gl', 'Supabase', 'Playwright'],
    links: [
      { label: 'Live demo', href: 'https://dayxchen-flight-passport.vercel.app/' },
      { label: 'Code', href: 'https://github.com/dayxchen/Flight-Passport' },
    ],
  },
  {
    title: 'Will I Fly',
    date: 'Aug 2026',
    kind: 'ML + web app',
    // A short silent teaser. It plays once when the card scrolls into view and rests on its last frame (the poster).
    video: asset('projects/will-i-fly-teaser.mp4'),
    poster: asset('projects/will-i-fly-teaser.jpg'),
    description:
      'A machine learning model that predicts whether a domestic flight will arrive late, using historical on-time records and weather data.',
    points: [
      'Trained on U.S. on-time performance data joined with weather at each airport',
      'Served through a FastAPI backend with a React frontend',
    ],
    tags: ['Python', 'scikit-learn', 'pandas', 'FastAPI', 'React'],
    links: [
      { label: 'Model code', href: 'https://github.com/dayxchen/Will-I-Fly' },
      { label: 'Frontend', href: 'https://github.com/dayxchen/will-i-fly-frontend' },
    ],
  },
]

export const moreProjects = [
  {
    title: 'De Anza Library Portal',
    description: 'Web portal for browsing and managing a library catalog, built in Python.',
    href: 'https://github.com/dayxchen/cis-28-final-project',
  },
]

export const about = {
  paragraphs: [
    "I'm Davin, a Cognitive Science student. I chose Cognitive Science because I'm drawn to the interaction between people and software.",
    'My coding journey started in high school with AP Computer Science A, and I have been hooked on software engineering ever since.',
    'To me, clean and intuitive software means nothing is cluttered and nothing is confusing. It should flow naturally from step to step, so you never have to stop and think about what to do next.',
  ],
  // Placeholder interests: swap these for your own.
  interests: [
    { emoji: '✈️', label: 'Travel & flights' },
    { emoji: '🧠', label: 'How people think' },
    { emoji: '🎨', label: 'UI & UX design' },
    { emoji: '🤖', label: 'Machine learning' },
  ],
}
