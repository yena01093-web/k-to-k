// K to K - 스크롤 시 요소가 부드럽게 나타나는 효과
(function () {
  var targets = document.querySelectorAll(
    ".card, .section-title, .section-sub, .story-row, .content-card, .contact-card, .note-box, .pull-quote"
  );

  if (!targets.length) return;

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  targets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach(function (el) {
    io.observe(el);
  });
})();
