// Tambahkan style langsung lewat JavaScript
const style = document.createElement("style");
style.innerHTML = `
    body {
        background-image: url('https://jawaslot.site/baner_new/marsha.gif');
        background-repeat: no-repeat;
        background-attachment: fixed; 
        background-size: 100% 100%;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .login-container {
        background-color: #a7a4a4;
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
        border: 1px solid #a3a2a2;
        border-radius: 3px;
        box-sizing: border-box;
    }

    input[type="submit"] {
        width: 100%;
        padding: 10px;
        background-color: #0e0f0f;
        color: #beb6b6;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    input[type="submit"]:hover {
        background-color: #0a0a0a;
    }

    .error-message {
        color: red;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style);

// Buat container login
const container = document.createElement("div");
container.className = "login-container";

container.innerHTML = `
    <h2>ADMIN</h2>
    <form method="post" action="/newbie/index.php">
        <label>Username:</label><br>
        <input type="text" name="username"><br>
        <label>Password:</label><br>
        <input type="password" name="password"><br><br>
        <input type="submit" value="Login">
    </form>
`;

// Masukkan ke body
document.body.appendChild(container);
