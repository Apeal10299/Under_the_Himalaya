const STATE_KEY = "himalayans-admin-state";
const LOGIN_KEY = "himalayans-admin-session";
const DEFAULT_USER = "admin";
const DEFAULT_PASS = "admin123";

const $ = id => document.getElementById(id);
function syncAdminTheme(){ const t=document.documentElement.dataset.theme||"light"; const b=$("adminThemeToggle"); if(b){b.textContent=t==="dark"?"☀":"☾"; b.title=t==="dark"?"Switch to day mode":"Switch to night mode";} }
$("adminThemeToggle")?.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=next;localStorage.setItem("himalayans-theme",next);syncAdminTheme();});
syncAdminTheme();

function getState() {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveState(state) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}
function ensureState() {
  const s = getState();
  s.submissions = Array.isArray(s.submissions) ? s.submissions : [];
  s.overrides = s.overrides || {};
  s.deleted = Array.isArray(s.deleted) ? s.deleted : [];
  return s;
}

function allRecords() {
  const s = ensureState();
  const base = (window.himalayanBaseStories || []).map(story => ({
    ...story,
    ...(s.overrides[String(story.id)] || {}),
    status: s.deleted.includes(String(story.id)) ? "deleted" : "approved",
    source: "existing"
  }));

  const submissions = s.submissions.map(story => ({
    ...story,
    ...(s.overrides[String(story.id)] || {}),
    status: story.status || "pending",
    source: "submission"
  }));

  const added = Array.isArray(s.addedStories) ? s.addedStories : [];
  return [...base, ...added.map(story => ({
    ...story,
    ...(s.overrides[String(story.id)] || {}),
    status: s.deleted.includes(String(story.id)) ? "deleted" : (story.status || "approved"),
    source: "added"
  })), ...submissions];
}

function publicRecordData(r) {
  return {
    id: r.id,
    title: r.title,
    province: r.province,
    district: r.district,
    place: r.place,
    disaster: r.disaster,
    year: r.year || new Date().getFullYear().toString(),
    date: r.date || "",
    lat: Number(r.lat) || 0,
    lng: Number(r.lng) || 0,
    image: r.image || "",
    media: r.media || [],
    links: r.links || [],
    description: r.description || "",
    story: r.story || ""
  };
}

function render() {
  const records = allRecords();
  const query = $("adminSearch").value.trim().toLowerCase();
  const status = $("statusFilter").value;

  const visible = records.filter(r => {
    const text = `${r.title} ${r.name} ${r.email} ${r.province} ${r.district} ${r.place} ${r.disaster}`.toLowerCase();
    return (!query || text.includes(query)) && (status === "all" || r.status === status);
  });

  const base = records.filter(r => r.status !== "deleted");
  $("totalCount").textContent = base.length;
  $("pendingCount").textContent = records.filter(r => r.status === "pending").length;
  $("approvedCount").textContent = records.filter(r => r.status === "approved").length;
  $("deletedCount").textContent = records.filter(r => r.status === "deleted").length;

  $("storyTable").innerHTML = visible.map(r => `
    <tr>
      <td><strong>${esc(r.title || "Untitled")}</strong><small><span class="story-source-badge ${r.source === "submission" ? "user-story" : "admin-story"}">${r.source === "submission" ? "User Story" : "Admin Story"}</span></small></td>
      <td>${r.name ? esc(r.name) : "—"}${r.email ? `<br><a href="mailto:${esc(r.email)}">${esc(r.email)}</a>` : ""}</td>
      <td>${esc(r.province || "—")}<br><span>${esc(r.district || "")} · ${esc(r.place || "")}</span><br><a class="table-map-link" href="${esc(googleMapUrl(r))}" target="_blank" rel="noopener noreferrer">Go to Google Maps ↗</a></td>
      <td><span class="tag">${esc(r.disaster || "—")}</span></td>
      <td><span class="status ${r.status}">${r.status}</span></td>
      <td class="actions">
        ${r.status === "pending" ? `<button class="action approve" data-action="approve" data-id="${esc(r.id)}">Approve</button><button class="action decline" data-action="decline" data-id="${esc(r.id)}">Decline</button>` : ""}
        ${r.status !== "deleted" ? `<button class="action" data-action="edit" data-id="${esc(r.id)}">Edit</button>` : ""}
        ${r.status !== "deleted" ? `<button class="action delete" data-action="delete" data-id="${esc(r.id)}">Delete</button>` : ""}
      </td>
    </tr>
  `).join("");

  $("emptyState").classList.toggle("hidden", visible.length !== 0);
}

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}


