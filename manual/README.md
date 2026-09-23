# Understanding the Himalayans — Project Manual

This manual is a simple user-focused guide for the project. It is separate from the main project README and is intended for day-to-day use, editing, story management, and deployment guidance.

## 1. Project Overview

Understanding the Himalayans is a static website that documents community experiences, disaster events, myths, local knowledge, and place-based stories from Himalayan regions.

It is built with:

- HTML
- CSS
- JavaScript
- Leaflet for maps
- OpenStreetMap tiles
- Google Maps links
- Browser localStorage for demo admin and submission flow

The website is designed to run without a backend server.

## 2. Project Purpose

This project helps visitors:

- read local disaster stories
- explore stories on a map
- browse stories by province, district, place, and disaster type
- submit new community stories
- review submissions through an admin dashboard

## 3. How to Run the Project

### Option 1: Open directly in browser

1. Open the project folder in VS Code.
2. Open the file named `index.html` in a browser.
3. The site will work as a static website.

### Option 2: Use Live Server

1. Install the VS Code Live Server extension.
2. Right-click on `index.html`.
3. Choose Open with Live Server.

This is the better option while developing or testing pages.

## 4. Main Pages

The main pages in the project are:

- `index.html` — home page with featured stories and statistics
- `stories.html` — story archive and filters
- `story.html` — detail page for an individual story
- `map.html` — map page with story map and Google Map embed
- `about.html` — project background
- `submit-story.html` — form to submit a new story
- `contact.html` — contact page
- `admin/index.html` — admin panel

## 5. Main Folder Structure

```text
project-root/
├── index.html
├── stories.html
├── story.html
├── map.html
├── about.html
├── submit-story.html
├── contact.html
├── admin/
│   ├── index.html
│   └── admin.js
├── css/
│   └── style.css
├── js/
│   └── js_main/
│       ├── app.js
│       ├── common.js
│       ├── data.js
│       ├── filters.js
│       ├── map.js
│       ├── stories.js
│       └── story.js
├── data/
│   └── approved-stories.json
├── images/
├── manual/
│   └── README.md
└── README.md
```

## 6. How the Website Works

### Home page

The home page displays:

- a short introduction
- story statistics
- featured stories
- preview map
- links to the archive, map, and story submission page

### Stories page

The Stories page lists all public stories and allows visitors to filter by:

- province
- district
- place
- disaster type
- year
- search text

### Story detail page

Each story opens in a detail page using a query parameter such as:

- `story.html?id=1`

The page shows:

- image
- title
- location
- disaster type
- description
- full story text
- related media
- related links
- map location

### Map page

The map page includes:

- a Leaflet-based story map
- OpenStreetMap tiles
- markers for each story
- Google Maps links

## 7. Adding or Editing Stories

The base story list is stored in:

- `js/js_main/data.js`

Every story should have a unique `id`.

Example structure:

```js
{
  id: 8,
  title: "Flood story from Kathmandu",
  province: "Bagmati Province",
  district: "Kathmandu",
  place: "Kathmandu",
  disaster: "Flood",
  year: "2026",
  date: "September 10, 2026",
  lat: 27.7172,
  lng: 85.3240,
  image: "images/stories/kathmandu-flood.jpg",
  description: "Short summary shown on story cards.",
  story: "The full story shown on the detail page."
}
```

Important rules:

- `id` must be unique
- `province`, `district`, `place`, `disaster`, and `year` should not be empty
- `lat` and `lng` must be valid numbers for the map
- use the same place names consistently for filters

## 8. User Story Submission Flow

Visitors can submit a story through:

- `submit-story.html`

The form collects:

- name
- email
- province
- district
- place
- disaster type
- event date
- story title
- story text
- optional photos
- optional location coordinates

Before submission, the form includes a demo email verification step. This is only for demonstration and does not send real emails.

When a story is submitted:

- it is stored in browser `localStorage`
- it gets a `pending` status
- it appears in the admin panel for review

## 9. Admin Workflow

The admin interface is available at:

- `admin/index.html`

### Demo admin login

- Username: `admin`
- Password: `admin123`

### Admin actions

The admin can:

- approve new user stories
- decline submissions
- edit existing stories
- delete stories
- add new stories manually
- filter by status
- search records

### Important note

This project is a front-end static site. The admin data is stored in browser `localStorage`, not in a real server database.

This means:

- changes are local to the browser
- they are not shared automatically across devices
- a real backend is required for public production use

## 10. Deployment

This project can be deployed to static hosting platforms such as:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- any standard web server

### Upload requirements

Keep the project structure intact when uploading.

## 11. Troubleshooting

### Story does not appear in filters

Check:

- the story is in `js/js_main/data.js`
- `province`, `district`, `place`, `disaster`, and `year` are filled
- no duplicate IDs are used

### Story page says “Story not found”

Check the URL such as:

- `story.html?id=1`

Then confirm the `id` exists in the data file.

### Map is blank

Check:

- internet access
- Leaflet library loading
- valid latitude and longitude values
- page container height

### Forms do not save data

This is expected in the current static setup. A real backend or form service is needed for production deployment.

## 12. Production Recommendations

Before public launch, it is recommended to:

- replace sample images and videos with approved media
- use a monitored email address instead of placeholder values
- connect forms to a real backend or service
- verify Google Maps sharing settings
- test all pages on desktop and mobile
- confirm that all story IDs, links, and coordinates work properly

## 13. Best Practice for Future Maintenance

- Keep the base story data clean and consistent
- Use unique IDs for every story
- Keep place names aligned with district and province names
- Keep images and media links reliable
- Review admin approvals before publishing
- Use the project as a static prototype unless a real backend is added

## 14. Summary

This project is a simple, static Himalayan storytelling website with:

- community story submission
- story archives and filtering
- map-based exploration
- admin moderation workflow
- static hosting support

It is perfect for small-scale storytelling and community documentation projects, but for multi-user production deployment, a proper backend database and authentication system should be added.
