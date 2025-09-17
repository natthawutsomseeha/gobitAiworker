// script.js - simple SPA routing and AI WORK simulation
const app = document.getElementById('app');

const companies = [
  {name:'Google', desc:'ฝึกงานด้าน Software Engineering / Data', score:98},
  {name:'Microsoft', desc:'ฝึกงานด้าน Cloud & AI', score:95},
  {name:'HOOPSHOP', desc:'ฝึกงานด้าน Web Development & Operations', score:87},
  {name:'Bangkok Life', desc:'ฝึกงานด้าน Business Analytics', score:82},
  {name:'Startup X', desc:'ฝึกงานด้าน Product & UX', score:78}
];

function el(html){ const div=document.createElement('div'); div.innerHTML=html.trim(); return div.firstChild; }

function homeView(){
  return `
  <div class="main-container">
    <section class="card hero">
      <div class="left">
        <h1>หาที่ฝึกงานจริงไม่บิดครับ</h1>
        <p>ค้นหาที่ฝึกงานสำหรับนักศึกษาสาขาคอมพิวเตอร์และสารสนเทศ</p>

        <div class="searchbar">
          <input class="input" placeholder="เช่น ฝึกงาน UX/UI ฝึกงาน DATABASE" />
          <button class="btn" onclick="location.hash='#/ai'">ค้นหา</button>
        </div>

        <div class="tags">
          <span class="tag">ฝึกงานต่างประเทศ</span>
          <span class="tag">ฝึกงานหนองคาย</span>
          <span class="tag">ฝึกงานขอนแก่น</span>
        </div>
      </div>

      <aside style="width:360px">
        <div class="info-box card white">
          <h3>AI WORK</h3>
          <p class="small">อัปโหลด Resume ของคุณให้ AI วิเคราะห์ แล้วจะแนะนำที่ฝึกงานที่เหมาะสม ฟรี 1 ครั้ง</p>
          <div style="margin-top:12px"><button class="btn" onclick="location.hash='#/ai'">คลิกเพื่อใช้งาน AI WORK</button></div>
        </div>

        <div class="info-box">
          <h4>ประโยชน์</h4>
          <p class="small">ฝึกงานใกล้บ้าน / ประสบการณ์จริง / สวัสดิการ</p>
        </div>
      </aside>
    </section>

    <section class="card">
      <h3>Featured</h3>
      <p class="small">ตัวอย่างบริษัทที่ร่วมรายการ</p>
      <div class="results" id="featured-list">
        ${companies.map(c=>`<div class="company"><div class="logo">${c.name[0]}</div><div class="meta"><h3>${c.name}</h3><p>${c.desc}</p></div></div>`).join('')}
      </div>
    </section>

  </div>
  `;
}

function aiUploadView(){
  return `
    <div class="main-container">
      <section class="card">
        <h2>AI WORK — อัปโหลด Resume</h2>
        <p class="small">รองรับไฟล์ .pdf, .doc, .docx (จำลอง)</p>

        <div class="upload-area" style="margin-top:18px">
          <div class="file-input">
            <label class="btn" for="file">เลือกไฟล์</label>
            <div class="fake-file" id="fileName">ยังไม่ได้เลือกไฟล์</div>
            <input id="file" type="file" accept=".pdf,.doc,.docx" style="display:none" />
          </div>
          <div>
            <button class="btn" id="startBtn" disabled>เริ่มใช้งาน AI WORK</button>
            <div class="small" style="margin-top:8px">* ระบบจะจำลองการวิเคราะห์โดยใช้ AI</div>
          </div>
        </div>

      </section>

      <aside>
        <div class="card info-box white">
          <h4>คำแนะนำ</h4>
          <p class="small">อัปโหลด Resume ของคุณเพื่อให้ AI วิเคราะห์ความถนัดและแนะนำตำแหน่งที่เหมาะสม</p>
        </div>

        <div class="card info-box" style="margin-top:18px">
          <h4>สวัสดิการ</h4>
          <p class="small">เลี้ยงข้าว 3 มื้อ, ที่พัก, ประกัน</p>
        </div>
      </aside>
    </div>
  `;
}

function aiLoadingView(filename){
  return `
  <div class="main-container">
    <section class="card loading-center" style="grid-column:1 / span 2">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:72px;height:72px;border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--accent)">AI</div>
        <div>
          <div style="font-weight:700">AI กำลังวิเคราะห์ Resume</div>
          <div class="small">ไฟล์: ${filename}</div>
        </div>
      </div>

      <div class="spinner"><div class="ring"></div></div>
      <div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
      <div class="progress"><i></i></div>
      <div class="small">กระบวนการนี้จะใช้เวลาประมาณ 3-6 วินาที (จำลอง)</div>
    </section>
  </div>
  `;
}

