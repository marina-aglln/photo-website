// Slideshow: instant swap, no transition, per spec.
// Interval: 3000ms — sped up from the initial 4500ms starting point per feedback.
const SLIDE_INTERVAL_MS = 3000;

// Real photos — 12 slides, assets/images/home/slide-01.webp through slide-12.webp.
// No orientation data is stored here: each image's portrait/landscape state
// is detected automatically once it loads (see showSlide below), by
// comparing its actual width and height. This means reordering, adding, or
// replacing photos later never requires updating a hardcoded flag to match.
const slides = Array.from(
  { length: 12 },
  (_, i) => `assets/images/home/slide-${String(i + 1).padStart(2, '0')}.webp`
);

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
  const src = slides[index];

  // Orientation is read from the image's own real dimensions once it
  // loads, rather than a stored flag — this stays correct automatically
  // no matter how the photo set is reordered or replaced later.
  imgEl.onload = () => {
    const isPortrait = imgEl.naturalHeight > imgEl.naturalWidth;
    slideshowEl.classList.toggle('slideshow--portrait', isPortrait);
  };

  imgEl.src = src;
  imgEl.alt = ''; // decorative — heading already conveys the page's identity
}

showSlide(currentIndex);
centerSlideshow(); // initial position, refined again by the listeners above

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex); // instant swap, no transition — per spec
}, SLIDE_INTERVAL_MS);
