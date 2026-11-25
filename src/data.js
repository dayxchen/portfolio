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
    // Lets other pages link straight to this card (/portfolio/#crave).
    id: 'crave',
    title: 'Crave',
    date: 'Nov 2026',
    kind: 'Web app',
    // A short silent teaser. It plays once when the card scrolls into view and rests on its last frame (the poster).
    video: asset('projects/crave-teaser.mp4'),
    poster: asset('projects/crave-teaser.jpg'),
    description:
      "A group restaurant picker. Start a group, friends join with a 4-digit code, and everyone swipes on nearby places. When everyone likes the same spot, it's a match.",
    points: [
      'Live group sessions over Socket.IO, so joins, progress, nudges and votes update for everyone at once',
      'Swipe cards with drag physics, flick detection and a details sheet, designed mobile-first from Figma',
      'Built the React frontend with a teammate on the backend, tested end to end with Playwright',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Socket.IO', 'Playwright'],
    // A page on this site with the full story. Opens in the same tab.
    details: asset('crave/'),
    links: [
      { label: 'Live demo', href: 'https://crave-app-ykml.onrender.com/' },
      { label: 'Code', href: 'https://github.com/colby-okazaki/crave' },
    ],
  },
  {
    id: 'flight-passport',
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
    details: asset('flight-passport/'),
    links: [
      { label: 'Live demo', href: 'https://dayxchen-flight-passport.vercel.app/' },
      { label: 'Code', href: 'https://github.com/dayxchen/Flight-Passport' },
    ],
  },
  {
    id: 'will-i-fly',
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
    details: asset('will-i-fly/'),
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
    'Travel & flights',
    'How people think',
    'UI & UX design',
    'Machine learning',
  ],
}

// Project details pages (/crave/, /flight-passport/), drawn by components/ProjectPage.jsx.
// myPart items are [bold lead, the rest of the sentence]. theirPart and liveNote are optional.
// `id` matches the project card's id, so the page's back link can return to that card.
export const craveDetails = {
  id: 'crave',
  title: 'Crave',
  howTitle: 'From “where should we eat?” to a match',
  partSub: 'Crave was a team of two. I owned everything people see and tap.',
  designSub: 'The goal: a group gets from opening the app to swiping in under a minute, and nobody has to stop and think.',
  lede:
    "A group restaurant picker for friends who can't decide where to eat. Everyone swipes on nearby places on their own phone, and the app calls a match the moment the whole group says yes to the same one.",
  facts: [
    ['Role', 'Front end and design'],
    ['Team', 'Me, plus Colby Okazaki on the back end'],
    ['Timeline', 'Oct to Nov 2026'],
    ['Built with', 'React 19, TypeScript, Vite, Socket.io'],
  ],
  links: [
    { label: 'Live demo', href: 'https://crave-app-ykml.onrender.com/' },
    { label: 'Code', href: 'https://github.com/colby-okazaki/crave' },
  ],
  liveNote: 'The demo runs on a free server that sleeps when nobody is using it, so the first load can take up to a minute.',
  video: asset('projects/crave-teaser.mp4'),
  poster: asset('projects/crave-teaser.jpg'),

  howItWorks: [
    'One person starts a group with their name and where they are eating: a typed place, or their current location.',
    'They share a 4-digit code or an invite link. Friends join with just a nickname, no account.',
    'In the lobby the host picks distance, price and type of food. Everyone sees the filters change live, and the host starts the round for the whole group.',
    'Each person swipes yes or no on the same stack of restaurant cards, on their own phone.',
    'The moment everyone says yes to the same place, every phone jumps to the match screen, with the address, hours and a button for directions.',
  ],

  myPart: [
    ['Every screen.', 'I designed the app in Figma, then built all 9 screens in React and TypeScript: Home, Start a group, Join, Lobby, Swipe, Details, Waiting, Match and No match. Each one has its own loading, empty and error states.'],
    ['A small design system.', 'The colors, type sizes, spacing and motion timings from Figma live in one theme file, and screens only use those values. Anything Figma didn’t cover yet is marked in that file instead of guessed. 12 shared components, like the button, chip, code input, details sheet and confetti, sit on top of it.'],
    ['Swiping and motion.', 'The card drag and flick, the details sheet, and the match celebration, including how each one behaves with reduced motion turned on.'],
    ['Talking to the server.', 'One layer handles every call to the back end, the live Socket.io connection, and a queue that makes sure no swipe gets lost on a bad connection.'],
    ['Some back end, too.', 'I added the host-only filter and start endpoints to the server, with tests, so the host’s lobby controls reach every phone.'],
  ],
  theirPart:
    'Colby built the back end: groups and join codes, restaurant data from OpenStreetMap, the swipe and match logic, live update events, rate limits, hosting on Render and load testing. Before either of us built much, we wrote the API contract together, and every change to it needed us both to agree.',

  design: [
    {
      title: 'The card follows your finger',
      body: 'As you drag, the card tilts (up to 20°), a LIKE or NOPE stamp fades in, and the next card grows underneath so you can see what’s coming. The drag moves the card directly instead of going through React state, so the screen doesn’t re-render on every frame.',
    },
    {
      title: 'Easy to commit, easy to take back',
      body: 'A swipe counts once the card passes a quarter of its width, or with a quick flick. Anything less springs back with a small overshoot. On Android the phone buzzes once as you cross the line, so you feel the decision before you let go.',
    },
    {
      title: 'Not everyone swipes',
      body: 'Pass and Like buttons and the arrow keys do the same thing as a swipe. A tap, anything under 6 pixels of movement, opens the details instead of nudging the card.',
    },
    {
      title: 'Details without losing your place',
      body: 'Details open in a bottom sheet over the stack. It closes by dragging down, a flick, tapping outside, or Escape. On small phones the middle scrolls while Pass and Like stay put, and the address opens Apple Maps on Apple devices and Google Maps everywhere else.',
    },
    {
      title: 'The match is the big moment',
      body: 'Coral fills the whole screen, even the phone’s status bar, confetti falls once, and the phone buzzes. Then it gets out of the way: directions, menu and hours. With reduced motion on, the confetti stays still and swiped cards fade instead of spinning off.',
    },
    {
      title: 'A code that’s easy to type',
      body: 'The four code boxes are one real input underneath, so the number keypad, paste and backspace all work the way people expect. Codes are kept as text so a leading zero isn’t lost, and invite links fill the code in for you.',
    },
    {
      title: 'Real data is messy',
      body: 'OpenStreetMap often has no price, rating, photo or hours. The card, the sheet and the match screen hide whatever is missing instead of showing empty slots or breaking.',
    },
    {
      title: 'Words people can act on',
      body: 'Errors say what to do next, like “Too many tries. Wait a minute and try again.” or “Can’t reach the server. Check your connection and try again.”, never an error code.',
    },
  ],
}

