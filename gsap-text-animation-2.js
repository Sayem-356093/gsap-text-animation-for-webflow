document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  
  const textEls = document.querySelectorAll(".text-animate");
  
  textEls.forEach((textEl, index) => {
    const text = textEl.textContent.trim();
    
    // STEP 1: Let the browser naturally wrap the text first
    // We do this by temporarily measuring the natural line breaks
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = textEl.offsetWidth + 'px';
    tempDiv.style.font = window.getComputedStyle(textEl).font;
    tempDiv.style.lineHeight = window.getComputedStyle(textEl).lineHeight;
    tempDiv.style.wordSpacing = window.getComputedStyle(textEl).wordSpacing;
    tempDiv.style.letterSpacing = window.getComputedStyle(textEl).letterSpacing;
    tempDiv.textContent = text;
    document.body.appendChild(tempDiv);
    
    const naturalHeight = tempDiv.offsetHeight;
    document.body.removeChild(tempDiv);
    
    // STEP 2: Now split into spans but preserve natural wrapping
    textEl.innerHTML = "";
    
    text.split(" ").forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline"; // Changed from inline-block to inline
      wordSpan.style.whiteSpace = "nowrap";
      
      // Split into characters
      word.split("").forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline"; // Changed from inline-block to inline
        wordSpan.appendChild(charSpan);
      });
      
      textEl.appendChild(wordSpan);
      
      // Add regular space as text node (this allows natural wrapping)
      if (wordIndex < text.split(" ").length - 1) {
        textEl.appendChild(document.createTextNode(" "));
      }
    });
    
    // STEP 3: Check if wrapping got worse, if so, apply micro-adjustments
    const newHeight = textEl.offsetHeight;
    if (newHeight > naturalHeight * 1.1) { // If height increased by more than 10%
      // Apply minimal spacing adjustments
      textEl.style.wordSpacing = '-0.05em';
      textEl.style.letterSpacing = '-0.01em';
    }
    
    const chars = textEl.querySelectorAll("span span");
    
    gsap.set(chars, { opacity: 0, filter: "blur(1vw)" });
    
    const animConfig = {
      opacity: 1,
      filter: "blur(0vw)",
      duration: 1,
      stagger: { each: 0.8 / chars.length, from: "random" },
      ease: "power2.out"
    };
    
    if (index === 0) {
      // Hero animates on load
      gsap.to(chars, animConfig);
    } else {
      // Section animates on scroll
      ScrollTrigger.create({
        trigger: textEl,
        start: "top 90%",
        onEnter: () => gsap.to(chars, animConfig),
      });
    }
  });
  
  // Add CSS to help with natural text flow
  const style = document.createElement('style');
  style.textContent = `
    .text-animate {
      /* Maintain natural text flow */
      word-break: normal;
      overflow-wrap: normal;
      hyphens: none;
    }
    
    .text-animate span {
      /* Ensure spans don't interfere with natural flow */
      font: inherit;
      line-height: inherit;
    }
  `;
  document.head.appendChild(style);
});