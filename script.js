
const revealItems=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('show');
  });
},{threshold:0.2});
revealItems.forEach(el=>obs.observe(el));




/* Theme */
const toggle=document.getElementById('themeToggle');
toggle.onclick=()=>document.body.classList.toggle('dark');

/* Modal */
const modal=document.getElementById('enquiryModal');
function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.body.classList.remove('modal-open');
}

/* Auto-open once after 6s */
setTimeout(()=>{
 if(!localStorage.getItem('popupShown')){
  openModal();
  localStorage.setItem('popupShown','yes');
 }
},6000);


document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     REVEAL ON SCROLL
     ====================== */
  const revealItems = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.2 });
  revealItems.forEach(el => obs.observe(el));


  /* ======================
     THEME TOGGLE
     ====================== */
  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.onclick = () => document.body.classList.toggle('dark');
  }


  /* ======================
     MODAL CONTROLS
     ====================== */
const modal = document.getElementById("enquiryModal");

function openModal() {
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
  document.body.classList.remove("modal-open");
}

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  const closeBtn = document.querySelector('.close-btn');
  const overlay = document.querySelector('.modal-overlay');

  if (closeBtn) closeBtn.onclick = closeModal;
  if (overlay) overlay.onclick = closeModal;

  /* ESC key closes modal (THIS IS WHAT YOU ASKED ABOUT) */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });


  /* ======================
     AUTO POPUP (ONCE)
     ====================== */
  setTimeout(() => {
    if (!localStorage.getItem('popupShown')) {
      openModal();
      localStorage.setItem('popupShown', 'yes');
    }
  }, 6000);

  /* ======================
   OFFLINE QUEUE SYSTEM
   ====================== 
function saveOfflineLead(data) {
  const queue = JSON.parse(localStorage.getItem("offlineLeads") || "[]");
  queue.push(data);
  localStorage.setItem("offlineLeads", JSON.stringify(queue));
}

async function syncOfflineLeads() {
  if (!navigator.onLine) return;

  const queue = JSON.parse(localStorage.getItem("offlineLeads") || "[]");
  if (!queue.length) return;

  for (const lead of queue) {
    try {
      await fetch(SCRIPT_URL, { method: "POST", body: JSON.stringify(lead) });
    } catch (e) {
      return;
    }
  }

  localStorage.removeItem("offlineLeads");
}

window.addEventListener("online", syncOfflineLeads);
*/
function isDuplicate(phone) {
  const key = "lead_" + phone;
  if (localStorage.getItem(key)) return true;

  localStorage.setItem(key, Date.now());
  setTimeout(() => localStorage.removeItem(key), 86400000); // 24 hrs
  return false;
}

  /* ======================
     FORM SUBMIT
     ====================== */

  /* ======================
   PHONE VALIDATION (INDIA)
   ====================== */
const phoneInput = document.querySelector(
  '#enquiryForm input[name="phone"]'
);

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    // Allow digits only
    phoneInput.value = phoneInput.value.replace(/\D/g, '');

    // Validate Indian number
    if (!/^[6-9]\d{9}$/.test(phoneInput.value)) {
      phoneInput.setCustomValidity(
        "Please enter a valid 10-digit Indian mobile number"
      );
    } else {
      phoneInput.setCustomValidity("");
    }
  });
/*
  if (isDuplicate(data.phone)) {
  alert("We already received your inquiry. Our team will contact you shortly.");
  return;
}
*/

   const form = document.getElementById("enquiryForm");
  const successBox = document.getElementById("successBox");


if (!form) {
  console.error("❌ enquiryForm not found");
} else {
  console.log("✅ enquiryForm found");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("✅ Submit clicked");

    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Form Data:", data);

    // rest of your code...
  });
}


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    if (!/^[6-9]\d{9}$/.test(data.phone)) {
  alert("Please enter a valid Indian mobile number");
  return;
}/*
try {
  await postWithRetry("https://script.google.com/macros/s/AKfycbzzELICGtgipGvMV46eGU0sZBSyH3TYJ5JezSlnJDy0DiC6yf-viIQ5KHPC5RyfVoPLNw/exec", data, 3);
} catch {
  saveOfflineLead(Object.fromEntries(data.entries()));
  alert("You are offline. Your inquiry is saved and will be submitted automatically.");
}
*/
    
    await fetch("https://script.google.com/macros/s/AKfycbzzELICGtgipGvMV46eGU0sZBSyH3TYJ5JezSlnJDy0DiC6yf-viIQ5KHPC5RyfVoPLNw/exec", {
  method: "POST",
  body: JSON.stringify(data)
});

  

    /* Show success animation */
    form.style.display = "none";
    successBox.classList.add("active");

    const message = `
Hello DISHA Computer Institute 👋

📘 Course: ${data.course}
🏫 Branch: ${data.branch}

👤 Name: ${data.name}
📞 Phone: ${data.phone}
    `;

    setTimeout(() => {
      window.location.href =
        "https://wa.me/918956444441?text=" + encodeURIComponent(message);

      form.reset();
      form.style.display = "block";
      successBox.classList.remove("active");
      closeModal();
    }, 1500);
  });

});
