document.addEventListener("DOMContentLoaded", function () {
  // Smooth Scroll untuk navigasi
  const navLinks = document.querySelectorAll("header nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Menghitung posisi elemen target dengan offset header
        const headerOffset = document.querySelector("header").offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
      // Tutup menu mobile jika terbuka
      if (document.querySelector("header nav").classList.contains("active")) {
        document.querySelector("header nav").classList.remove("active");
        document.querySelector(".menu-toggle").classList.remove("active");
      }
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll("main section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop =
        section.offsetTop - document.querySelector("header").offsetHeight - 50; // Tambah offset
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
  });

  // Toggle Menu Mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Testimonial Slider Sederhana
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const prevButton = document.querySelector(".slider-nav .prev");
  const nextButton = document.querySelector(".slider-nav .next");
  let currentTestimonialIndex = 0;

  function showTestimonial(index) {
    testimonialItems.forEach((item) => item.classList.remove("active"));
    testimonialItems[index].classList.add("active");
  }

  if (testimonialItems.length > 0) {
    // Pastikan elemen ada sebelum menambahkan event listener
    showTestimonial(currentTestimonialIndex); // Tampilkan item pertama saat load

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex - 1 + testimonialItems.length) %
          testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
      });

      nextButton.addEventListener("click", () => {
        currentTestimonialIndex =
          (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
      });
    }

    // Auto-slide (opsional)
    // setInterval(() => {
    //     currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
    //     showTestimonial(currentTestimonialIndex);
    // }, 5000); // Ganti slide setiap 5 detik
  }

  // Update Tahun di Footer
  const currentYearSpan = document.getElementById("currentYear");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Animasi header saat scroll (sembunyikan saat scroll ke bawah, tampilkan saat ke atas)
  let lastScrollTop = 0;
  const header = document.querySelector("header");
  window.addEventListener(
    "scroll",
    function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight + 50) {
        // Scroll ke bawah dan sudah melewati tinggi header
        header.style.top = `-${header.offsetHeight}px`;
      } else {
        // Scroll ke atas
        header.style.top = "0";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Untuk handle scroll di paling atas
    },
    false
  );

  // Placeholder untuk form submission (jika Anda ingin menambahkan AJAX atau validasi lebih lanjut)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah submit form standar
      // Di sini Anda bisa menambahkan logika untuk mengirim data form
      // Misalnya menggunakan Fetch API atau XMLHttpRequest
      alert('Pesan Anda telah "dikirim"! (Ini hanya simulasi)');
      contactForm.reset(); // Reset form setelah "dikirim"
    });
  }
});
