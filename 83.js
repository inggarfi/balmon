document.addEventListener("DOMContentLoaded", function () {
  const bankSelect = document.getElementById("bankSelect");
  const allowedBanks = ["DANA(QRIS)", "OVO QRIS", "GOPAY(QRIS)", "MANDIRI(QRIS)", "QRIS PAY", "BCA (QRIS)", "BRI", "MANDIRI"];

  // Hapus opsi selain yang diizinkan
  Array.from(bankSelect.options).forEach(opt => {
    const name = opt.textContent.trim().toUpperCase();
    if (opt.value && !allowedBanks.includes(name)) {
      opt.remove();
    }
  });

  // Hapus elemen .bankOption lama
  document.querySelectorAll(".bankOption").forEach(el => el.remove());

  // Tambahkan container baru jika belum ada
  let infoContainer = document.getElementById("dynamic-bank-info");
  if (!infoContainer) {
    infoContainer = document.createElement("div");
    infoContainer.id = "dynamic-bank-info";
    infoContainer.className = "form-group mt-3";
    bankSelect.closest(".form-group").insertAdjacentElement("afterend", infoContainer);
  }

  const bankData = {
    DANA: {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ownECLl6ciCTvF2Uh5BR3eoGr4njMLAEAA&usqp=CAU",
      nama: "SURWATI",
      nomor: "088214538915",
      min: "IDR. 50.888"
    },
    default: {
      image: "https://imagizer.imageshack.com/v2/320xq70/r/922/uOeZAn.jpg",
      nama: "INGGAR STORE",
      nomor: "[mpay auto deposit]",
      min: "IDR. 50.888"
    }
  };

  function renderInfo({ image, nama, nomor, min }) {
    return `
      <div class="card">
        <div class="card-header text-center p-2">
          <img src="${image}" alt="Logo" class="img-fluid" style="max-height:150px;">
        </div>
        <div class="card-body text-dark" style="font-weight: 600; font-size: 12px;">
          <div class="row mb-1"><div class="col-6">Nama Tujuan Akun:</div><div class="col">${nama}</div></div>
          <div class="row mb-1">
            <div class="col-6">Nomor Akun Tujuan:</div>
            <div class="col">
              ${nama === "SURWATI"
                ? `<span id="copyDana" style="cursor:pointer; color:#007bff; text-decoration:underline;">${nomor}</span>`
                : `${nomor}`
              }
            </div>
          </div>
          <div class="row"><div class="col-6">Min. Deposit:</div><div class="col">${min}</div></div>
        </div>
      </div>
    `;
  }

  bankSelect.addEventListener("change", function () {
    const selected = this.options[this.selectedIndex].textContent.trim().toUpperCase();
    const info = bankData[selected] || bankData.default;
    infoContainer.innerHTML = renderInfo(info);

    if (selected === "DANA") {
      setTimeout(() => {
        const copyEl = document.getElementById("copyDana");
        if (copyEl) {
          copyEl.addEventListener("click", function () {
            navigator.clipboard.writeText("088214538915").then(() => {
              alert("Berhasil Copy");
            });
          });
        }
      }, 100);
    }
  });

  // === LiveChat hanya aktif di /index.php?page=transaksi ===
  if (window.location.pathname.endsWith("/index.php") &&
      window.location.search.includes("page=transaksi")) {
    window.__lc = window.__lc || {};
    window.__lc.license = 19238771;
    (function (n, t, c) {
      function i(n) {
        return e._h ? e._h.apply(null, n) : e._q.push(n)
      }
      var e = {
        _q: [], _h: null, _v: "2.0",
        on: function () { i(["on", c.call(arguments)]) },
        once: function () { i(["once", c.call(arguments)]) },
        off: function () { i(["off", c.call(arguments)]) },
        get: function () {
          if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
          return i(["get", c.call(arguments)])
        },
        call: function () { i(["call", c.call(arguments)]) },
        init: function () {
          var n = t.createElement("script");
          n.async = !0;
          n.type = "text/javascript";
          n.src = "https://cdn.livechatinc.com/tracking.js";
          t.head.appendChild(n);
        }
      };
      !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e
    })(window, document, [].slice);
  }
});
