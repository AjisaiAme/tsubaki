let lastScrollTop = 0;
window.addEventListener("scroll", function() {
  const header = document.querySelector(".site-header");
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll down
    header.classList.add("hidden");
  } else {
    // Scroll up
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);
