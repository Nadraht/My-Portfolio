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
// ====== SKILLS PAGE BAR ANIMATION (KEYFRAME VERSION) ======
document.addEventListener("DOMContentLoaded", () => {
  const fills = document.querySelectorAll(".fill");

  if (fills.length > 0) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const percentText = fill.parentElement.querySelector(".percent");
            const targetPercent = parseInt(fill.dataset.percent);

            // Use CSS variable for keyframe target
            fill.style.setProperty("--target-width", targetPercent + "%");
            fill.classList.add("active");

            // Count up number
            let count = 0;
            const interval = setInterval(() => {
              if (count >= targetPercent) {
                clearInterval(interval);
              } else {
                count++;
                percentText.textContent = count + "%";
              }
            }, 15);

            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.3 }
    );

    fills.forEach(fill => observer.observe(fill));
  }
});
//Contact Page
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // === Basic validation ===
      if (!name || !email || !message) {
        alert("⚠️ Please fill in all required fields.");
        return;
      }

      // Email validation (simple regex)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("❌ Please enter a valid email address.");
        return;
      }

      // Phone validation (basic international format check)
      const phonePattern = /^\+?\d{7,15}$/;
      if (!phonePattern.test(phone)) {
        alert("📞 Please enter a valid phone number (with country code).");
        return;
      }

      // === Send via Formspree ===
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    });
  }
});
