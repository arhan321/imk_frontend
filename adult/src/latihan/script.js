document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll untuk navigasi
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Hapus # dari href untuk mendapatkan ID target
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault(); // Hanya cegah jika target ada di halaman
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Sesuaikan offset jika header fixed
          behavior: "smooth",
        });

        // Hapus kelas active dari semua link
        navLinks.forEach((nav) => nav.classList.remove("active"));
        // Tambahkan kelas active ke link yang diklik
        this.classList.add("active");
      }
    });
  });

  // (Opsional) Menandai link navigasi aktif saat scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll(".page-section");
    const navbarHeight = document.querySelector(".navbar").offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 20; // Tambah sedikit offset
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });

    // Jika di paling atas, 'Beranda' yang aktif
    if (pageYOffset < sections[0].offsetTop - navbarHeight - 20) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector('.nav-link[href="#beranda"]')
        .classList.add("active");
    }
  });

  // Contoh sederhana untuk cek sertifikat (jika ada)
  const certificateList = document.querySelector(".certificate-list");
  const noCertificateMessage = document.querySelector(".no-certificate");
  if (certificateList && noCertificateMessage) {
    if (certificateList.children.length === 0) {
      noCertificateMessage.style.display = "block";
    } else {
      noCertificateMessage.style.display = "none";
    }
  }

  // Tambahan: Jika Anda ingin dashboard card atau course item bisa diklik
  // untuk navigasi ke halaman detail kursus (contoh):
  // const courseItems = document.querySelectorAll('.course-item button, .dashboard-card h3');
  // courseItems.forEach(item => {
  //     item.addEventListener('click', function() {
  //         // Dapatkan info kursus, misalnya dari data attribute
  //         // const courseId = this.closest('.course-item')?.dataset.courseId || 'some-course';
  //         // window.location.href = `/course-detail.html?id=${courseId}`; // Arahkan ke halaman detail
  //         alert("Navigasi ke detail kursus (belum diimplementasikan).");
  //     });
  // });
});
