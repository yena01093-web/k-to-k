// K to K - 스크롤 시 요소가 부드럽게 나타나는 효과
(function () {
  var targets = document.querySelectorAll(
    ".card, .section-title, .section-sub, .story-row, .content-card, .contact-card, .note-box, .pull-quote, .feature-article"
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

// K to K - 콘텐츠 페이지 카테고리 필터
(function () {
  var filterBar = document.querySelector(".category-filter");
  if (!filterBar) return;

  var buttons = filterBar.querySelectorAll(".cat-btn");
  var articles = document.querySelectorAll(".feature-article[data-category]");
  var descEl = document.querySelector(".category-desc");
  var emptyEl = document.querySelector(".category-empty");

  function applyFilter(filter) {
    var visibleCount = 0;
    articles.forEach(function (article) {
      var match = filter === "all" || article.dataset.category === filter;
      article.style.display = match ? "" : "none";
      if (match) visibleCount += 1;
    });
    if (emptyEl) {
      emptyEl.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      if (descEl) {
        descEl.textContent = btn.dataset.desc || "";
      }
      applyFilter(btn.dataset.filter);
    });
  });
})();
