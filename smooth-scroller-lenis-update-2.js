//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
//<script src="https://unpkg.com/lenis@1.3.1/dist/lenis.min.js"></script>
//<link rel="stylesheet" href="https://unpkg.com/lenis@1.1.20/dist/lenis.css">

//<script>
window.Webflow ||= [];
window.Webflow.push(() => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
    });

    // RAF loop
    function raf(time) {
      lenis.raf(time); // Lenis smooth scroll
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Refresh ScrollTrigger after all images/fonts loaded
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  } else {
    console.log("Lenis disabled on mobile");
  }
});
//</script>
