<?php
// URL endpoint API
$url = "https://qrisku.my.id/api";

// Data yang akan dikirimkan
$data = [
    "amount" => "10000",
    "qris_statis" => "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214250910000000730303UMI51440014ID.CO.QRIS.WWW0215ID20254343011770303UMI5204481253033605802ID5920ARPUS CELL OK26161126007LANGKAT61052076162070703A016304C2AD"
];

// Inisialisasi cURL
$ch = curl_init();

// Setel opsi cURL
curl_setopt($ch, CURLOPT_URL, $url); // URL API
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Menyimpan respon sebagai string
curl_setopt($ch, CURLOPT_POST, true); // Metode POST
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data)); // Data yang akan dikirim dalam format JSON
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json' // Memberitahukan bahwa konten yang dikirimkan adalah JSON
]);

// Eksekusi permintaan cURL
$response = curl_exec($ch);

// Cek jika ada error saat eksekusi cURL
if(curl_errno($ch)) {
    echo 'cURL Error: ' . curl_error($ch);
} else {
    // Decode response JSON
    $response_data = json_decode($response, true);
    
    // Jika response berhasil dan mengandung QRIS base64
    if ($response_data['status'] == 'success' && isset($response_data['qris_base64'])) {
        $qris_base64 = $response_data['qris_base64'];
        
        // Menampilkan gambar base64
        echo '<h3>QRIS Dinamis Generator</h3>';
        echo '<p>Berikut adalah QRIS yang dihasilkan:</p>';
        echo '<img src="data:image/png;base64,' . $qris_base64 . '" alt="QRIS Image" />';
    } else {
        echo 'Error: ' . $response_data['message'];
    }
}

// Tutup sesi cURL
curl_close($ch);
?>