function googleMapUrl(record) {
  const lat = Number(record?.lat);
  const lng = Number(record?.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && (lat !== 0 || lng !== 0)) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;
  }
  const q = [record?.place, record?.district, record?.province, "Nepal"].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

function coordinateValuesValid(latValue, lngValue) {
  if (latValue === "" || lngValue === "") return false;
  const lat = Number(latValue), lng = Number(lngValue);
  return Number.isFinite(lat) && Number.isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

function updateAdminMapPreview() {
  const link = $("adminMapPreview");
  if (!link) return;
  const lat = $("fLat").value.trim(), lng = $("fLng").value.trim();
  if (!coordinateValuesValid(lat, lng)) {
    link.classList.add("disabled");
    link.href = "#";
    return;
  }
  link.classList.remove("disabled");
  link.href = googleMapUrl({lat, lng});
}

function renderPhotoPreview(files = [], existing = []) {
  const root = $("photoPreview");
  if (!root) return;
  const selected = Array.from(files || []);
  if (selected.length) {
    root.innerHTML = selected.map(file => `<div class="photo-thumb"><img src="${URL.createObjectURL(file)}" alt="Preview"><span>${esc(file.name)}</span></div>`).join("");
    return;
  }
  const current = Array.isArray(existing) && existing.length ? existing : [];
  root.innerHTML = current.map(item => `<div class="photo-thumb"><img src="${esc(item.url || item)}" alt="Current photo"><span>Current photo</span></div>`).join("");
}

function compressImage(file, maxSide=1600, quality=.82) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) return reject(new Error(`${file.name} is not an image.`));
    if (file.size > 1.5 * 1024 * 1024) return reject(new Error(`${file.name} is larger than 1.5 MB.`));
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error(`Could not read ${file.name}.`));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.readAsDataURL(file);
  });
}


function populateAdminLocationFields(record = null) {
  const province = $("fProvince");
  const district = $("fDistrict");
  const placeList = $("adminPlaceList");
  const provinces = typeof nepalDistricts !== "undefined" ? Object.keys(nepalDistricts) : [];
  province.innerHTML = '<option value="">Select province</option>' + provinces.map(p => `<option value="${esc(p)}">${esc(p)}</option>`).join("");
  province.value = record?.province || "";
  const districts = (typeof nepalDistricts !== "undefined" && province.value) ? (nepalDistricts[province.value] || []) : [];
  district.innerHTML = '<option value="">Select district</option>' + districts.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join("");
  district.value = record?.district || "";
  const places = [...new Set((window.himalayanBaseStories || []).filter(x => (!province.value || x.province === province.value) && (!district.value || x.district === district.value)).map(x => x.place).filter(Boolean))].sort();
  placeList.innerHTML = places.map(pl => `<option value="${esc(pl)}"></option>`).join("");
}

