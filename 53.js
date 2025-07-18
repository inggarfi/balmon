document.addEventListener("DOMContentLoaded", function () {
  const bankSelect = document.getElementById("bankSelect");
  const allowedBanks = ["DANA", "OVO", "GOPAY", "LINK AJA", "QRIS", "BCA", "BRI", "MANDIRI"];

  // Hapus semua opsi yang tidak sesuai
  Array.from(bankSelect.options).forEach((opt) => {
    const name = opt.textContent.trim().toUpperCase();
    if (opt.value && !allowedBanks.includes(name)) {
      opt.remove();
    }
  });

  // Hapus semua .bankOption lama di DOM (jika ada)
  document.querySelectorAll(".bankOption").forEach(el => el.remove());

  // Buat kontainer info baru
  const infoContainer = document.createElement("div");
  infoContainer.id = "dynamic-bank-info";
  infoContainer.className = "form-group mt-3";
  bankSelect.closest(".form-group").after(infoContainer);

  // Template builder
  function renderInfo({ image, nama, nomor, min }) {
    return `
      <div class="card mt-2">
        <div class="card-header text-center p-2">
          <img src="${image}" alt="Logo" class="img-fluid" style="max-height:150px;">
        </div>
        <div class="card-body text-dark" style="font-weight: 600; font-size: 12px;">
          <div class="row mb-1"><div class="col-6">Nama Tujuan Akun:</div><div class="col">${nama}</div></div>
          <div class="row mb-1"><div class="col-6">Nomor Akun Tujuan:</div><div class="col">${nomor}</div></div>
          <div class="row"><div class="col-6">Min. Deposit:</div><div class="col">${min}</div></div>
        </div>
      </div>
    `;
  }

  // Data keterangan per bank
  const bankData = {
    DANA: {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ownECLl6ciCTvF2Uh5BR3eoGr4njMLAEAA&usqp=CAU",
      nama: "SURWATI",
      nomor: "088214538915",
      min: "IDR. 50.888"
    },
    default: {
      image: "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg",
      nama: "INGGAR STORE",
      nomor: "[mpay auto deposit]",
      min: "IDR. 50.888"
    }
  };

  // Event listener
  bankSelect.addEventListener("change", function () {
    const selected = this.options[this.selectedIndex].textContent.trim().toUpperCase();
    const info = bankData[selected] || bankData.default;
    infoContainer.innerHTML = renderInfo(info);
  });
});
