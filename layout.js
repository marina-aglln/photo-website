// Keeps .page-content clear of the fixed .page-title header/sidebar. Its
// size changes per breakpoint AND per page (the sidebar hugs whatever H1
// text is on that specific page, so this can never be a hardcoded value —
// same reasoning as the homepage slideshow's runtime-measured centering.
function syncHeaderHeight() {
  const header = document.querySelector('.page-title');
  if (!header) return;
  const height = header.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--header-height', `${height}px`);
}

// At 1200px+, content pages switch to a left sidebar layout. This computes
// ONE authoritative total width for that sidebar box — used both to size
// the box itself and to offset .page-content's margin-left, so the two can
// never disagree with each other.
//
// IMPORTANT — this measurement must be self-correcting, not cumulative.
// The box's CSS width is itself driven by the --sidebar-width variable this
// function sets. If measurement were taken while that variable already
// holds a stale or wrong value from a previous run, the box would still be
// constrained to that wrong width WHILE being re-measured — silently
// locking in whatever error occurred at some earlier point (e.g. right
// after page load, before layout settles) and re-confirming it on every
// subsequent call, including on resize. That's what "works once, breaks
// after resizing" looks like.
//
// The fix: before measuring, forcibly reset to a clean, unconstrained
// state every single time — clear any explicit width and hide the gallery
// title (see below) — so each measurement is independent of whatever
// happened on the previous one.
function syncSidebarWidth() {
  const container = document.querySelector('.page-title');
  if (!container) return;

  // On the gallery detail page, .page-title wraps BOTH the h1 and a
  // (usually much wider) gallery title. The box should hug the h1 ALONE —
  // hiding the gallery title entirely during measurement removes any
  // ambiguity about whether/how a percentage-width sibling might
  // otherwise influence the parent's auto-sizing calculation, rather than
  // relying on that browser behavior being reliable (it wasn't).
  // On About/Work, .page-title IS the h1 — there's no second element, so
  // this branch simply does nothing extra.
  const gallery = container.querySelector('.gallery-title');
  const previousGalleryDisplay = gallery ? gallery.style.display : null;
  if (gallery) gallery.style.display = 'none';

  // Clear any width this element already has from a previous run of this
  // function (via --sidebar-width) so the browser recomputes shrink-to-fit
  // from scratch, uninfluenced by that old value.
  const previousInlineWidth = container.style.width;
  container.style.width = 'auto';

  const totalWidth = container.getBoundingClientRect().width;

  // Restore both temporary changes immediately — this function only ever
  // borrows the DOM for the instant it takes to measure.
  container.style.width = previousInlineWidth;
  if (gallery) gallery.style.display = previousGalleryDisplay;

  document.documentElement.style.setProperty('--sidebar-width', `${totalWidth}px`);
}

function syncLayout() {
  syncHeaderHeight();
  syncSidebarWidth();
}

syncLayout(); // initial — script runs after the DOM is already parsed
window.addEventListener('load', syncLayout);
window.addEventListener('resize', syncLayout);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(syncLayout);
}
