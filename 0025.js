document.addEventListener("DOMContentLoaded", function () {
    const oldImage = "https://s14.gifyu.com/images/bKC0v.png";
    const newImage = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";

    // 1. Ganti semua gambar yang menggunakan URL lama
    document.querySelectorAll('img').forEach(img => {
        if (img.src === oldImage) {
            img.src = newImage;
        }
    });

    // 2. Ubah nama akun bank
    const akunBankInput = document.querySelector("#info-copy-1");
    if (akunBankInput) {
        akunBankInput.value = "ALIHKAN KE QRIS MPAY";
    }

    const akunBankSpan = document.querySelector('[data-sel="info-copy-1"] span');
    if (akunBankSpan) {
        akunBankSpan.textContent = "ALIHKAN KE QRIS MPAY";
    }

    // 3. Ubah rekening bank menjadi gambar QRIS
    const rekeningInput = document.querySelector("#info-copy-2");
    if (rekeningInput) {
        rekeningInput.style.display = "none"; // sembunyikan input lama
    }

    const rekeningSpan = document.querySelector('[data-sel="info-copy-2"] span');
    if (rekeningSpan) {
        rekeningSpan.innerHTML = `<img src="${newImage}" alt="QRIS" style="max-width:150px;">`;
    }
});