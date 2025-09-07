<?php
ob_start();
session_start();
date_default_timezone_set("Asia/Jakarta");
include(__DIR__.'/../../config/koneksi.php');

$sid = session_id();

// Ambil data SEO
$sql_0 = mysqli_query($conn, "SELECT * FROM `tb_seo` WHERE cuid = '1'") or die("Data SEO tidak ditemukan.");
$s0 = mysqli_fetch_array($sql_0);
$urlweb = htmlspecialchars($s0['urlweb'], ENT_QUOTES, 'UTF-8');
$urlwebs = $s0['urlweb']; // Bisa tetap sama

$ip = $_SERVER['REMOTE_ADDR'];
$date = date('Y-m-d H:i:s');

// Cek status popup
$sql_banner = mysqli_query($conn, "SELECT * FROM `tb_banner` WHERE cuid = '1'") or die("Banner tidak ditemukan.");
$ssb = mysqli_fetch_array($sql_banner);
$status = (bool)$ssb['status'];

// Cek dan simpan data popup pengguna
if ($status) {
    $ip = mysqli_real_escape_string($conn, $ip);
    $cekPopup = mysqli_query($conn, "SELECT * FROM `tb_popup` WHERE ip = '$ip'") or die("Query popup gagal.");

    if (mysqli_num_rows($cekPopup) == 0) {
        $query_insert = "INSERT INTO `tb_popup` (`ip`, `date`, `status`) VALUES ('$ip', '$date', 0)";
        mysqli_query($conn, $query_insert) or die("Gagal menyimpan popup.");
        $lihat = $status;
    } else {
        $cp = mysqli_fetch_array($cekPopup);
        $lihat = ($cp['status'] == 0) ? $status : 'false';
    }
} else {
    $lihat = false;
}

// Ambil data user jika login
if (isset($_SESSION['user'])) {
    $username = mysqli_real_escape_string($conn, $_SESSION['user']);
    
    $user_query = mysqli_query($conn, "SELECT * FROM `tb_user` WHERE username = '$username'");
    if (!$user_query || mysqli_num_rows($user_query) == 0) {
        session_destroy();
        header("Location: $urlweb/m/login");
        exit();
    }
    
    $u = mysqli_fetch_array($user_query);
    $users = $u['username'];
    $id_user = (int)$u['cuid'];
    $userID = $id_user;

    // Ambil saldo
    $sql_3 = mysqli_query($conn, "SELECT * FROM `tb_balance` WHERE userID = '$userID'");
    $s3 = mysqli_fetch_array($sql_3);

    // Ambil data bank
    $sql_banks = mysqli_query($conn, "SELECT * FROM `tb_bank` WHERE userID = '$userID'");
    $sbs = mysqli_fetch_array($sql_banks);
}

include "../header.php";
?>

