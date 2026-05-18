$(function () {
  var $carousel = $("#product-carousel");
  var $counter = $("#slide-counter");
  var totalSlides = $carousel.find(".carousel-card").length;

  // Initialize carousel
  $carousel.owlCarousel({
    loop: true,
    margin: 12,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
    },
  });

  // Update counter safely
  function updateCounter(event) {
    // Get the index of the current **real** slide
    var realIndex = event.item.index - event.relatedTarget._clones.length / 2;
    if (realIndex < 0) realIndex += totalSlides; // wrap around negative
    var current = (realIndex % totalSlides) + 1; // 1-based counting
    $counter.text(`Showing ${current} of ${totalSlides}`);
  }

  // Update counter on carousel load and change
  $carousel.on("initialized.owl.carousel changed.owl.carousel", updateCounter);

  // Show initial counter
  $counter.text(`Showing 1 of ${totalSlides}`);

  // Next/Prev buttons
  $("#carousel-next").click(() => $carousel.trigger("next.owl.carousel"));
  $("#carousel-prev").click(() => $carousel.trigger("prev.owl.carousel"));

  // Scroll to target on card click
  $(document).on("click", ".carousel-card", function () {
    var target = document.getElementById($(this).data("target"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });

  // Pause/play on hover
  $(document).on({
    mouseenter: () => $carousel.trigger("stop.owl.autoplay"),
    mouseleave: () => $carousel.trigger("play.owl.autoplay", [5000]),
  }, ".carousel-card");
});

function bindMenuToggle() {
  var bars = document.getElementById("fa-bars");
  var xmark = document.getElementById("fa-xmark");
  var nav = document.querySelector("nav");

  if (!bars || !xmark || !nav) return;

  bars.addEventListener("click", function () {
    nav.style.display = "grid";
    bars.style.display = "none";
    xmark.style.display = "flex";
    xmark.style.position = "absolute";
    xmark.style.right = "40px";
  });

  xmark.addEventListener("click", function () {
    nav.style.display = "none";
    bars.style.display = "flex";
    xmark.style.display = "none";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindMenuToggle);
} else {
  bindMenuToggle();
}
