document.body.classList.add("home-page");
renderHeader("home");
renderFooter();

const featured = document.getElementById("featuredStories");
if (featured) {
  const newestSubmission = stories
    .filter(s => s.source === "user" || s.source === "admin-added")
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 3);
  featured.innerHTML = newestSubmission.length ? newestSubmission.map(s => `
    <a class="story-card" href="${storyUrl(s.id)}">
      <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy">
      <div class="story-body">
        <div class="story-badge-row"><span class="tag">${escapeHtml(s.disaster)}</span><span class="story-source-badge ${storySourceClass(s)}">${storySourceLabel(s)}</span></div>
        <h3>${escapeHtml(s.title)}</h3>
        <div class="meta">${escapeHtml(s.province)}<br>${escapeHtml(s.district)} · ${escapeHtml(s.place)}</div>
        <button type="button" class="map-link" data-map-url="${escapeHtml(googleMapsUrl(s))}">View in Google Maps ↗</button>
      </div>
    </a>`).join("") : `<div class="empty" style="grid-column:1/-1"><h3>No new community story yet</h3><p>Approved community submissions will appear here.</p></div>`;
}
document.querySelectorAll("[data-stat]").forEach(el=>{
  const key=el.dataset.stat;
  const locations=coveredLocations(stories);
  if(key==="stories") el.textContent=stories.length;
  if(key==="provinces") el.textContent=locations.provinces.length;
  if(key==="districts") el.textContent=locations.districts.length;
  if(key==="disasters") el.textContent=locations.disasters.length;
  if(key==="years") el.textContent=locations.years.length;
});
const preview = document.getElementById("homeMap");
if (preview) {
  const map=L.map(preview,{scrollWheelZoom:false}).setView([28.3949,84.1240],7);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap contributors"}).addTo(map);
  stories.forEach(s=>L.marker([s.lat,s.lng]).addTo(map).bindPopup(`<strong>${escapeHtml(s.title)}</strong><br><small>${escapeHtml(s.place)}, ${escapeHtml(s.district)}</small><br><br><a href="${storyUrl(s.id)}">Read story →</a><br><a href="${googleMapsUrl(s)}" target="_blank" rel="noopener noreferrer">Go to Google Maps ↗</a>`));
}


featured?.addEventListener("click", event => {
  const mapButton = event.target.closest(".map-link");
  if (!mapButton) return;
  event.preventDefault();
  event.stopPropagation();
  window.open(mapButton.dataset.mapUrl, "_blank", "noopener,noreferrer");
});
