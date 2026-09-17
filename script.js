// Slideshow: instant swap, no transition, per spec.
// Interval: 3000ms — sped up from the initial 4500ms starting point per feedback.
const SLIDE_INTERVAL_MS = 3000;

// TEMP placeholder set: alternating landscape/portrait, generated as inline
// SVG data URIs so this runs with zero real assets and zero network requests.
// Replace this array with real image paths once photos are ready —
// each entry just needs a src and an orientation flag.
function makePlaceholder(label, isPortrait) {
  const w = isPortrait ? 240 : 320;
  const h = isPortrait ? 320 : 240;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="100%" height="100%" fill="#D9D9D9"/>
      <text x="50%" y="50%" font-family="sans-serif" font-size="16"
            fill="#71736E" text-anchor="middle" dominant-baseline="middle">${label}</text>
    </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

const slides = Array.from({ length: 13 }, (_, i) => {
  const isPortrait = i % 2 === 0; // alternate orientation; adjust to real set later
  return {
    src: makePlaceholder(`Image ${i + 1}`, isPortrait),
    portrait: isPortrait,
  };
});

const slideshowEl = document.getElementById('slideshow');
const imgEl = document.getElementById('slideshow-img');
const heroEl = document.querySelector('.hero');
const nameFirstEl = document.querySelector('.site-name__first');
const nameLastEl = document.querySelector('.site-name__last');
const menuEl = document.querySelector('.menu');
const siteNameEl = document.querySelector('.site-name');

let currentIndex = 0;

// Center the slideshow in the actual visual gap around the heading — but
// what counts as "the gap" depends on the heading's current layout mode:
//
// - Mobile (stacked, flex-direction: column): the two heading lines sit
//   one above the other, so the gap is between the first line's bottom
//   and the second line's top.
// - Desktop 1200px+ (row, flex-direction: row): both heading halves sit
//   side-by-side at the top, so there's no second line below — the
//   relevant gap is between the bottom of that top row and the menu.
//
// Rather than duplicate breakpoint pixel values here, this reads the
// heading's actual computed flex-direction to know which mode is active.
function centerSlideshow() {
  const heroRect = heroEl.getBoundingClientRect();
  const firstRect = nameFirstEl.getBoundingClientRect();
  const lastRect = nameLastEl.getBoundingClientRect();
  const isRowLayout = getComputedStyle(siteNameEl).flexDirection === 'row';

  let gapTop, gapBottom;

  if (isRowLayout) {
    // Desktop: gap is between the heading row's bottom edge and the menu's top
    const menuRect = menuEl.getBoundingClientRect();
    gapTop = Math.max(firstRect.bottom, lastRect.bottom) - heroRect.top;
    gapBottom = menuRect.top - heroRect.top;
  } else {
    // Mobile: gap is between the two stacked heading lines
    gapTop = firstRect.bottom - heroRect.top;
    gapBottom = lastRect.top - heroRect.top;
  }

  const midpoint = (gapTop + gapBottom) / 2;
  slideshowEl.style.top = `${midpoint}px`;
}

// Recalculate on load, on resize, and once web fonts finish loading —
// Anton's metrics shift the text's rendered height slightly once it swaps
// in from the fallback font, which would otherwise leave this stale.
window.addEventListener('load', centerSlideshow);
window.addEventListener('resize', centerSlideshow);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(centerSlideshow);
}

function showSlide(index) {
  const slide = slides[index];
  imgEl.src = slide.src;
  imgEl.alt = ''; // decorative — heading already conveys the page's identity
  slideshowEl.classList.toggle('slideshow--portrait', slide.portrait);
}

showSlide(currentIndex);
centerSlideshow(); // initial position, refined again by the listeners above

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex); // instant swap, no transition — per spec
}, SLIDE_INTERVAL_MS);
