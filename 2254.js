document.addEventListener("DOMContentLoaded", function () {
  const oldUrl = "https://assetsqris.pages.dev/qris.jpg";
  const newUrl = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";

  // cari elemen <img> yang src-nya sama
  const qrisImg = document.querySelector(`img[src="${oldUrl}"]`);
  if (qrisImg) {
    qrisImg.src = newUrl;
    console.log("URL QRIS berhasil diganti:", newUrl);
  } else {
    console.warn("Elemen gambar QRIS tidak ditemukan.");
  }
});
