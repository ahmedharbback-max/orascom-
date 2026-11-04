document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.getElementById("menuToggle"),nav=document.getElementById("navLinks");
 if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Close menu":"Open menu")});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));}
 const filters=[...document.querySelectorAll("[data-filter]")],cards=[...document.querySelectorAll(".unit-card[data-type]")];
 filters.forEach(button=>button.addEventListener("click",()=>{filters.forEach(b=>b.classList.toggle("active",b===button));const type=button.dataset.filter;cards.forEach(card=>card.hidden=type!=="all"&&card.dataset.type!==type)}));
 const form=document.getElementById("contactForm"),lang=document.documentElement.lang||"en";
 const messages={
 en:["Hello, I would like information about Makadi Heights.","Name: ","Phone: ","Email: ","Interest: ","Message: "],
 ar:["مرحبًا، أود الحصول على معلومات عن مكادي هايتس.","الاسم: ","الهاتف: ","البريد الإلكتروني: ","مهتم بـ: ","الرسالة: "],
 it:["Salve, vorrei ricevere informazioni su Makadi Heights.","Nome: ","Telefono: ","Email: ","Interesse: ","Messaggio: "],
 de:["Guten Tag, ich möchte Informationen zu Makadi Heights erhalten.","Name: ","Telefon: ","E-Mail: ","Interesse: ","Nachricht: "],
 fr:["Bonjour, je souhaite recevoir des informations sur Makadi Heights.","Nom : ","Téléphone : ","E-mail : ","Intérêt : ","Message : "],
 ru:["Здравствуйте, я хотел(а) бы получить информацию о Makadi Heights.","Имя: ","Телефон: ","Эл. почта: ","Интересует: ","Сообщение: "]
 };
 if(form){form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),m=messages[lang]||messages.en;const lines=[m[0],m[1]+data.get("name"),m[2]+data.get("phone"),m[3]+(data.get("email")||"—"),m[4]+data.get("interest"),m[5]+(data.get("message")||"—")];window.open("https://wa.me/201095453622?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer")})}
 const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
 const select=document.getElementById("siteLanguage");if(select){select.value=lang;select.addEventListener("change",()=>{const target=select.value;window.location.href=target==="en"?"/":"/"+target+"/"})}
 const header=document.getElementById("navbar"),onScroll=()=>header?.classList.toggle("scrolled",window.scrollY>24);window.addEventListener("scroll",onScroll,{passive:true});onScroll();
});