(function() {
  // 1. Ganti opsi select bank
  const bankSelect = document.getElementById('bankSelect');
  if (bankSelect) {
    bankSelect.innerHTML = `
      <option value="" selected disabled>--- Pilih Bank ---</option>
      <option value="A01">QRIS ALL BANK • A01</option>
      <option value="A02">E-WALLET DANA • A02</option>
      <option value="A03">QRIS ALL E-WALLET • A03</option>
    `;

    bankSelect.addEventListener('change', function() {
      const value = this.value;
      let nama = '', nomor = '', id = '', qrisImg = '';

      // Tentukan data sesuai pilihan
      if (value === 'A01') {
        nama = 'INGGAR STORE';
        nomor = 'A01';
      } else if (value === 'A02') {
        nama = 'SURWATI';
        nomor = '088214538915';
      } else if (value === 'A03') {
        nama = 'INGGAR STORE';
        nomor = 'A03';
      }

      // Loop semua opsi bank dan sembunyikan
      const bankOptions = document.querySelectorAll('.bankOption');
      bankOptions.forEach(el => el.style.display = 'none');

      // Tampilkan elemen sesuai pilihan
      const selectedBank = document.querySelector(`#epayment-${value === 'A01' ? '1' : value === 'A02' ? '2' : '3'}`);
      if (selectedBank) selectedBank.style.display = 'block';

      // Update nama dan nomor akun pada detail card
      if (selectedBank) {
        selectedBank.querySelectorAll('div').forEach(div => {
          if (div.innerText.includes('Nama Tujuan Akun')) {
            div.parentElement.querySelectorAll('div.col')[0].innerText = nama;
          }
          if (div.innerText.includes('Nomor Akun Tujuan')) {
            div.parentElement.querySelector('span').innerText = nomor;
          }
        });

        // Ganti gambar QRIS pada img
        const img = selectedBank.querySelector('img');
        if (img) img.src = "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg";
      }
    });
  }

  // 2. Ganti semua link QRIS image jadi link baru
  document.querySelectorAll('img').forEach(img => {
    if (img.src.includes('https://s14.gifyu.com/images/bsJTk.jpg')) {
      img.src = 'https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg';
    }
  });

  // 3. Ganti link live chat
  document.querySelectorAll('a').forEach(link => {
    if (link.href.includes('https://direct.lc.chat/19214565/')) {
      link.href = 'https://direct.lc.chat/19221990/';
    }
  });
})();
