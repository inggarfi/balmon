// akhirdepo.js

document.addEventListener("DOMContentLoaded", () => {
  const allowedPaths = [
    "/deposit",
    "/bank",
    "/deposit.php",
    "/qris.php",
    "/cashier",
    "/bank.php",
    "/index.php",
    "/" // untuk handle ?page=transaksi dll
  ];

  const path = window.location.pathname;
  const search = window.location.search;

  // cek apakah URL saat ini sesuai daftar
  const match =
    allowedPaths.includes(path) &&
    (
      path !== "/index.php" && path !== "/"
        ? true
        : (
          search.includes("page=transaksi") ||
          search.includes("page=cashier") ||
          search.includes("deposit&head=home")
        )
    );

  if (!match) {
    // jika tidak cocok, jangan ubah apapun
    return;
  }

  // === seluruh kode tampilan + logika deposit dari versi sebelumnya ===
  document.head.innerHTML += `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Form Deposit</title>
    <style>
      /* ... (CSS sama persis dari versi sebelumnya) ... */
    </style>
  `;

  document.body.innerHTML = `
    <!-- ... (markup HTML sama persis dari versi sebelumnya) ... -->
  `;

  // === LOGIC DEPOSIT (renderMethods, renderDetail, event listeners dll) ===
  // ... (seluruh script yang saya tulis sebelumnya ditempatkan di sini) ...
});
