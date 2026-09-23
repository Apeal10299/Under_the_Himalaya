/* Shared page helpers */
function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}


function storySourceLabel(story) {
  return story?.source === "user" ? "User Story" : "Admin Story";
}

function storySourceClass(story) {
  return story?.source === "user" ? "user-story" : "admin-story";
}

function googleMapsUrl(story) {
  const lat = Number(story?.lat);
  const lng = Number(story?.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng) && (lat !== 0 || lng !== 0)) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;
  }
  const query = [story?.place, story?.district, story?.province, "Nepal"].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getStory(id) {
  return stories.find(s => String(s.id) === String(id));
}

function storyUrl(id) {
  return `story.html?id=${encodeURIComponent(id)}`;
}

function renderHeader(active) {
  const root = document.querySelector("[data-site-header]");
  if (!root) return;
  root.innerHTML = `
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="index.html"><img src="images/logo.png" alt="Understanding the Himalayans" class="logo"></a>
        <nav class="nav-links">
          <a class="${active==="home"?"active":""}" href="index.html">Home</a>
          <a class="${active==="stories"?"active":""}" href="stories.html">Stories</a>
          <a class="${active==="map"?"active":""}" href="map.html">Map</a>
          <a class="${active==="about"?"active":""}" href="about.html">About</a>
          <a class="${active==="submit"?"active":""}" href="submit-story.html">Share a Story</a>
          <a class="${active==="contact"?"active":""}" href="contact.html">Contact</a>
          <a class="${active==="Stroycycle"?"active":""}" href="https://storycycle.com/" target="#" rel="noopener">StoryCycle</a>
        </nav>
        <div class="nav-tools">
          <button class="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle day/night mode"><span class="theme-icon">☾</span></button>
          <button class="menu-toggle" aria-label="Open menu">☰</button>
        </div>
      </div>
    </header>`;
  const button = root.querySelector(".menu-toggle");
  const links = root.querySelector(".nav-links");
  button?.addEventListener("click", () => links.classList.toggle("open"));
  links?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

  const toggle = root.querySelector(".theme-toggle");
  const saved = localStorage.getItem("himalayans-theme");
  const preferred = saved || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(preferred);
  toggle?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("himalayans-theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const icon = document.querySelector(".theme-icon");
  if (icon) icon.textContent = theme === "dark" ? "☀" : "☾";
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.title = theme === "dark" ? "Switch to day mode" : "Switch to night mode";
    toggle.setAttribute("aria-label", toggle.title);
  }
}

function initScrollArrows() {
  const existing = document.querySelector(".scroll-arrow-panel");
  if (existing) existing.remove();

  const panel = document.createElement("div");
  panel.className = "scroll-arrow-panel";
  panel.setAttribute("aria-label", "Scroll controls");
  panel.innerHTML = `
    <button class="scroll-arrow up" type="button" aria-label="Scroll to top" title="Back to top">↑</button>
    <button class="scroll-arrow down" type="button" aria-label="Scroll to bottom" title="Scroll down">↓</button>
  `;
  document.body.appendChild(panel);

  const upButton = panel.querySelector(".scroll-arrow.up");
  const downButton = panel.querySelector(".scroll-arrow.down");

  const updateArrowState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const atTop = scrollTop <= 12;
    const atBottom = maxScroll <= 12 || scrollTop >= maxScroll - 12;

    if (atTop) {
      upButton.style.display = "none";
      downButton.style.display = "flex";
    } else if (atBottom) {
      upButton.style.display = "flex";
      downButton.style.display = "none";
    } else {
      upButton.style.display = "flex";
      downButton.style.display = "flex";
    }
  };

  upButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  downButton.addEventListener("click", () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll > 0 ? maxScroll : 0, behavior: "smooth" });
  });

  updateArrowState();
  window.addEventListener("scroll", updateArrowState, { passive: true });
  window.addEventListener("resize", updateArrowState);
}

function renderFooter() {
  const root = document.querySelector("[data-site-footer]");
  if (!root) return;
  root.innerHTML = `
    <footer class="site-footer" style>
      <div class="container footer-grid">
        <div class="footer-brand-block"><div class="footer-mark"><img src="images/footer-logo.png" alt="Understanding the Himalayans Logo" style="width: 200px; height: 40px;"></div><h3>Understanding the Himalayans</h3><p>"StoryCycle harnesses the power of storytelling and digital mapping to drive social impact, environmental sustainability, and community engagement. We are a registered 501(c)(3) nonprofit organization, which means your generous donations are tax-deductible.”</p></div>
        <div class="footer-links"><h4>Explore</h4><a href="https://storycycle.com/" target="_blank" rel="noopener">StoryCycle Website</a><a href="stories.html">Stories</a><a href="map.html">Map</a><a href="about.html">About</a></div>
        <div class="footer-links">
          <h4>Resources</h4>
          <div class="footer-resource-list">
            <a href="tel:+97714112128" class="footer-contact-item">
              <span class="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" aria-label="Phone"><path d="M6.6 10.8c1.3 2.7 3.4 4.8 6.1 6.1l2-2c.3-.3.8-.4 1.2-.2 1.3.4 2.6.7 4 .7.7 0 1.2.5 1.2 1.2v3.9c0 .7-.5 1.2-1.2 1.2C10.7 21.3 2.7 13.3 2.7 3.9c0-.7.5-1.2 1.2-1.2h3.9c.7 0 1.2.5 1.2 1.2 0 1.4.3 2.7.7 4 .1.4 0 .9-.3 1.2l-2 2z"/></svg>
              </span>
              <span>+977-1-4112128</span>
            </a>
            <a href="mailto:contact@storycycle.com" class="footer-contact-item">
              <span class="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" aria-label="Email"><path d="M3.5 6.5h17a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 16V8a1.5 1.5 0 0 1 1.5-1.5zm0 0 8.5 7 8.5-7"/></svg>
              </span>
              <span>contact@storycycle.com</span>
            </a>
            <a href="https://maps.app.goo.gl/RDz6byzzXgXM19p36" target="_blank" rel="noopener" class="footer-contact-item">
              <span class="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" aria-label="Location"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11zm0-8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
              </span>
              <span>Shakti Binayak Marg, Garigaun, Kathmandu, Nepal</span>
            </a>
            <span class="footer-contact-item static-item">
              <span class="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img" aria-label="Location"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11zm0-8.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
              </span>
              <span>1001 W Euless Blvd #319, Euless, TX 76040, USA</span>
            </span>
          </div>
        </div>
      </div>
      <div class="container footer-bottom"><span style="color: #fdf8f8; font-size: 0.9rem;">© ${new Date().getFullYear()} Story Cycle All rights reserved.</span><span>Stories rooted in place by Group A</span></div>
    </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  initScrollArrows();

  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(e => e.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  els.forEach(e => observer.observe(e));
});