export const flightPassportDetails = {
  id: 'flight-passport',
  title: 'Flight Passport',
  howTitle: 'From a flight number to a map of everywhere you’ve been',
  partSub: 'A solo project. I designed and built all of it.',
  designSub: 'The goal: logging a flight should take seconds, and looking back at your travels should feel like flipping through a passport.',
  lede:
    "A flight log for your phone. Type in a flight number and a date, and it finds the flight, saves it, and maps everywhere you've flown on a spinning 3D globe.",
  facts: [
    ['Role', 'Design and development'],
    ['Team', 'Solo project'],
    ['Timeline', 'Sep to Oct 2026'],
    ['Built with', 'JavaScript, Supabase, globe.gl'],
  ],
  links: [
    { label: 'Live demo', href: 'https://dayxchen-flight-passport.vercel.app/' },
    { label: 'Code', href: 'https://github.com/dayxchen/Flight-Passport' },
  ],
  liveNote: 'Sign in with Google or an email link to try it. Your flights stay private to your account.',
  video: asset('projects/flight-passport-teaser.mp4'),
  poster: asset('projects/flight-passport-teaser.jpg'),

  howItWorks: [
    'Sign in with Google or a link sent to your email.',
    'Type a flight number like UA123 and pick the date. The app finds the airline, airports, times and aircraft.',
    'If it can’t find the flight, a short form lets you fill in the details yourself.',
    'Saved flights show up in My Flights, grouped into trips, with room for up to 20 photos each.',
    'The Globe draws an arc for every route, and Stats adds up your miles, hours in the air, countries and airports.',
  ],

  myPart: [
    ['Every screen.', 'Sign-in, Add a flight, My Flights, the Globe, Stats and the photo viewer, in light and dark mode.'],
    ['No framework.', 'Plain HTML, CSS and JavaScript modules with no build step, split into 15 small files that each do one job.'],
    ['Flight lookup.', 'AviationStack finds the flight, adsbdb fills in the aircraft when it’s missing, and a bundled airport list turns codes into names.'],
    ['Accounts and storage.', 'Supabase handles sign-in, a flights table where each person can only see their own rows, and a private photo bucket.'],
  ],

  design: [
    {
      title: 'Flight numbers, typed any way',
      body: 'UA123, UAL123 and “ua 123” all work. The lookup checks the day you picked, then one day either side, so a time zone can’t hide your flight.',
    },
    {
      title: 'Never a dead end',
      body: 'The free flight API only covers about the last two days. Older flights open a short form instead of an error, and the app remembers the limit so it stops asking.',
    },
    {
      title: 'Flights become trips',
      body: 'A flight joins a trip if it leaves from somewhere the trip has already been, within 21 days. Landing back home ends it. Connections, round trips and multi-city trips each become one card.',
    },
    {
      title: 'A globe that stays out of the way',
      body: 'Left alone, it spins and about once a minute flies the camera along one of your routes. Touch it and it stops, then picks up again 4 seconds after you let go. With reduced motion on, it holds still.',
    },
    {
      title: 'Photos that don’t eat your data',
      body: 'Photos are shrunk on your phone to 1600 pixels, the right way up, before they upload. They stay private and show through links that expire after an hour.',
    },
    {
      title: 'Feels like an app',
      body: 'Add it to your home screen and it opens full screen, clear of the notch. Dark mode follows your phone or a toggle, and the 3D library only loads when you open the Globe.',
    },
  ],
}

