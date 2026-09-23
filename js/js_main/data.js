/*
  UNDERSTANDING THE HIMALAYANS — STORY DATA

  IMPORTANT:
  The filters are intentionally built from the locations that actually
  have stories. If Kathmandu has no story, Kathmandu will NOT appear
  in the filters. When you add the first Kathmandu story, Kathmandu
  automatically appears.

  Add your real stories to this array.
*/
const stories = [
  {
    id: 1,
    title: "Floods in Koshi Province",
    province: "Koshi Province",
    district: "Sunsari",
    place: "Dharan",
    disaster: "Flood",
    year: "2024",
    date: "August 12, 2024",
    lat: 26.812,
    lng: 87.283,
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=85", caption: "Flooded street in Sunsari" },
      { type: "image", url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=85", caption: "Water levels rose over local roads" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", caption: "Short local flood footage" }
    ],
    links: [
      { label: "NepalNews articles", url: "https://www.nepalnews.com/" },
      { label: "Local newspaper archive", url: "https://thehimalayantimes.com/" },
      { label: "NepalNew articles", url: "https://www.nepalnews.com/" },
      { label: "बाढीसँगै बगेका ‘पूर्वतयारी तथा प्रतिकार्य योजना’", url: "https://www.nepalnews.com/" },
    ],
    description: "Heavy rainfall caused severe flooding in the community. Families described how water levels rose quickly and affected homes, roads and livelihoods.",
    story: "This is a sample story. Replace this with the full interview, community account, quotes and field notes."
  },
  {
    id: 2,
    title: "Landslide in Gandaki",
    province: "Gandaki Province",
    district: "Kaski",
    place: "Pokhara",
    disaster: "Landslide",
    year: "2024",
    date: "July 28, 2024",
    lat: 28.2096,
    lng: 83.9856,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85", caption: "Landslide-prone hill slope" },
      { type: "image", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", caption: "Road impacted after the slide" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", caption: "Community recovery clip" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", caption: "Community recovery clip" }
    ],
    links: [
      { label: "Pokhara update", url: "https://kathmandupost.com/" },
      { label: "Regional paper", url: "https://www.myrepublica.com/" }
    ],
    description: "A landslide disrupted roads and affected nearby communities. Residents shared their experience of evacuation and recovery.",
    story: "Replace this sample with your real story, quotes, photographs and local knowledge."
  },
  {
    id: 3,
    title: "Heavy Rain in Lumbini",
    province: "Lumbini Province",
    district: "Dang",
    place: "Ghorahi",
    disaster: "Heavy Rain",
    year: "2024",
    date: "July 15, 2024",
    lat: 28.0339,
    lng: 82.487,
    image: "https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=85", caption: "Late monsoon rain in Lumbini" },
      { type: "image", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", caption: "Road access interrupted" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", caption: "Rainfall conditions" }
    ],
    links: [
      { label: "Lumbini weather update", url: "https://www.ekantipur.com/" },
      { label: "District report", url: "https://www.himalayannews.org/" }
    ],
    description: "Heavy rainfall affected transportation, agriculture and everyday life in several communities.",
    story: "Replace this sample with your real story."
  },
  {
    id: 4,
    title: "Earthquake Aftermath in Karnali",
    province: "Karnali Province",
    district: "Jajarkot",
    place: "Nalgad",
    disaster: "Earthquake",
    year: "2023",
    date: "November 10, 2023",
    lat: 28.7,
    lng: 82.2,
    image: "https://images.unsplash.com/photo-1598514982901-ae627e2e7a55?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1598514982901-ae627e2e7a55?auto=format&fit=crop&w=1200&q=85", caption: "Earthquake damage in the district" },
      { type: "image", url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=85", caption: "Temporary shelter area" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", caption: "Aftershock conditions" }
    ],
    links: [
      { label: "Earthquake response update", url: "https://thehimalayantimes.com/" },
      { label: "District newspaper", url: "https://www.nepalitimes.com/" }
    ],
    description: "Communities faced damage to homes and infrastructure following a major earthquake and worked together during recovery.",
    story: "Replace this sample with your real story."
  },
  {
    id: 5,
    title: "Floods in Bagmati",
    province: "Bagmati Province",
    district: "Sindhupalchok",
    place: "Melamchi",
    disaster: "Flood",
    year: "2023",
    date: "June 20, 2023",
    lat: 27.83,
    lng: 85.58,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=85", caption: "Flooded settlement" },
      { type: "image", url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=85", caption: "River overflow at the village edge" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", caption: "Field coverage video" }
    ],
    links: [
      { label: "Bagmati flood report", url: "https://nepallive.com/" },
      { label: "Community update", url: "https://www.risingnepaldaily.com/" }
    ],
    description: "Flooding affected settlements along the river corridor and impacted homes, agriculture and local infrastructure.",
    story: "Replace this sample with your real story."
  },
  {
    id: 6,
    title: "Landslide in Sudurpashchim",
    province: "Sudurpashchim Province",
    district: "Doti",
    place: "Dipayal",
    disaster: "Landslide",
    year: "2022",
    date: "September 5, 2022",
    lat: 29.26,
    lng: 80.94,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", caption: "Slope failure in Doti" },
      { type: "image", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85", caption: "Roadside damage" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", caption: "Monsoon conditions" }
    ],
    links: [
      { label: "Mountain region report", url: "https://www.setopati.com/" },
      { label: "Local notice board", url: "https://www.kathmandupost.com/" }
    ],
    description: "A landslide affected roads and homes during the monsoon season. Local residents worked together to reconnect isolated settlements.",
    story: "Replace this sample with your real story."
  },
  {
    id: 7,
    title: "Flood in Birendranagar",
    province: "Karnali Province",
    district: "Surkhet",
    place: "Birendrnagar",
    disaster: "Flood",
    year: "2024",
    date: "October 4, 2024",
    lat: 28.579698,
    lng: 81.636588,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85", caption: "High-altitude glacier valley" },
      { type: "image", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", caption: "Mountain settlement near the lake" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", caption: "High mountain movement" }
    ],
    links: [
      { label: "Glacial risk article", url: "https://www.theguardian.com/" },
      { label: "Feature report", url: "https://www.himalayanjournal.org/" }
    ],
    description: "A story exploring the risks faced by high mountain communities living near glacial lakes.",
    story: "Replace this sample with your real story."
  },
    {
    id: 8,
    title: "Flood in Birendranagar",
    province: "Karnali Province",
    district: "Surkhet",
    place: "r",
    disaster: "Flood",
    year: "2024",
    date: "October 4, 2024",
    lat: 28.579698,
    lng: 81.636588,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85", caption: "High-altitude glacier valley" },
      { type: "image", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85", caption: "Mountain settlement near the lake" },
      { type: "video", url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", caption: "High mountain movement" }
    ],
    links: [
      { label: "Glacial risk article", url: "https://www.theguardian.com/" },
      { label: "Feature report", url: "https://www.himalayanjournal.org/" }
    ],
    description: "A story exploring the risks faced by high mountain communities living near glacial lakes.",
    story: "Replace this sample with your real story."
  }

];

