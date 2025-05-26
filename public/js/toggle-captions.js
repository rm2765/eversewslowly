(() => {
  // <stdin>
  document.querySelectorAll(".figure").forEach((figure) => {
    figure.addEventListener("click", () => {
      figure.classList.toggle("show-caption");
    });
  });
})();