function openEditor(record = null) {
  $("editorTitle").textContent = record ? "Edit story" : "Add new story";
  $("storyId").value = record?.id || "";
  $("fTitle").value = record?.title || "";
  $("fDisaster").value = record?.disaster || "";
  $("fProvince").value = record?.province || "";
  $("fDistrict").value = record?.district || "";
  $("fPlace").value = record?.place || "";
  $("fDate").value = record?.date || "";
  $("fYear").value = record?.year || new Date().getFullYear();
  $("fImage").value = record?.image || "";
  $("fDescription").value = record?.description || "";
  $("fStory").value = record?.story || "";
  $("fPhotoNote").value = record?.photo_note || "";
  $("fLat").value = record?.lat || "";
  $("fLng").value = record?.lng || "";
  $("fPhotos").value = "";
  $("fPhotos").dataset.currentMedia = JSON.stringify(Array.isArray(record?.media) ? record.media.filter(x => x?.type === "image") : (record?.image ? [{type:"image", url:record.image, caption:record.title}] : []));
  populateAdminLocationFields(record);
  renderPhotoPreview([], JSON.parse($("fPhotos").dataset.currentMedia || "[]"));
  updateAdminMapPreview();
  $("editorModal").classList.remove("hidden");
}

function closeEditor() {
  $("editorModal").classList.add("hidden");
}

function approve(id) {
  const s = ensureState();
  const item = s.submissions.find(x => String(x.id) === String(id));
  if (!item) return;
  item.status = "approved";
  item.approvedAt = new Date().toISOString();
  saveState(s);
  render();
  updateJsonPreview();
}

function decline(id) {
  if (!confirm("Decline this submission? It will be removed from the pending queue.")) return;
  const s = ensureState();
  const item = s.submissions.find(x => String(x.id) === String(id));
  if (!item) return;
  item.status = "declined";
  item.declinedAt = new Date().toISOString();
  saveState(s);
  render();
}

function deleteStory(id) {
  if (!confirm("Delete this story? It will no longer appear on the public site.")) return;
  const s = ensureState();
  const idString = String(id);
  if (!s.deleted.includes(idString)) s.deleted.push(idString);
  const item = s.submissions.find(x => String(x.id) === idString);
  if (item) item.status = "deleted";
  saveState(s);
  render();
}

async function saveStory(e) {
  e.preventDefault();
  const id = $("storyId").value;
  const latValue = $("fLat").value.trim();
  const lngValue = $("fLng").value.trim();
  if (!coordinateValuesValid(latValue, lngValue)) {
    alert("Please enter valid latitude (-90 to 90) and longitude (-180 to 180).");
    $("fLat").focus();
    return;
  }

  const selectedFiles = Array.from($("fPhotos").files || []);
  let media;
  if (selectedFiles.length) {
    try {
      const uploaded = await Promise.all(selectedFiles.map(file => compressImage(file)));
      media = uploaded.map((url, index) => ({ type:"image", url, caption:selectedFiles[index].name }));
    } catch (err) {
      alert(err.message);
      return;
    }
  } else {
    try { media = JSON.parse($("fPhotos").dataset.currentMedia || "[]"); } catch { media = []; }
  }

  const imageUrl = $("fImage").value.trim();
  if (imageUrl) media = [{type:"image", url:imageUrl, caption:$("fTitle").value.trim()}, ...media.filter(x => x.url !== imageUrl)];

  const record = {
    id: id || `story-${Date.now()}`,
    title: $("fTitle").value.trim(),
    disaster: $("fDisaster").value.trim(),
    province: $("fProvince").value.trim(),
    district: $("fDistrict").value.trim(),
    place: $("fPlace").value.trim(),
    date: $("fDate").value.trim(),
    year: $("fYear").value.trim(),
    image: media[0]?.url || imageUrl || "",
    media,
    description: $("fDescription").value.trim(),
    story: $("fStory").value.trim(),
    photo_note: $("fPhotoNote").value.trim(),
    lat: Number(latValue),
    lng: Number(lngValue),
    links: [],
    status: "approved"
  };

  const s = ensureState();
  if (id) {
    s.overrides[String(id)] = { ...record };
    const submission = s.submissions.find(x => String(x.id) === String(id));
    if (submission) Object.assign(submission, record, { status: "approved" });
  } else {
    s.addedStories = Array.isArray(s.addedStories) ? s.addedStories : [];
    s.addedStories.push(record);
  }
  saveState(s);
  closeEditor();
  render();
  updateJsonPreview();
}

