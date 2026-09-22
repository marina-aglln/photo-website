// Email link copies its address to the clipboard instead of navigating.
// Briefly swaps the visible text to "Copied!" as feedback, then reverts —
// copying with zero visual confirmation would be invisible to the user.
const emailLink = document.getElementById('email-link');

if (emailLink) {
  const textEl = emailLink.querySelector('.contact-link__text');
  const originalText = textEl.textContent;
  const email = emailLink.dataset.email;
  let revertTimer = null;

  emailLink.addEventListener('click', async (event) => {
    event.preventDefault(); // this link has no real destination (href="#")

    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Clipboard API can fail (e.g. insecure context, permissions) —
      // fail silently rather than showing a broken "Copied!" state that
      // wasn't actually true.
      console.error('Copy to clipboard failed:', err);
      return;
    }

    textEl.textContent = 'Copied!';
    clearTimeout(revertTimer); // handles rapid repeat clicks cleanly
    revertTimer = setTimeout(() => {
      textEl.textContent = originalText;
    }, 1500);
  });
}
