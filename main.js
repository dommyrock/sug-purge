function removeDivs() {
  if (window.location.hostname !== "www.linkedin.com") {
    return;
  }
  
  let spans = document.querySelectorAll("span.update-components-header__text-view");

  // Traverse up the DOM tree to find the parent div you want to remove
  spans.forEach((span) => {
    if (span.textContent.trim() === "Suggested") {
      let targetDiv = span.closest("div[data-id]");
      if (targetDiv) {
        targetDiv.remove();
      }
    }
  });
}

//Re-run evert 100ms
setInterval(removeDivs, 100);
