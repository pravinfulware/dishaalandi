
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
function openModal(){modal.classList.add('active');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('active');document.body.style.overflow=''}

/* Auto-open once after 6s */
setTimeout(()=>{
 if(!localStorage.getItem('popupShown')){
  openModal();
  localStorage.setItem('popupShown','yes');
 }
},6000);


document.addEventListener("DOMContentLoaded", () => {

  /* ===== CONFIG ===== */
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbywfgLETShjD-nNYcjasy4ptEfXI5YqDuLq0d5KKS2wDjKAoT3QWbdBaVo4Wm1Wo6vS2A/exec";

  const WHATSAPP_NUMBER = "918956444441";

  /* ===== ELEMENTS ===== */
  const form = document.getElementById("enquiryForm");
  const modal = document.getElementById("enquiryModal");

  /* ===== FORM SUBMIT ===== */
 const successBox = document.getElementById("successBox");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  await fetch(
    "https://script.google.com/macros/s/AKfycbywfgLETShjD-nNYcjasy4ptEfXI5YqDuLq0d5KKS2wDjKAoT3QWbdBaVo4Wm1Wo6vS2A/exec",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }
  );

  /* Hide form, show success */
  form.style.display = "none";
  successBox.classList.add("active");

  /* WhatsApp message */
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

    /* Reset for next user */
    form.reset();
    form.style.display = "block";
    successBox.classList.remove("active");
    modal.classList.remove("active");
  }, 1500);
});



function showSuccess(){
  var s = document.getElementById("successPopup");
  if(s){ s.classList.add("active"); }
}

function submitInquiryForm(form){
  event.preventDefault();
  var data = new FormData(form);

  fetch(form.action, { method:'POST', body:data })
  .then(r=>r.text())
  .then(()=>{
    showSuccess();
    var msg = encodeURIComponent("Thank you! Your inquiry has been submitted.");
    window.open("https://wa.me/918956444441?text="+msg,"_blank");
    form.reset();
  })
  .catch(()=>alert("Submission failed"));
}
