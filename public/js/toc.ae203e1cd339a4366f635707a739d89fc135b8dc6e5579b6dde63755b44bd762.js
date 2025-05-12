document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toc-toggle");
    const tocWrapper = document.getElementById("TableOfContentsWrapper");
  
    if (toggleBtn && tocWrapper) {
      toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        tocWrapper.classList.toggle("hidden");
        const icon = toggleBtn.querySelector("i");
        icon.classList.toggle("fa-chevron-up");
        icon.classList.toggle("fa-chevron-down");
      });
    }
  });
  