document.addEventListener("DOMContentLoaded", function () {
  const bankSelect = document.getElementById("bankSelect");

  const allowedBanks = [
    "DANA", "OVO", "GOPAY", "LINK AJA", "QRIS", "BCA", "BRI", "MANDIRI"
  ];

  // Bersihkan semua opsi yang tidak termasuk allowedBanks
  Array.from(bankSelect.options).forEach(option => {
    if (
      option.value &&
      !allowedBanks.includes(option.textContent.trim().toUpperCase())
    ) {
      option.remove();
    }
  });

  // Buat container untuk informasi
  const infoContainer = document.createElement("div");
  infoContainer.id = "custom-bank-info";
  infoContainer.style.marginTop = "15px";
  infoContainer.style.fontSize = "14px";
  bankSelect.closest(".col-lg-6").appendChild(infoContainer);

  // Fungsi render info
  function renderBankInfo(bankName) {
    let html = "";

    if (bankName === "DANA") {
      html = `
        <div class="card mt-2">
          <div class="card-header text-center p-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ownECLl6ciCTvF2Uh5BR3eoGr4njMLAEAA&usqp=CAU" alt="DANA" style="max-width: 150px; height: auto;" />
          </div>
          <div class="card-body" style="font-size:13px; font-weight: 500;">
            <div class="row"><div class="col-6">Nama Tujuan Akun:</div><div class="col">SURWATI</div></div>
            <div class="row"><div class="col-6">Nomor Akun Tujuan:</div><div class="col">088214538915</div></div>
            <div class="row"><div class="col-6">Min. Deposit:</div><div class="col">IDR. 50.888</div></div>
          </div>
        </div>
      `;
    } else {
      html = `
        <div class="card mt-2">
          <div class="card-header text-center p-2">
            <img src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" alt="QRIS" style="max-width: 150px; height: auto;" />
          </div>
          <div class="card-body" style="font-size:13px; font-weight: 500;">
            <div class="row"><div class="col-6">Nama Tujuan Akun:</div><div class="col">INGGAR STORE</div></div>
            <div class="row"><div class="col-6">Nomor Akun Tujuan:</div><div class="col">[mpay auto deposit]</div></div>
            <div class="row"><div class="col-6">Min. Deposit:</div><div class="col">IDR. 50.888</div></div>
          </div>
        </div>
      `;
    }

    infoContainer.innerHTML = html;
  }

  // Ketika pilihan bank berubah
  bankSelect.addEventListener("change", function () {
    const selectedText = bankSelect.options[bankSelect.selectedIndex].textContent.trim().toUpperCase();
    if (allowedBanks.includes(selectedText)) {
      renderBankInfo(selectedText);
    } else {
      infoContainer.innerHTML = "";
    }
  });
});
