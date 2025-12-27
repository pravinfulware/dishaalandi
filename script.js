/*
const revealItems=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('show');
  });
},{threshold:0.2});
revealItems.forEach(el=>obs.observe(el));

*/


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
  const modal = document.getElementById('enquiryModal');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
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
     FORM SUBMIT
     ====================== */
  const form = document.getElementById("enquiryForm");
  const successBox = document.getElementById("successBox");

  if (!form) return;

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
