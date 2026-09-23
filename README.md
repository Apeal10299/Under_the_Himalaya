# Understanding the Himalayans

Understanding the Himalayans is a responsive, multi-page static website for documenting community experiences, disaster events, places, and local knowledge from Himalayan regions.

The project uses plain HTML, CSS, and JavaScript. It does not require Node.js, React, a database, npm, or a build step.

## Quick Start

1. Open the project folder in VS Code.
2. Open `index.html` directly in a browser, or install the VS Code Live Server extension.
3. With Live Server, right-click `index.html` and choose **Open with Live Server**.
4. Use the navigation to open Stories, Map, About, Share a Story, or Contact.

Opening the files directly works for the main static pages. A local server is recommended when developing because it gives more predictable behavior for browser security rules and external assets.

## Project Structure

```text
index.html              Home page and featured stories
stories.html            Story archive and filters
story.html              Story detail page; opened with ?id=1
map.html                Leaflet story map and Google My Maps embed
about.html              Project background and purpose
submit-story.html       Community story submission form with demo email verification
contact.html            Contact form and project email
admin/index.html        Admin dashboard for approvals, edits, and content management
admin/admin.js          Admin workflow logic, approval actions, and editor modal

data/approved-stories.json  Default approved story source for static deployment
css/style.css           Shared layout, responsive styles, themes, cards, forms, and sliders
js/js_main/data.js      Story records, district reference, and localStorage admin state handling
js/js_main/filters.js   Covered-area filter helpers
js/js_main/common.js    Header, footer, theme, scroll controls, and shared helpers
js/js_main/app.js       Home page stories, statistics, and preview map
js/js_main/stories.js   Story archive filtering and card rendering
js/js_main/story.js     Story detail rendering, media sliders, links, and location map
js/js_main/map.js       Filterable story map and map markers
```

## Visitor Manual

### Home

The home page provides:

- A short introduction to the project.
- Counts for stories, covered provinces, covered districts, disaster types, and years.
- A featured-story section using the newest approved user submissions from the admin state.
- A preview map with a marker for every public story.
- Links to the full story archive, map, and submission form.

The public story list is assembled from:

- the built-in stories in `js/js_main/data.js`
- approved community submissions saved in browser `localStorage`
- admin-added stories approved in the admin panel

This means the home page and archive can reflect new approved content without a backend.

### Stories

The Stories page displays every public record from `js/js_main/data.js` as a card. A card includes the main image, disaster type, title, location, date, and description. Select a card to open its full story page.

Available controls are:

- Province
- District
- Place
- Disaster type
- Year
- Text search
- Reset

The location filters are dependent on one another:

1. Choose a province.
2. Choose a district from that province.
3. Choose a place from that district.
4. Choose a disaster type or year if needed.

Only values represented by existing stories appear. Areas without a story are intentionally hidden. Disaster types and years are also refreshed to match the selected location.

The search checks the story title, province, district, place, disaster type, and description.

### Story detail

Open a story with a URL such as `story.html?id=1`. The detail page includes:

- The main story image.
- Disaster type, title, place, date, and year.
- The short description and full story text.
- A separate photo gallery.
- A separate video gallery.
- Related article or newspaper links.
- A Leaflet/OpenStreetMap marker for the story location.
- Up to three related stories from the same district.

When a gallery contains more than one item, use the previous/next buttons or dots to change slides. Changing slides pauses video playback so audio does not continue from an off-screen item.

### Map

The Map page contains two map areas:

- **Story map:** a Leaflet map using OpenStreetMap tiles and coordinates from `js/js_main/data.js`.
- **Google My Maps:** the project's external Google map embed.

The story map can be filtered by province, district, place, and disaster type. Markers update immediately. Select a marker to see its title, location, and a link to the full story. Use **Reset map** to restore all markers and the Nepal-wide view.

### Day/night mode

Use the circular button in the navigation to switch between day and night mode. The selected theme is stored in browser `localStorage` under `himalayans-theme`, so it remains selected on future visits. On a first visit, the site follows the visitor's operating-system color preference.

The navigation also becomes a menu on smaller screens. The floating scroll controls show:

