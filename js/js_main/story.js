renderHeader("story");
renderFooter();

const id = new URLSearchParams(location.search).get("id");
const story = getStory(id);
const root = document.getElementById("storyDetail");

if (!story) {
  root.innerHTML = `<div class="empty-page"><h1>Story not found</h1><p>This story does not exist or its ID is incorrect.</p><a class="btn primary" href="stories.html">Back to stories</a></div>`;
} else {
  const media = Array.isArray(story.media) && story.media.length ? story.media : (story.image ? [{ type: "image", url: story.image, caption: story.title }] : []);
  const mainMedia = media[0];
  const imageMedia = media.filter(item => item.type === "image");
  const videoMedia = media.filter(item => item.type === "video");
  const externalLinks = Array.isArray(story.links) && story.links.length ? story.links : [];

  const renderMediaSlider = (items, kind) => {
    if (!items.length) return "";
    if (items.length === 1) {
      return items.map(item => {
        if (kind === "video") {
          return `<div class="story-media-single"><video controls preload="metadata" src="${escapeHtml(item.url)}"></video><small>${escapeHtml(item.caption || "Video")}</small></div>`;
        }
        return `<div class="story-media-single"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.caption || story.title)}"><small>${escapeHtml(item.caption || "Image")}</small></div>`;
      }).join("");
    }

    return `
      <div class="story-media-slider" data-kind="${kind}">
        <div class="story-media-viewport">
          <div class="story-media-track">
            ${items.map(item =>
              kind === "video"
                ? `<div class="story-media-slide"><video controls preload="metadata" src="${escapeHtml(item.url)}"></video><small>${escapeHtml(item.caption || "Video")}</small></div>`
                : `<div class="story-media-slide"><img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.caption || story.title)}"><small>${escapeHtml(item.caption || "Image")}</small></div>`
            ).join("")}
          </div>
        </div>
        <div class="story-media-controls">
          <button class="story-media-nav prev" type="button" aria-label="Previous ${kind}">‹</button>
          <div class="story-media-dots">${items.map((_, index) => `<span class="story-media-dot ${index === 0 ? "active" : ""}" data-index="${index}"></span>`).join("")}</div>
          <button class="story-media-nav next" type="button" aria-label="Next ${kind}">›</button>
        </div>
      </div>
    `;
  };

  document.title = `${story.title} — Understanding the Himalayans`;
  root.innerHTML = `
    <article class="story-detail">
      ${mainMedia ? `<img class="story-hero-image" src="${escapeHtml(mainMedia.url)}" alt="${escapeHtml(mainMedia.caption || story.title)}">` : ""}
      <div class="story-detail-content">
        <div class="story-badge-row story-detail-badges"><span class="tag">${escapeHtml(story.disaster)}</span><span class="story-source-badge ${storySourceClass(story)}">${storySourceLabel(story)}</span></div>
        <h1>${escapeHtml(story.title)}</h1>
        <div class="story-location">📍 ${escapeHtml(story.province)} · ${escapeHtml(story.district)} · ${escapeHtml(story.place)} <a class="map-link-inline" href="${escapeHtml(googleMapsUrl(story))}" target="_blank" rel="noopener noreferrer">View in Google Maps ↗</a></div>
        <div class="story-date">${escapeHtml(story.date)} · ${escapeHtml(story.year)}</div>
        <p class="lead">${escapeHtml(story.description)}</p>
        <div class="story-long">${escapeHtml(story.story || "").replace(/\n/g, "<br><br>")}</div>

        ${(imageMedia.length || videoMedia.length) ? `<div class="story-media-row">${imageMedia.length ? `<div class="story-media-section"><h3>Photos</h3><div class="media-panel">${renderMediaSlider(imageMedia, "image")}</div></div>` : ""}${videoMedia.length ? `<div class="story-media-section"><h3>Videos</h3><div class="media-panel">${renderMediaSlider(videoMedia, "video")}</div></div>` : ""}</div>` : ""}

        ${externalLinks.length ? `
          <div class="story-links">
            <h3>Related links</h3>
            <div class="story-links-list">
              ${externalLinks.map(link => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("")}
            </div>
          </div>
        ` : ""}

        <div class="story-map-card">
          <h2>Story location</h2>
          <div id="storyMap"></div>
        </div>
      </div>
    </article>`;

  document.querySelectorAll(".story-media-slider").forEach(slider => {
    const track = slider.querySelector(".story-media-track");
    const slides = [...slider.querySelectorAll(".story-media-slide")];
    const prev = slider.querySelector(".story-media-nav.prev");
    const next = slider.querySelector(".story-media-nav.next");
    const dots = [...slider.querySelectorAll(".story-media-dot")];
    let index = 0;

    const pauseMediaInSlide = () => {
      const activeSlide = slides[index];
      if (!activeSlide) return;
      const activeVideo = activeSlide.querySelector("video");
      if (activeVideo && !activeVideo.paused) {
        activeVideo.pause();
      }
    };

    const updateSlider = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
      });

      if (slider.dataset.kind === "video") {
        slides.forEach((slide, slideIndex) => {
          const video = slide.querySelector("video");
          if (!video) return;
          if (slideIndex === index) {
            video.pause();
          } else {
            video.pause();
          }
        });
      }
    };

    prev.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      pauseMediaInSlide();
      updateSlider();
    });

    next.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      pauseMediaInSlide();
      updateSlider();
    });

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        index = Number(dot.dataset.index);
        pauseMediaInSlide();
        updateSlider();
      });
    });

    updateSlider();
  });

  const map = L.map("storyMap").setView([story.lat, story.lng], 11);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  L.marker([story.lat, story.lng]).addTo(map).bindPopup(`<strong>${escapeHtml(story.title)}</strong>`).openPopup();

  const related = stories.filter(s => s.id !== story.id && s.district === story.district).slice(0, 3);
  if (related.length) {
    const section = document.createElement("section");
    section.className = "section";
    section.innerHTML = `<div class="container"><div class="section-head"><div><span class="eyebrow">More stories</span><h2>Stories from the same area</h2></div></div><div class="story-grid"></div></div>`;
    document.querySelector("main").appendChild(section);
    const grid = section.querySelector(".story-grid");
    related.forEach(s => {
      grid.innerHTML += `<a class="story-card" href="${storyUrl(s.id)}"><img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}"><div class="story-body"><div class="story-badge-row"><span class="tag">${escapeHtml(s.disaster)}</span><span class="story-source-badge ${storySourceClass(s)}">${storySourceLabel(s)}</span></div><h3>${escapeHtml(s.title)}</h3><div class="meta">${escapeHtml(s.province)}<br>${escapeHtml(s.district)} · ${escapeHtml(s.place)}</div><button type="button" class="map-link" data-map-url="${escapeHtml(googleMapsUrl(s))}">View in Google Maps ↗</button></div></a>`;
    });
  }
}

document.addEventListener("click", event => {
  const mapButton = event.target.closest(".story-card .map-link");
  if (!mapButton) return;
  event.preventDefault();
  event.stopPropagation();
  window.open(mapButton.dataset.mapUrl, "_blank", "noopener,noreferrer");
});
