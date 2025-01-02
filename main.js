function removeDivs() {
  // Select all spans with the specified class
  let spans = document.querySelectorAll('span.update-components-header__text-view');

  spans.forEach((span) => {
    // Check if the span contains the text "Suggested"
    if (span.textContent.trim() === "Suggested") {
      // Traverse up the DOM tree to find the parent div you want to remove
      let targetDiv = span.closest('div[data-id]');
      if (targetDiv) {
        targetDiv.remove(); // Remove the matched div
      }
    }
  });
}

// Run the function periodically
setInterval(removeDivs, 100);

//V1
// function removeDivs() {
//   let elm = document.querySelector(
//     "span.update-components-header__text-view:nth-child(1) > div:nth-child(1) > span > span"
//   ).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

//   if(elm) {elm.remove();}
// }
// setInterval(removeDivs, 100);