//text animation
 
function initTextAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  document.querySelectorAll(".text-animate").forEach(el => {
    const originalText = el.textContent.trim();
    
    const originalHeight = el.offsetHeight;
    const computedStyle = window.getComputedStyle(el);
    const originalFontSize = parseFloat(computedStyle.fontSize);
    
    el.textContent = ""; 
    const words = originalText.split(" ");
    const wordElements = [];
    
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.style.display = "inline-block";  
 
      Array.from(word).forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";
        charSpan.style.display = "inline-block";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });
 
      el.appendChild(wordSpan);
      wordElements.push(wordSpan);
 
      if (wordIndex !== words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });
    
    const newHeight = el.offsetHeight;
    if (newHeight > originalHeight * 1.2) {
      let fontSize = originalFontSize;
      while (el.offsetHeight > originalHeight * 1.2 && fontSize > originalFontSize * 0.85) {
        fontSize -= 0.5;
        el.style.fontSize = fontSize + 'px';
      }
    }
    
    // Initial states
    gsap.set(wordElements, { y: 35, opacity: 0 });
    gsap.set(el.querySelectorAll(".char"), {
      x: 12,
      opacity: 0,
      filter: "blur(3px)"
    });
    
    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    
    tl.to(wordElements, {
      y: 0,
      opacity: 1,
      duration: 0.95,
      stagger: 0.10,
      ease: "sine.out",
      force3D: true
    });
    
    tl.to(el.querySelectorAll(".char"), {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      ease: "sine.out",
      duration: 0.9,
      stagger: 0.02,
      force3D: true
    }, 0.2);
  });
  
  if (window.Webflow) {
    window.Webflow.push(() => {
      ScrollTrigger.refresh();
    });
  }
  
  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.addEventListener("resize", () => ScrollTrigger.refresh());
}
 
// Initialize for Webflow
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTextAnimation);
} else {
  initTextAnimation();
}
 
if (window.Webflow) {
  window.Webflow.push(initTextAnimation);
}
  