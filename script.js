const powerBiReports = {
  ecommerce:
    "https://app.powerbi.com/view?r=eyJrIjoiN2ZiNTIxNWQtM2E4My00OTY4LWI5MDgtOTFkZmI2NThjNjA5IiwidCI6IjNkOWY4ZTkzLWFlMzItNDE3My1hMjkwLTgzZTM5NzNjNWE0MSIsImMiOjh9",
  "advanced-analysis":
    "https://app.powerbi.com/view?r=eyJrIjoiNTA5OTEwMmItMDAxNy00OTQ0LWE3ODQtNzgwNWUxNzUzYjMwIiwidCI6IjNkOWY4ZTkzLWFlMzItNDE3My1hMjkwLTgzZTM5NzNjNWE0MSIsImMiOjh9",
};

document.querySelectorAll(".powerbi-embed").forEach((frame) => {
  const reportUrl = powerBiReports[frame.dataset.reportId];
  const media = frame.closest(".project-media");

  if (!reportUrl) {
    frame.hidden = true;
    return;
  }

  frame.addEventListener("load", () => {
    media?.classList.add("report-loaded");
  });

  frame.src = reportUrl;
  media?.classList.add("has-live-report");
});

const scrollSections = [...document.querySelectorAll("[data-scroll-section]")];
const scrollLinks = document.querySelectorAll("[data-scroll-target]");

const setActiveSection = (sectionId) => {
  scrollLinks.forEach((link) => {
    const isActive = link.dataset.scrollTarget === sectionId;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

let spyRaf = 0;
const updateActiveSection = () => {
  spyRaf = 0;
  if (!scrollSections.length) return;
  const probe = window.innerHeight * 0.35;
  let active = scrollSections[0];
  for (const section of scrollSections) {
    if (section.getBoundingClientRect().top - probe <= 0) active = section;
  }
  setActiveSection(active.dataset.scrollSection);
};

const scheduleSpyUpdate = () => {
  if (!spyRaf) spyRaf = requestAnimationFrame(updateActiveSection);
};

window.addEventListener("scroll", scheduleSpyUpdate, { passive: true });
window.addEventListener("resize", scheduleSpyUpdate);
updateActiveSection();

let scrollHideTimer;

const showScrollIndicator = () => {
  document.body.classList.add("is-scrolling");
  window.clearTimeout(scrollHideTimer);

  scrollHideTimer = window.setTimeout(() => {
    document.body.classList.remove("is-scrolling");
  }, 900);
};

showScrollIndicator();
window.addEventListener("scroll", showScrollIndicator, { passive: true });
