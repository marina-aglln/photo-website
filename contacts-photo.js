// Hides the Contacts photo when the gap between it and the contact info
// (the email / Instagram block) gets smaller than 60px — at every
// breakpoint where the photo exists (1024px and up).
//
// The gap is MEASURED on the live page rather than worked out from
// hard-coded window heights. The photo size changes per breakpoint (385,
// 441, 606px tall) and so does the text block's height, so fixed thresholds
// would go stale the moment anything changed — a font size, a spacing value,
// a new photo size. Measuring stays correct without edits here.
const MIN_GAP = 60;

const photo = document.querySelector('.contacts-photo');
const info = document.querySelector('.contact-info');

function updatePhotoVisibility() {
  if (!photo || !info) return;

  // Every run starts from the same clean state: photo shown, then measured.
  // If the previous run had hidden it, the gap couldn't be measured without
  // this, and a hidden photo could never come back when the window grows.
  photo.classList.remove('contacts-photo--hidden');

  // Below 1024px the CSS already hides the photo for good — nothing to decide.
  if (getComputedStyle(photo).display === 'none') return;

  // Distance between the bottom of the photo and the top of the text block.
  // When there isn't enough room, the layout has no free space left and the
  // two sit touching, so this reads 0 — which is also under the minimum.
  const gap = info.getBoundingClientRect().top - photo.getBoundingClientRect().bottom;

  if (gap < MIN_GAP) {
    photo.classList.add('contacts-photo--hidden');
  }
}

updatePhotoVisibility(); // initial run — this script loads after the DOM is parsed
window.addEventListener('load', updatePhotoVisibility);
window.addEventListener('resize', updatePhotoVisibility);

// Web fonts change text heights once they load, which shifts the gap.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(updatePhotoVisibility);
}
