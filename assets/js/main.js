const courses = [
  [
    "고등",
    "디자인 미대입시",
    "기초디자인과 조형 원리를 바탕으로 표현력과 문제 해결 능력을 키우며, 목표 대학에 맞춘 실기 역량을 강화합니다.",
  ],
  [
    "고등",
    "만화 · 애니메이션 입시",
    "캐릭터와 스토리텔링, 장면 연출 및 디지털 표현을 중심으로 창의적인 작품 제작 능력을 발전시킵니다.",
  ],
  [
    "초5–초6",
    "예중 입시",
    "소묘와 관찰 표현의 기초부터 실기 유형별 훈련까지, 예술중학교 진학을 위한 기본기를 다집니다.",
  ],
  [
    "중등",
    "예고 입시",
    "소묘와 발상, 표현 기법을 단계적으로 학습하여 예술고등학교 실기 전형에 필요한 역량을 준비합니다.",
  ],
  [
    "초 · 중등부",
    "전공탐색반",
    "디자인부터 회화와 일러스트레이션까지 다양한 미술 분야를 경험하며 자신에게 맞는 진로를 탐색합니다.",
  ],
  [
    "초 · 중등부",
    "디지털 드로잉반",
    "디지털 드로잉 도구를 활용해 일러스트레이션과 캐릭터 제작을 경험하며 디지털 표현력을 키웁니다.",
  ],
];
document.querySelector("#courses").innerHTML = courses
  .map(
    ([tag, title, body]) =>
      `<article class="course"><span class="tag">${tag}</span><h3>${title}</h3><p>${body}</p></article>`,
  )
  .join("");
const tabs = [...document.querySelectorAll("[role=tab]")];
function selectTab(tab) {
  tabs.forEach((t) => {
    const active = t === tab;
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
  });
}
tabs.forEach((tab, i) => {
  tab.tabIndex = i === 0 ? 0 : -1;
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    let n;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") n = (i + tabs.length - 1) % tabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = tabs.length - 1;
    if (n !== undefined) {
      e.preventDefault();
      tabs[n].focus();
      selectTab(tabs[n]);
    }
  });
});

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector("header");
const notice = document.querySelector(".notice");
const progress = document.querySelector(".scroll-progress");
function measureFixedBars() {
  document.documentElement.style.setProperty(
    "--header-height",
    `${header.getBoundingClientRect().height}px`,
  );
  document.documentElement.style.setProperty(
    "--notice-height",
    `${notice.getBoundingClientRect().height}px`,
  );
}
new ResizeObserver(measureFixedBars).observe(header);
new ResizeObserver(measureFixedBars).observe(notice);
measureFixedBars();
let scrollQueued = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
  header.classList.toggle("is-scrolled", scrollY > 10);
  scrollQueued = false;
}
addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    }
  },
  { passive: true },
);
addEventListener("resize", updateScroll);
new ResizeObserver(updateScroll).observe(document.body);
updateScroll();

const revealTargets = document.querySelectorAll(
  ".hero .wrap > *, main > section:not(.hero) > .eyebrow, main > section:not(.hero) > h2, main > section:not(.hero) > p:not(.eyebrow), .features article, .tabs, .course, .gallery-group, .social-card, .location-grid, .questions, .more, .footer-top, .footer-nav, .copyright",
);
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
    { threshold: 0, rootMargin: "-25px 0px -30px 0px" },
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    if (el.closest(".features") || el.closest(".course-grid"))
      el.style.setProperty("--reveal-delay", `${(i % 3) * 65}ms`);
    observer.observe(el);
  });
  reducedMotion.addEventListener("change", (e) => {
    if (e.matches) {
      observer.disconnect();
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    }
  });
}

document.querySelectorAll("details").forEach((details) => {
  const summary = details.querySelector("summary");
  let animation = null;
  let expanded = details.open;
  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const startHeight = details.getBoundingClientRect().height;
    animation?.cancel();
    expanded = !expanded;
    summary.setAttribute("aria-expanded", String(expanded));
    details.classList.toggle("is-expanded", expanded);
    if (reducedMotion.matches) {
      details.open = expanded;
      return;
    }
    details.style.height = "";
    details.open = true;
    const endHeight = expanded
      ? details.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + 4;
    animation = details.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
      duration: 320,
      easing: "cubic-bezier(.25,.8,.25,1)",
    });
    animation.onfinish = () => {
      details.open = expanded;
      animation = null;
    };
  });
});

tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.classList.remove("panel-enter");
    void panel.offsetWidth;
    panel.classList.add("panel-enter");
  }),
);
const navLinks = [...document.querySelectorAll('header nav a[href^="#"]')];
if ("IntersectionObserver" in window) {
  const sectionsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          navLinks.forEach((link) => {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      });
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
  );
  document
    .querySelectorAll("main section[id]")
    .forEach((section) => sectionsObserver.observe(section));
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");
const mobileNav = matchMedia("(max-width: 760px)");
function setMenu(open, returnFocus = false) {
  header.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  mainNav.inert = mobileNav.matches && !open;
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener("click", () =>
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true"),
);
mainNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    if (mobileNav.matches) setMenu(false, true);
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true")
    setMenu(false, true);
});
document.addEventListener("pointerdown", (event) => {
  if (mobileNav.matches && !header.contains(event.target)) setMenu(false);
});
header.addEventListener("focusout", (event) => {
  if (mobileNav.matches && event.relatedTarget && !header.contains(event.relatedTarget))
    setMenu(false);
});
mobileNav.addEventListener("change", () => setMenu(false));
setMenu(false);

const galleryGroups = document.querySelectorAll("[data-gallery]");
galleryGroups.forEach((group) => {
  group.querySelector(".gallery-viewport").addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      group.classList.toggle("is-paused");
    }
  });
});
if ("IntersectionObserver" in window) {
  const galleryObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting),
      ),
    { rootMargin: "150px" },
  );
  galleryGroups.forEach((group) => galleryObserver.observe(group));
}

const heroSection = document.querySelector(".hero");
const heroCopy = heroSection.querySelector(".wrap");
function positionHeroCopy() {
  const available = Math.max(0, (heroSection.clientHeight - heroCopy.offsetHeight) / 2 - 24);
  const lift = Math.min(heroSection.clientHeight * 0.15, available);
  heroSection.style.setProperty("--hero-copy-offset", `${-lift}px`);
}
const heroPositionObserver = new ResizeObserver(positionHeroCopy);
heroPositionObserver.observe(heroSection);
heroPositionObserver.observe(heroCopy);
positionHeroCopy();
document.fonts.ready.then(positionHeroCopy);