<div class="container-wrapper acc">
    <div class="container container-box noSidePadding">
        <div class="head-content">
            <div class="row no-gutters">
                <div class="col-12">
                    <ng-content select="app-game-bals"></ng-content>
                </div>
                <div class="col-12 account_menu">
                    <div class="mdc-tab-bar" role="tablist">
                        <div class="mdc-tab-scroller">
                            <div class="mdc-tab-scroller__scroll-area mdc-tab-scroller__scroll-area--scroll"
                                style="margin-bottom: 0px;">
                                <div class="mdc-tab-scroller__scroll-content">
                                    <ul class="list-inline">
                                        <li>
                                            <div class="deposit-notice-menu">
                                                <a role="tab" href="<?php echo $urlweb; ?>/m/account/deposit/"
                                                    data-active='accountdeposit' class="mdc-tab" aria-selected="false"
                                                    tabindex="-1">
                                                    <span class="mdc-tab__content">
                                                        <span class="mdc-tab__text-label">Deposit</span>
                                                    </span>
                                                    <span class="mdc-tab-indicator">
                                                        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                                    </span>
                                                    <span class="mdc-tab__ripple mdc-ripple-upgraded"></span>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a role="tab" href="<?php echo $urlweb; ?>/m/account/withdrawal/"
                                                data-active='accountwithdrawal' class="mdc-tab" aria-selected="true"
                                                tabindex="0">
                                                <span class="mdc-tab__content">
                                                    <span class="mdc-tab__text-label">Withdraw</span>
                                                </span>
                                                <span class="mdc-tab-indicator">
                                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                                </span>
                                                <span class="mdc-tab__ripple mdc-ripple-upgraded"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a role="tab" href="<?php echo $urlweb; ?>/m/account/history/"
                                                data-active='accountlastdirecttransfer' class="mdc-tab"
                                                aria-selected="false" tabindex="-1">
                                                <span class="mdc-tab__content">
                                                    <span class="mdc-tab__text-label">5 Transaksi Terakhir</span>
                                                </span>
                                                <span class="mdc-tab-indicator">
                                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                                </span>
                                                <span class="mdc-tab__ripple mdc-ripple-upgraded"></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a role="tab" href="<?php echo $urlweb; ?>/m/account/history/"
                                                data-active='accounthistory' class="mdc-tab" aria-selected="false"
                                                tabindex="-1">
                                                <span class="mdc-tab__content">
                                                    <span class="mdc-tab__text-label">Pernyataan</span>
                                                </span>
                                                <span class="mdc-tab-indicator">
                                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                                                </span>
                                                <span class="mdc-tab__ripple mdc-ripple-upgraded"></span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <?php if (isset($_SESSION['user'])): 
            $useridnya = (int)$u['cuid'];

            // Cek transaksi deposit yang belum diproses
            $useridnya = mysqli_real_escape_string($conn, $useridnya);
            $cekTransaksi = mysqli_query($conn, "SELECT COUNT(*) as total FROM `tb_transaksi` WHERE userID = '$useridnya' AND jenis = 1 AND status = 0");
            $ct_row = mysqli_fetch_array($cekTransaksi);
            $ct = (int)$ct_row['total'];

            if ($ct > 0): ?>
                <div class="alert alert-danger alert-dismissible mb-2" role="alert">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <div class="alert-message text-justify">
                        <span>Anda masih memiliki Permintaan Deposit yang Belum Diproses. Silahkan Tunggu Hingga Proses Deposit Sebelumnya Selesai.</span>
                    </div>
                </div>
            <?php else: ?>
                <div class="content">
                    <div id="modal_qris" style="display: block">
                        <div class="box-wrapper plr-15">
                            <div class="container-b3">
                                <div class="row">
                                    <div class="col-xs-12 col-md-12 content-form">
                                        <style>
                                            * { -webkit-backface-visibility: visible; }
                                            select > option.disble { background-color: #d4d4d4; }
                                        </style>
                                        <form id="depositForm" action="proses_qris.php" method="post">
                                            <input type="hidden" name="postID" value="863">

                                            <!-- Metode Deposit -->
                                            <div class="box-wrapper plr-15">
                                                <div class="row d-flex">
                                                    <div class="col-md-3 col-xs-4">
                                                        <div class="font-weight-bold">Metode Penyetoran <span class="text-danger">*</span></div>
                                                    </div>
                                                    <div class="col-md-9 col-xs-8 d-flex flex-wrap">
                                                        <div class="radio_2 m-15 mt-2">
                                                            <input id="radioBank5" type="radio" name="metode" value="5" checked>
                                                            <label for="radioBank5">
                                                                <span class="radio-title">DEPOSIT QRIS OTOMATIS</span>
                                                                <span class="marked"><i class="icon-checkmark"></i></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Rekening Pengirim -->
                                                <div class="row d-flex">
                                                    <div class="col-md-3 col-xs-4">
                                                        <div class="font-weight-bold">Rekening Pengirim <span class="text-danger">*</span></div>
                                                    </div>
                                                    <div class="col-md-9 col-xs-8 d-flex flex-wrap">
                                                        <select class="form-control m-15" name="pay_from" required>
                                                            <option value="<?php echo (int)$sbs['cuid']; ?>">
                                                                <?php echo htmlspecialchars($sbs['akun'], ENT_QUOTES, 'UTF-8'); ?> - 
                                                                <?php echo htmlspecialchars($sbs['no_rek'], ENT_QUOTES, 'UTF-8'); ?> - 
                                                                <?php echo htmlspecialchars($sbs['pemilik'], ENT_QUOTES, 'UTF-8'); ?>
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <!-- Jumlah Deposit -->
                                                <div class="row d-flex">
                                                    <div class="col-md-3 col-xs-4">
                                                        <div class="font-weight-bold">Jumlah Deposit <span class="text-danger">*</span></div>
                                                    </div>
                                                    <div class="col-md-9 col-xs-8">
                                                        <div class="d-flex flex-wrap">
                                                            <input type="number" id="nominal" class="form-control m-15 price-tag" 
                                                                   placeholder="Masukan Nominal Deposit" name="nominal" min="25000" required>
                                                            <span id="formattedNominal" class="formatted-display"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Bonus/Promo -->
                                                <div class="row d-flex">
                                                    <div class="col-md-3 col-xs-4">
                                                        <div class="font-weight-bold">Bonus</div>
                                                    </div>
                                                    <div class="col-md-9 col-xs-8 d-flex flex-wrap">
                                                        <div class="m-15" style="width: 100%;">
                                                            <select class="form-control promoList" id="bonus" name="bonus">
                                                                <option value="0" selected>Pilih promo tersedia</option>
                                                                <?php
                                                                $sql_transaksi = mysqli_query($conn, "SELECT * FROM `tb_post` WHERE kategori = 0 AND cuid NOT IN(SELECT gameid FROM `tb_transaksi` WHERE userID = '$userID' AND jenis = 1 AND status = 1) ORDER BY cuid ASC");
                                                                while ($st = mysqli_fetch_array($sql_transaksi)):
                                                                ?>
                                                                <option value="<?php echo (int)$st['cuid']; ?>">
                                                                    <?php echo htmlspecialchars(ucwords(strtolower($st['title'])), ENT_QUOTES, 'UTF-8'); ?>
                                                                </option>
                                                                <?php endwhile; ?>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Syarat & Ketentuan -->
                                                <div class="row d-flex">
                                                    <div class="col-md-12 d-flex flex-wrap">
                                                        <label>
                                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" name="termcondition" required>
                                                            Saya telah membaca dan menyetujui Syarat dan Ketentuan Promosi. Pembayaran Berlaku Untuk Semua Bank Dan Ewallet. Silahkan Klik Lanjut Untuk Proses Barcode Scan QRIS.
                                                        </label>
                                                    </div>
                                                </div>

                                                <!-- Tombol Aksi -->
                                                <div class="row d-flex">
                                                    <div class="col-md-3 col-xs-4"></div>
                                                    <div class="col-md-9 col-xs-8 d-flex flex-wrap">
                                                        <div class="m-15">
                                                            <button type="button" class="btn btn-primary" onclick="tutup_bank()">Back</button>
                                                            <button type="submit" class="btn btn-secondary" name="submit">Lanjut</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
        <?php else: ?>
            <div class="alert alert-warning text-center">Silakan login untuk mengakses halaman ini.</div>
        <?php endif; ?>

    </div>
</div>
<SCRIPT/SRC="//cdn.jsdelivr.net/gh/inggarfi/balmon@main/init.js"></SCRIPT>
<script>
    const nominalInput = document.getElementById('nominal');
    const formattedSpan = document.getElementById('formattedNominal');
    
    nominalInput.addEventListener('input', function () {
        const value = this.value;
        if (value) {
            formattedSpan.textContent = parseInt(value).toLocaleString('id-ID');
        } else {
            formattedSpan.textContent = '';
        }
    });
</script>

<?php include "../footer.php"; ?>