function aiResultView(result){
  return `
  <div class="main-container">
    <section class="card hero">
      <div class="left">
        <h1>ผลลัพธ์จาก AI</h1>
        <p class="small">AI แนะนำให้คุณลองสมัครที่บริษัทต่อไปนี้</p>

        <div class="results">
          ${result.map(r=>`<div class="company"><div class="logo">${r.name[0]}</div><div class="meta"><h3>${r.name} <span style="color:var(--muted);font-weight:600">(${r.score}%)</span></h3><p>${r.desc}</p></div><div style="text-align:right"><button class="btn" onclick="apply('${r.name}')">ดูตำแหน่ง</button></div></div>`).join('')}
        </div>

      </div>

      <aside style="width:360px">
        <div class="card info-box white">
          <h4>คำแนะนำการสมัคร</h4>
          <p class="small">แก้ไข Resume ให้กระชับ เน้นทักษะที่เกี่ยวข้อง</p>
        </div>

        <div class="card info-box" style="margin-top:18px">
          <h4>บันทึก</h4>
          <p class="small">ผลลัพธ์นี้เป็นการจำลองเพื่อการสาธิตเท่านั้น</p>
        </div>
      </aside>
    </section>
  </div>
  `;
}

function aboutView(){
  return `
  <div class="main-container">
    <section class="card">
      <h2>เกี่ยวกับ Gobit (Demo)</h2>
      <p class="small">เวอร์ชันสาธิตของหน้า AI WORK</p>
    </section>
  </div>
  `;
}

// router
function router(){
  const hash = location.hash || '#/';
  if(hash === '#/' || hash === ''){
    app.innerHTML = homeView();
  } else if(hash.startsWith('#/ai/load')){
    // format: #/ai/load?file=xxxx
    const params = new URLSearchParams(hash.split('?')[1] || '');
    const filename = params.get('file') || 'resume.pdf';
    app.innerHTML = aiLoadingView(filename);
    // simulate analysis delay 3-4s then show results
    setTimeout(()=>{
      // create pseudo-result by scoring and sorting companies by random perturbation
      const out = companies.map(c=>{
        return {...c, score: Math.max(60, c.score - Math.floor(Math.random()*12))};
      }).sort((a,b)=>b.score-a.score).slice(0,3);
      location.hash = '#/ai/result';
      // store to session
      sessionStorage.setItem('ai_result', JSON.stringify(out));
    }, 3200 + Math.random()*1600);
  } else if(hash === '#/ai'){
    app.innerHTML = aiUploadView();
    const file = document.getElementById('file');
    const nameBox = document.getElementById('fileName');
    const startBtn = document.getElementById('startBtn');
    file.addEventListener('change', (e)=>{
      const f = e.target.files[0];
      if(f){
        nameBox.textContent = f.name + ' ('+Math.round(f.size/1024)+' KB)';
        startBtn.disabled = false;
      } else {
        nameBox.textContent = 'ยังไม่ได้เลือกไฟล์';
        startBtn.disabled = true;
      }
    });
    startBtn.addEventListener('click', ()=>{
      const f = file.files[0];
      const fname = f ? f.name : 'resume.pdf';
      // go to loading
      location.hash = '#/ai/load?file=' + encodeURIComponent(fname);
    });
  } else if(hash === '#/ai/result'){
    // read result from sessionStorage
    let result = [];
    try{ result = JSON.parse(sessionStorage.getItem('ai_result')) || []; } catch(e){}
    if(result.length === 0){
      app.innerHTML = `
        <div class="main-container"><section class="card"><h3>ไม่มีผลลัพธ์</h3><p class="small">กรุณาอัปโหลด Resume ใหม่</p><button class="btn" onclick="location.hash='#/ai'">กลับไปหน้า AI WORK</button></section></div>
      `;
    } else {
      app.innerHTML = aiResultView(result);
    }
  } else if(hash === '#/about'){
    app.innerHTML = aboutView();
  } else {
    app.innerHTML = '<div class="main-container"><section class="card"><h3>404 — ไม่พบหน้า</h3></section></div>';
  }
}

// helper
window.apply = function(name){
  alert('เปิดหน้าตำแหน่งของ ' + name + ' (จำลอง)');
}

// listen
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
