renderHeader("map");
renderFooter();

const map = L.map("storyMap").setView([28.3949,84.1240],7);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const markers = [];
const pEl = document.getElementById("mapProvince");
const dEl = document.getElementById("mapDistrict");
const plEl = document.getElementById("mapPlace");
const diEl = document.getElementById("mapDisaster");

function fill() {
  const all=coveredLocations(stories);
  populateCoveredSelect(pEl, all.provinces, "All covered provinces");
  populateCoveredSelect(dEl, [], "Select province first", true);
  populateCoveredSelect(plEl, [], "Select district first", true);
  populateCoveredSelect(diEl, all.disasters, "All disaster types");
}
function updateD() {
  const p=pEl.value;
  populateCoveredSelect(dEl,getCoveredDistricts(p),p?"All covered districts":"Select province first",!p);
  populateCoveredSelect(plEl,[],"Select district first",true);
  draw();
}
function updateP() {
  const p=pEl.value,d=dEl.value;
  populateCoveredSelect(plEl,getCoveredPlaces(p,d),d?"All covered places":"Select district first",!d);
  draw();
}
function current() {
  const p=pEl.value,d=dEl.value,pl=plEl.value,di=diEl.value;
  return stories.filter(s=>(!p||s.province===p)&&(!d||s.district===d)&&(!pl||s.place===pl)&&(!di||s.disaster===di));
}
function draw() {
  markers.splice(0).forEach(m=>map.removeLayer(m));
  const data=current();
  data.forEach(s=>{
    const m=L.marker([s.lat,s.lng]).addTo(map);
    m.bindPopup(`<strong>${escapeHtml(s.title)}</strong><br><small>${escapeHtml(s.province)} · ${escapeHtml(s.district)} · ${escapeHtml(s.place)}</small><br><br><div class="map-popup-actions"><a href="${storyUrl(s.id)}" class="map-popup-link">Read story →</a><a href="${googleMapsUrl(s)}" class="map-popup-link" target="_blank" rel="noopener noreferrer">Go to Google Maps ↗</a></div>`);
    markers.push(m);
  });
  if(data.length>1) map.fitBounds(L.latLngBounds(data.map(s=>[s.lat,s.lng])),{padding:[35,35],maxZoom:10});
  else if(data.length===1) map.flyTo([data[0].lat,data[0].lng],11);
}
pEl.addEventListener("change",updateD);
dEl.addEventListener("change",updateP);
plEl.addEventListener("change",draw);
diEl.addEventListener("change",draw);
document.getElementById("resetMap").addEventListener("click",()=>{fill();map.setView([28.3949,84.1240],7);draw();});
fill();draw();
