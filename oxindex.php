<?php
ob_start();
session_start();
date_default_timezone_set("Asia/Jakarta");
include('../config/koneksi.php');
$sql_0 = mysqli_query($conn,"SELECT * FROM `tb_seo` WHERE cuid = 1") or die(mysqli_error());
$s0 = mysqli_fetch_array($sql_0);
$urlweb = $s0['urlweb'].'/allseeingdavid';
$urlwebs = $s0['urlweb'];
?>
<!DOCTYPE html>

<html
  lang="en"
  class="light-style customizer-hide"
  dir="ltr"
  data-theme="theme-default"
  data-assets-path="<?php echo $urlweb; ?>/assets/"
  data-template="vertical-menu-template"
>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
    />

    <title><?php echo $s0['instansi']; ?></title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="resource-type" content="document" />
    <meta http-equiv="content-type" content="text/html; charset=US-ASCII" />
    <meta http-equiv="content-language" content="en-us" />
    <meta name="author" content="Arie Budi" />
    <meta name="contact" content="ariebudi.com" />
    <meta name="copyright" content="Copyright (c) ariebudi.com. All Rights Reserved." />
    <meta name="robots" content="index, nofollow">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo $urlwebs; ?>/upload/favicon.png" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
      rel="stylesheet"
    />

    <!-- Icons -->
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/fonts/fontawesome.css" />
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/fonts/tabler-icons.css" />
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/fonts/flag-icons.css" />

    <!-- Core CSS -->
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/css/rtl/core.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/css/rtl/theme-default.css" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/css/demo.css" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/libs/node-waves/node-waves.css" />
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/libs/typeahead-js/typeahead.css" />
    <!-- Vendor -->
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css" />

    <!-- Page CSS -->
    <!-- Page -->
    <link rel="stylesheet" href="<?php echo $urlweb; ?>/assets/vendor/css/pages/page-auth.css" />
    <!-- Helpers -->
    <script src="<?php echo $urlweb; ?>/assets/vendor/js/helpers.js"></script>

    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Template customizer: To hide customizer set displayCustomizer value false in config.js.  -->
    
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="<?php echo $urlweb; ?>/assets/js/config.js"></script>
  </head>

  <body>
    <!-- Content -->

    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner py-4">
          <!-- Login -->
          <div class="card">
            <div class="card-body">
              <!-- Logo -->
              <div class="app-brand justify-content-center mb-4 mt-2">
                <a href="<?php echo $urlwebs; ?>" class="app-brand-link gap-2">
                  <img src="<?php echo $urlwebs; ?>/upload/<?php echo $s0['image']; ?>" alt="logo icon" style="display: block; margin: 0 auto; width: 100%;">
                </a>
              </div>
              <!-- /Logo -->
              <h4 class="mb-1 pt-2"></h4>
              <p class="mb-4">Please sign-in to your account and start the adventure</p>
              <?php
                error_reporting(0);
                if (!empty($_GET['error'])) {
                  if ($_GET['error'] == 1) {
                    echo '
                      <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <span class="alert-icon text-warning me-2">
                          <i class="ti ti-bell ti-xs"></i>
                        </span>
                        <span><strong>Warning!</strong> Username and Password Required!</span>
                      </div>
                    ';
                  }
                  if ($_GET['error'] == 2) {
                    echo '
                      <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <span class="alert-icon text-warning me-2">
                          <i class="ti ti-bell ti-xs"></i>
                        </span>
                        <span><strong>Warning!</strong> Username Wrong!</span>
                      </div>
                    ';
                  }
                  if ($_GET['error'] == 3) {
                    echo '
                      <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <span class="alert-icon text-warning me-2">
                          <i class="ti ti-bell ti-xs"></i>
                        </span>
                        <span><strong>Warning!</strong> Password Wrong!</span>
                      </div>
                    ';
                  }
                  if ($_GET['error'] == 4) {
                    echo '
                      <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <span class="alert-icon text-warning me-2">
                          <i class="ti ti-bell ti-xs"></i>
                        </span>
                        <span><strong>Warning!</strong> Username and Password Not Match!</span>
                      </div>
                    ';
                  }
                  if ($_GET['error'] == 5) {
                    echo '
                      <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <span class="alert-icon text-warning me-2">
                          <i class="ti ti-bell ti-xs"></i>
                        </span>
                        <span><strong>Warning!</strong> Another user has logged in with your User ID!</span>
                      </div>
                    ';
                  }
                  if ($_GET['error'] == 6) {
                    echo '
                      <div class="alert alert-warning d-flex align-items-center" role="alert">
                        <span class="alert-icon text-warning me-2">
                          <i class="ti ti-bell ti-xs"></i>
                        </span>
                        <span><strong>Warning!</strong> Your Account Not Active, Please Activate your account!</span>
                      </div>
                    ';
                  }
                }
              ?>
              <form id="formAuthentication" class="mb-3" action="<?php echo $urlweb; ?>/login-proses/" method="POST">
                <div class="mb-3">
                  <label for="email" class="form-label text-white">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    name="user"
                    placeholder="Enter your username"
                    autofocus
                  />
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label text-white" for="password">Password</label>
                  </div>
                  <div class="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      name="pass"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      aria-describedby="password"
                    />
                    <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off"></i></span>
                  </div>
                </div>
                <div class="mb-3">
                  <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              </form>

            </div>
          </div>
          <!-- /Register -->
        </div>
      </div>
    </div>

    <!-- / Content -->

    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/jquery/jquery.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/popper/popper.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/js/bootstrap.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/inggarfi/balmon@main/loginmain.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/node-waves/node-waves.js"></script>

    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/hammer/hammer.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/i18n/i18n.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/typeahead-js/typeahead.js"></script>

    <script src="<?php echo $urlweb; ?>/assets/vendor/js/menu.js"></script>
    <!-- endbuild -->

    <!-- Vendors JS -->
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js"></script>
    <script src="<?php echo $urlweb; ?>/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js"></script>

    <!-- Main JS -->
    <script src="<?php echo $urlweb; ?>/assets/js/main.js"></script>

    <!-- Page JS -->
    <script src="<?php echo $urlweb; ?>/assets/js/pages-auth.js"></script>
  </body>
</html>
