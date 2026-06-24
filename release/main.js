// Removes LinkedIn "Suggested" feed posts.
//
// LinkedIn ships two different markups depending on the rollout:
//  - Legacy: a <span class="update-components-header__text-view">Suggested</span>
//    inside a post wrapped in div[data-id].
//  - Current: obfuscated, randomized class names where the "Suggested" label is a
//    <p><span>Suggested</span></p>, and each feed post carries a visually-hidden
//    <h2>Feed post</h2> heading we can anchor on.
//
// Class names in the current markup are randomized per build, so we only rely on
// stable signals: the visible text ("Suggested", "Feed post") and element shape.

function isSuggestedLabel(el) {
  return el.textContent.trim() === "Suggested";
}

// Legacy layout: <span class="update-components-header__text-view"> inside div[data-id].
function removeLegacySuggested() {
  document
    .querySelectorAll("span.update-components-header__text-view")
    .forEach((span) => {
      if (!isSuggestedLabel(span)) return;
      const post = span.closest("div[data-id]");
      if (post) post.remove();
    });
}

// Current layout: anchor on the per-post "Feed post" heading, then check whether
// that post contains a "Suggested" header label.
function removeCurrentSuggested() {
  document.querySelectorAll("h2").forEach((h2) => {
    if (!/\bFeed post\b/i.test(h2.textContent)) return;

    const post = h2.parentElement;
    if (!post) return;

    const hasSuggestedLabel = Array.from(
      post.querySelectorAll("p > span")
    ).some(isSuggestedLabel);

    if (hasSuggestedLabel) post.remove();
  });
}

function removeDivs() {
  if (window.location.hostname !== "www.linkedin.com") {
    return;
  }

  removeLegacySuggested();
  removeCurrentSuggested();
}

// Re-run every 100ms to catch newly loaded feed content.
setInterval(removeDivs, 100);
