document.addEventListener("DOMContentLoaded", () => {
  // ====== TYPING EFFECT (Home Page only) ======
  const textElement = document.getElementById("typing-text");
  if (textElement) {
    const text = "Nadraht MOHAMMED";
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const delayBetweenCycles = 2000;
    const delayAfterErase = 2000;

    function typeEffect() {
      if (!isDeleting && index <= text.length) {
        textElement.textContent = text.substring(0, index);
        index++;
        setTimeout(typeEffect, typingSpeed);
      } else if (isDeleting && index >= 0) {
        textElement.textContent = text.substring(0, index);
        index--;
        setTimeout(typeEffect, erasingSpeed);
      } else if (index > text.length) {
        isDeleting = true;
        setTimeout(typeEffect, delayBetweenCycles);
      } else if (index < 0) {
        isDeleting = false;
        setTimeout(typeEffect, delayAfterErase);
      }
    }

    typeEffect();
  }

  // ====== LIGHTBOX FEATURE (Projects Page only) ======
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  const projectImages = document.querySelectorAll(".project-img");

  // Only run this part if lightbox elements exist
  if (lightbox && lightboxImg && closeBtn) {
    projectImages.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        document.body.style.overflow = "hidden";
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
});
// ====== SKILLS PAGE PROGRESS BAR ANIMATION + PERCENT COUNTER ======
document.addEventListener("DOMContentLoaded", () => {
  const fills = document.querySelectorAll(".fill");

  if (fills.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const percentText = fill.parentElement.querySelector(".percent");

            // ✅ Capture target width before resetting
            const targetWidth = parseInt(fill.style.width);

            // Reset everything before starting
            fill.style.width = "0%";
            percentText.textContent = "0%";
            fill.classList.add("active"); // make it visible

            let currentWidth = 0;
            const speed = 15; // speed of counting (ms)

            const interval = setInterval(() => {
              if (currentWidth >= targetWidth) {
                clearInterval(interval);
              } else {
                currentWidth++;
                fill.style.width = currentWidth + "%";
                percentText.textContent = currentWidth + "%";
              }
            }, speed);

            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.3 }
    );

    fills.forEach(fill => observer.observe(fill));
  }
});

