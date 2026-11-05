document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");
 if(menu&&nav){
  menu.addEventListener("click",()=>{
   const open=nav.classList.toggle("open");
   menu.setAttribute("aria-expanded",String(open));
   menu.setAttribute("aria-label",open?"Close menu":"Open menu");
  });
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
   nav.classList.remove("open");menu.setAttribute("aria-expanded","false");
  }));
 }
 const filters=[...document.querySelectorAll("[data-filter]")];
 const cards=[...document.querySelectorAll(".unit-card[data-type]")];
 filters.forEach(button=>button.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.toggle("active",b===button));
  const type=button.dataset.filter;
  cards.forEach(card=>card.hidden=type!=="all"&&card.dataset.type!==type);
 }));
 const form=document.getElementById("contactForm"),lang=document.documentElement.lang||"en";
 const messages={
  en:["Hello, I would like information about Makadi Heights.","Name: ","Phone: ","Email: ","Interest: ","Message: "],
  ar:["مرحبًا، أود الحصول على معلومات عن مكادي هايتس.","الاسم: ","الهاتف: ","البريد الإلكتروني: ","مهتم بـ: ","الرسالة: "],
  it:["Salve, vorrei ricevere informazioni su Makadi Heights.","Nome: ","Telefono: ","Email: ","Interesse: ","Messaggio: "],
  de:["Guten Tag, ich möchte Informationen zu Makadi Heights erhalten.","Name: ","Telefon: ","E-Mail: ","Interesse: ","Nachricht: "],
  fr:["Bonjour, je souhaite recevoir des informations sur Makadi Heights.","Nom : ","Téléphone : ","E-mail : ","Intérêt : ","Message : "],
  ru:["Здравствуйте, я хотел(а) бы получить информацию о Makadi Heights.","Имя: ","Телефон: ","Эл. почта: ","Интересует: ","Сообщение: "]
 };
 if(form){
  form.addEventListener("submit",event=>{
   event.preventDefault();
   if(!form.reportValidity())return;
   const data=new FormData(form),m=messages[lang]||messages.en;
   const lines=[m[0],m[1]+data.get("name"),m[2]+data.get("phone"),m[3]+(data.get("email")||"—"),m[4]+data.get("interest"),m[5]+(data.get("message")||"—")];
   window.open("https://wa.me/201095453622?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");
  });
 }
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();

 // Keep a visitor's deliberate language choice; otherwise suggest one from country.
 const paths={en:"/",ar:"/ar/",it:"/it/",de:"/de/",fr:"/fr/",ru:"/ru/"};
 const select=document.getElementById("siteLanguage");
 const current=document.documentElement.lang||"en";
 const countryLanguages={
  EG:"ar",SA:"ar",AE:"ar",QA:"ar",KW:"ar",BH:"ar",OM:"ar",JO:"ar",LB:"ar",IQ:"ar",YE:"ar",PS:"ar",SD:"ar",MA:"ar",DZ:"ar",TN:"ar",LY:"ar",
  FR:"fr",MC:"fr",SN:"fr",CI:"fr",CD:"fr",CM:"fr",
  DE:"de",AT:"de",CH:"de",LI:"de",
  IT:"it",SM:"it",VA:"it",
  RU:"ru",BY:"ru",KZ:"ru",KG:"ru"
 };
 const localeLanguage=()=>{
  const locales=[...(navigator.languages||[]),navigator.language||""];
  for(const locale of locales){
   const code=String(locale).toLowerCase().split(/[-_]/)[0];
   if(["ar","en","it","de","fr","ru"].includes(code))return code;
  }
  return "en";
 };
 const goToLanguage=target=>{
  if(!paths[target])return;
  if(select)select.value=target;
  if(target!==current)window.location.replace(paths[target]);
 };
 if(select){
  select.value=current;
  select.addEventListener("change",()=>{
   const chosen=select.value;
   try{localStorage.setItem("makadi-language-manual",chosen)}catch(e){}
   try{sessionStorage.setItem("makadi-language-redirected","1")}catch(e){}
   goToLanguage(chosen);
  });
 }
 const suggestLanguage=async()=>{
  let manual="";
  try{manual=localStorage.getItem("makadi-language-manual")||""}catch(e){}
  if(paths[manual]){if(manual!==current)goToLanguage(manual);return}
  let country="";
  try{
   const controller=new AbortController();
   const timeout=window.setTimeout(()=>controller.abort(),2200);
   const response=await fetch("https://ipapi.co/country/",{cache:"no-store",signal:controller.signal});
   window.clearTimeout(timeout);
   if(response.ok)country=(await response.text()).trim().toUpperCase();
  }catch(e){}
  // Re-check in case the visitor chose a language while the lookup was in flight.
  try{
   const latest=localStorage.getItem("makadi-language-manual")||"";
   if(paths[latest]){
    if(latest!==current)goToLanguage(latest);
    return;
   }
  }catch(e){}
  const suggested=countryLanguages[country]||localeLanguage();
  if(paths[suggested]&&suggested!==current){
   let alreadyRedirected=false;
   try{alreadyRedirected=sessionStorage.getItem("makadi-language-redirected")==="1"}catch(e){}
   if(!alreadyRedirected){
    try{sessionStorage.setItem("makadi-language-redirected","1")}catch(e){}
    goToLanguage(suggested);
   }
  }
 };
 suggestLanguage();

 const header=document.getElementById("navbar");
 const onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>24);
 window.addEventListener("scroll",onScroll,{passive:true});onScroll();
});