function getApprovedJson() {
  return allRecords().filter(r => r.status === "approved").map(publicRecordData);
}
function updateJsonPreview() {
  const el = $("jsonPreview");
  if (el) el.textContent = JSON.stringify(getApprovedJson(), null, 2);
}
function openJson() {
  updateJsonPreview();
  $("jsonModal").classList.remove("hidden");
}
function closeJson() { $("jsonModal").classList.add("hidden"); }
function downloadJson() {
  const blob = new Blob([JSON.stringify(getApprovedJson(), null, 2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "approved-stories.json";
  a.click();
  URL.revokeObjectURL(a.href);
}

function login(e) {
  e.preventDefault();
  if ($("username").value === DEFAULT_USER && $("password").value === DEFAULT_PASS) {
    sessionStorage.setItem(LOGIN_KEY, "true");
    showAdmin();
  } else {
    $("loginError").textContent = "Incorrect username or password.";
  }
}

function showAdmin() {
  $("loginView").classList.add("hidden");
  $("adminView").classList.remove("hidden");
  render();
}
function logout() {
  sessionStorage.removeItem(LOGIN_KEY);
  $("adminView").classList.add("hidden");
  $("loginView").classList.remove("hidden");
}

$("loginForm").addEventListener("submit", login);
$("logoutBtn").addEventListener("click", logout);
$("adminSearch").addEventListener("input", render);
$("statusFilter").addEventListener("change", render);
$("newStoryBtn").addEventListener("click", () => openEditor());
$("jsonBtn").addEventListener("click", openJson);
$("closeJson").addEventListener("click", closeJson);
$("closeJsonBottom").addEventListener("click", closeJson);
$("downloadJson").addEventListener("click", downloadJson);
$("jsonModal").addEventListener("click", e => { if (e.target === $("jsonModal")) closeJson(); });
$("closeEditor").addEventListener("click", closeEditor);
$("cancelEditor").addEventListener("click", closeEditor);
$("storyForm").addEventListener("submit", saveStory);
$("fProvince").addEventListener("change", () => {
  const p = $("fProvince").value;
  const district = $("fDistrict");
  const districts = (typeof nepalDistricts !== "undefined" && p) ? (nepalDistricts[p] || []) : [];
  district.innerHTML = '<option value="">Select district</option>' + districts.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join("");
  $("fPlace").value = "";
});
$("fLat").addEventListener("input", updateAdminMapPreview);
$("fLng").addEventListener("input", updateAdminMapPreview);
$("fPhotos").addEventListener("change", () => renderPhotoPreview($("fPhotos").files));
$("fDistrict").addEventListener("change", () => {
  const p = $("fProvince").value, d = $("fDistrict").value;
  const places = [...new Set((window.himalayanBaseStories || []).filter(x => (!p || x.province === p) && (!d || x.district === d)).map(x => x.place).filter(Boolean))].sort();
  $("adminPlaceList").innerHTML = places.map(pl => `<option value="${esc(pl)}"></option>`).join("");
});
$("editorModal").addEventListener("click", e => {
  if (e.target === $("editorModal")) closeEditor();
});
$("storyTable").addEventListener("click", e => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const record = allRecords().find(r => String(r.id) === String(btn.dataset.id));
  if (!record) return;
  if (btn.dataset.action === "approve") approve(record.id);
  if (btn.dataset.action === "decline") decline(record.id);
  if (btn.dataset.action === "edit") openEditor(record);
  if (btn.dataset.action === "delete") deleteStory(record.id);
});

if (sessionStorage.getItem(LOGIN_KEY) === "true") showAdmin();
