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

// At 1200px+, content pages switch to a left sidebar layout — this measures
// the sidebar's actual rendered width (which is just .page-title's width,
// since it auto-sizes to hug the title) so .page-content can offset past it
// correctly. At narrower widths this value is computed but unused, since
// the mobile CSS never references --sidebar-width.
function syncSidebarWidth() {
  const header = document.querySelector('.page-title');
  if (!header) return;
  const width = header.getBoundingClientRect().width;
  document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
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
