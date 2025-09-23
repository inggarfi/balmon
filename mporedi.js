(function () {
  // cari semua elemen <a> di halaman
  const links = document.querySelectorAll('a[href="https://mulai77.site//mobile/index.php?page=cashier"]');
  
  // ubah href yang cocok
  links.forEach(link => {
    link.href = "https://mulai77.site//mobile/index.php?page=transaksi";
  });
})();
