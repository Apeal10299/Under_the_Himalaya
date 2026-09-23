renderHeader("stories");
renderFooter();

const provinceEl = document.getElementById("province");
const districtEl = document.getElementById("district");
const placeEl = document.getElementById("place");
const disasterEl = document.getElementById("disaster");
const yearEl = document.getElementById("year");
const searchEl = document.getElementById("search");
const grid = document.getElementById("storiesGrid");
const resultCount = document.getElementById("resultCount");

function fillFilters() {
  const all = coveredLocations(stories);
  populateCoveredSelect(provinceEl, all.provinces, "All covered provinces");
  populateCoveredSelect(districtEl, [], "Select province first", true);
  populateCoveredSelect(placeEl, [], "Select district first", true);
  populateCoveredSelect(disasterEl, all.disasters, "All disaster types");
  populateCoveredSelect(yearEl, getCoveredYears(stories), "All years");
}
function refreshDistricts() {
  const p = provinceEl.value;
  const districts = getCoveredDistricts(p);
  populateCoveredSelect(districtEl, districts, p ? "All covered districts" : "Select province first", !p);
  if (districtEl.value && !districts.includes(districtEl.value)) districtEl.value = "";
  populateCoveredSelect(placeEl, [], "Select district first", true);
}
function refreshPlaces() {
  const p = provinceEl.value, d = districtEl.value;
  const places = getCoveredPlaces(p, d);
  populateCoveredSelect(placeEl, places, d ? "All covered places" : "Select district first", !d);
  if (placeEl.value && !places.includes(placeEl.value)) placeEl.value = "";
}
function refreshLocationFilters() {
  const p = provinceEl.value, d = districtEl.value, pl = placeEl.value;
  const locationStories = stories.filter(s =>
    (!p || s.province === p) &&
    (!d || s.district === d) &&
    (!pl || s.place === pl)
  );
  const disasters = getCoveredDisasters(locationStories);
  populateCoveredSelect(disasterEl, disasters, "All disaster types");
  if (disasterEl.value && !disasters.includes(disasterEl.value)) disasterEl.value = "";

  const years = getCoveredYears(locationStories);
  populateCoveredSelect(yearEl, years, "All years");
  if (yearEl.value && !years.includes(yearEl.value)) yearEl.value = "";
}
function filtered() {
  const p=provinceEl.value,d=districtEl.value,pl=placeEl.value,di=disasterEl.value,y=yearEl.value,q=searchEl.value.trim().toLowerCase();
  return stories.filter(s =>
    (!p || s.province===p) &&
    (!d || s.district===d) &&
    (!pl || s.place===pl) &&
    (!di || s.disaster===di) &&
    (!y || s.year===y) &&
    (!q || `${s.title} ${s.province} ${s.district} ${s.place} ${s.disaster} ${s.description}`.toLowerCase().includes(q))
  );
}
function renderStories() {
  const data=filtered();
  resultCount.textContent=`${data.length} ${data.length===1?"story":"stories"}`;
  grid.innerHTML=data.length ? data.map(s => `
    <a class="story-card" href="${storyUrl(s.id)}">
      <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy">
      <div class="story-body">
        <div class="story-badge-row"><span class="tag">${escapeHtml(s.disaster)}</span><span class="story-source-badge ${storySourceClass(s)}">${storySourceLabel(s)}</span></div>
        <h3>${escapeHtml(s.title)}</h3>
        <div class="meta">📍 ${escapeHtml(s.province)}<br>${escapeHtml(s.district)} · ${escapeHtml(s.place)}<br>📅 ${escapeHtml(s.date)}</div>
        <button type="button" class="map-link" data-map-url="${escapeHtml(googleMapsUrl(s))}">View in Google Maps ↗</button>
        <p>${escapeHtml(s.description)}</p>
      </div>
    </a>`).join("") : `<div class="empty" style="grid-column:1/-1"><h3>No covered stories found</h3><p>Try another filter. Areas without stories are intentionally hidden.</p></div>`;
}
provinceEl.addEventListener("change",()=>{
  districtEl.value = "";
  placeEl.value = "";
  disasterEl.value = "";
  yearEl.value = "";
  refreshDistricts();
  refreshPlaces();
  refreshLocationFilters();
  renderStories();
});
districtEl.addEventListener("change",()=>{
  placeEl.value = "";
  disasterEl.value = "";
  yearEl.value = "";
  refreshPlaces();
  refreshLocationFilters();
  renderStories();
});
placeEl.addEventListener("change",()=>{
  disasterEl.value = "";
  yearEl.value = "";
  refreshLocationFilters();
  renderStories();
});
[disasterEl,yearEl].forEach(el=>el.addEventListener("change",renderStories));
searchEl.addEventListener("input",renderStories);
document.getElementById("reset").addEventListener("click",()=>{provinceEl.value="";districtEl.value="";placeEl.value="";disasterEl.value="";yearEl.value="";fillFilters();searchEl.value="";renderStories();});
fillFilters(); renderStories();


grid.addEventListener("click", event => {
  const mapButton = event.target.closest(".map-link");
  if (!mapButton) return;
  event.preventDefault();
  event.stopPropagation();
  window.open(mapButton.dataset.mapUrl, "_blank", "noopener,noreferrer");
});