/*
  Optional full administrative reference.
  The website DOES NOT show every administrative area in the filters.
  Filters are generated only from stories above.
*/
const nepalDistricts = {
  "Koshi Province":["Bhojpur","Dhankuta","Ilam","Jhapa","Khotang","Morang","Okhaldhunga","Panchthar","Sankhuwasabha","Solukhumbu","Sunsari","Taplejung","Terhathum","Udayapur"],
  "Madhesh Province":["Bara","Dhanusha","Mahottari","Parsa","Rautahat","Saptari","Sarlahi","Siraha"],
  "Bagmati Province":["Bhaktapur","Chitwan","Dhading","Dolakha","Kathmandu","Kavrepalanchok","Lalitpur","Makwanpur","Nuwakot","Ramechhap","Rasuwa","Sindhuli","Sindhupalchok"],
  "Gandaki Province":["Baglung","Gorkha","Kaski","Lamjung","Manang","Mustang","Myagdi","Nawalpur","Parbat","Syangja","Tanahun"],
  "Lumbini Province":["Arghakhanchi","Banke","Bardiya","Dang","Gulmi","Kapilvastu","Palpa","Pyuthan","Rolpa","Rukum East","Rupandehi"],
  "Karnali Province":["Dailekh","Dolpa","Humla","Jajarkot","Jumla","Kalikot","Mugu","Rukum West","Salyan","Surkhet"],
  "Sudurpashchim Province":["Achham","Baitadi","Bajhang","Bajura","Dadeldhura","Darchula","Doti","Kailali","Kanchanpur"]
};


/*
  PUBLIC STORY STATE
  GitHub Pages is static, so admin changes are stored in this browser's
  localStorage. For a real multi-user admin system, connect this UI to
  a backend/database (e.g. Supabase/Firebase).
*/
window.himalayanBaseStories = stories.map(s => JSON.parse(JSON.stringify(s)));

(function applyPublicStoryState() {
  try {
    const state = JSON.parse(localStorage.getItem("himalayans-admin-state") || "{}");
    const deleted = new Set(state.deleted || []);
    const overrides = state.overrides || {};
    const submissions = Array.isArray(state.submissions) ? state.submissions : [];
    const added = Array.isArray(state.addedStories) ? state.addedStories : [];

    const base = window.himalayanBaseStories
      .filter(s => !deleted.has(String(s.id)))
      .map(s => ({ ...s, ...(overrides[String(s.id)] || {}), source: "admin" }));

    const approvedSubmissions = submissions
      .filter(s => s.status === "approved" && !deleted.has(String(s.id)))
      .map(s => ({ ...s, ...(overrides[String(s.id)] || {}), source: "user" }));

    const approvedAdded = added
      .filter(s => (s.status || "approved") === "approved" && !deleted.has(String(s.id)))
      .map(s => ({ ...s, ...(overrides[String(s.id)] || {}), source: "admin-added" }));

    stories.length = 0;
    stories.push(...base, ...approvedAdded, ...approvedSubmissions);
  } catch (e) {
    console.warn("Could not load saved story state.", e);
  }
})();