export const willIFlyDetails = {
  id: 'will-i-fly',
  title: 'Will I Fly?',
  howTitle: 'From a flight number to a delay forecast',
  partSub: 'A solo project: the model, the API and the website.',
  designSub: 'The goal: a straight answer you can trust, with the reasons shown instead of a black box.',
  lede:
    'Type in a U.S. flight number and it tells you how likely that flight is to land late, using a model trained on past flights and the weather at the airport right now.',
  facts: [
    ['Role', 'Machine learning and development'],
    ['Team', 'Solo project'],
    ['Timeline', 'Mar to Aug 2026'],
    ['Built with', 'Python, scikit-learn, SHAP, FastAPI, React'],
  ],
  links: [
    { label: 'Model code', href: 'https://github.com/dayxchen/Will-I-Fly' },
    { label: 'Frontend', href: 'https://github.com/dayxchen/will-i-fly-frontend' },
  ],
  video: asset('projects/will-i-fly-teaser.mp4'),
  poster: asset('projects/will-i-fly-teaser.jpg'),

  howItWorks: [
    'Type a flight number like AA1002.',
    'The app finds that flight’s current or next leg: airline, route and scheduled departure.',
    'It checks the weather right now at the departure airport: temperature, wind, rain and visibility.',
    'A model trained on past U.S. flights gives the chance it lands 15 or more minutes late.',
    'A breakdown shows which factors pushed that chance up or down, like the route, the hour or the wind.',
  ],

  myPart: [
    ['The model.', 'I cleaned the U.S. Department of Transportation’s on-time records, marked each flight delayed if it landed 15+ minutes late, matched weather to every airport and hour, and trained a Random Forest in scikit-learn.'],
    ['The API.', 'A FastAPI backend that looks up the live flight, fetches the weather, runs the model and explains the result, deployed on Vercel.'],
    ['The website.', 'A React frontend with the search, the live flight details and the “Why this prediction” breakdown.'],
  ],

  design: [
    {
      title: 'Show the why, not just a number',
      body: 'SHAP splits each prediction into the factors behind it. Each one gets a bar marked “More delay risk” or “Less delay risk”, measured against how often flights are late in general.',
    },
    {
      title: 'Plain names, not column names',
      body: 'The model sees names like cat__ORIGIN_STATE_ABR_CA. People see “Origin state: CA” and “Wind speed at origin”.',
    },
    {
      title: 'Answer first, details after',
      body: 'The prediction shows as soon as it’s ready, and the breakdown loads right after. A new search cancels the old one, so results from two flights never mix.',
    },
    {
      title: 'Not fooled by on-time flights',
      body: 'Most flights land on time, so a model could look accurate by always guessing “on time”. Training weights delayed flights more heavily so it actually learns what causes them.',
    },
    {
      title: 'Weather that matches the flight',
      body: 'For training, each past flight gets the weather at its airport for that day and hour, saved so each one is only fetched once. For a live prediction, it’s the weather right now.',
    },
    {
      title: 'Small enough to ship',
      body: 'The first model was 389 MB, too big for a serverless host. Capping tree depth and compressing it brought it to about 2 MB, and explanations use 25 of the 100 trees so they come back quickly.',
    },
  ],
}
