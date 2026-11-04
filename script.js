document.addEventListener("DOMContentLoaded",()=>{const menu=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close menu":"Open menu")});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));}const filters=[...document.querySelectorAll("[data-filter]")],cards=[...document.querySelectorAll(".unit-card[data-type]")];filters.forEach(button=>button.addEventListener("click",()=>{filters.forEach(b=>b.classList.toggle("active",b===button));const type=button.dataset.filter;cards.forEach(card=>{card.hidden=type!=="all"&&card.dataset.type!==type;});}));const form=document.getElementById("contactForm");if(form){form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const lines=["Hello, I would like information about Makadi Heights.","Name: "+data.get("name"),"Phone: "+data.get("phone"),"Email: "+(data.get("email")||"Not provided"),"Interest: "+data.get("interest"),"Message: "+(data.get("message")||"Not provided")];const url="https://wa.me/201095453622?text="+encodeURIComponent(lines.join("\n"));window.open(url,"_blank","noopener,noreferrer");});}const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();const header=document.getElementById("navbar");const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>24);window.addEventListener("scroll",onScroll,{passive:true});onScroll();});
/* Six-language switcher powered by Google Website Translator */
(function(){
 const select=document.getElementById("siteLanguage");
 if(!select)return;
 const rtl={ar:true};
 function applyLanguage(lang){
  document.documentElement.lang=lang;
  document.documentElement.dir=rtl[lang]?"rtl":"ltr";
  const combo=document.querySelector(".goog-te-combo");
  if(combo){combo.value=lang;combo.dispatchEvent(new Event("change"));}
  try{localStorage.setItem("makadi-language",lang);}catch(e){}
 }
 select.addEventListener("change",()=>applyLanguage(select.value));
 window.addEventListener("load",()=>{
  let saved="en";try{saved=localStorage.getItem("makadi-language")||"en";}catch(e){}
  select.value=saved;
  if(saved!=="en"){let tries=0;const timer=setInterval(()=>{const combo=document.querySelector(".goog-te-combo");if(combo||tries++>30){clearInterval(timer);applyLanguage(saved);}},250);}
 });
})();