- A down arrow at the top of a page.
- Both arrows while the page is between the top and bottom.
- An up arrow at the bottom of a page.

### Share a Story

The Share a Story page collects:

- Name and email.
- Province, district, and place.
- Disaster type and event date.
- Story title and full story.
- Notes about photos, recordings, documents, or links.
- Permission for the project team to contact the contributor.
- Optional exact latitude and longitude for a direct Google Maps link.

This form is designed for a static GitHub Pages setup. It does not send data to a real backend. Instead, it stores the submission in browser `localStorage` with a `pending` status and shows a demo verification step before submission.

The form includes a simple email-validation flow for demo use only:

- the visitor enters an email
- a six-digit demo code is generated in the browser
- the code must be entered to submit
- a real email delivery service would still be required for production use

### Contact

Use the Contact page for questions, corrections, collaboration, or general messages. Community disaster accounts should use Share a Story instead.

The contact form currently behaves like a static placeholder and should be connected to a real form service before public launch.

## Adding and Editing Stories

The base public content is stored in `js/js_main/data.js` inside the `stories` array. Add a new object with a unique numeric `id`:

The static base stories are only the starting dataset. The app also merges in:

- approved submissions from the visitor form
- admin-added stories
- overrides and deletions saved in `localStorage`

This means the public website can evolve without changing the code every time a new story is approved.

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
  media: [
    {
      type: "image",
      url: "images/stories/kathmandu-flood.jpg",
      caption: "Flooded road in Kathmandu"
    },
    {
      type: "video",
      url: "media/kathmandu-flood.mp4",
      caption: "Community footage"
    }
  ],
  links: [
    {
      label: "Related newspaper article",
      url: "https://example.com/article"
    }
  ],
  description: "Short summary shown on story cards.",
  story: "The full story shown on the detail page."
}
```

### Story fields

| Field | Required | Purpose |
| --- | --- | --- |
| `id` | Yes | Unique value used by `story.html?id=...`. |
| `title` | Yes | Story title. |
| `province` | Yes | Province used by filters. |
| `district` | Yes | District used by filters and related stories. |
| `place` | Yes | Local place used by filters. |
| `disaster` | Yes | Disaster category used by filters. |
| `year` | Yes | Year used by the archive filter. Keep it as a string. |
| `date` | Recommended | Human-readable event date. |
| `lat` and `lng` | Yes for maps | Decimal latitude and longitude. |
| `image` | Recommended | Card image and fallback/main image. |
| `media` | Optional | Additional image and video items. |
| `links` | Optional | External articles, reports, or newspaper links. |
| `description` | Recommended | Short card and lead-page summary. |
| `story` | Recommended | Full story text. New lines are preserved. |

Use a unique ID for every story. If two records use the same ID, links and detail pages can open the wrong record.

## Media and Links

Media items use one of two types:

```js
{ type: "image", url: "images/story/photo.jpg", caption: "Photo caption" }
{ type: "video", url: "media/story/video.mp4", caption: "Video caption" }
```

Images can be local files or public image URLs. Videos should use a browser-supported file such as MP4 or WebM and must be directly reachable by the browser. A normal video webpage URL will not work in the video player.

Use the `links` array for related reporting:

```js
links: [
  { label: "NepalNews article", url: "https://www.nepalnews.com/" },
  { label: "Local newspaper archive", url: "https://thehimalayantimes.com/" }
]
```

External links open in a new tab. Use trusted HTTPS URLs and descriptive labels.

## Maps and Coordinates

The Leaflet maps use `lat` and `lng` from each story. Coordinates should be decimal numbers, for example:

```js
lat: 27.7172,
lng: 85.3240
```

The default map view is centered on Nepal. Story markers use OpenStreetMap tiles and include the required attribution in the page code.

The Google My Maps iframe is configured in `map.html`. Replace its `src` value with a new embed URL if the project map changes. The Google map must be shared publicly, or visitors will see an unavailable map.

## Styling and Layout

All shared styles live in `css/style.css`. The stylesheet controls:

- Responsive containers and page spacing.
- Header, navigation, and mobile menu.
- Day and night color variables.
- Story cards, forms, maps, and buttons.
- Photo and video slider sizing.
- Hover states, shadows, and reveal animations.

Use the existing CSS variables when changing colors. The main layout uses a wide content container with a small side gutter so text and sections use the available screen without becoming edge-to-edge or difficult to read.

For a new page, include `css/style.css`, create a `[data-site-header]` element, create a `[data-site-footer]` element, and load `js/common.js`. Call `renderHeader("page-name")` and `renderFooter()` after the page markup is available.

## External Services

The site currently loads:

- Leaflet 1.9.4 from `unpkg.com`.
- OpenStreetMap tiles.
- Google My Maps through an iframe.
- Several sample images from Unsplash.
- Sample videos from the MDN media example host.

An internet connection is required for these external assets. For a fully self-contained or production deployment, download and host approved assets locally and review the licenses and usage permissions first.

## Deployment

This project can be deployed to any static hosting provider, including GitHub Pages, Netlify, Vercel static hosting, Cloudflare Pages, or an ordinary web server.

Upload the complete folder while preserving these paths:

```text
index.html
css/style.css
js/data.js
js/common.js
...
```

Test the deployed site on desktop and mobile. Check the home page, one story URL, the map, filters, theme toggle, external media, and both forms.

## Troubleshooting

### A story does not appear in filters

Check that the story was added inside the `stories` array and that `province`, `district`, `place`, `disaster`, and `year` are not empty. Filters only list values found in existing story records.

### A story page says "Story not found"

Check the URL ID, for example `story.html?id=1`, and confirm that the corresponding `id` exists in `js/js_main/data.js`.

### A video does not play

Check that the URL points directly to an MP4 or WebM file, not to a video webpage. Also check that the host allows cross-origin browser requests and that the file is publicly reachable.

### The map is blank

Check the browser connection, Leaflet CDN loading, map container height, and that `lat` and `lng` are valid numbers.

### The Google map is unavailable

Confirm that the Google My Maps map is shared for public viewing and that the iframe URL is still valid.

### Forms do not save submissions

This is expected with the current static placeholder. Replace the `mailto:` action with Formspree, Netlify Forms, Google Forms, or a custom backend before treating the forms as a submission system.

## Content and Production Checklist

- Replace placeholder story text with reviewed community narratives.
- Replace sample images and videos with approved project media.
- Confirm permission and attribution for every external asset.
- Replace `stories@example.com` with a monitored project address.
- Connect both forms to a reliable submission service.
- Verify Google My Maps sharing settings.
- Test every story ID and map coordinate.
- Test filters after adding or editing stories.
- Check day and night mode on desktop and mobile.
- Test keyboard focus, image alt text, form labels, and readable contrast.
- Check the deployed site over HTTPS.


## Admin panel

The project includes an admin dashboard at `admin/index.html`.

**Demo login**
- Username: `admin`
- Password: `admin123`

The admin panel supports:
- Approving community-submitted stories
- Declining or deleting pending records
- Editing existing stories
- Adding new stories manually
- Searching and filtering by status
- Previewing Google Maps links for each record

### Important: GitHub Pages limitation

This is still a front-end/static prototype. Admin edits and approvals are stored in the browser's `localStorage`, so they are not automatically shared across visitors or devices. The login is a demo client-side login and is **not secure authentication**.

For production use, connect the same UI to a real backend/database such as Supabase, Firebase, or a custom API so approved stories and admin actions are stored centrally.

## Admin story workflow
- `submit-story.html` saves submissions in browser `localStorage` with a `pending` status instead of using a direct email client.
- `admin/index.html` shows pending submissions with **Approve** and **Decline** actions.
- Approved stories are merged into the public story feed and can also be exported through the admin preview panel.
- `data/approved-stories.json` is the static starter data file. Because GitHub Pages cannot rewrite repository files directly from browser JavaScript, a downloaded JSON export must be committed manually to persist approvals for all visitors.

### UX additions included in the current project
- Full-screen admin story editor popup
- Admin Story / User Story badges
- Google Maps links beside story locations
- Home page overview and stats section
- Nepal province + district dropdowns on Share a Story
- Place dropdown based on covered places, plus an Other place option
- Demo email verification UI before submission
