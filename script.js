
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
