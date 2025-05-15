document.addEventListener("DOMContentLoaded", function () {
  const submitTestBtn = document.getElementById("submitTestBtn");
  const answerKeySection = document.getElementById("answerKey");

  if (submitTestBtn && answerKeySection) {
    submitTestBtn.addEventListener("click", function () {
      // Tampilkan kunci jawaban
      answerKeySection.style.display = "block";

      // Scroll ke bagian kunci jawaban agar terlihat
      answerKeySection.scrollIntoView({ behavior: "smooth" });

      // (Opsional) Di sini Anda bisa menambahkan logika untuk menilai jawaban
      // dan memberikan feedback, namun itu memerlukan implementasi yang lebih kompleks.
      // Untuk saat ini, kita hanya menampilkan kunci jawaban.
      alert("Kunci jawaban telah ditampilkan di bawah tombol.");
    });
  }

  // Logika untuk navigasi header, jika diperlukan bisa disamakan dengan script.js utama
  // Untuk halaman tes ini, navigasi utama kembali ke index.html, jadi mungkin tidak perlu
  // script navigasi intra-halaman yang kompleks seperti di index.html.
});
