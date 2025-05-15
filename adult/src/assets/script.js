document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  const nav = document.getElementById("main-nav");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelectorAll("#main-nav ul li a");

  // Sticky Header & Scrolled State
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      // Ganti ikon burger ke X dan sebaliknya
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Smooth Scrolling & Active Link Highlighting
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Tutup menu mobile setelah link diklik
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("main section[id]");
  function updateActiveLink() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - header.offsetHeight - 50; // Tambah offset
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active-link");
      }
    });
  }
  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink(); // Initial call

  // Testimonial Slider
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.querySelector(".slider-controls .prev-btn");
  const nextBtn = document.querySelector(".slider-controls .next-btn");
  let currentTestimonialIndex = 0;

  function showTestimonial(index) {
    testimonialItems.forEach((item) => item.classList.remove("active"));
    testimonialItems[index].classList.add("active");
  }

  if (testimonialItems.length > 0) {
    showTestimonial(currentTestimonialIndex); // Show first item

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex - 1 + testimonialItems.length) %
          testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
      });
    }

    // Optional: Auto-slide
    // setInterval(() => {
    //     currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
    //     showTestimonial(currentTestimonialIndex);
    // }, 7000); // Change slide every 7 seconds
  }

  // Course Category Filter
  const categoryButtons = document.querySelectorAll(".category-btn");
  const courseCards = document.querySelectorAll(".course-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      courseCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex"; // atau 'block' tergantung display awal card
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Update Tahun di Footer
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear(); // Current year is 2025
  }

  // Contact Form Submission (Placeholder)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Di sini Anda bisa menambahkan logika validasi dan pengiriman data form
      // Contoh: menggunakan Fetch API
      // const formData = new FormData(contactForm);
      // fetch('URL_ENDPOINT_ANDA', { method: 'POST', body: formData })
      //     .then(response => response.json())
      //     .then(data => { console.log(data); alert('Pesan terkirim!'); })
      //     .catch(error => { console.error(error); alert('Gagal mengirim pesan.'); });

      alert(
        'Pesan Anda telah "dikirim"! (Ini hanya simulasi untuk pengembangan)'
      );
      contactForm.reset();
    });
  }

  // Newsletter Form Submission (Placeholder)
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput.value) {
        alert(
          `Terima kasih telah berlangganan dengan email: ${emailInput.value} (Simulasi)`
        );
        emailInput.value = "";
      } else {
        alert("Mohon masukkan alamat email Anda.");
      }
    });
  }
});
