// <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.20/dist/lenis.css"></link>
// <script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>

/* =====================================================
     SMOOTH SCROLLING (Desktop & Tablet Only)
  ===================================================== */
// Initialize Lenis
const lenis = new Lenis({
  smooth: true,
  lerp: 0.05,
  WheelMultiplier: 1,
  infinite: false,
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
