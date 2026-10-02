// Detects each gallery photo's real orientation (portrait vs landscape)
// once it loads, toggling the matching CSS class. This avoids needing to
// hardcode orientation per photo in the HTML — same approach already used
// for the homepage slideshow, and for the same reason: it stays correct
// automatically if photos are ever reordered or swapped later.
document.querySelectorAll('.gallery-image').forEach((img) => {
  function applyOrientation() {
    const isPortrait = img.naturalHeight > img.naturalWidth;
    img.classList.toggle('gallery-image--portrait', isPortrait);
    img.classList.toggle('gallery-image--landscape', !isPortrait);
  }

  if (img.complete) {
    applyOrientation(); // already loaded (e.g. from browser cache)
  } else {
    img.addEventListener('load', applyOrientation);
  }
});
