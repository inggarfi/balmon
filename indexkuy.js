// indexkuy.js

document.write(`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Formulir Deposit</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    :root{
      --bg: #eef2f6;
      --card: #ffffff;
      --muted: #6b7280;
      --primary: #1f6feb;
      --success: #16a34a;
      --radius: 12px;
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      font-family: 'Poppins', sans-serif;
      margin:0;
      background:var(--bg);
      color:#111827;
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      display:flex;
      justify-content:center;
      align-items:flex-start;
      padding:18px 12px;
      min-height:100vh;
    }
    .page { width:100%; max-width:760px; }
    header { margin: 6px 0 12px; padding: 4px 6px; }
    h1{ margin:0; font-size:24px; color:#0f172a; font-weight:600; }
    .card{
      background:var(--card);
      border-radius:var(--radius);
      box-shadow: 0 8px 24px rgba(15,23,42,0.06);
      padding:18px;
      overflow:hidden;
    }
    .marquee {
      font-size:13px; color:var(--muted);
      overflow:hidden; white-space:nowrap;
      display:block; padding:8px 0;
      border-bottom:1px solid rgba(15,23,42,0.04);
      margin-bottom:14px;
    }
    .marquee > span { display:inline-block; padding-left:100%; animation: marquee 14s linear infinite; }
    @keyframes marquee { 0%{ transform: translateX(0); } 100%{ transform: translateX(-100%); } }
    .actions { display:flex; gap:10px; margin:12px 0; flex-wrap:wrap; }
    .btn {
      background:var(--primary); color:#fff; border:none;
      padding:10px 14px; border-radius:10px;
      cursor:pointer; font-weight:600; font-size:14px;
      transition: transform .12s ease, box-shadow .12s ease;
      box-shadow: 0 6px 14px rgba(31,111,235,0.12);
    }
    .btn:active{ transform: translateY(1px) }
    .btn.secondary { background:var(--success); box-shadow: 0 6px 14px rgba(22,163,74,0.12); }
    select, input[type="number"], textarea {
      width:100%; padding:12px 14px; border-radius:10px;
      border:1px solid rgba(15,23,42,0.08);
      font-size:15px; background:#fff; margin-top:10px; color:#0f172a;
    }
    textarea { min-height:90px; resize:vertical; padding-top:10px; }
    .bank-info {
      margin-top:12px; padding:14px; border-radius:10px;
      background:#f8fafc; display:flex; gap:12px; align-items:center;
      border:1px solid rgba(15,23,42,0.03);
    }
    .bank-info img { width:64px; height:64px; object-fit:contain; border-radius:8px; }
    .bank-meta { flex:1; text-align:left; }
    .bank-meta .name { font-weight:600; font-size:16px; margin-bottom:4px; color:#0f172a; }
    .bank-meta .number { font-size:15px; color:#111827; letter-spacing:0.6px; }
    .bank-meta .owner { display:block; margin-top:6px; color:var(--muted); font-size:13px; }
    .bank-actions { display:flex; gap:8px; align-items:center; }
    .helper { font-size:13px; color:var(--muted); margin-top:10px; }
    .result-area { margin-top:14px; text-align:center; }
    .qr-card { display:inline-block; padding:10px; background:#fff; border-radius:12px; box-shadow: 0 6px 18px rgba(2,6,23,0.06); }
    .spinner {
      width:36px;height:36px;border-radius:50%;
      border:4px solid rgba(0,0,0,0.06);
      border-top-color:var(--primary);
      animation: spin 1s linear infinite;
      margin:10px auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    footer { text-align:center; margin-top:18px; color:var(--muted); font-size:12px; }
    @media (max-width:600px){
      h1 { font-size:20px; }
      .card { padding:14px; }
      .bank-info { flex-direction:column; align-items:center; text-align:center; gap:8px; }
      .bank-meta { text-align:center; }
      .actions { flex-direction:column; }
      .btn { width:100%; }
      .marquee{ font-size:12px; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header><h1>Formulir Deposit</h1></header>
    <div class="card">
      <div class="marquee"><span>Selamat datang di situs kami. Harap perhatikan tujuan deposit — tujuan deposit wajib sesuai dengan formulir deposit. Gunakan kode unik untuk transaksi pertama.</span></div>
      <div class="actions">
        <button class="btn" onclick="showDeposit('manual')">Manual Deposit</button>
        <button class="btn secondary" onclick="showDeposit('auto')">Otomatis Deposit (QRIS)</button>
      </div>
      <div id="manual-step" style="display:none; margin-top:6px;">
        <label class="helper">Pilih Metode Deposit</label>
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
          <img id="bank-logo" src="" alt="Bank Logo" />
          <div class="bank-meta">
            <div class="name" id="bank-name">Bank Name</div>
            <div class="number" id="bank-number">0000000000</div>
            <div class="owner" id="bank-owner">Pemilik</div>
          </div>
          <div class="bank-actions" style="flex-direction:column;">
            <button class="btn" onclick="copyToClipboard(document.getElementById('bank-number').innerText)">Salin</button>
          </div>
          <div style="width:100%; margin-top:10px;">
            <input id="manual-nominal" type="number" min="50000" placeholder="Nominal Deposit (min. 50.000)" />
            <textarea id="manual-note" placeholder="Catatan (opsional)"></textarea>
            <button class="btn" style="margin-top:8px;" onclick="submitManualDeposit()">Submit</button>
            <div id="manual-result" class="helper"></div>
          </div>
        </div>
      </div>
      <div id="auto-deposit" style="display:none; margin-top:6px;">
        <label class="helper">Masukkan nominal minimal 50.000</label>
        <input id="nominal" type="number" min="50000" placeholder="Nominal" />
        <div style="margin-top:8px;">
          <button class="btn" onclick="generateQRIS()">Submit</button>
        </div>
        <div id="auto-result" class="result-area"></div>
      </div>
    </div>
    <footer>&copy; 2025</footer>
  </div>
</body>
</html>
`);

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(()=>{ alert('Nomor berhasil disalin!'); });
}
function showDeposit(type){
  document.getElementById('manual-step').style.display = (type==='manual') ? 'block' : 'none';
  document.getElementById('auto-deposit').style.display = (type==='auto') ? 'block' : 'none';
  setTimeout(()=>{ document.querySelector('.card').scrollIntoView({behavior:'smooth', block:'start'}); }, 120);
}
function selectMethod(jsonString){
  if(!jsonString) return;
  try{
    const method = JSON.parse(jsonString);
    document.getElementById('manual-details').style.display = 'flex';
    document.getElementById('bank-logo').src = method.logo;
    document.getElementById('bank-name').innerText = method.name;
    document.getElementById('bank-number').innerText = method.number;
    document.getElementById('bank-owner').innerText = method.owner;
  }catch(e){
    console.error('parse error', e);
  }
}
function submitManualDeposit(){
  const nominal = Number(document.getElementById('manual-nominal').value || 0);
  if(nominal < 50000){ alert('Minimal deposit 50.000'); return; }
  const res = document.getElementById('manual-result');
  res.innerHTML = '<div class="spinner"></div><div class="helper">Processing...</div>';
  setTimeout(()=>{ res.innerHTML = '<div class="helper"><strong>Deposit In Progress</strong></div>'; setTimeout(()=>location.href = '../',1500); }, 1500);
}
async function generateQRIS(){
  const nominal = Number(document.getElementById('nominal').value || 0);
  if(nominal < 50000){ alert('Minimal deposit otomatis adalah 50.000'); return; }
  const auto = document.getElementById('auto-result');
  auto.innerHTML = '<div class="spinner"></div><div class="helper">Membuat QRIS...</div>';
  const payload = 'qris=00020101021226670016COM.NOBUBANK.WWW01189360050300000879140214250910000000730303UMI51440014ID.CO.QRIS.WWW0215ID20254343011770303UMI5204481253033605405500005802ID5920ARPUS CELL OK26161126007LANGKAT61052076162070703A016304CC38&qty=' + encodeURIComponent(nominal) + '&yn=n';
  try{
    const resp = await fetch('https://apxnzd.page.gd/qris.php', {
      method:'POST',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body: payload
    });
    const result = await resp.text();
    const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=\${encodeURIComponent(result)}\`;
    auto.innerHTML = \`
      <div class="qr-card"><img id="qr-img" src="\${qrUrl}" alt="QRIS" style="width:220px;height:220px;display:block;border-radius:10px;"></div>
      <div style="margin-top:12px;">
        <button class="btn" onclick="downloadQR()">Download QRIS</button>
        <button class="btn secondary" onclick="location.href='../'">Telah Membayar</button>
      </div>
    \`;
    setTimeout(()=> document.getElementById('qr-img').scrollIntoView({behavior:'smooth', block:'center'}), 120);
  }catch(err){
    auto.innerHTML = '<div class="helper">Gagal membuat QRIS. Coba lagi.</div>';
    console.error(err);
  }
}
function downloadQR(){
  const img = document.getElementById('qr-img');
  if(!img) return;
  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'qris.png';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
