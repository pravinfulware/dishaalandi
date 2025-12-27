
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
    "https://script.google.com/macros/s/AKfycbz7WKZKpxhHU3qDgStEfps_Rn1bF_2Szs7k0Smq8zJq1RbuDi8Ae7DJDlbrKrAeYAsjJg/exec";

  const WHATSAPP_NUMBER = "918956444441";

  /* ===== ELEMENTS ===== */
  const form = document.getElementById("enquiryForm");
  const modal = document.getElementById("enquiryModal");

  /* ===== FORM SUBMIT ===== */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      /* Send data to Google Sheet */
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      /* WhatsApp message */
      const message = `
Hello DISHA Computer Institute 👋

📘 Course: ${data.course}
🏫 Branch: ${data.branch}

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
      `;

      /* Redirect to WhatsApp */
      window.location.href =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      form.reset();
      modal.classList.remove("active");

    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  });

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
