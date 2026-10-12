// === index.html dan ajratildi (XOLERIC SEO) ===
(function(){
  var loader=document.getElementById('svLoader'),done=false;
  function hide(){if(done||window.__savodhonLoaded)return;done=true;window.__savodhonLoaded=true;
    var l=document.getElementById('svLogo');if(l)l.classList.add('stable');
    setTimeout(function(){var x=document.getElementById('svLoader');if(x)x.classList.add('hidden');},450);}
  try{
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){hide();return;}
    var cv=document.getElementById('svMatrix'),ctx=cv.getContext('2d');
    var DPR=Math.min(window.devicePixelRatio||1,1.5);
    cv.width=Math.max(320,Math.round(innerWidth*DPR));cv.height=Math.max(320,Math.round(innerHeight*DPR));
    var FONT=Math.max(14,Math.round(15*DPR)),ROW=Math.round(FONT*1.4),CELL=Math.max(8,Math.round(FONT*.62));
    var lanes=[],rows=Math.max(8,Math.floor(cv.height/ROW)),g='0123456789ŞÇÖĞ';
    for(var i=0;i<rows;i++)lanes.push({x:-Math.random()*cv.width*.6,v:(13+Math.random()*15)*DPR,len:7+((Math.random()*12)|0),y:i*ROW+FONT});
    ctx.fillStyle='#050508';ctx.fillRect(0,0,cv.width,cv.height);
    ctx.font=FONT+'px ui-monospace,Menlo,Consolas,monospace';
    var t0=Date.now(),pct=document.getElementById('svPct');
    (function frame(){
      if(done)return;
      if(!document.hidden){
        ctx.fillStyle='rgba(5,5,8,.26)';ctx.fillRect(0,0,cv.width,cv.height);
        for(var i=0;i<lanes.length;i++){var L=lanes[i];L.x+=L.v;
          if(L.x-L.len*CELL>cv.width){L.x=-L.len*CELL-Math.random()*cv.width*.25;L.v=(13+Math.random()*15)*DPR;L.len=7+((Math.random()*12)|0);continue;}
          for(var j=0;j<L.len;j++){var cx=Math.round(L.x-j*CELL);if(cx<-CELL||cx>cv.width+CELL)continue;
            var f=1-j/L.len;
            ctx.fillStyle=j%5===0?('rgba(96,150,255,'+(.25+.65*f)+')'):('rgba(245,192,68,'+(.2+.7*f)+')');
            ctx.fillText(g[(Math.random()*g.length)|0],cx,L.y);}}
        var p=Math.min(92,Math.floor((Date.now()-t0)/14));if(pct)pct.textContent=p+'%';
      }
      requestAnimationFrame(frame);
    })();
  }catch(e){}
  window.addEventListener('load',function(){setTimeout(hide,1300);});
  setTimeout(hide,8000);
})();

'use strict';
/* ==================== PARTICLES + CONFETTI ==================== */
(function initParticles(){
  const c=document.getElementById('particleCanvas');if(!c)return;
  const x=c.getContext('2d');
  const GOLD=['#F5C044','#EAB308','#FFE9A8','#3B6CFF','#ffffff'];
  let W,H,parts=[],confetti=[];
  function resize(){const d=Math.min(window.devicePixelRatio||1,1.5);W=c.width=Math.round(window.innerWidth*d);H=c.height=Math.round(window.innerHeight*d);}
  resize();window.addEventListener('resize',resize);
  const dark=document.documentElement.getAttribute('data-theme')!=='light';
  for(let i=0;i<46;i++)parts.push({x:Math.random()*2000,y:Math.random()*2000,r:Math.random()*1.8+.4,s:Math.random()*.35+.08,o:Math.random()*.5+.15,g:Math.random()>.55});
  window.burstConfetti=function(n){
    n=n||70;
    for(let i=0;i<n;i++)confetti.push({x:W/2+(Math.random()-.5)*120,y:H*.32,r:Math.random()*4+2,vx:(Math.random()-.5)*7,vy:Math.random()*-6-2,g:.22+Math.random()*.12,col:GOLD[Math.floor(Math.random()*GOLD.length)],life:1,spin:Math.random()*Math.PI*2});
  };
  function animate(){
    if(document.hidden){requestAnimationFrame(animate);return;}
    x.clearRect(0,0,W,H);
    for(const p of parts){p.y-=p.s;if(p.y<-4){p.y=H+4;p.x=Math.random()*W;}
      x.globalAlpha=p.o;x.fillStyle=p.g?'#F5C044':'#3B6CFF';x.beginPath();x.arc(p.x%W,p.y,p.r,0,7);x.fill();}
    x.globalAlpha=1;
    confetti=confetti.filter(p=>p.life>0);
    for(const p of confetti){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.99;p.life-=.011;p.spin+=.15;
      x.save();x.globalAlpha=Math.max(0,p.life);x.translate(p.x,p.y);x.rotate(p.spin);x.fillStyle=p.col;x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore();}
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ==================== LEVELS ==================== */
const LEVELS=[
  {level:1,name:"Yangi boshlovchi",xp:0},{level:2,name:"O'quvchi",xp:100},
  {level:3,name:"Izlanuvchan",xp:250},{level:4,name:"Bilimdon",xp:500},
  {level:5,name:"Zukko",xp:800},{level:6,name:"Mohir",xp:1200},
  {level:7,name:"Mutaxassis",xp:1700},{level:8,name:"Usta",xp:2300},
  {level:9,name:"Donishmand",xp:3000},{level:10,name:"Alloma",xp:4000},
  {level:11,name:"Daho",xp:5500},{level:12,name:"Afsona",xp:7500},
  {level:13,name:"Legend",xp:10000},{level:14,name:"Titan",xp:13000},
  {level:15,name:"XOLERIC",xp:17000}
];
function getLevel(xp){let lvl=LEVELS[0];for(const l of LEVELS){if(xp>=l.xp)lvl=l;}return lvl;}
function getNextLevelXP(xp){for(let i=0;i<LEVELS.length-1;i++){if(xp>=LEVELS[i].xp&&xp<LEVELS[i+1].xp)return LEVELS[i+1].xp;}return LEVELS[LEVELS.length-1].xp;}

/* ==================== THEME SYSTEM ==================== */
const THEMES=['dark','light','neon','ocean'];
function currentTheme(){return document.documentElement.getAttribute('data-theme')||'dark';}
function applyTheme(t){
  if(t==='neon'||t==='ocean')t='dark';
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('xol_theme',t);
  const meta=document.getElementById('themeColorMeta');
  if(meta)meta.content=(t==='light')?'#FFF8EA':'#050508';
  const tn=document.getElementById('themeName');
  if(tn)tn.textContent=(t==='light')?'Golden Light':'Midnight';
}
function toggleTheme(){
  const cur=currentTheme();
  applyTheme(cur==='light'?'dark':'light');
  vibrate(20);
}

/* ==================== DATABASE (28 harf x 6 bosqich x 6 so'z) ==================== */
const DB={
"A":{step1:["A-ka","A-ri","A-jal","A-na","A-zob","A-yiq"],step2:["A-nor","A-lo-qa","A-ra-va","A-za-mat","A-lif-bo","A-dras"],step3:["Av-to-mo-bil","A-ra-la-şuv","A-sos-la-moq","At-las","Ax-bo-rot","A-yov-siz"],step4:["A-ka-de-mi-ya","A-vi-a-si-ya","Av-to-bus","A-do-lat-li","A-dras-mon","A-ziz-lik"],step5:["A-sos-çi-lar","A-yov-siz-lik","An-a-na-viy","A-ha-mi-yat","A-niq-lik-lar","Ak-tyor-lar"],step6:["A-vi-a-si-ya-çi","A-ka-de-mik-lar","A-sos-lan-ma-gan","A-ha-mi-yat-siz","A-ra-laş-ti-riş","A-çi-nar-li-roq"]},
"B":{step1:["Bo-la","Bo-bo","Bu-vi","Bo-ği","Be-da","Ba-ho"],step2:["Ba-liq","Bi-lim","Ba-ho-dir","Be-mor","Ba-ra-ka","Bay-ram"],step3:["Boş-lan-ğiç","Bi-la-gu-zuk","Ba-qa-te-rak","Buz-ğun-çi","Boy-la-moq","Be-ğu-bor"],step4:["Ba-ra-ka-li","Bi-lim-don","Be-min-nat","Ba-ho-la-moq","Bu-loq-lar","Be-va-fo"],step5:["Bi-lim-don-lik","Ba-qa-te-rak-lar","Bö-yoq-çi","Be-to-qat-lik","Boş-lan-ma-gan","Buy-ruq-boz"],step6:["Bi-la-gu-zuk-siz","Buz-ğun-çi-lik","Ba-ho-dir-lik-lar","Bi-lim-li-lar","Be-pa-ro-sat-lik","Bay-ram-o-na"]},
"D":{step1:["Da-da","Da-la","Do-ri","Da-vo","Do-hiy","Do-ira"],step2:["Daf-tar","Dav-lat","Da-raxt","Dun-yo","Deh-qon","Da-ro-mad"],step3:["Dur-do-na","Do-vyu-rak","Das-tur-xon","Dil-kaş-lik","Dok-tor","Da-vo-la"],step4:["Da-vo-la-niş","Dun-yo-qar-aş","Deh-qon-çi","Daf-tar-ça","Da-ro-mad-li","Do-vyu-rak-lar"],step5:["Dav-lat-lar-a-ro","Da-ro-mad-siz","Das-tur-xon-çi","Dun-yo-viy-lik","Deh-qon-bo-zor","Do-i-ra-siz"],step6:["Dav-lat-şu-nos-lik","Do-vyu-rak-lar-ça","Da-ro-mad-siz-lik","Das-tur-xon-çi-lik","Dil-kaş-lik-lar-dan","Deh-qon-çi-lik-siz"]},
"E":{step1:["E-ga","E-lak","E-şik","Er-tak","E-kin","E-lat"],step2:["E-tik","E-lon","E-li-miz","E-ti-bor","E-ga-si","Eç-ki"],step3:["E-lak-çi","E-kin-zor","E-rin-çoq","E-ti-qod","E-zoz-laş","E-şi-tiş"],step4:["E-lon-no-ma","E-ti-bor-li","E-zgul-lik","E-ti-roz-lar","E-ko-lo-gi-ya","E-kin-zor-lar"],step5:["E-rin-çoq-lik","E-ti-bor-siz","E-ti-qod-li","E-zoz-la-moq","E-lek-tro-ni-ka","E-lon-lar-dan"],step6:["E-ti-bor-siz-lik","E-rin-çoq-lar-ça","E-ti-qod-siz-lik","E-lek-tro-tex-ni-ka","E-ko-lo-gi-ya-viy","E-zoz-lan-ma-gan"]},
"F":{step1:["Fa-zo","Fi-do","Fo-iz","Fa-ol","Fer-ma","Fa-qir"],step2:["Fan-lar","Fo-nar","Fax-riy","Fik-rim","Fer-mer","Fa-raz"],step3:["Fa-o-li-yat","Faxr-la-niş","Fi-do-kor","Fan-tex-ni-ka","Farq-la-moq","Fikr-laş-moq"],step4:["Fa-zi-lat-li","Far-zand-lar","Fa-lo-kat-li","Fa-o-li-yat-da","Fikr-laş-iş","Foy-da-lan-iş"],step5:["Fa-o-li-yat-siz","Faxr-la-nar-li","Fi-do-kor-lik","Foy-da-lan-uv-çi","Fa-las-tin-lik","Far-zand-siz-lik"],step6:["Fa-o-li-yat-siz-lik","Fi-do-kor-o-na","Foy-da-la-nil-ma-gan","Fa-zi-lat-lar-i-miz","Farq-lan-ma-gan-lik","Fikr-laş-mas-lik"]},
"G":{step1:["Gu-li","Gav-da","Gi-lam","Ga-do","Gu-ruh","Ga-pi"],step2:["Gul-don","Gul-xan","Gul-çi","Ga-ram","Gar-mon","Gu-voh"],step3:["Gu-lis-ton","Gul-par-var","Gul-xan-çi","Gi-lam-doz","Gar-diş-li","Ga-pi-riş"],step4:["Gu-lis-ton-lik","Gu-voh-no-ma","Gö-zal-lik","Gu-rul-laş","Ga-zak-li","Gu-noh-kor"],step5:["Gö-zal-lik-lar","Gu-voh-no-ma-si","Gul-par-var-lik","Ga-pi-ril-ma-gan","Gi-lam-doz-lik","Gu-noh-kor-lar"],step6:["Gö-zal-laş-ti-riş","Gu-lis-ton-lik-lar","Gu-voh-no-ma-siz","Gul-par-var-lar-ça","Ga-pi-ri-la-yo-tgan","Gi-lam-doz-lik-da"]},
"H":{step1:["Ha-vo","Ha-yo","Hi-dla","Ha-sad","Hur-mat","Ha-li"],step2:["Ho-zir","Hu-nar","Ha-ram","Ho-ji","Huj-jat","Hay-kal"],step3:["Ha-qi-qat","Hu-nar-mand","Ho-zir-gi","Ha-ram-xo-na","Huj-jat-xo-na","Ho-zir-ja-vob"],step4:["Ha-qi-qiy","Hu-nar-siz","Hay-kal-ta-roş","Ha-ra-kat-da","Ha-ya-jon-li","Hur-mat-siz"],step5:["Ha-qi-qat-dan","Hu-nar-mand-lik","Ha-ra-kat-çan","Hay-kal-ta-roş-lik","Ha-ya-jon-la-niş","Ho-zir-ja-vob-lik"],step6:["Ha-qi-qat-par-var","Ha-ra-kat-çan-lik","Hur-mat-siz-lik-lar","Hay-kal-ta-roş-lik-da","Ha-ya-jon-lan-ma-gan","Hu-nar-mand-çi-lik"]},
"I":{step1:["I-lon","I-pak","I-rim","Ik-ki","I-liq","I-gna"],step2:["I-şonç","I-lo-va","I-bo-ra","Ilm-li","I-job","I-jod"],step3:["I-lo-va-lar","I-şonç-li","I-bo-ra-lar","I-jod-kor","Il-miy-lik","I-jo-bat"],step4:["I-şonç-siz","I-jod-kor-lar","I-bro-him","I-bo-ra-siz","I-çim-lik","Iq-ti-sod"],step5:["I-şonç-siz-lik","I-jod-kor-lik","I-çim-lik-lar","Iq-ti-sod-çi","In-ter-net","Ilm-siz-lik"],step6:["Iq-ti-so-di-yot","I-jod-kor-lik-da","I-şonç-siz-lik-dan","Iq-ti-dor-li-lar","Iş-bi-lar-mon-lik","Is-te-mol-çi-lik"]},
"J":{step1:["Ju-da","Jö-ja","Ja-zo","Jiy-da","Ja-sur","Jo-nim"],step2:["Ja-vob","Jö-nat","Jahl-dor","Joy-la","Ja-hon","Juft-lik"],step3:["Ja-hon-gir","Joy-la-şuv","Ja-za-va","Ja-vob-gar","Ja-sur-lik","Jin-ni-lik"],step4:["Ja-vob-siz","Jar-roh","Ja-fo-kaş","Jon-ku-yar","Ja-mi-yat","Ji-no-yat"],step5:["Ja-vob-gar-lik","Ja-fo-kaş-lik","Ji-no-yat-kor","Jon-ku-yar-lik","Ja-mi-yat-da","Ja-sur-lik-lar"],step6:["Ji-no-yat-kor-lik","Ja-vob-gar-siz-lik","Ja-mi-yat-şu-nos","Jon-ku-yar-lik-dan","Ja-za-va-la-niş","Jis-mo-niy-lik"]},
"K":{step1:["Ka-bi","Ku-ni","Ke-ça","Kö-rpa","Ku-rak","Ki-şi"],step2:["Ki-tob","Kar-rak","Ko-mil","Ki-yim","Ka-lom","Kasb-kor"],step3:["Ki-tob-xon","Ko-mil-lik","Ka-lam-don","Ke-la-jak","Kul-ça","Ku-za-tiş"],step4:["Ki-tob-xo-na","Ki-yim-ke-çak","Ko-i-not","Ku-za-tuv-çi","Ka-fo-lat","Kö-rsat-ma"],step5:["Ki-tob-xon-lik","Ka-fo-lat-li","Kö-rsat-ma-li","Ke-la-jak-da-gi","Kom-pyu-ter","Köp-çi-lik"],step6:["Ki-tob-xo-na-çi","Kam-ta-rin-lik-lar","Kö-rsat-kiç-lar","Ka-fo-lat-siz-lik","Ku-za-tuv-çi-lik","Köp-çi-lik-ning"]},
"L":{step1:["Lo-la","La-gan","Lu-ğat","La-qab","Loy-qa","Lax-ta"],step2:["Li-mon","La-ziz","Li-bos","Lo-çin","Lay-lak","Laz-zat"],step3:["Lo-yi-ha","Li-mon-zor","Lo-la-zor","Li-bos-lar","Laz-zat-li","La-to-fat"],step4:["Lo-yi-ha-çi","La-bo-rant","Lu-ğat-lar","La-yo-qat","La-to-fat-li","Lay-lak-lar"],step5:["La-bo-ra-to-ri-ya","La-yo-qat-siz","Lu-ğat-şu-nos","Lo-yi-ha-kaş","Laz-zat-la-niş","Li-bo-si-miz"],step6:["Lo-yi-ha-laş-ti-riş","La-yo-qat-siz-lik","Lu-ğat-şu-nos-lik","La-bo-ra-to-ri-ya-da","Laz-zat-lan-mas-lik","La-to-fat-li-roq"]},
"M":{step1:["Mo-mo","Ma-qol","Ma-no","Me-va","Ma-na","Mo-ş"],step2:["Mak-tab","Man-ba","Mo-hir","Mi-joz","Mas-jid","Mu-zey"],step3:["Ma-şi-na","Mi-sol-lar","Mo-hir-lik","Mod-diy-lik","Mu-al-lim","Ma-sa-la"],step4:["Ma-şi-na-soz","Mas-ul-li","Mus-ta-qil","Mi-joz-lar","Ma-sal-liq","Mav-zu-lar"],step5:["Mas-u-li-yat","Mus-ta-qil-lik","Ma-şi-na-lar","Mu-al-lim-lik","Mam-la-kat","Man-fa-at-li"],step6:["Mas-u-li-yat-siz","Mus-ta-qil-lik-da","Ma-şi-na-soz-lik","Mam-la-ka-ti-miz","Man-fa-at-dor-lik","Mu-vaf-fa-qi-yat"]},
"N":{step1:["No-mi","Ni-yat","No-ta","Na-vo","Ne-ga","Na-qd"],step2:["Na-fas","Ne-mat","Nav-bat","No-rin","Ni-şon","No-don"],step3:["Na-fa-qa","Ni-zom-li","Na-mu-na","Na-ti-ja","Nov-voy","No-haq-lik"],step4:["Ni-zom-no-ma","No-don-lik","Nav-bat-çi","Ni-şon-la-moq","Na-mu-na-li","Na-ti-ja-li"],step5:["Na-fa-qa-xör","No-don-lik-lar","No-ma-lum-lik","Na-ti-ja-siz","Nuq-son-siz-lik","No-haq-lik-lar"],step6:["Na-ti-ja-dor-lik","No-ma-lum-lik-dan","Na-mu-na-viy-lik","Nav-bat-çi-lik-da","Ni-zom-no-ma-siz","No-mu-ta-no-sib"]},
"O":{step1:["O-ta","O-na","O-yoq","O-lov","O-xir","O-ğiz"],step2:["O-voz","Ol-ma","O-çiq","O-qil","O-dam","O-qim"],step3:["O-na-si","O-lim-lar","O-vo-za","O-dam-zod","Oş-xo-na","O-qil-lik"],step4:["O-na-ti-li","O-çiq-lik","O-qil-o-na","O-zo-da","O-mo-nat","O-la-mon"],step5:["O-lim-pi-ya","O-mo-nat-dor","O-çiq-oy-din","O-zo-da-lik","O-la-mon-çi","O-dam-gar-çi-lik"],step6:["O-çiq-kön-gil","O-dam-gar-çi-lik-siz","O-mo-nat-dor-lik","O-lim-pi-a-da","O-çiq-oy-din-lik","O-ziq-ov-qat-lar"]},
"P":{step1:["Pax-ta","Pi-yoz","Pa-dar","Pul-li","Pa-ri","Po-k"],step2:["Pe-şin","Pak-ka","Pu-fak","Poç-ta","Pa-lov","Po-liz"],step3:["Pul-lik","Po-yezd","Pi-şiq","Pax-ta-kor","Par-hez-kor","Po-liz-çi"],step4:["Poç-ta-xo-na","Par-doz-çi","Pa-lov-xör","Pes-tax-ta","Paj-mur-da","Poy-ab-zal"],step5:["Pax-ta-kor-lik","Par-doz-çi-lik","Pay-poq-fu-ruş","Poy-tax-ti-miz","Pax-ta-çi-lik","Past-kaş-lik"],step6:["Par-hez-kor-lik-lar","Poy-ab-zal-dö-zi","Past-kaş-lik-la-ri","Pe-şa-na-dö-zi","Pax-ta-te-riş-da","Pur-vi-qor-lik-lar"]},
"Q":{step1:["Qa-ri","Qul-fi","Qo-zi","Qon-li","Qa-d","Qum-li"],step2:["Qa-miş","Qa-tiq","Qu-yon","Qa-lam","Qo-zon","Qa-ror"],step3:["Qat-tiq","Qu-yoş","Qo-lip","Qo-zon-ça","Qu-yoş-li","Qa-ror-goh"],step4:["Qa-lam-kaş","Qo-lip-la-moq","Qulf-la-moq","Qö-şim-ça","Qo-nu-niy","Qi-zi-qar"],step5:["Qo-nun-çi-lik","Qö-şim-ça-lar","Qa-lam-tas-vir","Qad-ri-yat","Qa-ror-goh-da","Qo-ni-qar-li"],step6:["Qad-ri-yat-lar-dan","Qo-nun-bu-zar-lik","Qa-no-at-la-niş","Qo-ni-qar-siz-lik","Qö-şim-ça-siz","Qa-lam-tas-vir-da"]},
"R":{step1:["Ro-zi","Ra-is","Ro-sa","Ra-ng","Ranj","Ri-m"],step2:["Ra-qam","Ro-bot","Ras-som","Riş-ta","Ray-hon","Ruç-ka"],step3:["Ra-fiq","Ri-voj","Ri-so-la","Ra-qam-li","Ro-hat-lan","Ras-miy"],step4:["Ras-som-çi","Ri-so-la-çi","Ro-bot-tex","Riş-ta-lar","Rav-naq-li","Ras-mi-yat"],step5:["Ri-voj-la-niş","Ras-mi-yat-çi","Ro-hat-lan-moq","Ras-som-çi-lik","Rah-na-mo","Rah-bar-lik"],step6:["Ri-voj-lan-ti-riş","Ras-mi-yat-çi-lik","Ra-qam-laş-ti-riş","Rah-bar-siz-lik-lar","Res-pub-li-ka","Ru-hi-yat-şu-nos"]},
"S":{step1:["Sa-har","So-ya","Su-v","Si-r","So-f","Soz"],step2:["Sa-vat","Sa-riq","So-vuq","Sa-noq","So-at","Su-li"],step3:["Su-vor","Sa-lom","Sa-voq","Sar-son","Sa-vat-ça","Sez-gir"],step4:["So-at-soz","Su-vo-riy","Sa-mo-lyot","Sez-gir-lik","Sa-no-at","Sa-lo-mat"],step5:["Sa-lom-laş-moq","Sa-no-at-çi","Sa-lo-mat-lik","Sa-ma-ra-li","So-mu-sa","Sir-li-lik"],step6:["Sa-lo-mat-lik-lar","Sa-no-at-la-şiş","Sa-ma-ra-dor-lik","Sin-f-doş-lar","Sa-mi-mi-yat-li","Su-ran-kaş-lik-lar"]},
"T":{step1:["To-la","Tu-ya","Ti-l","To-ğ","Ta-n","To-j"],step2:["To-voq","Til-la","To-ğa","Tul-ki","Ta-lim","Te-le-fon"],step3:["Tu-zuk","Ta-rif","Ti-kan","Tan-dir","Ta-lim-ot","Tu-zuk-lik"],step4:["To-mir-lar","Ta-rif-no-ma","To-mo-şa","Tu-rar-joy","Ta-bi-at","Ta-rix-çi"],step5:["To-mo-şa-bin","Ta-bi-at-da","Ta-raq-qi-yot","Te-le-vi-zor","Taş-ki-lot-çi","Taj-ri-ba"],step6:["Ta-raq-qi-yot-da","Taş-ki-lot-çi-lik","Taj-ri-ba-siz-lik","Ta-şab-bus-kor-lik","To-mo-şa-bin-lar","Ta-lim-tar-bi-ya"]},
"U":{step1:["U-ka","U-ya","Un-li","Uz-ra","Uy-da","Urf"],step2:["U-kam","U-zun","U-mid","U-zum","U-şoq","U-ruğ"],step3:["U-loq","U-lan","U-yat","U-quv","U-zum-zor","U-ruğ-çi"],step4:["U-lan-ma","U-loq-çi","U-yat-li","U-mid-vor","U-çar","U-lu-ği"],step5:["U-mid-vor-lik","U-quv-siz-lik","U-yat-siz-lik","Uy-ğo-niş-da","U-mum-laş-ma","Uz-luk-siz"],step6:["U-mum-laş-ti-riş","Uz-luk-siz-lik-lar","U-yat-siz-lik-dan","Uy-ğun-laş-ti-riş","U-zoq-ni-kö-rar","U-mid-baxş-lik-lar"]},
"V":{step1:["Va-fo","Vo-ya","Va-qt","Va-bo","Van-na","Vi-za"],step2:["Va-tan","Va-raq","Va-kil","Vo-diy","Vaz-ni","Va-li"],step3:["Vij-don","Vi-deo","Vil-ka","Var-rak","Vo-diy-lik","Vi-lo-yat"],step4:["Vi-deo-lar","Va-si-yat","Va-fo-dor","Va-hi-ma","Va-zi-fa","Vazn-siz-lik"],step5:["Vi-lo-yat-da","Vij-don-siz-lik","Va-fo-dor-lik","Va-hi-ma-li","Va-zi-fa-lar","Vaq-tin-ça"],step6:["Vi-lo-yat-lar-a-ro","Vaz-min-lik-dan","Va-zi-fa-dor-lik","Vaq-tin-ça-lik-lar","Vo-qe-lik-lar-ni","Va-tan-par-var-lik"]},
"X":{step1:["Xa-to","Xo-la","Xa-fa","Xo-s","Xi-l","Xo-r"],step2:["Xat-lar","Xur-jun","Xa-rit","Xal-qim","Xo-na","Xur-mo"],step3:["Xa-rid","Xa-bar","Xir-mon","Xa-ri-dor","Xur-mo-zor","Xal-qa-ro"],step4:["Xo-na-don","Xa-bar-dor","Xir-mon-jo","Xiz-mat-çi","Xi-yo-nat","Xo-ti-ra"],step5:["Xa-ri-dor-lar","Xo-na-don-lik","Xa-bar-siz-lik","Xiz-mat-çi-lik","Xo-ti-ra-li","Xavf-siz-lik"],step6:["Xal-qa-ro-la-şuv","Xa-bar-dor-lik-dan","Xi-yo-nat-kor-lik","Xo-ti-ra-siz-lik","Xavf-siz-lik-la-ri","Xay-ri-xoh-lik-dan"]},
"Y":{step1:["Ya-ngi","Ya-rim","Yöq","Yo-d","Yo-z","Yo-t"],step2:["Yu-rak","Yil-gi","Yo-vuz","Yo-qut","Yo-zuv","Yu-z"],step3:["Yul-ğun","Yö-nal","Yuk-la","Yax-şi","Ya-qin","Yo-zuv-çi"],step4:["Yuk-la-moq","Ya-rim-ta","Yoz-gi-ça","Yu-qo-ri","Yap-roq","Yu-ruv-çi"],step5:["Yax-şi-lik-lar","Ya-ngi-lik-lar","Yurt-doş-lar","Yö-na-liş-li","Yu-qum-li-lik","Ya-ra-tuv-çi"],step6:["Yö-nal-ti-ril-gan","Ya-qin-laş-ti-riş","Ya-ra-tuv-çan-lik","Ye-tiş-mov-çi-lik","Yu-qo-ri-da-gi","Yax-şi-lik-lar-dan"]},
"Z":{step1:["Zi-na","Zuk-ko","Zör","Ze-b","Zar","Zavq"],step2:["Zar-ba","Zi-rak","Za-far","Za-rar","Za-min","Za-mon"],step3:["Zo-ğor","Zi-yo-dat","Zu-luk","Zan-jir","Za-mon-lar","Zulm-kor"],step4:["Za-min-dor","Za-rar-li","Zo-riq-moq","Zu-luk-lar","Zi-yo-rak","Zi-yo-fat"],step5:["Za-mo-na-viy","Zi-yo-fat-li","Zar-ba-dor-lar","Zul-mat-li","Zi-yo-rat-goh","Za-far-li-lik"],step6:["Za-mo-na-viy-lik","Zi-yo-li-lar-dan","Za-ru-ri-yat-lar","Za-rur-siz-lik-lar","Zi-yo-rat-goh-lar","Za-bar-dast-lik-lar"]},
            "Ö":{step1:["Ö-zi","Öy","Öq","Öt","Ön","Öç"],step2:["Ö-rik","Ör-toq","Ör-dak","Ö-tiş","Ö-yin","Ö-ğil"],step3:["Ö-çoq","Ör-ni","Ö-lim","Ö-zak","Öl-ça","Ö-rik-zor"],step4:["Ö-ğil-ça","Ö-zak-li","Ö-yin-çi","Ör-ga-tiş","Öt-kir","Ö-qi-tuv"],step5:["Ö-lim-la-ri","Ö-çoq-çi","Ör-to-ğim","Ö-qi-tuv-çi","Ö-quv-çi-lar","Öz-ga-riş"],step6:["Ö-qi-tuv-çi-lik","Öz-laş-ti-riş","Ö-yin-qa-roq","Öx-şaş-siz-lik","Ö-sim-lik-lar-ni","Öz-ga-ruv-çan"]},
            "Ğ":{step1:["Ğor","Ğam","Ğoz","Ğişt","Ğil","Ğav-ğo"],step2:["Ğö-za","Ği-lof","Ğo-lib","Ğo-ya","Ğu-jum","Ğa-zab"],step3:["Ğal-la","Ğo-yib","Ğu-rur","Ğam-xör","Ğil-dir","Ğaf-lat"],step4:["Ğö-zal-lik","Ğal-la-kor","Ğu-rur-li","Ğil-di-rak","Ğa-zab-li","Ğay-rat"],step5:["Ğam-xör-lik","Ğal-la-don","Ğa-zab-nok","Ğa-nim-lik","Ğu-bor-siz","Ğa-la-yon"],step6:["Ğam-xör-lik-lar","Ğal-la-kor-lik","Ğa-zab-la-niş","Ğir-rom-lik-lar","Ğo-ya-viy-lik","Ğay-rat-li-lik"]},
            "Ş":{step1:["Şu","Şa-r","Şo-h","Şe-r","Şi-r","Şa-n"],step2:["Şa-har","Şu-mi","Şa-mo","Şi-pa","Şa-mol","Şod-lik"],step3:["Şod-li","Şi-rin","Şu-kuh","Şa-raf","Şu-ur","Şu-kr"],step4:["Şa-raf-li","Şa-har-lar","Şu-kuh-li","Şa-mol-lar","Şod-lik-lar","Şu-kr-li"],step5:["Şa-har-li-lar","Şi-fo-kor-lar","Şo-şi-linç","Şa-faq-li","Şa-rob-xo-na","Şi-ko-yat"],step6:["Şi-fo-kor-lik-da","Şo-şi-linç-lik","Şaf-qat-siz-lik","Şa-raf-la-niş","Şi-ko-yat-no-ma","Şa-kar-ob-li-lik"]},
            "Ç":{step1:["Çöl","Çoy","Çop","Çin","Çek","Çiz"],step2:["Çö-miç","Çu-qur","Çe-lak","Çi-roq","Çay-la","Ço-pon"],step3:["Çoy-nak","Çuç-va","Ça-na","Ça-qir","Çön-tak","Ço-loq"],step4:["Çay-la-çi","Çu-qur-lik","Ça-qir-moq","Çoy-nak-lar","Çi-roq-çi","Ça-man-zor"],step5:["Ço-pon-la-ri","Ça-qi-ruv-çi","Çe-ga-ra-siz","Çaq-qon-lik","Çi-dam-li-lik","Çor-va-dor-lar"],step6:["Çe-ga-ra-çi-lik","Çor-va-dor-lik-da","Ça-qi-ril-ma-gan","Çi-dam-siz-lik-lar","Çul-ğab-o-liş-di","Çaq-moq-toş-lar"]}
        };

/* ==================== VIZUAL LUG'AT (336 so'z: step1+step2) ==================== */
const VISUAL={
"aka":"👨‍👧","aor":"🌊","ara":"🐝","ana":"🤱","ato":"👨","ayiq":"🐻",
"anor":"🍎","aloqa":"📞","arava":"🛒","azamat":"🦁","alifbo":"🔤","adras":"🧵",
"bola":"🧒","bobo":"👴","buvi":"👵","boği":"🌳","beda":"🌾","baho":"⭐",
"baliq":"🐟","bilim":"📚","bahodir":"🦸","bemor":"🤒","baraka":"🤲","bayram":"🎉",
"dada":"👨","dala":"🌾","dori":"💊","davo":"💊","dohiy":"🧠","doira":"⭕",
"daftar":"📓","davlat":"🏛️","daraxt":"🌳","dunyo":"🌍","dehqon":"🧑‍🌾","daromad":"💰",
"ega":"👑","elak":"🧺","eshik":"🚪","ertak":"📖","ekin":"🌱","elat":"👥",
"etik":"👢","elon":"📢","elimiz":"🇺🇿","etibor":"👁️","egasi":"👤","eski":"🏺",
"fazo":"🌌","fido":"❤️","foiz":"📊","faol":"⚡","ferma":"🚜","faqir":"🙏",
"fanlar":"🔬","fonar":"🔦","faxriy":"🎖️","fikrim":"💭","fermer":"🧑‍🌾","faraz":"💭",
"guli":"🌸","gavda":"🧍","gilam":"🧶","gado":"🙏","guruh":"👥","gapi":"💬",
"guldon":"🏺","gulxan":"🔥","gulchi":"🧑‍🌾","garam":"🌡️","garmon":"🎹","guvoh":"👁️",
"havo":"💨","hayo":"😊","hidla":"👃","hasad":"😒","hurmat":"🤝","hali":"⏳",
"hozir":"⏰","hunar":"🛠️","haram":"🕌","hoji":"🧔","hujjat":"📄","haykal":"🗽",
"ilon":"🐍","ipak":"🧵","irim":"🔮","ikki":"2️⃣","iliq":"🌤️","ishing":"🚪",
"ishonch":"🤝","ilova":"📱","ibora":"💬","ilmli":"🎓","ijob":"✅","ijod":"🎨",
"juda":"💯","jöja":"🐣","jazo":"⚖️","jiyda":"🫒","jasur":"🦁","jonim":"❤️",
"javob":"💬","jönat":"📤","jahldor":"😠","joyla":"📍","jahon":"🌍","juftlik":"👫",
"kabi":"🔁","kuni":"📅","kecha":"🌙","körpa":"🛏️","kurak":"🥄","kishi":"🧍",
"kitob":"📕","karrak":"🦆","komil":"🌟","kiyim":"👕","kalom":"💬","kasbkor":"👷",
"lola":"🌷","lagan":"🍽️","luğat":"📖","laqab":"🏷️","loyqa":"💧","likaş":"🥤",
"limon":"🍋","laziz":"😋","libos":"👗","lochin":"🦅","laylak":"🦩","lazzat":"🍯",
"momo":"👵","maqol":"💬","mano":"🎯","meva":"🍎","mana":"👉","moş":"🫘",
"maktab":"🏫","manba":"⛲","mohir":"🌟","mijoz":"🧑‍💼","masjid":"🕌","maqom":"🎼",
"nomi":"🏷️","niyat":"🤲","nota":"🎵","navo":"🎶","nega":"❓","naqd":"💵",
"nafas":"😮‍💨","nemat":"🍯","navbat":"⏳","norin":"🍜","nishon":"🎯","nodon":"😕",
"ota":"👨","ona":"🤱","oyoq":"🦵","olov":"🔥","oxir":"🏁","oğiz":"👄",
"ovoz":"🔊","olma":"🍎","oçiq":"🔓","oqil":"🧠","odam":"🧍","oqim":"🌊",
"paxta":"☁️","piyoz":"🧅","padar":"👨","pulli":"💰","pari":"🧚","pok":"✨",
"peshin":"☀️","pakka":"📦","pufak":"🎈","pochta":"📮","palov":"🍛","poliz":"🍈",
"qari":"👴","qulfi":"🔒","qozi":"🦢","qonli":"🩸","qad":"📏","qumli":"🏖️",
"qamish":"🎋","qatiq":"🥛","quyon":"🐰","qalam":"✏️","qozon":"🍲","qaror":"📜",
"rozi":"😊","rais":"🧑‍💼","rosti":"✅","rang":"🎨","rufti":"🧹","rim":"🏛️",
"raqam":"🔢","robot":"🤖","rassom":"🎨","rishta":"🧵","rayhon":"🌿","ruchka":"🖊️",
"qadriyat":"💎","sahar":"🌅","soya":"🌳","suv":"💧","sir":"🤫","sof":"✨","san":"🔢",
"savat":"🧺","sariq":"🟡","sovuq":"❄️","sanoq":"🔢","soat":"⏰","suli":"🌾",
"tola":"🧵","tuya":"🐫","til":"👅","toğ":"⛰️","tan":"🧍","toj":"👑",
"tovoq":"🍽️","tilla":"💍","toğa":"⛰️","tulki":"🦊","talim":"📚","tomir":"🌱",
"uka":"👦","uya":"🪹","unli":"🔤","uzra":"✨","uyda":"🏠","ul":"🌱",
"ukam":"👦","uzun":"📏","umid":"🌟","uzum":"🍇","uşoq":"🐦","uruğ":"🌱",
"vafo":"🤝","voya":"🌱","vaqt":"⏰","vak":"🦆","vay":"😮","vah":"😯",
"vatan":"🇺🇿","varaq":"📄","vakil":"🧑‍💼","vodiy":"🏞️","vazni":"⚖️","vali":"🧑‍💼",
"xato":"❌","xola":"👩","xafa":"😔","xos":"⭐","xil":"🎨","xor":"🎶",
"xatlar":"✉️","xumi":"🏺","xarit":"🗺️","xalqim":"👥","xona":"🏠","xurmo":"🌴",
"yangi":"✨","yarim":"🌓","yöq":"🚫","yod":"🧠","yoz":"☀️","yot":"🛏️",
"yurak":"❤️","yilgi":"📅","yovuz":"😈","yoqut":"💎","yozuv":"✍️","yuz":"💯",
"zina":"🪜","zaki":"🧠","zör":"💪","zeb":"✨","zir":"🔝","zuv":"🐦",
"zarba":"👊","zirak":"🧠","zafar":"🏆","zarar":"⚠️","zamin":"🌍","zamon":"⏳",
"özi":"👤","öy":"🤔","öq":"🏹","öt":"🔥","ön":"🔟","öç":"⚡",
"örik":"🍑","örtoq":"🤝","ördak":"🦆","ötish":"➡️","öyin":"🧸","öğil":"👦",
"ğor":"🕳️","ğam":"😔","ğoz":"🦢","ğişt":"🧱","ğil":"⚙️","ğaş":"🪨",
"ğöza":"🌰","ğilof":"🗡️","ğolib":"🏆","ğoya":"💡","ğirom":"🎵","ğazab":"😠",
"şu":"👉","şar":"🔊","şoh":"👑","şer":"🦁","şir":"🥛","şan":"✨",
"şahar":"🏙️","şumi":"🦉","şamo":"🕯️","şipa":"💧","şamol":"💨","şodlik":"🎉",
"çöl":"🏜️","çoy":"🍵","çop":"🐎","çaq":"⚡","çek":"📄","çiz":"✏️",
"çaqa":"👶","çuqur":"🕳️","çelak":"🪣","çiroq":"💡","çayla":"🍵","çopon":"🐑",
"eşik":"🚪","gulçi":"🧑‍🌾","işing":"🚪","işonç":"🤝","keça":"🌙","kişi":"🧍","loçin":"🦅","nişon":"🎯","peşin":"☀️","poçta":"📮","qamiş":"🎋","rişta":"🧵","ruçka":"🖊️","ötiş":"➡️"
};
const VISUAL_FALLBACK={A:"🔤",B:"🧒",D:"🌳",E:"📖",F:"🔬",G:"🌸",H:"💨",I:"🐍",J:"🌍",K:"📕",L:"🍋",M:"🏫",N:"🎵",O:"🍎",P:"🍛",Q:"🐰",R:"🤖",S:"💧",T:"🐫",U:"🍇",V:"🇺🇿",X:"🏠",Y:"✨",Z:"🏆",Ö:"🍑",Ğ:"🏆",Ş:"🏙️",Ç:"🍵"};
function visualKey(w){return String(w||"").replace(/-/g,"").replace(/'/g,"").toLowerCase();}
function visualFor(word,letter){
  const k=visualKey(word);
  if(VISUAL[k])return VISUAL[k];
  if(VISUAL_FALLBACK[letter])return VISUAL_FALLBACK[letter];
  return "📖";
}

/* ==================== EN TARJIMA + VISUAL QOSHIMCHA (1008 so'z) ==================== */
Object.assign(VISUAL,{"ari":"🐝","ajal":"🔤","azob":"🔤","avtomobil":"🚗","aralaşuv":"🔤","asoslamoq":"🔤","atlas":"🧵","axborot":"🔤","ayovsiz":"🔤","akademiya":"👨","aviasiya":"✈️","avtobus":"🚌","adolatli":"🔤","adrasmon":"🔤","azizlik":"🔤","asosçilar":"🔤","ayovsizlik":"🔤","ananaviy":"🔤","ahamiyat":"🔤","aniqliklar":"🔤","aktyorlar":"🔤","aviasiyaçi":"🔤","akademiklar":"👨","asoslanmagan":"🔤","ahamiyatsiz":"🔤","aralaştiriş":"🔤","açinarliroq":"🔤","boşlanğiç":"🧒","bilaguzuk":"🧒","baqaterak":"🧒","buzğunçi":"🧒","boylamoq":"🧒","beğubor":"🧒","barakali":"🧒","bilimdon":"📚","beminnat":"🧒","baholamoq":"🧒","buloqlar":"🧒","bevafo":"🧒","bilimdonlik":"📚","baqateraklar":"🧒","böyoqçi":"🎨","betoqatlik":"🧒","boşlanmagan":"🧒","buyruqboz":"🧒","bilaguzuksiz":"🧒","buzğunçilik":"🧒","bahodirliklar":"🧒","bilimlilar":"🎓","beparosatlik":"🧒","bayramona":"🎉","durdona":"🦪","dovyurak":"🌳","dasturxon":"🌳","dilkaşlik":"🌳","doktor":"🩺","davola":"🌳","davolaniş":"🌳","dunyoqaraş":"🌍","dehqonçi":"🧑‍🌾","daftarça":"📓","daromadli":"🌳","dovyuraklar":"🌳","davlatlararo":"🌳","daromadsiz":"🌳","dasturxonçi":"🌳","dunyoviylik":"🌍","dehqonbozor":"🧑‍🌾","doirasiz":"⭕","davlatşunoslik":"🌳","dovyuraklarça":"🌳","daromadsizlik":"🌳","dasturxonçilik":"🌳","dilkaşliklardan":"🌳","dehqonçiliksiz":"🧑‍🌾","eçki":"🐐","elakçi":"📖","ekinzor":"📖","erinçoq":"📖","etiqod":"📖","ezozlaş":"📖","eşitiş":"📖","elonnoma":"📖","etiborli":"📖","ezgullik":"📖","etirozlar":"📖","ekologiya":"📖","ekinzorlar":"📖","erinçoqlik":"📖","etiborsiz":"📖","etiqodli":"📖","ezozlamoq":"📖","elektronika":"📖","elonlardan":"📢","etiborsizlik":"📖","erinçoqlarça":"📖","etiqodsizlik":"📖","elektrotexnika":"📖","ekologiyaviy":"📖","ezozlanmagan":"📖","faoliyat":"🔬","faxrlaniş":"🔬","fidokor":"🔬","fantexnika":"🔬","farqlamoq":"🔬","fikrlaşmoq":"🔬","fazilatli":"🔬","farzandlar":"🔬","falokatli":"🔬","faoliyatda":"🔬","fikrlaşiş":"🔬","foydalaniş":"🔬","faoliyatsiz":"🔬","faxrlanarli":"🔬","fidokorlik":"🔬","foydalanuvçi":"🔬","falastinlik":"🔬","farzandsizlik":"🔬","faoliyatsizlik":"🔬","fidokorona":"🔬","foydalanilmagan":"🔬","fazilatlarimiz":"🔬","farqlanmaganlik":"🔬","fikrlaşmaslik":"🧠","guliston":"🌸","gulparvar":"🌸","gulxançi":"🌸","gilamdoz":"🌸","gardişli":"🌸","gapiriş":"🌸","gulistonlik":"🌸","guvohnoma":"🌸","gözallik":"🌸","gurullaş":"🌸","gazakli":"🌸","gunohkor":"🌸","gözalliklar":"🌸","guvohnomasi":"🌸","gulparvarlik":"🌸","gapirilmagan":"🌸","gilamdozlik":"🌸","gunohkorlar":"🌸","gözallaştiriş":"🌸","gulistonliklar":"🌸","guvohnomasiz":"🌸","gulparvarlarça":"🌸","gapirilayotgan":"🌸","gilamdozlikda":"🌸","haqiqat":"💨","hunarmand":"🛠️","hozirgi":"💨","haramxona":"💨","hujjatxona":"💨","hozirjavob":"💨","haqiqiy":"💨","hunarsiz":"💨","haykaltaroş":"💨","harakatda":"💨","hayajonli":"💨","hurmatsiz":"💨","haqiqatdan":"💨","hunarmandlik":"🛠️","harakatçan":"💨","haykaltaroşlik":"💨","hayajonlaniş":"💨","hozirjavoblik":"💨","haqiqatparvar":"💨","harakatçanlik":"💨","hurmatsizliklar":"💨","haykaltaroşlikda":"💨","hayajonlanmagan":"💨","hunarmandçilik":"🛠️","igna":"🪡","ilovalar":"🐍","işonçli":"🐍","iboralar":"🐍","ijodkor":"🐍","ilmiylik":"🐍","ijobat":"🐍","işonçsiz":"🐍","ijodkorlar":"🐍","ibrohim":"🐍","iborasiz":"🐍","içimlik":"🐍","iqtisod":"🐍","işonçsizlik":"🐍","ijodkorlik":"🐍","içimliklar":"🐍","iqtisodçi":"🐍","internet":"🌐","ilmsizlik":"🐍","iqtisodiyot":"🐍","ijodkorlikda":"🐍","işonçsizlikdan":"🐍","iqtidorlilar":"🐍","işbilarmonlik":"🐍","istemolçilik":"🐍","jahongir":"🌍","joylaşuv":"🌍","jazava":"🌍","javobgar":"💬","jasurlik":"🌍","jinnilik":"🌍","javobsiz":"💬","jarroh":"🩺","jafokaş":"🌍","jonkuyar":"🌍","jamiyat":"🌍","jinoyat":"🌍","javobgarlik":"💬","jafokaşlik":"🌍","jinoyatkor":"🌍","jonkuyarlik":"🌍","jamiyatda":"🌍","jasurliklar":"🌍","jinoyatkorlik":"🌍","javobgarsizlik":"💬","jamiyatşunos":"🌍","jonkuyarlikdan":"🌍","jazavalaniş":"🌍","jismoniylik":"⚽","kitobxon":"📖","komillik":"📕","kalamdon":"📕","kelajak":"📕","kulça":"🍞","kuzatiş":"🍂","kitobxona":"📖","kiyimkeçak":"📕","koinot":"📕","kuzatuvçi":"🍂","kafolat":"📕","körsatma":"📕","kitobxonlik":"📖","kafolatli":"📕","körsatmali":"📕","kelajakdagi":"📕","kompyuter":"💻","köpçilik":"📕","kitobxonaçi":"📖","kamtarinliklar":"📕","körsatkiçlar":"📕","kafolatsizlik":"📕","kuzatuvçilik":"🍂","köpçilikning":"📕","laxta":"🩸","loyiha":"🍋","limonzor":"🍋","lolazor":"🌷","liboslar":"🍋","lazzatli":"🍋","latofat":"🍋","loyihaçi":"🍋","laborant":"🍋","luğatlar":"🍋","layoqat":"🍋","latofatli":"🍋","laylaklar":"🦩","laboratoriya":"🍋","layoqatsiz":"🍋","luğatşunos":"🍋","loyihakaş":"🍋","lazzatlaniş":"🍋","libosimiz":"🍋","loyihalaştiriş":"🍋","layoqatsizlik":"🍋","luğatşunoslik":"🍋","laboratoriyada":"🍋","lazzatlanmaslik":"🍋","latofatliroq":"🍋","muzey":"🏛️","maşina":"🏫","misollar":"🏫","mohirlik":"🏫","moddiylik":"🏫","muallim":"👩‍🏫","masala":"🏫","maşinasoz":"🏫","masulli":"🏫","mustaqil":"🏫","mijozlar":"🏫","masalliq":"🏫","mavzular":"🏫","masuliyat":"🏫","mustaqillik":"🕊️","maşinalar":"🏫","muallimlik":"👩‍🏫","mamlakat":"🏫","manfaatli":"🏫","masuliyatsiz":"🏫","mustaqillikda":"🕊️","maşinasozlik":"🏫","mamlakatimiz":"🏫","manfaatdorlik":"🏫","muvaffaqiyat":"🏫","nafaqa":"🎵","nizomli":"🎵","namuna":"🎵","natija":"🎵","novvoy":"🍞","nohaqlik":"🎵","nizomnoma":"🎵","nodonlik":"🎵","navbatçi":"🎵","nişonlamoq":"🎵","namunali":"🎵","natijali":"🎵","nafaqaxör":"🎵","nodonliklar":"🎵","nomalumlik":"🎵","natijasiz":"🎵","nuqsonsizlik":"🎵","nohaqliklar":"🎵","natijadorlik":"🎵","nomalumlikdan":"🎵","namunaviylik":"🎵","navbatçilikda":"🎵","nizomnomasiz":"🎵","nomutanosib":"🎵","onasi":"🤱","olimlar":"🔬","ovoza":"🍎","odamzod":"🧍","oşxona":"🍳","oqillik":"⬜","onatili":"🤱","oçiqlik":"🍎","oqilona":"⬜","ozoda":"🍎","omonat":"🍎","olamon":"🍎","olimpiya":"🔬","omonatdor":"🍎","oçiqoydin":"🍎","ozodalik":"🍎","olamonçi":"🍎","odamgarçilik":"🧍","oçiqköngil":"🍎","odamgarçiliksiz":"🧍","omonatdorlik":"🍎","olimpiada":"🔬","oçiqoydinlik":"🍎","oziqovqatlar":"🍎","pullik":"💰","poyezd":"🚂","pişiq":"🍛","paxtakor":"☁️","parhezkor":"🍛","polizçi":"🍈","poçtaxona":"🍛","pardozçi":"🍛","palovxör":"🍛","pestaxta":"🏪","pajmurda":"🍛","poyabzal":"👟","paxtakorlik":"☁️","pardozçilik":"🍛","paypoqfuruş":"🍛","poytaxtimiz":"🏛️","paxtaçilik":"🌾","pastkaşlik":"📏","parhezkorliklar":"🍛","poyabzaldözi":"👟","pastkaşliklari":"📏","peşanadözi":"🍛","paxtaterişda":"☁️","purviqorliklar":"🍛","qattiq":"🐰","quyoş":"🐰","qolip":"🐰","qozonça":"🐰","quyoşli":"🐰","qarorgoh":"🐰","qalamkaş":"✏️","qoliplamoq":"🐰","qulflamoq":"🔒","qöşimça":"🐰","qonuniy":"🩸","qiziqar":"🐰","qonunçilik":"🩸","qöşimçalar":"🐰","qalamtasvir":"✏️","qarorgohda":"🐰","qoniqarli":"🩸","qadriyatlardan":"🐰","qonunbuzarlik":"🩸","qanoatlaniş":"🐰","qoniqarsizlik":"🩸","qöşimçasiz":"🐰","qalamtasvirda":"✏️","rosa":"🎯","ranj":"😣","rafiq":"🤖","rivoj":"🤖","risola":"🤖","raqamli":"🤖","rohatlan":"🤖","rasmiy":"🎨","rassomçi":"🎨","risolaçi":"🤖","robottex":"🤖","riştalar":"🤖","ravnaqli":"🤖","rasmiyat":"🎨","rivojlaniş":"🤖","rasmiyatçi":"🎨","rohatlanmoq":"🤖","rassomçilik":"🎨","rahnamo":"🧭","rahbarlik":"🧭","rivojlantiriş":"🤖","rasmiyatçilik":"🎨","raqamlaştiriş":"🤖","rahbarsizliklar":"🧭","respublika":"🤖","ruhiyatşunos":"🤖","soz":"💪","suvor":"💧","salom":"👋","savoq":"💧","sarson":"💧","savatça":"💧","sezgir":"💧","soatsoz":"⏰","suvoriy":"💧","samolyot":"✈️","sezgirlik":"💧","sanoat":"💧","salomat":"👋","salomlaşmoq":"👋","sanoatçi":"💧","salomatlik":"👋","samarali":"💧","somusa":"🥟","sirlilik":"💧","salomatliklar":"👋","sanoatlaşiş":"💧","samaradorlik":"💧","sinfdoşlar":"🧑‍🎓","samimiyatli":"💧","surankaşliklar":"💧","telefon":"📱","tuzuk":"🐫","tarif":"🐫","tikan":"🌵","tandir":"🔥","talimot":"🐫","tuzuklik":"🐫","tomirlar":"🐫","tarifnoma":"🐫","tomoşa":"🐫","turarjoy":"🐫","tabiat":"🐫","tarixçi":"📜","tomoşabin":"🐫","tabiatda":"🐫","taraqqiyot":"🐫","televizor":"📺","taşkilotçi":"🐫","tajriba":"🐫","taraqqiyotda":"🐫","taşkilotçilik":"🐫","tajribasizlik":"🐫","taşabbuskorlik":"🐫","tomoşabinlar":"🐫","talimtarbiya":"🐫","urf":"🤝","uloq":"🍇","ulan":"🍇","uyat":"😳","uquv":"🍇","uzumzor":"🍇","uruğçi":"🍇","ulanma":"🍇","uloqçi":"🍇","uyatli":"😳","umidvor":"🍇","uçar":"🕊","uluği":"🍇","umidvorlik":"🍇","uquvsizlik":"🍇","uyatsizlik":"😳","uyğonişda":"🏠","umumlaşma":"🍇","uzluksiz":"🍇","umumlaştiriş":"🍇","uzluksizliklar":"🍇","uyatsizlikdan":"😳","uyğunlaştiriş":"🏠","uzoqnikörar":"🍇","umidbaxşliklar":"🍇","vabo":"🇺🇿","vanna":"🇺🇿","viza":"🇺🇿","vijdon":"🇺🇿","video":"🇺🇿","vilka":"🇺🇿","varrak":"🇺🇿","vodiylik":"🇺🇿","viloyat":"🇺🇿","videolar":"🇺🇿","vasiyat":"🇺🇿","vafodor":"🇺🇿","vahima":"🇺🇿","vazifa":"📝","vaznsizlik":"🇺🇿","viloyatda":"🇺🇿","vijdonsizlik":"🇺🇿","vafodorlik":"🇺🇿","vahimali":"🇺🇿","vazifalar":"📝","vaqtinça":"🇺🇿","viloyatlararo":"🇺🇿","vazminlikdan":"🇺🇿","vazifadorlik":"📝","vaqtinçaliklar":"🇺🇿","voqeliklarni":"🇺🇿","vatanparvarlik":"🇺🇿","xurjun":"🎒","xarid":"🏠","xabar":"📢","xirmon":"🏠","xaridor":"🛒","xurmozor":"🏠","xalqaro":"🏠","xonadon":"🏠","xabardor":"📢","xirmonjo":"🏠","xizmatçi":"🏠","xiyonat":"🏠","xotira":"🏠","xaridorlar":"🛒","xonadonlik":"🏠","xabarsizlik":"📢","xizmatçilik":"🏠","xotirali":"🏠","xavfsizlik":"🏠","xalqarolaşuv":"🏠","xabardorlikdan":"📢","xiyonatkorlik":"🏠","xotirasizlik":"🏠","xavfsizliklari":"🏠","xayrixohlikdan":"👋","yulğun":"✨","yönal":"✨","yukla":"📦","yaxşi":"✨","yaqin":"✨","yozuvçi":"☀️","yuklamoq":"📦","yarimta":"✨","yozgiça":"☀️","yuqori":"✨","yaproq":"🍂","yuruvçi":"✨","yaxşiliklar":"✨","yangiliklar":"✨","yurtdoşlar":"✨","yönalişli":"✨","yuqumlilik":"✨","yaratuvçi":"✨","yönaltirilgan":"✨","yaqinlaştiriş":"✨","yaratuvçanlik":"✨","yetişmovçilik":"✨","yuqoridagi":"✨","yaxşiliklardan":"✨","zukko":"🧠","zar":"🪙","zavq":"😋","zoğor":"🏆","ziyodat":"📈","zuluk":"🏆","zanjir":"🏆","zamonlar":"🏆","zulmkor":"🏆","zamindor":"🏆","zararli":"🏆","zoriqmoq":"🏆","zuluklar":"🏆","ziyorak":"🏆","ziyofat":"🏆","zamonaviy":"🏆","ziyofatli":"🏆","zarbadorlar":"🏆","zulmatli":"🏆","ziyoratgoh":"🏆","zafarlilik":"🏆","zamonaviylik":"🏆","ziyolilardan":"🏆","zaruriyatlar":"🏆","zarursizliklar":"🏆","ziyoratgohlar":"🏆","zabardastliklar":"🏆","öçoq":"🍑","örni":"🍑","ölim":"🍑","özak":"🍑","ölça":"🍑","örikzor":"🍑","öğilça":"🍑","özakli":"🍑","öyinçi":"🍑","örgatiş":"🍑","ötkir":"🍑","öqituv":"🍑","ölimlari":"🍑","öçoqçi":"🍑","örtoğim":"🍑","öqituvçi":"🍑","öquvçilar":"🍑","özgariş":"🍑","öqituvçilik":"🍑","özlaştiriş":"🍑","öyinqaroq":"🤹","öxşaşsizlik":"🍑","ösimliklarni":"🍑","özgaruvçan":"🍑","ğavğo":"🏆","ğujum":"🏆","ğalla":"🏆","ğoyib":"🏆","ğurur":"🏆","ğamxör":"🏆","ğildir":"🏆","ğaflat":"🏆","ğözallik":"🏆","ğallakor":"🏆","ğururli":"🏆","ğildirak":"🏆","ğazabli":"🏆","ğayrat":"🏆","ğamxörlik":"🏆","ğalladon":"🏆","ğazabnok":"🏆","ğanimlik":"🏆","ğuborsiz":"🏆","ğalayon":"🏆","ğamxörliklar":"🏆","ğallakorlik":"🏆","ğazablaniş":"🏆","ğirromliklar":"🏆","ğoyaviylik":"🏆","ğayratlilik":"🏆","şodli":"🏙️","şirin":"🏙️","şukuh":"🏙️","şaraf":"🏙️","şuur":"🏙️","şukr":"🏙️","şarafli":"🏙️","şaharlar":"🏙️","şukuhli":"🏙️","şamollar":"🏙️","şodliklar":"🏙️","şukrli":"🏙️","şaharlilar":"🏙️","şifokorlar":"🏙️","şoşilinç":"🏙️","şafaqli":"🏙️","şarobxona":"🏙️","şikoyat":"🏙️","şifokorlikda":"🏙️","şoşilinçlik":"🏙️","şafqatsizlik":"🏙️","şaraflaniş":"🏙️","şikoyatnoma":"🏙️","şakaroblilik":"🏙️","çin":"🍵","çömiç":"🍵","çoynak":"🍵","çuçva":"🍵","çana":"🍵","çaqir":"🍵","çöntak":"🍵","çoloq":"🍵","çaylaçi":"🍵","çuqurlik":"🍵","çaqirmoq":"🍵","çoynaklar":"🍵","çiroqçi":"🍵","çamanzor":"🍵","çoponlari":"🍵","çaqiruvçi":"🍵","çegarasiz":"🍵","çaqqonlik":"🍵","çidamlilik":"🍵","çorvadorlar":"🍵","çegaraçilik":"🍵","çorvadorlikda":"🍵","çaqirilmagan":"🍵","çidamsizliklar":"🍵","çulğabolişdi":"🍵","çaqmoqtoşlar":"🍵"});
const EN={"aka":"elder brother","ari":"bee","ajal":"fate","ana":"mom","azob":"pain","ayiq":"bear","anor":"pomegranate","aloqa":"contact","arava":"cart","azamat":"brave fellow","alifbo":"alphabet","adras":"adras silk","avtomobil":"car","aralaşuv":"interference","asoslamoq":"to found","atlas":"atlas fabric","axborot":"news","ayovsiz":"ruthless","akademiya":"academy","aviasiya":"aviation","avtobus":"bus","adolatli":"just","adrasmon":"adras robe","azizlik":"affection","asosçilar":"founders","ayovsizlik":"ruthlessness","ananaviy":"traditional","ahamiyat":"importance","aniqliklar":"details","aktyorlar":"actors","aviasiyaçi":"aviator","akademiklar":"scholars","asoslanmagan":"groundless","ahamiyatsiz":"trifling","aralaştiriş":"mixing","açinarliroq":"more pitiful","bola":"child","bobo":"grandpa","buvi":"grandma","boği":"garden","beda":"alfalfa","baho":"grade","baliq":"fish","bilim":"knowledge","bahodir":"hero","bemor":"patient","baraka":"blessing","bayram":"holiday","boşlanğiç":"beginning","bilaguzuk":"bracelet","baqaterak":"poplar","buzğunçi":"destroyer","boylamoq":"to tie","beğubor":"spotless","barakali":"blessed","bilimdon":"scholar","beminnat":"selfless","baholamoq":"to rate","buloqlar":"springs","bevafo":"unfaithful","bilimdonlik":"scholarship","baqateraklar":"poplars","böyoqçi":"painter","betoqatlik":"impatience","boşlanmagan":"unstarted","buyruqboz":"order follower","bilaguzuksiz":"without a bracelet","buzğunçilik":"vandalism","bahodirliklar":"heroic deeds","bilimlilar":"educated people","beparosatlik":"lack of insight","bayramona":"holiday gift","dada":"dad","dala":"field","dori":"medicine","davo":"remedy","dohiy":"genius","doira":"circle","daftar":"notebook","davlat":"state","daraxt":"tree","dunyo":"world","dehqon":"farmer","daromad":"income","durdona":"pearl","dovyurak":"brave","dasturxon":"tablecloth","dilkaşlik":"charm","doktor":"doctor","davola":"treatment","davolaniş":"being treated","dunyoqaraş":"worldview","dehqonçi":"farmhand","daftarça":"small notebook","daromadli":"profitable","dovyuraklar":"brave ones","davlatlararo":"interstate","daromadsiz":"without income","dasturxonçi":"table setter","dunyoviylik":"secularity","dehqonbozor":"farmers market","doirasiz":"circless","davlatşunoslik":"political science","dovyuraklarça":"bravely","daromadsizlik":"lack of income","dasturxonçilik":"table service","dilkaşliklardan":"from charms","dehqonçiliksiz":"without farming","ega":"owner","elak":"sieve","eşik":"threshold","ertak":"fairy tale","ekin":"crop","elat":"people","etik":"boot","elon":"announcement","elimiz":"our people","etibor":"attention","egasi":"its owner","eçki":"goat","elakçi":"sieve maker","ekinzor":"crop field","erinçoq":"lazybones","etiqod":"belief","ezozlaş":"honoring","eşitiş":"hearing","elonnoma":"proclamation","etiborli":"respected","ezgullik":"goodness","etirozlar":"objections","ekologiya":"ecology","ekinzorlar":"crop fields","erinçoqlik":"laziness","etiborsiz":"ignored","etiqodli":"faithful","ezozlamoq":"to honor","elektronika":"electronics","elonlardan":"from announcements","etiborsizlik":"neglect","erinçoqlarça":"lazily","etiqodsizlik":"disbelief","elektrotexnika":"electrical engineering","ekologiyaviy":"ecological","ezozlanmagan":"unhonored","fazo":"space","fido":"devoted","foiz":"percent","faol":"active","ferma":"farm","faqir":"poor","fanlar":"sciences","fonar":"lantern","faxriy":"veteran","fikrim":"my idea","fermer":"farmer","faraz":"guess","faoliyat":"activity","faxrlaniş":"pride","fidokor":"dedicated","fantexnika":"equipment","farqlamoq":"to distinguish","fikrlaşmoq":"to confer","fazilatli":"virtuous","farzandlar":"children","falokatli":"disastrous","faoliyatda":"in action","fikrlaşiş":"discussion","foydalaniş":"use","faoliyatsiz":"inactive","faxrlanarli":"praiseworthy","fidokorlik":"dedication","foydalanuvçi":"user","falastinlik":"Palestinian","farzandsizlik":"childlessness","faoliyatsizlik":"inactivity","fidokorona":"devotedly","foydalanilmagan":"unused","fazilatlarimiz":"our virtues","farqlanmaganlik":"indistinction","fikrlaşmaslik":"refusing to confer","guli":"flowery","gavda":"body","gilam":"carpet","gado":"beggar","guruh":"group","gapi":"speech","guldon":"vase","gulxan":"bonfire","gulçi":"florist","garam":"warm","garmon":"accordion","guvoh":"witness","guliston":"rose garden","gulparvar":"flower grower","gulxançi":"fire keeper","gilamdoz":"carpet weaver","gardişli":"circling","gapiriş":"speaking","gulistonlik":"flower land","guvohnoma":"certificate","gözallik":"beauty","gurullaş":"rumbling","gazakli":"with snacks","gunohkor":"sinner","gözalliklar":"beauties","guvohnomasi":"his certificate","gulparvarlik":"floriculture","gapirilmagan":"unspoken","gilamdozlik":"carpet weaving","gunohkorlar":"sinners","gözallaştiriş":"beautification","gulistonliklar":"flower gardens","guvohnomasiz":"without a certificate","gulparvarlarça":"like gardeners","gapirilayotgan":"being spoken","gilamdozlikda":"in carpet weaving","havo":"air","hayo":"modesty","hidla":"smell it","hasad":"envy","hurmat":"respect","hali":"yet","hozir":"now","hunar":"craft","haram":"forbidden","hoji":"pilgrim","hujjat":"document","haykal":"statue","haqiqat":"truth","hunarmand":"craftsman","hozirgi":"present","haramxona":"private quarters","hujjatxona":"archive","hozirjavob":"witty","haqiqiy":"real","hunarsiz":"unskilled","haykaltaroş":"sculptor","harakatda":"in motion","hayajonli":"exciting","hurmatsiz":"disrespectful","haqiqatdan":"truly","hunarmandlik":"craftsmanship","harakatçan":"energetic","haykaltaroşlik":"sculpture","hayajonlaniş":"excitement","hozirjavoblik":"wit","haqiqatparvar":"truth lover","harakatçanlik":"energy","hurmatsizliklar":"insults","haykaltaroşlikda":"in sculpture","hayajonlanmagan":"calm","hunarmandçilik":"artisanry","ilon":"snake","ipak":"silk","irim":"omen","ikki":"two","iliq":"lukewarm","igna":"needle","işonç":"trust","ilova":"app","ibora":"phrase","ilmli":"learned","ijob":"response","ijod":"creation","ilovalar":"apps","işonçli":"trustworthy","iboralar":"phrases","ijodkor":"creator","ilmiylik":"scholarliness","ijobat":"granting","işonçsiz":"distrustful","ijodkorlar":"creators","ibrohim":"Ibrahim","iborasiz":"phraseless","içimlik":"drink","iqtisod":"economy","işonçsizlik":"mistrust","ijodkorlik":"creativity","içimliklar":"drinks","iqtisodçi":"economist","internet":"internet","ilmsizlik":"ignorance","iqtisodiyot":"economy","ijodkorlikda":"in creativity","işonçsizlikdan":"from mistrust","iqtidorlilar":"talented ones","işbilarmonlik":"entrepreneurship","istemolçilik":"consumerism","juda":"very","jöja":"chick","jazo":"punishment","jiyda":"oleaster","jasur":"brave","jonim":"my dear","javob":"answer","jönat":"send it","jahldor":"short-tempered","joyla":"place it","jahon":"world","juftlik":"pair","jahongir":"conqueror","joylaşuv":"location","jazava":"zeal","javobgar":"responsible","jasurlik":"courage","jinnilik":"madness","javobsiz":"unanswered","jarroh":"surgeon","jafokaş":"toiler","jonkuyar":"compassionate","jamiyat":"society","jinoyat":"crime","javobgarlik":"responsibility","jafokaşlik":"hard toil","jinoyatkor":"criminal","jonkuyarlik":"compassion","jamiyatda":"in society","jasurliklar":"brave deeds","jinoyatkorlik":"criminality","javobgarsizlik":"irresponsibility","jamiyatşunos":"sociologist","jonkuyarlikdan":"from compassion","jazavalaniş":"excitement","jismoniylik":"physicality","kabi":"like","kuni":"day","keça":"yesterday","körpa":"blanket","kurak":"shovel","kişi":"person","kitob":"book","karrak":"duck","komil":"mature","kiyim":"clothes","kalom":"word","kasbkor":"artisan","kitobxon":"reader","komillik":"maturity","kalamdon":"pencil case","kelajak":"future","kulça":"bread","kuzatiş":"observation","kitobxona":"library","kiyimkeçak":"clothing","koinot":"universe","kuzatuvçi":"observer","kafolat":"guarantee","körsatma":"guidance","kitobxonlik":"reading","kafolatli":"guaranteed","körsatmali":"instructive","kelajakdagi":"future","kompyuter":"computer","köpçilik":"majority","kitobxonaçi":"librarian","kamtarinliklar":"humility","körsatkiçlar":"indicators","kafolatsizlik":"no guarantee","kuzatuvçilik":"supervision","köpçilikning":"of the majority","lola":"tulip","lagan":"platter","luğat":"dictionary","laqab":"nickname","loyqa":"turbid","laxta":"blood clot","limon":"lemon","laziz":"tasty","libos":"outfit","loçin":"falcon","laylak":"stork","lazzat":"delight","loyiha":"project","limonzor":"lemon grove","lolazor":"tulip field","liboslar":"outfits","lazzatli":"delightful","latofat":"grace","loyihaçi":"designer","laborant":"lab assistant","luğatlar":"dictionaries","layoqat":"aptitude","latofatli":"graceful","laylaklar":"storks","laboratoriya":"laboratory","layoqatsiz":"unfit","luğatşunos":"lexicographer","loyihakaş":"drafter","lazzatlaniş":"enjoyment","libosimiz":"our outfit","loyihalaştiriş":"designing","layoqatsizlik":"unfitness","luğatşunoslik":"lexicography","laboratoriyada":"in the lab","lazzatlanmaslik":"restraint","latofatliroq":"more graceful","momo":"granny","maqol":"proverb","mano":"meaning","meva":"fruit","mana":"here it is","moş":"mung bean","maktab":"school","manba":"source","mohir":"skillful","mijoz":"customer","masjid":"mosque","muzey":"museum","maşina":"car","misollar":"examples","mohirlik":"mastery","moddiylik":"materiality","muallim":"teacher","masala":"matter","maşinasoz":"carmaker","masulli":"responsible","mustaqil":"independent","mijozlar":"customers","masalliq":"ingredients","mavzular":"topics","masuliyat":"responsibility","mustaqillik":"independence","maşinalar":"cars","muallimlik":"teaching","mamlakat":"country","manfaatli":"beneficial","masuliyatsiz":"irresponsible","mustaqillikda":"in independence","maşinasozlik":"car making","mamlakatimiz":"our country","manfaatdorlik":"vested interest","muvaffaqiyat":"success","nomi":"name","niyat":"intention","nota":"note","navo":"melody","nega":"why","naqd":"cash","nafas":"breath","nemat":"bounty","navbat":"turn","norin":"norin dish","nişon":"target","nodon":"ignorant","nafaqa":"pension","nizomli":"orderly","namuna":"sample","natija":"result","novvoy":"baker","nohaqlik":"injustice","nizomnoma":"charter","nodonlik":"ignorance","navbatçi":"attendant","nişonlamoq":"to aim","namunali":"exemplary","natijali":"fruitful","nafaqaxör":"pensioner","nodonliklar":"ignorance","nomalumlik":"obscurity","natijasiz":"fruitless","nuqsonsizlik":"flawlessness","nohaqliklar":"injustices","natijadorlik":"effectiveness","nomalumlikdan":"from obscurity","namunaviylik":"exemplariness","navbatçilikda":"on duty","nizomnomasiz":"charterless","nomutanosib":"disproportionate","ota":"father","ona":"mother","oyoq":"foot","olov":"flame","oxir":"end","oğiz":"mouth","ovoz":"voice","olma":"apple","oçiq":"open","oqil":"wise","odam":"person","oqim":"stream","onasi":"his mother","olimlar":"scholars","ovoza":"fame","odamzod":"mankind","oşxona":"kitchen","oqillik":"wisdom","onatili":"mother tongue","oçiqlik":"openness","oqilona":"wisely","ozoda":"tidy","omonat":"deposit","olamon":"crowd","olimpiya":"olympics","omonatdor":"trustee","oçiqoydin":"obvious","ozodalik":"tidiness","olamonçi":"crowd member","odamgarçilik":"humanity","oçiqköngil":"open-hearted","odamgarçiliksiz":"inhumane","omonatdorlik":"trusteeship","olimpiada":"olympiad","oçiqoydinlik":"clarity","oziqovqatlar":"groceries","paxta":"cotton","piyoz":"onion","padar":"father","pulli":"wealthy","pari":"fairy","pok":"pure","peşin":"advance","pakka":"solid","pufak":"bubble","poçta":"post","palov":"pilaf","poliz":"melon field","pullik":"paid","poyezd":"train","pişiq":"ripe","paxtakor":"cotton grower","parhezkor":"abstinent","polizçi":"melon grower","poçtaxona":"post office","pardozçi":"decorator","palovxör":"pilaf lover","pestaxta":"shop counter","pajmurda":"withered","poyabzal":"shoes","paxtakorlik":"cotton growing","pardozçilik":"decorating","paypoqfuruş":"sock seller","poytaxtimiz":"our capital","paxtaçilik":"cotton industry","pastkaşlik":"meanness","parhezkorliklar":"diets","poyabzaldözi":"shoemaking","pastkaşliklari":"mean deeds","peşanadözi":"embroidery","paxtaterişda":"in cotton picking","purviqorliklar":"majesties","qari":"elderly","qulfi":"its lock","qozi":"goose","qonli":"bloody","qad":"stature","qumli":"sandy","qamiş":"reed","qatiq":"yogurt","quyon":"rabbit","qalam":"pen","qozon":"cauldron","qaror":"decision","qattiq":"hard","quyoş":"sunny","qolip":"mold","qozonça":"small pot","quyoşli":"sunny","qarorgoh":"residence","qalamkaş":"penman","qoliplamoq":"to mold","qulflamoq":"to lock","qöşimça":"addition","qonuniy":"legal","qiziqar":"interesting","qonunçilik":"legislation","qöşimçalar":"additions","qalamtasvir":"pen portrait","qadriyat":"value","qarorgohda":"at the residence","qoniqarli":"satisfactory","qadriyatlardan":"from values","qonunbuzarlik":"violation","qanoatlaniş":"contentment","qoniqarsizlik":"dissatisfaction","qöşimçasiz":"without additions","qalamtasvirda":"in the sketch","rozi":"pleased","rais":"chairman","rosa":"exactly","rang":"color","ranj":"grief","rim":"Rome","raqam":"number","robot":"robot","rassom":"artist","rişta":"thread","rayhon":"basil","ruçka":"pen","rafiq":"spouse","rivoj":"progress","risola":"treatise","raqamli":"digital","rohatlan":"relax","rasmiy":"official","rassomçi":"painter","risolaçi":"essayist","robottex":"robotics","riştalar":"threads","ravnaqli":"prosperous","rasmiyat":"formality","rivojlaniş":"development","rasmiyatçi":"formalist","rohatlanmoq":"to relax","rassomçilik":"painting","rahnamo":"guide","rahbarlik":"leadership","rivojlantiriş":"developing","rasmiyatçilik":"formalism","raqamlaştiriş":"digitizing","rahbarsizliklar":"leaderlessness","respublika":"republic","ruhiyatşunos":"psychologist","sahar":"dawn","soya":"shade","suv":"water","sir":"secret","sof":"pure","soz":"hale","savat":"basket","sariq":"yellow","sovuq":"cold","sanoq":"counting","soat":"clock","suli":"oats","suvor":"rider","salom":"hello","savoq":"lesson","sarson":"wandering","savatça":"small basket","sezgir":"sensitive","soatsoz":"watchmaker","suvoriy":"cavalryman","samolyot":"plane","sezgirlik":"sensitivity","sanoat":"industry","salomat":"health","salomlaşmoq":"to greet","sanoatçi":"industrialist","salomatlik":"wellness","samarali":"effective","somusa":"samsa","sirlilik":"mystery","salomatliklar":"good health","sanoatlaşiş":"industrialization","samaradorlik":"efficiency","sinfdoşlar":"classmates","samimiyatli":"sincere","surankaşliklar":"delays","tola":"fiber","tuya":"camel","til":"tongue","toğ":"mountain","tan":"body","toj":"crown","tovoq":"plate","tilla":"gold","toğa":"mountain","tulki":"fox","talim":"training","telefon":"phone","tuzuk":"decent","tarif":"account","tikan":"thorn","tandir":"tandoor","talimot":"instruction","tuzuklik":"decency","tomirlar":"veins","tarifnoma":"manual","tomoşa":"show","turarjoy":"dwelling","tabiat":"nature","tarixçi":"historian","tomoşabin":"viewer","tabiatda":"in nature","taraqqiyot":"progress","televizor":"TV","taşkilotçi":"organizer","tajriba":"experience","taraqqiyotda":"in progress","taşkilotçilik":"organizing","tajribasizlik":"inexperience","taşabbuskorlik":"initiative","tomoşabinlar":"viewers","talimtarbiya":"upbringing","uka":"younger brother","uya":"nest","unli":"vowel","uzra":"above","uyda":"at home","urf":"custom","ukam":"my brother","uzun":"long","umid":"hope","uzum":"grapes","uşoq":"tiny","uruğ":"seed","uloq":"goat kid","ulan":"join","uyat":"shame","uquv":"comprehension","uzumzor":"vineyard","uruğçi":"seed grower","ulanma":"link","uloqçi":"uloq player","uyatli":"shameful","umidvor":"hopeful","uçar":"flying","uluği":"greatness","umidvorlik":"hopefulness","uquvsizlik":"misunderstanding","uyatsizlik":"shamelessness","uyğonişda":"in awakening","umumlaşma":"generalization","uzluksiz":"continuous","umumlaştiriş":"summing up","uzluksizliklar":"continuities","uyatsizlikdan":"from shamelessness","uyğunlaştiriş":"adaptation","uzoqnikörar":"telescope","umidbaxşliklar":"hopes","vafo":"loyalty","voya":"maturity","vaqt":"time","vabo":"cholera","vanna":"bathtub","viza":"visa","vatan":"homeland","varaq":"sheet","vakil":"envoy","vodiy":"valley","vazni":"weight","vali":"guardian","vijdon":"conscience","video":"video","vilka":"fork","varrak":"kite","vodiylik":"valley","viloyat":"region","videolar":"videos","vasiyat":"will","vafodor":"faithful","vahima":"panic","vazifa":"task","vaznsizlik":"weightlessness","viloyatda":"in the region","vijdonsizlik":"heartlessness","vafodorlik":"faithfulness","vahimali":"scary","vazifalar":"tasks","vaqtinça":"temporary","viloyatlararo":"interregional","vazminlikdan":"from gravity","vazifadorlik":"dutifulness","vaqtinçaliklar":"temporary things","voqeliklarni":"realities","vatanparvarlik":"patriotism","xato":"mistake","xola":"aunt","xafa":"upset","xos":"special","xil":"sort","xor":"choir","xatlar":"letters","xurjun":"saddlebag","xarit":"chart","xalqim":"my people","xona":"room","xurmo":"dates","xarid":"purchase","xabar":"news","xirmon":"threshing floor","xaridor":"buyer","xurmozor":"date grove","xalqaro":"international","xonadon":"household","xabardor":"informed","xirmonjo":"threshing ground","xizmatçi":"servant","xiyonat":"betrayal","xotira":"memory","xaridorlar":"buyers","xonadonlik":"household","xabarsizlik":"no news","xizmatçilik":"service","xotirali":"memorable","xavfsizlik":"safety","xalqarolaşuv":"globalization","xabardorlikdan":"from awareness","xiyonatkorlik":"treachery","xotirasizlik":"forgetfulness","xavfsizliklari":"safeguards","xayrixohlikdan":"from goodwill","yangi":"new","yarim":"half","yöq":"none","yod":"memory","yoz":"summer","yot":"lie down","yurak":"heart","yilgi":"yearly","yovuz":"evil","yoqut":"ruby","yozuv":"writing","yuz":"face","yulğun":"tamarisk","yönal":"head on","yukla":"load it","yaxşi":"good","yaqin":"near","yozuvçi":"writer","yuklamoq":"to load","yarimta":"half one","yozgiça":"summery","yuqori":"high","yaproq":"leaf","yuruvçi":"walker","yaxşiliklar":"kindness","yangiliklar":"news","yurtdoşlar":"compatriots","yönalişli":"directed","yuqumlilik":"contagion","yaratuvçi":"creator","yönaltirilgan":"targeted","yaqinlaştiriş":"rapprochement","yaratuvçanlik":"creativeness","yetişmovçilik":"shortage","yuqoridagi":"upper","yaxşiliklardan":"from kindness","zina":"stairs","zukko":"smart","zör":"strong","zeb":"adornment","zar":"coin","zavq":"pleasure","zarba":"blow","zirak":"sharp","zafar":"victory","zarar":"harm","zamin":"ground","zamon":"era","zoğor":"hawthorn","ziyodat":"increase","zuluk":"leech","zanjir":"chain","zamonlar":"eras","zulmkor":"oppressor","zamindor":"landowner","zararli":"harmful","zoriqmoq":"to weary","zuluklar":"leeches","ziyorak":"wayside shrine","ziyofat":"feast","zamonaviy":"modern","ziyofatli":"festive","zarbadorlar":"drummers","zulmatli":"gloomy","ziyoratgoh":"shrine","zafarlilik":"triumph","zamonaviylik":"modernity","ziyolilardan":"from intellectuals","zaruriyatlar":"necessities","zarursizliklar":"nonessentials","ziyoratgohlar":"shrines","zabardastliklar":"mighty deeds","özi":"oneself","öy":"thought","öq":"arrow","öt":"pass","ön":"ten","öç":"revenge","örik":"apricot","örtoq":"comrade","ördak":"duck","ötiş":"passing","öyin":"game","öğil":"son","öçoq":"hearth","örni":"its place","ölim":"passing","özak":"core","ölça":"measure it","örikzor":"apricot orchard","öğilça":"little boy","özakli":"pithy","öyinçi":"player","örgatiş":"tutoring","ötkir":"sharp","öqituv":"teaching","ölimlari":"deaths","öçoqçi":"stoker","örtoğim":"my comrade","öqituvçi":"teacher","öquvçilar":"pupils","özgariş":"change","öqituvçilik":"teaching","özlaştiriş":"mastering","öyinqaroq":"playful","öxşaşsizlik":"dissimilarity","ösimliklarni":"plants","özgaruvçan":"variable","ğor":"cave","ğam":"sorrow","ğoz":"goose","ğişt":"brick","ğil":"sprout","ğavğo":"uproar","ğöza":"cotton boll","ğilof":"sheath","ğolib":"winner","ğoya":"idea","ğujum":"crowd","ğazab":"wrath","ğalla":"grain","ğoyib":"vanished","ğurur":"pride","ğamxör":"caring","ğildir":"rolling","ğaflat":"neglect","ğözallik":"beauty","ğallakor":"grain grower","ğururli":"proud","ğildirak":"wheel","ğazabli":"angry","ğayrat":"zeal","ğamxörlik":"care","ğalladon":"granary","ğazabnok":"furious","ğanimlik":"enmity","ğuborsiz":"dustless","ğalayon":"clamor","ğamxörliklar":"cares","ğallakorlik":"grain farming","ğazablaniş":"rage","ğirromliklar":"deceits","ğoyaviylik":"ideology","ğayratlilik":"ardor","şu":"this","şar":"din","şoh":"king","şer":"lion","şir":"milk","şan":"glory","şahar":"city","şumi":"omen","şamo":"candle","şipa":"drop","şamol":"wind","şodlik":"joy","şodli":"glad","şirin":"sweet","şukuh":"splendor","şaraf":"honor","şuur":"mind","şukr":"thanks","şarafli":"honorable","şaharlar":"cities","şukuhli":"splendid","şamollar":"winds","şodliklar":"joys","şukrli":"thankful","şaharlilar":"city folk","şifokorlar":"healers","şoşilinç":"haste","şafaqli":"radiant","şarobxona":"tavern","şikoyat":"complaint","şifokorlikda":"in healing","şoşilinçlik":"hastiness","şafqatsizlik":"mercilessness","şaraflaniş":"being honored","şikoyatnoma":"petition","şakaroblilik":"sweetness","çöl":"desert","çoy":"tea","çop":"gallop","çin":"genuine","çek":"check","çiz":"draw","çömiç":"ladle","çuqur":"deep","çelak":"bucket","çiroq":"lamp","çayla":"tea time","çopon":"shepherd","çoynak":"teapot","çuçva":"dumpling","çana":"cymbals","çaqir":"call","çöntak":"pocket","çoloq":"lame","çaylaçi":"tea lover","çuqurlik":"depth","çaqirmoq":"to invite","çoynaklar":"teapots","çiroqçi":"lamp maker","çamanzor":"flower bed","çoponlari":"shepherds","çaqiruvçi":"inviter","çegarasiz":"borderless","çaqqonlik":"agility","çidamlilik":"endurance","çorvadorlar":"cattle breeders","çegaraçilik":"border service","çorvadorlikda":"in herding","çaqirilmagan":"uninvited","çidamsizliklar":"impatience","çulğabolişdi":"they wrapped","çaqmoqtoşlar":"flints"};
function enFor(word){try{var k=visualKey(word);if(typeof EN!=='undefined'&&EN[k])return EN[k];}catch(e){}return '';}
function openLetterSheet(letter,src){
  try{
    window._sheetSource=(src==='main')?'main':'alphabet';
    var st=document.getElementById('sheetTitle');if(st)st.textContent='🔠 '+letter+' harfi — 6 bosqich';
    var box=document.getElementById('sheetSteps');
    if(box){
      var html='';
      for(var s=1;s<=6;s++){
        var ws=(DB[letter]&&DB[letter]['step'+s])||[];
        html+='<div class="step-head"><b>'+s+'-bosqich · '+ws.length+' so\u2019z</b><button class="step-go" onclick="startLetterModeAt(\''+letter.replace(/\'/g,"\\'")+'\','+s+')">▶ Boshlash</button></div>';
        html+='<div class="lw-grid">';
        for(var i=0;i<ws.length;i++){var w=ws[i];html+='<div class="lw"><b>'+escL(w.replace(/-/g,''))+'</b><div class="lw-en">'+escL(enFor(w))+'</div></div>';}
        html+='</div>';
      }
      box.innerHTML=html;
    }
    openModal('letterSheet');
  }catch(e){}
}
function startLetterModeAt(letter,step){
  try{
    currentMode='letters';currentLetter=letter;currentStep=step;currentWordIdx=0;hintsRemaining=3;
    sessStart('letters');
    closeModal('letterSheet');
    enterFocusMode(window._sheetSource||'main');loadCurrentWord();
  }catch(e){}
}


/* ==================== ARTIKULATSIYA YO'RIQNOMASI (28 harf) ==================== */
const ARTIC={
"A":{tovush:"A — ochiq, keng unli tovush.",yoriq:"Og'zingni keng och, til pastda yotsin, ovoz erkin chiqsin. Qorin bilan nafas olib, baland va tiniq ayt: A-a-a.",misol:"anor"},
"B":{tovush:"B — lab-lab portlovchi jarangli undosh.",yoriq:"Lablaringni mahkam yop, so'ng havo bosimi bilan ochib ovoz chiqar: B. Burundan emas, og'izdan ayt.",misol:"baliq"},
"D":{tovush:"D — til-oldingi portlovchi jarangli undosh.",yoriq:"Til uchini yuqori tishlar ortiga tekkiz, ovoz bilan keskin uz: D. Aytganda tomoq titrashini qo'ling bilan sez.",misol:"daraxt"},
"E":{tovush:"E — o'rta kenglikdagi unli tovush.",yoriq:"Og'izni yarim och, til o'rtada, lablar tabiiy. Sekin cho'zib ayt: E-e-e. Ovoz burunga ketmasin.",misol:"eshik"},
"F":{tovush:"F — lab-tish sirg'aluvchi jarangsiz undosh.",yoriq:"Pastki labni yuqori tishlarga tekkiz, havoni sekin chiqar: F-f-f. Shamni o'chirmaydigan mayin havo.",misol:"fonar"},
"G":{tovush:"G — til-orqa portlovchi jarangli undosh.",yoriq:"Til orqa qismini yuqori tanglayga ko'tar, ovoz bilan portlat: G. Tomoq titraydi, burun yopiq.",misol:"gulchi"},
"H":{tovush:"H — bo'g'izdan chiqadigan sirg'aluvchi tovush.",yoriq:"Og'izni ochib, tomoqdan iliq havo chiqar: H. Xuddi oynani bug'lashdek — yumshoq va sokin.",misol:"havo"},
"I":{tovush:"I — tor, yuqori unli tovush.",yoriq:"Lablarni yon tomonga cho'z (tabassum), tilni yuqoriga ko'tar: I-i-i. Ovoz ingichka va tiniq chiqsin.",misol:"ilon"},
"J":{tovush:"J — sirg'aluvchi-portlovchi jarangli undosh.",yoriq:"Tilni tanglayga yaqin qo'yib, ovoz bilan sirg'altir: J. Asalari vizillashidek jarangli ayt.",misol:"javob"},
"K":{tovush:"K — til-orqa portlovchi jarangsiz undosh.",yoriq:"Til orqa qismini tanglayga bos, havoni keskin chiqar: K. Ovozsiz, faqat portlash eshitiladi.",misol:"kitob"},
"L":{tovush:"L — yonlama sonor undosh.",yoriq:"Til uchini yuqori tishlar ortiga qo'y, havoni til yonidan chiqar: L-l-l. Ovozni cho'zib, kuylagandek ayt.",misol:"limon"},
"M":{tovush:"M — lab-lab burun sonori.",yoriq:"Lablarni yop, ovozni burundan chiqar: M-m-m. Lablar ochilmaydi, burun vizillaydi.",misol:"maktab"},
"N":{tovush:"N — til-oldingi burun sonori.",yoriq:"Til uchini yuqori milkka tekkiz, ovozni burundan chiqar: N-n-n. Og'iz deyarli ochilmaydi.",misol:"navbat"},
"O":{tovush:"O — yumaloq, orqa unli tovush.",yoriq:"Lablarni yumaloq qilib oldinga chiqar, ovozni chuqur ayt: O-o-o. Xuddi hayron qolgandek.",misol:"olma"},
"P":{tovush:"P — lab-lab portlovchi jarangsiz undosh.",yoriq:"Lablarni yopib, havoni kuch bilan portlat: P. Kaftingni og'iz oldiga qo'y — kuchli havo urilishi seziladi.",misol:"palov"},
"Q":{tovush:"Q — chuqur til-orqa portlovchi undosh.",yoriq:"Til ildizini chuqur tanglayga tort, kuchli portlat: Q. K dan chuqurroq, tomoqdan chiqadi.",misol:"quyon"},
"R":{tovush:"R — titroq sonor undosh.",yoriq:"Til uchini bo'sh qo'y, kuchli havo bilan titrat: R-r-r. Chiqmasa, 'd-d-d' dan boshlab tezlat.",misol:"robot"},
"S":{tovush:"S — sirg'aluvchi jarangsiz undosh.",yoriq:"Tilni tishlar ortiga yaqin qo'y, ingichka havo chiqar: S-s-s. Ilondek hushtak chal.",misol:"savat"},
"T":{tovush:"T — til-oldingi portlovchi jarangsiz undosh.",yoriq:"Til uchini yuqori tishlar ortiga bos, havoni keskin chiqar: T. D ning ovozsiz jufti.",misol:"tulki"},
"U":{tovush:"U — tor, yumaloq unli tovush.",yoriq:"Lablarni naychadek cho'z, ovozni chuqur ayt: U-u-u. Bo'ri uvillashidek cho'z.",misol:"uzum"},
"V":{tovush:"V — lab-tish sirg'aluvchi jarangli undosh.",yoriq:"Pastki labni yuqori tishlarga tekkiz, ovoz bilan sirg'altir: V-v-v. Tomoq titraydi.",misol:"vatan"},
"X":{tovush:"X — chuqur bo'g'iz sirg'aluvchisi.",yoriq:"Til ildizini ko'tarib, tomoqdan kuchli havo chiqar: X. Xuddi tomoq qirishdek, lekin yumshoq.",misol:"xurmo"},
"Y":{tovush:"Y — sirg'aluvchi sonor undosh.",yoriq:"Til o'rtasini tanglayga yaqin qo'y, ovozni silliq chiqar: Y. I dan boshlab tez ayt: i-y.",misol:"yurak"},
"Z":{tovush:"Z — sirg'aluvchi jarangli undosh.",yoriq:"Tilni tishlar ortiga qo'y, ovoz bilan vizillat: Z-z-z. Asalaridek: S ning jarangli jufti.",misol:"zarba"},
"Ö":{tovush:"Ö — chuqur orqa unli tovush.",yoriq:"Og'izni keng ochib, ovozni tomoq chuqurligidan ayt: Ö-ö-ö. Oddiy O dan chuqurroq va yo'g'onroq.",misol:"örik"},
"Ğ":{tovush:"Ğ — bo'g'izdan chiqadigan jarangli undosh.",yoriq:"Tomoqni bo'sh qo'y, chuqurdan g'uldirab ayt: Ğ. Suv qaynashidek tomoqdan chiqadi.",misol:"ğolib"},
"Ş":{tovush:"Ş — lab-tanglay sirg'aluvchisi.",yoriq:"Lablarni oldinga chiqar, tilni keng qilib havo chiqar: Ş-ş-ş. Bolani uxlatgandek sokin.",misol:"şamol"},
"Ç":{tovush:"Ç — portlovchi-sirg'aluvchi undosh.",yoriq:"Tilni tanglayga bosib, keskin bo'shat: Ç. Poyezd ovozidek: ç-ç-ç.",misol:"çiroq"}
};

/* ==================== STATE ==================== */
const state={
  user:localStorage.getItem('xol_user')||null,
  xp:parseInt(localStorage.getItem('xol_xp'))||0,
  streak:parseInt(localStorage.getItem('xol_streak'))||0,
  lastLogin:localStorage.getItem('xol_lastLogin')||null,
  dailyGoal:parseInt(localStorage.getItem('xol_dailyGoal'))||20,
  todayWords:parseInt(localStorage.getItem('xol_todayWords'))||0,
  todayDate:localStorage.getItem('xol_todayDate')||null,
  totalWordsLearned:parseInt(localStorage.getItem('xol_totalWords'))||0,
  totalAttempts:parseInt(localStorage.getItem('xol_totalAttempts'))||0,
  correctAttempts:parseInt(localStorage.getItem('xol_correct'))||0,
  letterProgress:JSON.parse(localStorage.getItem('xol_letterProgress'))||{},
  masteredWords:JSON.parse(localStorage.getItem('xol_mastered'))||[],
  weakWords:JSON.parse(localStorage.getItem('xol_weak'))||[],
  wordHistory:JSON.parse(localStorage.getItem('xol_history'))||[],
  achievements:JSON.parse(localStorage.getItem('xol_achievements'))||[],
  theme:localStorage.getItem('xol_theme')||'dark',
  dailyChallenge:JSON.parse(localStorage.getItem('xol_dailyChallenge'))||null,
  reviewSRS:JSON.parse(localStorage.getItem('xol_reviewSRS'))||{},
  dailyTime:parseInt(localStorage.getItem('xol_dailyTime'))||0,
  weeklyTime:parseInt(localStorage.getItem('xol_weeklyTime'))||0,
  sessionStartTime:null,
  dailyTimeReset:localStorage.getItem('xol_dailyTimeDate')||null,
  weeklyTimeReset:localStorage.getItem('xol_weeklyTimeDate')||null
};
function updateTimeTracking(){
  const now=new Date(),today=now.toDateString();
  const weekStart=new Date(now);weekStart.setDate(now.getDate()-now.getDay());
  const weekStartStr=weekStart.toDateString();
  if(state.dailyTimeReset!==today){state.dailyTime=0;state.dailyTimeReset=today;localStorage.setItem('xol_dailyTime',0);localStorage.setItem('xol_dailyTimeDate',today);}
  if(state.weeklyTimeReset!==weekStartStr){state.weeklyTime=0;state.weeklyTimeReset=weekStartStr;localStorage.setItem('xol_weeklyTime',0);localStorage.setItem('xol_weeklyTimeDate',weekStartStr);}
  const dt=document.getElementById('dailyTime'),wt=document.getElementById('weeklyTime');
  if(dt)dt.textContent=formatTime(state.dailyTime);
  if(wt)wt.textContent=formatWeeklyTime(state.weeklyTime);
  const df=document.getElementById('dailyTimeFill'),wf=document.getElementById('weeklyTimeFill');
  if(df)df.style.width=Math.min(100,(state.dailyTime/(120*60))*100)+'%';
  if(wf)wf.style.width=Math.min(100,(state.weeklyTime/(600*60))*100)+'%';
}
function formatTime(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function formatWeeklyTime(s){const h=Math.floor(s/3600),m=Math.floor((s%3600)/60);if(h>0)return h+'s '+m+'daq';return m+'daq';}
function startSessionTimer(){state.sessionStartTime=Date.now();}
function endSessionTimer(){if(state.sessionStartTime){const ss=Math.floor((Date.now()-state.sessionStartTime)/1000);state.dailyTime+=ss;state.weeklyTime+=ss;localStorage.setItem('xol_dailyTime',state.dailyTime);localStorage.setItem('xol_weeklyTime',state.weeklyTime);state.sessionStartTime=null;}}
applyTheme(state.theme);

let currentMode='letters',currentLetter='A',currentStep=1,currentWordIdx=0;
let globalWordList=[],weakWordList=[],reviewList=[],hintsRemaining=3,currentWordData=null,navSource='main';
let timerInterval=null,timerSeconds=0,timerRunning=false,timerDuration=25*60,sessionTimerInterval=null;
let weeklyStats=JSON.parse(localStorage.getItem('xol_weeklyStats'))||{};

/* ==================== V3: SESSIYA + AQQLI NAVBAT HOLATI ==================== */
let smartQueue=[],listenQueue=[];
let sess={correct:0,wrong:0,xpStart:0,t0:0,wordT0:0,times:[],active:false,mode:''};
let visualShown=true;
function sessStart(mode){sess={correct:0,wrong:0,xpStart:state.xp,t0:Date.now(),wordT0:Date.now(),times:[],active:true,mode:mode};}
function sessRecordTime(){if(sess.active&&sess.wordT0){sess.times.push((Date.now()-sess.wordT0)/1000);sess.wordT0=Date.now();}}
function sessAvg(){if(!sess.times.length)return 0;return sess.times.reduce((a,b)=>a+b,0)/sess.times.length;}
function isTestMode(){return document.getElementById('visualWrap')&&document.getElementById('visualWrap').dataset.testMode==='1';}

const dom={
  welcome:document.getElementById('welcomeScreen'),main:document.getElementById('mainScreen'),
  alphabetScreen:document.getElementById('alphabetScreen'),focus:document.getElementById('focusScreen'),
  guard:document.getElementById('guardOverlay'),nameInput:document.getElementById('nameInput'),
  startBtn:document.getElementById('startBtn'),continueBtn:document.getElementById('continueBtn'),
  userAvatar:document.getElementById('userAvatar'),totalXP:document.getElementById('totalXP'),
  streakCount:document.getElementById('streakCount'),goalCount:document.getElementById('goalCount'),
  goalFill:document.getElementById('goalFill'),wordsLearned:document.getElementById('wordsLearned'),
  masteredCount:document.getElementById('masteredCount'),accuracy:document.getElementById('accuracy'),
  letterGrid:document.getElementById('letterGrid'),achievementsList:document.getElementById('achievementsList'),
  hiddenInput:document.getElementById('hiddenInput'),mirrorInput:document.getElementById('mirrorInput'),
  mirrorText:document.getElementById('mirrorText'),cursor:document.getElementById('cursor'),
  wordDisplay:document.getElementById('wordDisplay'),lessonLabel:document.getElementById('lessonLabel'),
  focusProgressThumb:document.getElementById('focusProgressThumb'),focusStepLabel:document.getElementById('focusStepLabel'),
  focusWordCount:document.getElementById('focusWordCount'),hintCount:document.getElementById('hintCount'),
  feedbackMsg:document.getElementById('feedbackMsg'),xpPopup:document.getElementById('xpPopup'),
  nextBtn:document.getElementById('nextBtn'),statsPreview:document.getElementById('statsPreview'),
  statWords:document.getElementById('statWords'),statDays:document.getElementById('statDays'),statXP:document.getElementById('statXP')
};

/* ==================== FOCUS TIMER ==================== */
function toggleTimer(){
  const btn=document.getElementById('timerBtn'),bar=document.getElementById('focusTimerBar');
  if(timerRunning){clearInterval(timerInterval);timerRunning=false;timerSeconds=0;timerDuration=25*60;if(btn)btn.classList.remove('on');if(bar)bar.style.display='none';return;}
  timerSeconds=0;timerDuration=25*60;timerRunning=true;
  if(btn)btn.classList.add('on');if(bar)bar.style.display='flex';updateTimerDisplay();
  timerInterval=setInterval(()=>{timerSeconds++;updateTimerDisplay();
    if(timerSeconds>=timerDuration){clearInterval(timerInterval);timerRunning=false;if(btn)btn.classList.remove('on');playSuccess();vibrate(500);
      document.getElementById('timerLabel').textContent='✓ Tugadi!';
      setTimeout(()=>{if(bar)bar.style.display='none';},3000);}},1000);
}
function updateTimerDisplay(){
  const rem=Math.max(0,timerDuration-timerSeconds);
  const d=String(Math.floor(rem/60)).padStart(2,'0')+':'+String(rem%60).padStart(2,'0');
  document.getElementById('timerDisplay').textContent=d;
  document.getElementById('timerLabel').textContent=d;
  document.getElementById('timerProgressFill').style.width=(rem/timerDuration*100)+'%';
}

/* ==================== DAILY CHALLENGE ==================== */
function getDailyChallenge(){
  const today=new Date().toDateString();
  if(state.dailyChallenge&&state.dailyChallenge.date===today)return state.dailyChallenge;
  const letters=Object.keys(DB);let rl,rs,words;
  do{rl=letters[Math.floor(Math.random()*letters.length)];rs=Math.floor(Math.random()*6)+1;words=DB[rl]['step'+rs];}while(!words);
  const challenge={date:today,letter:rl,step:rs,word:words[Math.floor(Math.random()*words.length)],completed:false,xpAwarded:false};
  state.dailyChallenge=challenge;localStorage.setItem('xol_dailyChallenge',JSON.stringify(challenge));
  return challenge;
}
function renderDailyChallenge(){
  const ch=getDailyChallenge();if(!document.getElementById('dailyChallenge'))return;
  if(ch.completed){
    document.getElementById('challengeDesc').textContent='✅ Bugungi challenge bajarildi! Ertaga yangi vazifa.';
    document.getElementById('challengeBadge').textContent='✓ Bajarildi';
    document.getElementById('challengeBadge').className='challenge-badge done';
    document.getElementById('challengeReward').textContent='+50 XP ✅';
    document.getElementById('challengeStatus').textContent='"'+ch.word+'" so\'zi o\'zlashtirildi';
  }else{
    document.getElementById('challengeDesc').textContent='"'+ch.word+'" so\'zini yozing ('+ch.letter+' harfi)';
    document.getElementById('challengeBadge').textContent='Yangi';
    document.getElementById('challengeBadge').className='challenge-badge';
    document.getElementById('challengeReward').textContent='+50 XP';
    document.getElementById('challengeStatus').textContent='Bonus XP uchun bugungi so\'zni toping';
  }
}
function startDailyChallenge(){
  const ch=getDailyChallenge();if(ch.completed)return;
  currentMode='letters';currentLetter=ch.letter;currentStep=ch.step;
  const words=DB[currentLetter]['step'+currentStep];
  const idx=words.indexOf(ch.word);currentWordIdx=idx>=0?idx:0;hintsRemaining=3;
  sessStart('letters');
  enterFocusMode('main');loadCurrentWord();window._dailyChallengeWord=ch.word;
}
function startDailyChallengeFromAlphabet(){
  const ch=getDailyChallenge();
  if(ch.completed){alert('Bugungi challenge allaqachon bajarilgan!');return;}
  currentMode='letters';currentLetter=ch.letter;currentStep=ch.step;
  const words=DB[currentLetter]['step'+currentStep];
  const idx=words.indexOf(ch.word);currentWordIdx=idx>=0?idx:0;hintsRemaining=3;
  sessStart('letters');
  enterFocusMode('alphabet');loadCurrentWord();window._dailyChallengeWord=ch.word;
}

/* ==================== CHARTS (canvas, kutubxonasiz) ==================== */
function setupCanvas(id){
  const cv=document.getElementById(id);if(!cv)return null;
  const dpr=window.devicePixelRatio||1;
  const w=cv.clientWidth||300,h=130;
  cv.width=w*dpr;cv.height=h*dpr;
  const ctx=cv.getContext('2d');ctx.scale(dpr,dpr);
  return {ctx:ctx,w:w,h:h};
}
function chartColors(){
  const light=currentTheme()==='light';
  return {grid:light?'rgba(0,0,0,.08)':'rgba(255,255,255,.08)',txt:light?'rgba(33,23,3,.55)':'rgba(246,248,255,.5)'};
}
function renderCharts(){
  const cc=chartColors();
  // Harflar progressi
  const pc=setupCanvas('progressChart');
  if(pc){
    const letters=Object.keys(DB),n=letters.length;
    const bw=Math.min(14,(pc.w-10)/n-3);
    pc.ctx.clearRect(0,0,pc.w,pc.h);
    letters.forEach((l,i)=>{
      const pct=state.letterProgress[l]||0;
      const bh=Math.max(3,(pct/100)*(pc.h-26));
      const x=5+i*((pc.w-10)/n)+( ((pc.w-10)/n)-bw)/2, y=pc.h-14-bh;
      pc.ctx.fillStyle=pct>=100?'#F5C044':pct>50?'#3B6CFF':cc.grid;
      pc.ctx.shadowColor=pct>=100?'rgba(245,192,68,.7)':'transparent';pc.ctx.shadowBlur=pct>=100?8:0;
      pc.ctx.beginPath();
      if(pc.ctx.roundRect)pc.ctx.roundRect(x,y,bw,bh,3);else pc.ctx.rect(x,y,bw,bh);
      pc.ctx.fill();pc.ctx.shadowBlur=0;
    });
  }
  // Haftalik
  const wc=setupCanvas('weeklyChart');
  if(wc){
    const days=['Yak','Du','Se','Cho','Pay','Jum','Sha'];
    const today=new Date().getDay(),maxV=Math.max(8,...Array.from({length:7},(_,k)=>{const d=new Date();d.setDate(d.getDate()-(6-k));return weeklyStats[d.toDateString()]||0;}));
    wc.ctx.clearRect(0,0,wc.w,wc.h);
    const slot=wc.w/7,bw=Math.min(34,slot-16);
    for(let i=0;i<7;i++){
      const d=new Date();d.setDate(d.getDate()-(6-i));
      const cnt=weeklyStats[d.toDateString()]||0;
      const bh=Math.max(4,(cnt/maxV)*(wc.h-34));
      const x=i*slot+(slot-bw)/2,y=wc.h-22-bh,isToday=i===6;
      const g=wc.ctx.createLinearGradient(0,y,0,y+bh);
      if(isToday){g.addColorStop(0,'#FFE9A8');g.addColorStop(1,'#EAB308');}else{g.addColorStop(0,'#7AA2FF');g.addColorStop(1,'#3B6CFF');}
      wc.ctx.fillStyle=g;wc.ctx.shadowColor=isToday?'rgba(245,192,68,.6)':'rgba(59,108,255,.5)';wc.ctx.shadowBlur=8;
      wc.ctx.beginPath();
      if(wc.ctx.roundRect)wc.ctx.roundRect(x,y,bw,bh,5);else wc.ctx.rect(x,y,bw,bh);
      wc.ctx.fill();wc.ctx.shadowBlur=0;
      wc.ctx.fillStyle=isToday?'#F5C044':cc.txt;
      wc.ctx.font='700 10px Inter,sans-serif';wc.ctx.textAlign='center';
      wc.ctx.fillText(days[(today-(6-i)+7)%7],x+bw/2,wc.h-7);
      if(cnt>0){wc.ctx.fillStyle=cc.txt;wc.ctx.fillText(String(cnt),x+bw/2,y-4);}
    }
  }
}
function saveWeeklyStats(){
  const today=new Date().toDateString();
  weeklyStats[today]=(weeklyStats[today]||0)+1;
  localStorage.setItem('xol_weeklyStats',JSON.stringify(weeklyStats));
}

/* ==================== EXPORT / IMPORT ==================== */
function exportData(){
  const data={user:state.user,xp:state.xp,streak:state.streak,totalWordsLearned:state.totalWordsLearned,
    totalAttempts:state.totalAttempts,correctAttempts:state.correctAttempts,letterProgress:state.letterProgress,
    masteredWords:state.masteredWords,weakWords:state.weakWords,wordHistory:state.wordHistory,
    achievements:state.achievements,weeklyStats:weeklyStats,reviewSRS:state.reviewSRS,exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='savodhon-backup-'+new Date().toISOString().slice(0,10)+'.json';a.click();
  URL.revokeObjectURL(url);
}
function importData(event){
  const file=event.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=(e)=>{
    try{
      const data=JSON.parse(e.target.result);
      if(data.xp!==undefined)state.xp=data.xp;
      if(data.streak!==undefined)state.streak=data.streak;
      if(data.totalWordsLearned!==undefined)state.totalWordsLearned=data.totalWordsLearned;
      if(data.totalAttempts!==undefined)state.totalAttempts=data.totalAttempts;
      if(data.correctAttempts!==undefined)state.correctAttempts=data.correctAttempts;
      if(data.letterProgress)state.letterProgress=data.letterProgress;
      if(data.masteredWords)state.masteredWords=data.masteredWords;
      if(data.weakWords)state.weakWords=data.weakWords;
      if(data.wordHistory)state.wordHistory=data.wordHistory;
      if(data.achievements)state.achievements=data.achievements;
      if(data.weeklyStats)weeklyStats=data.weeklyStats;
      if(data.reviewSRS)state.reviewSRS=data.reviewSRS;
      saveAllState();localStorage.setItem('xol_weeklyStats',JSON.stringify(weeklyStats));
      renderMain();renderDailyChallenge();renderCharts();
      alert("✅ Ma'lumotlar muvaffaqiyatli import qilindi!");
    }catch(err){alert("❌ Xatolik: fayl formati noto'g'ri");}
  };
  reader.readAsText(file);event.target.value='';
}
function saveAllState(){
  localStorage.setItem('xol_xp',state.xp);localStorage.setItem('xol_streak',state.streak);
  localStorage.setItem('xol_totalWords',state.totalWordsLearned);
  localStorage.setItem('xol_totalAttempts',state.totalAttempts);
  localStorage.setItem('xol_correct',state.correctAttempts);
  localStorage.setItem('xol_letterProgress',JSON.stringify(state.letterProgress));
  localStorage.setItem('xol_mastered',JSON.stringify(state.masteredWords));
  localStorage.setItem('xol_weak',JSON.stringify(state.weakWords));
  localStorage.setItem('xol_history',JSON.stringify(state.wordHistory));
  localStorage.setItem('xol_achievements',JSON.stringify(state.achievements));
  localStorage.setItem('xol_reviewSRS',JSON.stringify(state.reviewSRS));
}

/* ==================== LEVEL INFO + NAV + MODALS ==================== */
function showLevelInfo(){
  const m=document.getElementById('levelModal'),list=document.getElementById('levelList');
  const lvl=getLevel(state.xp);
  list.innerHTML=LEVELS.map(l=>{
    const isCur=l===lvl,un=state.xp>=l.xp;
    return '<div class="level-row'+(isCur?' current':'')+'"><span>'+(un?'✓ ':'🔒 ')+l.name+'</span><span class="level-range">'+l.xp+' XP</span></div>';
  }).join('');
  openModal('levelModal');
}
function openModal(id){document.getElementById(id).classList.add('active');}
function closeModal(id){document.getElementById(id).classList.remove('active');}
function switchTab(t){
  document.getElementById('navHome').classList.toggle('on',t==='main');
  document.getElementById('navAlpha').classList.toggle('on',t==='alphabet');
  if(t==='alphabet'){showAlphabetScreen();}else{
    if(dom.alphabetScreen.classList.contains('active'))exitAlphabetScreen();
    if(!dom.main.classList.contains('visible')){dom.main.classList.add('visible');dom.main.classList.remove('screen-enter');void dom.main.offsetWidth;dom.main.classList.add('screen-enter');renderMain();}
    window.scrollTo({top:0,behavior:'smooth'});
  }
  vibrate(15);
}
function updateLevelCard(){
  const lvl=getLevel(state.xp),nextXP=getNextLevelXP(state.xp);
  const base=LEVELS[lvl.level-1].xp;
  const pct=lvl.level>=15?100:Math.min(100,Math.round(((state.xp-base)/Math.max(1,nextXP-base))*100));
  const lf=document.getElementById('levelBarFill');if(lf)lf.style.width=pct+'%';
  const nm=document.getElementById('levelNameMini');if(nm)nm.textContent=lvl.name;
  const nf=document.getElementById('levelNameFull');if(nf)nf.textContent='🏅 '+lvl.name;
  const nx=document.getElementById('nextLevelText');
  if(nx)nx.textContent=lvl.level>=15?'🏆 Maksimal daraja! Siz — XOLERIC!':'Keyingi: '+LEVELS[lvl.level].name+' · '+(nextXP-state.xp)+' XP qoldi';
}
function changeGoal(v){
  state.dailyGoal=parseInt(v)||20;
  localStorage.setItem('xol_dailyGoal',state.dailyGoal);
  updateDailyProgress();
}
function fillProfile(){
  const lvl=getLevel(state.xp);
  document.getElementById('profileAvatar').textContent=(state.user||'S').charAt(0).toUpperCase();
  document.getElementById('profileName').textContent=state.user||'Foydalanuvchi';
  document.getElementById('profileLevel').textContent=lvl.level+'-daraja · '+lvl.name;
  document.getElementById('profileXP').textContent=state.xp;
  document.getElementById('profileWords').textContent=state.totalWordsLearned;
  document.getElementById('profileStreak').textContent=state.streak;
}
const _openModal=openModal;
openModal=function(id){if(id==='profileModal')fillProfile();_openModal(id);};

/* ==================== INIT ==================== */
function cleanStaleWords(){
  try{
    if(localStorage.getItem('xol_wordfix1'))return;
    const ok=new Set();
    Object.keys(DB).forEach(L=>{for(let st=1;st<=6;st++){const k='step'+st;if(DB[L][k])DB[L][k].forEach(w=>ok.add(w));}});
    const LM={"O'":'Ö',"G'":'Ğ',"Sh":'Ş',"Ch":'Ç'};
    const conv=w=>typeof w==='string'?w.replace(/Sh/g,'Ş').replace(/sh/g,'ş').replace(/Ch/g,'Ç').replace(/ch/g,'ç').replace(/G'/g,'Ğ').replace(/g'/g,'ğ').replace(/O'/g,'Ö').replace(/o'/g,'ö').replace(/Yö-q/g,'Yöq').replace(/Zö-r/g,'Zör'):w;
    const fixW=w=>{const c=conv(w);return ok.has(c)?c:null;};
    const fixE=e=>{if(!e||typeof e!=='object')return null;if(e.word)e.word=fixW(e.word);if(!e.word)return null;if(e.letter){if(LM[e.letter])e.letter=LM[e.letter];if(!DB[e.letter])return null;}return e;};
    if(Array.isArray(state.masteredWords))state.masteredWords=state.masteredWords.map(w=>{if(typeof w!=='string')return null;if(LM[w])w=LM[w];if(w==='Ng'||w==='C')return null;if(DB[w])return w;return fixW(w);}).filter(Boolean);
    if(Array.isArray(state.weakWords))state.weakWords=state.weakWords.map(e=>typeof e==='string'?(fixW(e)):fixE(e)).filter(x=>x!==null);
    if(state.reviewSRS&&typeof state.reviewSRS==='object'){const n={};for(const k of Object.keys(state.reviewSRS)){const c=fixW(k);if(c)n[c]=state.reviewSRS[k];}state.reviewSRS=n;}
    if(Array.isArray(state.wordHistory))state.wordHistory=state.wordHistory.map(fixE).filter(Boolean);
    if(state.dailyChallenge&&Array.isArray(state.dailyChallenge.words))state.dailyChallenge.words=state.dailyChallenge.words.map(e=>typeof e==='string'?(fixW(e)):fixE(e)).filter(x=>x!==null);
    saveAllState();
    localStorage.setItem('xol_wordfix1','1');
  }catch(e){}
}
function migrateAlphabet2026(){
  try{
    if(localStorage.getItem('xol_alpha2026'))return;
    const LM={"O'":'Ö',"G'":'Ğ',"Sh":'Ş',"Ch":'Ç'};
    const conv=w=>typeof w==='string'?w.replace(/Sh/g,'Ş').replace(/sh/g,'ş').replace(/Ch/g,'Ç').replace(/ch/g,'ç').replace(/G'/g,'Ğ').replace(/g'/g,'ğ').replace(/O'/g,'Ö').replace(/o'/g,'ö').replace(/Yö-q/g,'Yöq').replace(/Zö-r/g,'Zör'):w;
    if(state.letterProgress){
      for(const k of Object.keys(LM)){
        if(state.letterProgress[k]!==undefined){if(state.letterProgress[LM[k]]===undefined)state.letterProgress[LM[k]]=state.letterProgress[k];delete state.letterProgress[k];}
      }
      delete state.letterProgress.Ng;delete state.letterProgress.C;
    }
    if(Array.isArray(state.masteredWords))state.masteredWords=state.masteredWords.map(conv);
    if(Array.isArray(state.weakWords))state.weakWords=state.weakWords.map(conv);
    if(state.reviewSRS&&typeof state.reviewSRS==='object'){const n={};for(const k of Object.keys(state.reviewSRS))n[conv(k)]=state.reviewSRS[k];state.reviewSRS=n;}
    if(Array.isArray(state.wordHistory))state.wordHistory.forEach(e=>{if(e&&typeof e==='object'){if(e.word)e.word=conv(e.word);if(e.letter&&LM[e.letter])e.letter=LM[e.letter];}});
    if(state.dailyChallenge&&Array.isArray(state.dailyChallenge.words))state.dailyChallenge.words.forEach(e=>{if(typeof e==='string')return;if(e&&e.word)e.word=conv(e.word);if(e&&e.letter&&LM[e.letter])e.letter=LM[e.letter];});
    saveAllState();
    localStorage.setItem('xol_alpha2026','1');
  }catch(e){}
}
function init(){
  migrateAlphabet2026();cleanStaleWords();checkStreak();updateDailyProgress();updateTimeTracking();renderDailyChallenge();
  const gs=document.getElementById('goalSelect');
  if(gs){gs.innerHTML=[10,20,30,50,100].map(g=>'<option value="'+g+'"'+(state.dailyGoal===g?' selected':'')+'>'+g+' so\'z</option>').join('');}
  renderCharts();
  if(state.user){
    dom.nameInput.value=state.user;
    dom.userAvatar.textContent=state.user.charAt(0).toUpperCase();
    dom.statsPreview.style.display='flex';
    dom.statWords.textContent=state.totalWordsLearned;
    dom.statDays.textContent=state.streak;
    dom.statXP.textContent=state.xp;
  }
  window.addEventListener('resize',()=>renderCharts(),{passive:true});
}
function checkStreak(){
  const today=new Date().toDateString(),lastLogin=state.lastLogin;
  if(lastLogin){
    const diff=Math.floor((new Date(today)-new Date(lastLogin))/(1000*60*60*24));
    if(diff>1){state.streak=0;localStorage.setItem('xol_streak',0);}
  }
}
function updateDailyProgress(){
  const today=new Date().toDateString();
  if(state.todayDate!==today){
    state.todayWords=0;state.todayDate=today;
    localStorage.setItem('xol_todayWords',0);localStorage.setItem('xol_todayDate',today);
  }
  dom.goalCount.textContent=state.todayWords+' / '+state.dailyGoal+" so'z";
  const pct=Math.min(100,(state.todayWords/state.dailyGoal)*100);
  dom.goalFill.style.width=pct+'%';
  const ring=document.getElementById('goalRingFg');
  if(ring)ring.style.strokeDashoffset=(163.36*(1-pct/100)).toFixed(2);
  const gp=document.getElementById('goalPct');if(gp)gp.textContent=Math.round(pct)+'%';
  const gs2=document.getElementById('goalStat');if(gs2)gs2.textContent=Math.round(pct)+'%';
}

/* ==================== FULLSCREEN ==================== */
async function requestFullscreen(){
  try{
    if(!document.fullscreenElement){await document.documentElement.requestFullscreen();}
    dom.guard.style.display='none';
    history.pushState(null,null,location.href);
  }catch(e){dom.guard.style.display='none';}
}
document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement&&dom.main.classList.contains('visible'))dom.guard.style.display='flex';
});
function handleBackButton(){
  if(dom.focus.classList.contains('active')){endSessionTimer();exitFocus();return;}
  if(dom.alphabetScreen.classList.contains('active')){exitAlphabetScreen();return;}
  if(dom.main.classList.contains('visible')){exitApp();return;}
}
function exitApp(){
  endSessionTimer();saveAllState();
  if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});}
  dom.main.classList.remove('visible');
  dom.focus.classList.remove('active');
  dom.welcome.classList.remove('hide');
  state.user=null;localStorage.removeItem('xol_user');
  history.pushState(null,null,location.href);
}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){endSessionTimer();saveAllState();}});
window.addEventListener('pagehide',()=>{try{endSessionTimer();saveAllState();}catch(e){}});
window.addEventListener('popstate',(e)=>{e.preventDefault();handleBackButton();});
document.addEventListener('backbutton',handleBackButton);
document.addEventListener('keydown',(e)=>{if(e.key==='Escape')handleBackButton();});

/* ==================== AUDIO ==================== */
function playSuccess(){
  try{
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sine';gain.gain.value=.15;osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(523,ctx.currentTime);osc.start();
    setTimeout(()=>osc.frequency.value=659,80);
    setTimeout(()=>osc.frequency.value=783,160);
    setTimeout(()=>{gain.gain.exponentialRampToValueAtTime(.01,ctx.currentTime+.3);setTimeout(()=>osc.stop(),300);},200);
  }catch(e){}
}
function playError(){
  try{
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type='sawtooth';gain.gain.value=.1;osc.connect(gain);gain.connect(ctx.destination);
    osc.frequency.value=200;osc.start();
    setTimeout(()=>{gain.gain.exponentialRampToValueAtTime(.01,ctx.currentTime+.2);setTimeout(()=>osc.stop(),200);},100);
  }catch(e){}
}
function vibrate(ms){if(navigator.vibrate)navigator.vibrate(ms);}
function speakWord(){
  if(!currentWordData)return;
  try{
    speechSynthesis.cancel();
    const utter=new SpeechSynthesisUtterance(currentWordData.word.replace(/-/g,''));
    utter.lang='uz-UZ';utter.rate=.8;speechSynthesis.speak(utter);
  }catch(e){}
}

/* ==================== RENDER MAIN ==================== */
function renderMain(){
  dom.totalXP.textContent=state.xp;
  dom.streakCount.textContent=state.streak;
  dom.wordsLearned.textContent=state.totalWordsLearned;
  dom.masteredCount.textContent=state.masteredWords.length;
  const acc=state.totalAttempts>0?Math.round((state.correctAttempts/state.totalAttempts)*100):0;
  dom.accuracy.textContent=acc+'%';
  const lvl=getLevel(state.xp);
  document.getElementById('levelDisplay').textContent=lvl.level;
  const un=document.getElementById('userNameDisplay');if(un&&state.user)un.textContent=state.user;
  updateLevelCard();updateDailyProgress();
  renderLetterGrid();renderAlphabetScreen();renderAchievements();renderModeProgress();renderDailyChallenge();renderCharts();
  try{buildWeeklyReport();}catch(e){}
}
function showAlphabetScreen(){
  dom.main.classList.remove('visible');
  dom.alphabetScreen.classList.add('active');
  dom.alphabetScreen.classList.remove('screen-enter');void dom.alphabetScreen.offsetWidth;dom.alphabetScreen.classList.add('screen-enter');
  document.getElementById('navHome').classList.remove('on');
  document.getElementById('navAlpha').classList.add('on');
  renderAlphabetScreen();window.scrollTo(0,0);
}
function exitAlphabetScreen(){
  dom.alphabetScreen.classList.remove('active');
  dom.main.classList.add('visible');
  document.getElementById('navHome').classList.add('on');
  document.getElementById('navAlpha').classList.remove('on');
  renderMain();
}
function renderAlphabetScreen(){
  const keys=Object.keys(DB);
  const basic=keys.filter(l=>!['Ö','Ğ','Ş','Ç'].includes(l));
  const special=keys.filter(l=>['Ö','Ğ','Ş','Ç'].includes(l));
  const b=document.getElementById('basicLetters'),s=document.getElementById('specialLetters');
  const sec=document.querySelectorAll('.alpha-sec');
  if(sec[0])sec[0].textContent='Asosiy harflar · '+basic.length;
  if(sec[1])sec[1].textContent='Maxsus harflar · '+special.length;
  if(b)b.innerHTML=basic.map(l=>createLetterButton(l)).join('');
  if(s)s.innerHTML=special.map(l=>createLetterButton(l)).join('');
}
function escL(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function createLetterButton(letter){
  const prog=state.letterProgress[letter]||0;
  const cls=prog>=100?'mastered':prog>0?'in-progress':'new';
  const fn=letter.replace(/'/g,"\\'");
  return '<button class="letter-btn '+cls+'" onclick="openLetterSheet(\''+fn+'\',\'alphabet\')">'+escL(letter)+
    (prog>=100?'<span class="master-icon">★</span>':'')+
    '<span class="letter-progress">'+(prog>=100?'100%':prog+'%')+'</span>'+
    '<span class="artic-btn" onclick="openArtic(event,\''+fn+'\')" title="Talaffuz yo\'riqnomasi" aria-label="Talaffuz">i</span></button>';
}
function renderLetterGrid(){
  const letters=Object.keys(DB);
  dom.letterGrid.innerHTML='';
  letters.forEach(letter=>{
    const prog=state.letterProgress[letter]||0;
    const tile=document.createElement('div');
    tile.className='letter-tile '+(prog>=100?'mastered':prog>0?'in-progress':'new');
    tile.innerHTML=escL(letter)+(prog>=100?'<span class="master-badge">★</span>':'')+
      '<span class="progress-mini">'+(prog>=100?'✓':prog+'%')+'</span>';
    tile.onclick=()=>openLetterSheet(letter,'main');
    dom.letterGrid.appendChild(tile);
  });
}
function renderModeProgress(){
  const letters=Object.keys(DB);let tp=0;
  letters.forEach(l=>tp+=(state.letterProgress[l]||0));
  const avg=Math.round(tp/letters.length);
  const dots=(n,cls)=>Array(n).fill(0).map((_,i)=>'<div class="progress-dot '+(avg>=(i+1)*(100/n)?cls:'')+'"></div>').join('');
  const set=(id,html)=>{const e=document.getElementById(id);if(e)e.innerHTML=html;};
  set('lettersProgress',dots(6,'filled'));
  set('globalProgress',dots(6,'gold'));
  set('weakProgress','<div class="progress-dot '+(state.weakWords.length>0?'filled':'')+'"></div><div class="progress-dot '+(state.weakWords.length>3?'filled':'')+'"></div><div class="progress-dot '+(state.weakWords.length>6?'filled':'')+'"></div>');
  set('reviewProgress','<div class="progress-dot '+(state.wordHistory.length>0?'filled':'')+'"></div><div class="progress-dot '+(state.wordHistory.length>10?'filled':'')+'"></div><div class="progress-dot '+(state.wordHistory.length>20?'filled':'')+'"></div>');
  set('smartProgress',dots(6,'gold'));
  set('listenProgress','<div class="progress-dot '+(state.totalWordsLearned>0?'filled':'')+'"></div><div class="progress-dot '+(state.totalWordsLearned>20?'filled':'')+'"></div><div class="progress-dot '+(state.totalWordsLearned>50?'filled':'')+'"></div>');
}
function renderAchievements(){
  const ach=[
    {id:'first',icon:'🎯',name:'Birinchi qadam',condition:()=>state.totalWordsLearned>=1},
    {id:'ten',icon:'🌟',name:"10 so'z",condition:()=>state.totalWordsLearned>=10},
    {id:'hundred',icon:'💯',name:"100 so'z",condition:()=>state.totalWordsLearned>=100},
    {id:'master',icon:'👑',name:'Master',condition:()=>state.masteredWords.length>=5},
    {id:'streak3',icon:'🔥',name:'3 kun',condition:()=>state.streak>=3},
    {id:'streak7',icon:'💪',name:'7 kun',condition:()=>state.streak>=7},
    {id:'perfect',icon:'💎',name:'100% aniq',condition:()=>state.totalAttempts>=10&&state.correctAttempts===state.totalAttempts},
    {id:'xp100',icon:'⭐',name:'100 XP',condition:()=>state.xp>=100}
  ];
  dom.achievementsList.innerHTML=ach.map(a=>{
    const un=state.achievements.includes(a.id)||a.condition();
    if(un&&!state.achievements.includes(a.id)){
      state.achievements.push(a.id);
      localStorage.setItem('xol_achievements',JSON.stringify(state.achievements));
      if(window.burstConfetti)burstConfetti(50);
    }
    return '<div class="achievement-card '+(un?'unlocked':'')+'"><div class="achievement-icon">'+a.icon+'</div><div class="achievement-name">'+escL(a.name)+'</div></div>';
  }).join('');
}

/* ==================== SM-2 SRS (orqaga mos) ==================== */
function srsGet(word){
  const s=state.reviewSRS[word]||{};
  return {
    interval:typeof s.interval==='number'?s.interval:1,
    ease:typeof s.ease==='number'?s.ease:(typeof s.easeFactor==='number'?s.easeFactor:2.5),
    repetitions:typeof s.repetitions==='number'?s.repetitions:0,
    nextReview:typeof s.nextReview==='number'?s.nextReview:0,
    lastReviewed:s.lastReviewed||0,
    correctCount:s.correctCount||0
  };
}
function srsUpdate(word,quality){
  const s=srsGet(word);
  quality=Math.max(0,Math.min(5,quality));
  if(quality>=3){
    if(s.repetitions===0)s.interval=1;
    else if(s.repetitions===1)s.interval=6;
    else s.interval=Math.max(1,Math.round(s.interval*s.ease));
    s.repetitions+=1;
    s.ease=Math.min(3,Math.max(1.3,s.ease+(0.1-(5-quality)*(0.08+(5-quality)*0.02))));
  }else{
    s.repetitions=0;
    s.interval=1;
    s.ease=Math.max(1.3,s.ease-0.2);
  }
  s.lastReviewed=Date.now();
  if(quality>=3)s.correctCount+=1;
  s.nextReview=Date.now()+s.interval*86400000;
  state.reviewSRS[word]={interval:s.interval,ease:s.ease,easeFactor:s.ease,repetitions:s.repetitions,nextReview:s.nextReview,lastReviewed:s.lastReviewed,correctCount:s.correctCount};
  localStorage.setItem('xol_reviewSRS',JSON.stringify(state.reviewSRS));
  return state.reviewSRS[word];
}
function levenshtein(a,b){
  a=(a||'').toLowerCase();b=(b||'').toLowerCase();
  const m=a.length,n=b.length;
  if(!m)return n;if(!n)return m;
  const d=Array.from({length:m+1},(_,i)=>[i].concat(new Array(n).fill(0)));
  for(let j=1;j<=n;j++)d[0][j]=j;
  for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  return d[m][n];
}
function similarity(a,b){
  a=(a||'').toLowerCase().trim();b=(b||'').toLowerCase().trim();
  if(a===b)return 1;
  const mx=Math.max(a.length,b.length);
  if(!mx)return 0;
  return 1-levenshtein(a,b)/mx;
}

/* ==================== MODE HANDLERS ==================== */
function collectAllWords(){
  const out=[];
  for(const letter of Object.keys(DB))for(let st=1;st<=6;st++){
    const k='step'+st;
    if(DB[letter][k])DB[letter][k].forEach(w=>out.push({letter:letter,step:st,word:w,clean:w.replace(/[-']/g,'').toLowerCase()}));
  }
  return out;
}
function buildSmartQueue(){
  const now=Date.now();
  const weak=[...state.weakWords];
  const due=state.wordHistory.filter(e=>srsGet(e.word).nextReview<=now);
  const seen=new Set(state.wordHistory.map(e=>e.word).concat(weak.map(w=>w.word)));
  const fresh=collectAllWords().filter(w=>!seen.has(w.word));
  const q=[];
  const take=(arr,n)=>{const c=[...arr].sort(()=>Math.random()-.5);return c.slice(0,n);};
  const total=20;
  const nWeak=Math.min(weak.length,Math.round(total*.5));
  const nDue=Math.min(due.length,Math.round(total*.3));
  const nNew=Math.min(fresh.length,total-nWeak-nDue);
  q.push(...take(weak,nWeak),...take(due,nDue),...take(fresh,nNew));
  if(!q.length)q.push(...take(collectAllWords(),10));
  return q.sort(()=>Math.random()-.5);
}
function buildListenQueue(){
  const keys=Object.keys(DB);
  const l=keys[Math.floor(Math.random()*keys.length)];
  const st=Math.random()>.5?1:2;
  const words=(DB[l]['step'+st]||[]).map(w=>({letter:l,step:st,word:w,clean:w.replace(/[-']/g,'').toLowerCase()}));
  return words.sort(()=>Math.random()-.5).slice(0,6);
}
function startMode(mode,fromAlphabet){
  fromAlphabet=!!fromAlphabet;currentMode=mode;
  switch(mode){
    case 'letters':currentLetter='A';currentStep=1;currentWordIdx=0;break;
    case 'global':buildGlobalList();currentWordIdx=0;break;
    case 'smart':
      smartQueue=buildSmartQueue();
      if(!smartQueue.length){alert("Hali so'zlar tayyor emas!");return;}
      currentWordIdx=0;break;
    case 'listen':
      listenQueue=buildListenQueue();
      currentWordIdx=0;break;
    case 'weak':
      weakWordList=[...state.weakWords];
      if(weakWordList.length===0){alert("Hali qiyin so'zlar yo'q! Avval mashq qiling.");return;}
      currentWordIdx=0;break;
    case 'review':{
      const now=Date.now();
      reviewList=state.wordHistory.filter(e=>{const s=state.reviewSRS[e.word]||{interval:0,nextReview:0};return s.nextReview<=now;});
      if(reviewList.length===0){
        if(state.wordHistory.length===0){alert("Hali takrorlash uchun so'zlar yo'q!");return;}
        reviewList=[...state.wordHistory].sort(()=>Math.random()-.5).slice(0,10);
      }
      reviewList.sort((a,b)=>((state.reviewSRS[a.word]||{interval:0}).interval-((state.reviewSRS[b.word]||{interval:0}).interval)));
      currentWordIdx=0;break;}
  }
  hintsRemaining=3;
  visualShown=(mode==='review')?false:true;
  sessStart(mode);
  enterFocusMode(fromAlphabet?'alphabet':'main');loadCurrentWord();
}
function startLetterMode(letter,fromAlphabet){
  currentMode='letters';currentLetter=letter;
  const prog=state.letterProgress[letter]||0;
  if(prog>=100){currentStep=6;currentWordIdx=5;}
  else{currentStep=Math.floor(prog/16.67)+1;currentWordIdx=0;}
  hintsRemaining=3;
  sessStart('letters');
  enterFocusMode(fromAlphabet?'alphabet':'main');loadCurrentWord();
}
function buildGlobalList(){
  const letters=Object.keys(DB);globalWordList=[];
  for(let step=1;step<=6;step++)letters.forEach(letter=>{
    const k='step'+step;
    if(DB[letter][k])DB[letter][k].forEach(word=>globalWordList.push({letter:letter,step:step,word:word,clean:word.replace(/[-']/g,'').toLowerCase()}));
  });
}

/* ==================== FOCUS MODE ==================== */
function enterFocusMode(fromScreen){
  navSource=fromScreen||'main';
  dom.main.classList.remove('visible');
  if(dom.alphabetScreen.classList.contains('active'))dom.alphabetScreen.classList.remove('active');
  dom.focus.classList.add('active');
  dom.focus.classList.remove('screen-enter');void dom.focus.offsetWidth;dom.focus.classList.add('screen-enter');
  window.scrollTo(0,0);
  startSessionTimer();
  if(sessionTimerInterval)clearInterval(sessionTimerInterval);
  sessionTimerInterval=setInterval(()=>{
    if(state.sessionStartTime){
      const el2=document.getElementById('dailyTime');
      if(el2&&!dom.main.classList.contains('visible')){/* live update only on main */}
    }
  },1000);
  updateTimeTracking();focusInput();
}
function exitFocus(){
  if(sessionTimerInterval){clearInterval(sessionTimerInterval);sessionTimerInterval=null;}
  endSessionTimer();updateTimeTracking();
  if(timerRunning)toggleTimer();
  showSessionSummary();
  dom.focus.classList.remove('active');
  if(navSource==='alphabet'){dom.alphabetScreen.classList.add('active');renderAlphabetScreen();}
  else{dom.main.classList.add('visible');renderMain();}
}
function focusInput(){try{dom.hiddenInput.focus({preventScroll:true});}catch(e){dom.hiddenInput.focus();}}
function loadCurrentWord(){
  let wordObj;
  switch(currentMode){
    case 'letters':{
      const words=DB[currentLetter]['step'+currentStep];
      if(!words||currentWordIdx>=words.length){
        if(currentStep<6){currentStep++;currentWordIdx=0;}
        else{exitFocus();return;}
      }
      const w=DB[currentLetter]['step'+currentStep][currentWordIdx];
      wordObj={letter:currentLetter,step:currentStep,word:w,clean:w.replace(/[-']/g,'').toLowerCase()};
      dom.lessonLabel.textContent=currentLetter+" harfi · "+currentStep+'-bosqich';
      break;}
    case 'global':
      if(currentWordIdx>=globalWordList.length){exitFocus();return;}
      wordObj=globalWordList[currentWordIdx];
      dom.lessonLabel.textContent='Global · '+(currentWordIdx+1)+'/'+globalWordList.length;break;
    case 'smart':
      if(currentWordIdx>=smartQueue.length){exitFocus();return;}
      wordObj=smartQueue[currentWordIdx];
      dom.lessonLabel.textContent='🧠 Aqlli mashq · '+(currentWordIdx+1)+'/'+smartQueue.length;break;
    case 'listen':
      if(currentWordIdx>=listenQueue.length){exitFocus();return;}
      wordObj=listenQueue[currentWordIdx];
      dom.lessonLabel.textContent='🎙 Eshit-takrorla · '+(currentWordIdx+1)+'/'+listenQueue.length;break;
    case 'weak':
      if(currentWordIdx>=weakWordList.length){exitFocus();return;}
      wordObj=weakWordList[currentWordIdx];
      dom.lessonLabel.textContent="Qiyin so'zlar · "+(currentWordIdx+1)+'/'+weakWordList.length;break;
    case 'review':
      if(currentWordIdx>=reviewList.length){exitFocus();return;}
      wordObj=reviewList[currentWordIdx];
      dom.lessonLabel.textContent='Takrorlash · '+(currentWordIdx+1)+'/'+reviewList.length;break;
  }
  currentWordData=wordObj;
  sess.wordT0=Date.now();
  dom.wordDisplay.innerHTML=wordObj.word.split('-').map((s,i)=>'<span class="syllable '+(i%2===0?'consonant':'vowel')+'">'+escL(s)+'</span>').join('<span style="opacity:.3;margin:0 4px">-</span>');
  const reduceMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  dom.wordDisplay.classList.remove('word-appear');void dom.wordDisplay.offsetWidth;
  if(!reduceMotion)dom.wordDisplay.classList.add('word-appear');
  renderSylChips(wordObj);
  try{var _we=document.getElementById('wordEn');if(_we)_we.textContent=enFor(wordObj.word);}catch(_e){}
  renderVisual(wordObj);
  renderListenTip(wordObj);
  dom.hiddenInput.value='';dom.mirrorText.textContent='';
  dom.mirrorInput.classList.remove('correct','wrong');
  const wrap=document.getElementById('gameInputWrapper');if(wrap)wrap.classList.remove('success-neon-glow');
  dom.cursor.style.display='inline-block';
  dom.feedbackMsg.classList.remove('show','success','error');
  dom.xpPopup.style.display='none';
  dom.nextBtn.classList.remove('visible');
  dom.hintCount.textContent='('+hintsRemaining+')';
  const sc=document.getElementById('successCard');if(sc)sc.style.display='none';
  const lr=document.getElementById('listenResult');if(lr)lr.textContent='';
  const sar=document.getElementById('selfAssessRow');if(sar)sar.style.display='none';
  updateFocusProgress();
}
function updateFocusProgress(){
  let total,current;
  switch(currentMode){
    case 'letters':total=36;current=(currentStep-1)*6+currentWordIdx;dom.focusStepLabel.textContent=currentStep+'-Bosqich';break;
    case 'global':total=globalWordList.length;current=currentWordIdx;dom.focusStepLabel.textContent='Global';break;
    case 'smart':total=smartQueue.length;current=currentWordIdx;dom.focusStepLabel.textContent='Aqlli';break;
    case 'listen':total=listenQueue.length;current=currentWordIdx;dom.focusStepLabel.textContent='Logoped';break;
    case 'weak':total=weakWordList.length;current=currentWordIdx;dom.focusStepLabel.textContent='Qiyin';break;
    case 'review':total=reviewList.length;current=currentWordIdx;dom.focusStepLabel.textContent='Takrorlash';break;
  }
  dom.focusProgressThumb.style.width=(total?current/total*100:0)+'%';
  dom.focusWordCount.textContent=(current+1)+'/'+total;
}
function showHint(){
  if(hintsRemaining<=0||!currentWordData)return;
  hintsRemaining--;dom.hintCount.textContent='('+hintsRemaining+')';
  const word=currentWordData.word.replace(/-/g,'');
  const pl=Math.ceil(word.length*.3),si=Math.floor(Math.random()*(word.length-pl+1));
  let hint='';for(let i=0;i<word.length;i++)hint+=(i>=si&&i<si+pl)?word[i]:'_';
  dom.mirrorText.textContent=hint;dom.hiddenInput.value=hint;
}

function canonOld(t){return String(t||'').toLowerCase().replace(/ş/g,'sh').replace(/ç/g,'ch').replace(/ö/g,'o').replace(/ğ/g,'g');}
/* ==================== INPUT HANDLING ==================== */
dom.hiddenInput.addEventListener('input',(e)=>{
  const val=e.target.value.toLowerCase();
  dom.mirrorText.textContent=val;vibrate(15);
  if(!currentWordData)return;
  const target=currentWordData.clean;
  const typed=val.replace(/['\s]/g,'');
  const targetC=canonOld(target),typedC=canonOld(typed);
  if(typed.length>0){
    const okSoFar=targetC.startsWith(typedC);
    const syls=document.querySelectorAll('.syllable');
    const combined=typed.replace(/-/g,'');
    let cc=0;
    syls.forEach(syl=>{
      const t=syl.textContent;
      if(cc<combined.length&&cc+t.length<=combined.length)syl.classList.add('correct');
      else syl.classList.remove('correct');
      cc+=t.length;
    });
    if(typed===target){onCorrect('new');}
    else if(typed.length>0&&typedC===targetC){onCorrect('old');}
    else if(!okSoFar&&typed.length>=target.length*.5){
      dom.mirrorInput.classList.add('wrong','shake');
      setTimeout(()=>dom.mirrorInput.classList.remove('shake'),500);
      playError();vibrate(100);
      if(!state.weakWords.find(w=>w.word===currentWordData.word)){
        state.weakWords.push(currentWordData);
        localStorage.setItem('xol_weak',JSON.stringify(state.weakWords));
        state.totalAttempts++;localStorage.setItem('xol_totalAttempts',state.totalAttempts);
      }
      if(currentWordData&&!currentWordData._srsWrong){
        currentWordData._srsWrong=true;
        srsUpdate(currentWordData.word,0);
        sessRecordTime();sess.wrong++;sess.wordT0=Date.now();
      }
    }
  }
});
function onCorrect(variant){
  if(dom.nextBtn.classList.contains('visible'))return;
  playSuccess();vibrate(50);
  if(window.burstConfetti)burstConfetti(60);
  dom.mirrorInput.classList.add('correct');
  const wrap=document.getElementById('gameInputWrapper');if(wrap)wrap.classList.add('success-neon-glow');
  dom.cursor.style.display='none';
  if(variant==='old'){const ns=currentWordData.word.replace(/-/g,'');dom.feedbackMsg.innerHTML='Ajoyib! 🎉<br><small style="color:#F5C044;font-weight:700">Eski harf qabul qilindi — yangi imlo: <b>'+ns+'</b></small>';}else if(variant==='new'&&/[şçöğ]/.test(currentWordData.clean)){dom.feedbackMsg.innerHTML='Ajoyib! 🎉<br><small style="color:#2ED573;font-weight:700">Yangi harfdan foydalanildi ✅</small>';}else{dom.feedbackMsg.textContent='Ajoyib! 🎉';}dom.feedbackMsg.classList.add('show','success');
  dom.xpPopup.style.display='inline-block';
  setTimeout(()=>{dom.xpPopup.style.display='none';},2000);
  dom.nextBtn.classList.add('visible');
  dom.hiddenInput.blur();
  const sc=document.getElementById('successCard');if(sc)sc.style.display='block';
  document.querySelectorAll('.syllable').forEach(s=>s.classList.add('correct'));
  document.querySelectorAll('.syl-chip').forEach(c=>c.classList.add('pulse'));
  sessRecordTime();sess.correct++;
  const usedHint=hintsRemaining<3;
  state.xp+=10;state.todayWords++;state.totalWordsLearned++;
  state.correctAttempts++;state.totalAttempts++;
  state.todayDate=new Date().toISOString();
  localStorage.setItem('xol_xp',state.xp);
  localStorage.setItem('xol_todayWords',state.todayWords);
  localStorage.setItem('xol_totalWords',state.totalWordsLearned);
  localStorage.setItem('xol_correct',state.correctAttempts);
  localStorage.setItem('xol_totalAttempts',state.totalAttempts);
  localStorage.setItem('xol_todayDate',state.todayDate);
  updateDailyProgress();saveWeeklyStats();
  state.wordHistory.push(Object.assign({},currentWordData,{date:Date.now()}));
  localStorage.setItem('xol_history',JSON.stringify(state.wordHistory));
  if(currentMode==='letters'){
    const done=(currentStep-1)*6+currentWordIdx+1;
    const pct=Math.floor(done/36*100);
    state.letterProgress[currentLetter]=pct;
    localStorage.setItem('xol_letterProgress',JSON.stringify(state.letterProgress));
    if(pct>=100&&!state.masteredWords.includes(currentLetter)){
      state.masteredWords.push(currentLetter);
      localStorage.setItem('xol_mastered',JSON.stringify(state.masteredWords));
      if(window.burstConfetti)burstConfetti(120);
    }
  }
  if(currentWordData){
    srsUpdate(currentWordData.word,usedHint?3:5);
  }
  if(window._dailyChallengeWord&&currentWordData&&window._dailyChallengeWord===currentWordData.word){
    state.xp+=40;localStorage.setItem('xol_xp',state.xp);
    if(state.dailyChallenge){state.dailyChallenge.completed=true;state.dailyChallenge.xpAwarded=true;localStorage.setItem('xol_dailyChallenge',JSON.stringify(state.dailyChallenge));}
    window._dailyChallengeWord=null;
    dom.xpPopup.textContent='+50 XP 🎯';
    const sx=document.querySelector('#successCard div div:last-child');if(sx)sx.textContent='+50 XP 🎯';
    if(window.burstConfetti)burstConfetti(140);
  }
  state.weakWords=state.weakWords.filter(w=>w.word!==currentWordData.word);
  localStorage.setItem('xol_weak',JSON.stringify(state.weakWords));
}
function handleNext(){
  if(!dom.nextBtn.classList.contains('visible'))return;
  switch(currentMode){
    case 'letters':{
      const sw=DB[currentLetter]['step'+currentStep];
      if(currentWordIdx+1<sw.length)currentWordIdx++;
      else if(currentStep<6){currentStep++;currentWordIdx=0;}
      else{exitFocus();return;}
      break;}
    case 'global':if(currentWordIdx+1<globalWordList.length)currentWordIdx++;else{exitFocus();return;}break;
    case 'smart':if(currentWordIdx+1<smartQueue.length)currentWordIdx++;else{exitFocus();return;}break;
    case 'listen':if(currentWordIdx+1<listenQueue.length)currentWordIdx++;else{exitFocus();return;}break;
    case 'weak':if(currentWordIdx+1<weakWordList.length)currentWordIdx++;else{exitFocus();return;}break;
    case 'review':if(currentWordIdx+1<reviewList.length)currentWordIdx++;else{exitFocus();return;}break;
  }
  hintsRemaining=3;loadCurrentWord();focusInput();
}

/* ==================== V3: VIZUAL + BO'G'IN + LOGOPED + ARTIC + SUMMARY ==================== */
function renderVisual(w){
  const wrap=document.getElementById('visualWrap');
  const em=document.getElementById('visualEmoji'),ww=document.getElementById('visualWord');
  if(!wrap||!em)return;
  wrap.dataset.testMode=(currentMode==='review')?'1':'0';
  const emoji=visualFor(w.word,w.letter);
  em.textContent=emoji;
  if(ww)ww.textContent=w.word.replace(/-/g,'');
  applyVisualVisibility();
}
function applyVisualVisibility(){
  const em=document.getElementById('visualEmoji'),ww=document.getElementById('visualWord');
  const t=document.getElementById('visualToggle');
  if(visualShown){if(em)em.style.display='block';if(ww)ww.style.display='block';if(t)t.textContent='🖼 Rasmni yashirish';}
  else{if(em)em.style.display='none';if(ww)ww.style.display='none';if(t)t.textContent='🖼 Rasmni ko\'rsatish';}
}
function toggleVisual(e){if(e)e.stopPropagation();visualShown=!visualShown;applyVisualVisibility();vibrate(15);}
function renderSylChips(w){
  const box=document.getElementById('sylChips');
  if(!box)return;
  box.innerHTML='';
  w.word.split('-').forEach(syl=>{
    const b=document.createElement('button');
    b.className='syl-chip';b.type='button';b.textContent=syl;
    b.setAttribute('aria-label','Bo\'g\'in: '+syl);
    b.addEventListener('click',ev=>{ev.stopPropagation();speakSyllable(syl,b);},{passive:true});
    box.appendChild(b);
  });
}
function speakSyllable(syl,btn){
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(syl);
    u.lang='uz-UZ';u.rate=.6;u.pitch=1.1;speechSynthesis.speak(u);
  }catch(e){}
  if(btn){btn.style.transform='scale(.85)';setTimeout(()=>{btn.style.transform='';},180);}
  vibrate(15);
}
function toggleListenCard(){
  const c=document.getElementById('listenCard');
  if(!c)return;
  const open=c.style.display==='none';
  c.style.display=open?'block':'none';
  if(open&&currentWordData)listenPlaySlow();
  else focusInput();
}
function renderListenTip(w){
  const tip=document.getElementById('articTip'),wh=document.getElementById('listenWordHint');
  const a=ARTIC[w.letter];
  if(wh)wh.textContent='"'+w.word.replace(/-/g,'')+'" so\'zini eshitib, mikrofon bilan takrorlang.';
  if(tip&&a)tip.innerHTML='<b>'+escL(w.letter)+' tovushi:</b> '+escL(a.yoriq);
  const c=document.getElementById('listenCard');
  if(c&&(currentMode==='listen'))c.style.display='block';
  else if(c)c.style.display='none';
}
function listenPlaySlow(){
  if(!currentWordData)return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(currentWordData.word.replace(/-/g,''));
    u.lang='uz-UZ';u.rate=.7;u.pitch=1;speechSynthesis.speak(u);
  }catch(e){}
  const sar=document.getElementById('selfAssessRow');
  setTimeout(()=>{if(sar&&!speechRecognitionAvailable())sar.style.display='flex';},1200);
  vibrate(20);
}
function speechRecognitionAvailable(){return !!(window.SpeechRecognition||window.webkitSpeechRecognition);}
function listenRecord(){
  const res=document.getElementById('listenResult'),btn=document.getElementById('listenRecBtn');
  const sar=document.getElementById('selfAssessRow');
  if(!currentWordData)return;
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){
    if(res)res.textContent='🎙 Mikrofon API topilmadi — o\'zingizni baholang 👇';
    if(sar)sar.style.display='flex';
    return;
  }
  try{
    const rec=new SR();
    rec.lang='uz-UZ';rec.interimResults=false;rec.maxAlternatives=3;
    if(btn){btn.classList.add('live');btn.textContent='🔴 Tinglanmoqda...';}
    if(res)res.textContent='🎙 Gapiring...';
    rec.onresult=(ev)=>{
      const said=(ev.results[0][0].transcript||'').trim();
      const target=currentWordData.word.replace(/-/g,'');
      const saidC=canonOld(said).replace(/[\s]/g,''),targetC=canonOld(target);
      const usedOld=saidC!==canonOld(said);
      const sim=similarity(saidC,targetC);
      if(sim>=0.7){
        if(res)res.textContent='✅ "'+said+'" — ajoyib! O\'xshashlik '+Math.round(sim*100)+'% (+10 XP)'+(usedOld?' 💡':'');
        listenSuccess();
      }else{
        if(res)res.textContent='💪 "'+said+'" — o\'xshashlik '+Math.round(sim*100)+'%. Yana urinib ko\'ring!';
        playError();
        if(sar)sar.style.display='flex';
      }
      if(btn){btn.classList.remove('live');btn.textContent='🎙 Gapirish';}
    };
    rec.onerror=()=>{
      if(res)res.textContent='⚠️ Mikrofon ruxsati berilmadi — o\'zingizni baholang 👇';
      if(sar)sar.style.display='flex';
      if(btn){btn.classList.remove('live');btn.textContent='🎙 Gapirish';}
    };
    rec.onend=()=>{if(btn){btn.classList.remove('live');btn.textContent='🎙 Gapirish';}};
    rec.start();
  }catch(e){
    if(res)res.textContent='⚠️ Mikrofon ishlamadi — o\'zingizni baholang 👇';
    if(sar)sar.style.display='flex';
  }
}
function listenSuccess(){
  playSuccess();vibrate(60);
  if(window.burstConfetti)burstConfetti(70);
  state.xp+=10;state.todayWords++;state.totalWordsLearned++;
  state.correctAttempts++;state.totalAttempts++;
  localStorage.setItem('xol_xp',state.xp);
  localStorage.setItem('xol_todayWords',state.todayWords);
  localStorage.setItem('xol_totalWords',state.totalWordsLearned);
  localStorage.setItem('xol_correct',state.correctAttempts);
  localStorage.setItem('xol_totalAttempts',state.totalAttempts);
  updateDailyProgress();saveWeeklyStats();
  sessRecordTime();sess.correct++;
  srsUpdate(currentWordData.word,5);
  state.weakWords=state.weakWords.filter(w=>w.word!==currentWordData.word);
  localStorage.setItem('xol_weak',JSON.stringify(state.weakWords));
  dom.nextBtn.classList.add('visible');
}
function selfAssess(ok){
  const res=document.getElementById('listenResult');
  if(ok){if(res)res.textContent='👍 Ajoyib! O\'zingizga ishonch — muvaffaqiyat!';listenSuccess();}
  else{
    if(res)res.textContent='💪 Hechqisi yo\'q! Mashq qilishda davom eting.';
    if(currentWordData){
      if(!state.weakWords.find(w=>w.word===currentWordData.word)){state.weakWords.push(currentWordData);localStorage.setItem('xol_weak',JSON.stringify(state.weakWords));}
      state.totalAttempts++;localStorage.setItem('xol_totalAttempts',state.totalAttempts);
      srsUpdate(currentWordData.word,0);
      sessRecordTime();sess.wrong++;
    }
    dom.nextBtn.classList.add('visible');
  }
}
let _articLetter='A';
function openArtic(e,letter){
  if(e)e.stopPropagation();
  _articLetter=letter;
  const a=ARTIC[letter];
  const big=document.getElementById('articBig'),ti=document.getElementById('articTitle'),bo=document.getElementById('articBody');
  if(big)big.textContent=letter;
  if(ti)ti.textContent=letter+' tovushi — talaffuz yo\'riqnomasi';
  if(bo&&a)bo.innerHTML='<div><b>🔊 Tovush:</b> '+escL(a.tovush)+'</div><div style="margin-top:8px"><b>👄 Lab / til / havo:</b> '+escL(a.yoriq)+'</div><div style="margin-top:8px"><b>📖 Misol:</b> '+escL(a.misol)+' '+visualFor(a.misol,letter)+'</div>';
  openModal('articModal');
}
function articListen(){
  const a=ARTIC[_articLetter];
  if(!a)return;
  try{
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(_articLetter+'. '+a.misol);
    u.lang='uz-UZ';u.rate=.7;speechSynthesis.speak(u);
  }catch(e){}
}
function showSessionSummary(){
  if(!sess.active)return;
  const total=sess.correct+sess.wrong;
  if(total===0){sess.active=false;return;}
  sess.active=false;
  const pct=Math.round(sess.correct/total*100);
  const avg=sessAvg();
  const gained=state.xp-sess.xpStart;
  const sp=document.getElementById('sumPct'),sm=document.getElementById('sumMsg');
  if(sp)sp.textContent=pct+'%';
  if(sm)sm.textContent=pct>=90?'🏆 Zo\'r! Siz yulduzsiz!':pct>=70?'🌟 Ajoyib harakat!':pct>=40?'💪 Yaxshi boshlanish!':'🌱 Har bir qadam muhim!';
  const sc=document.getElementById('sumCorrect');if(sc)sc.textContent=sess.correct+'/'+total;
  const st=document.getElementById('sumTime');if(st)st.textContent=avg.toFixed(1)+'s';
  const sx=document.getElementById('sumXP');if(sx)sx.textContent='+'+gained+' XP';
  const ss=document.getElementById('sumStreak');if(ss)ss.textContent='🔥 '+state.streak;
  const sg=document.getElementById('sumGoal');
  if(sg){
    const left=Math.max(0,state.dailyGoal-state.todayWords);
    sg.innerHTML='<b>🎯 Keyingi maqsad:</b> '+(left===0?'Kunlik maqsad bajarildi! Ertaga yangi marra 🏆':'Bugun yana '+left+' ta so\'z — kunlik maqsad sari olg\'a!');
  }
  openModal('summaryModal');
}
function buildWeeklyReport(){
  const el=document.getElementById('weeklyReportText');
  const acc=state.totalAttempts>0?Math.round(state.correctAttempts/state.totalAttempts*100):0;
  const days=Object.keys(weeklyStats||{}).length;
  const weekTotal=Object.values(weeklyStats||{}).reduce((a,b)=>a+(+b||0),0);
  const lvl=getLevel(state.xp);
  const weak=(state.weakWords||[]).slice(0,5).map(w=>w.word.replace(/-/g,'')).join(', ')||'yo\'q';
  const txt='📋 Savodhon — haftalik hisobot\n'+
    '👧🧒 Bola: '+(state.user||'—')+'\n'+
    '⭐ XP: '+state.xp+' ('+lvl.level+'-daraja, '+lvl.name+')\n'+
    '📚 O\'rganilgan so\'z: '+state.totalWordsLearned+'\n'+
    '🎯 Aniqlik: '+acc+'% ('+state.correctAttempts+'/'+state.totalAttempts+')\n'+
    '🔥 Streak: '+state.streak+' kun\n'+
    '📈 Haftalik faollik: '+weekTotal+' so\'z / '+days+' kun\n'+
    '⏱ Haftalik mashq vaqti: '+formatWeeklyTime(state.weeklyTime)+'\n'+
    '🧠 Qiyin so\'zlar: '+weak+'\n'+
    '🎯 Kunlik maqsad: '+state.todayWords+'/'+state.dailyGoal+'\n'+
    '💡 Tavsiya: qiyin so\'zlarni "Aqlli mashq" da kuniga 10 daqiqa takrorlang.';
  if(el)el.textContent=txt;
  return txt;
}
function copyWeeklyReport(){
  const txt=buildWeeklyReport();
  const done=()=>{const el=document.getElementById('weeklyReportText');if(el){el.textContent='✅ Nusxalandi!';setTimeout(buildWeeklyReport,1200);}};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(done).catch(()=>fallbackCopy(txt,done));
  else fallbackCopy(txt,done);
}
function fallbackCopy(txt,cb){
  try{
    const ta=document.createElement('textarea');
    ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    document.execCommand('copy');document.body.removeChild(ta);cb();
  }catch(e){alert('Nusxalashda xatolik');}
}

/* ==================== EVENT LISTENERS ==================== */
dom.startBtn.addEventListener('click',async()=>{
  const name=dom.nameInput.value.trim();
  if(!name){alert('Iltimos, ismingizni kiriting');return;}
  state.user=name;state.lastLogin=new Date().toISOString();state.streak++;
  localStorage.setItem('xol_user',name);
  localStorage.setItem('xol_lastLogin',state.lastLogin);
  localStorage.setItem('xol_streak',state.streak);
  dom.userAvatar.textContent=name.charAt(0).toUpperCase();
  await requestFullscreen();
  dom.welcome.classList.add('hide');dom.main.classList.add('visible');
  renderMain();
});
dom.continueBtn.addEventListener('click',async()=>{
  if(!state.user){alert('Iltimos, avval ismingizni kiriting');return;}
  state.lastLogin=new Date().toISOString();state.streak++;
  localStorage.setItem('xol_lastLogin',state.lastLogin);
  localStorage.setItem('xol_streak',state.streak);
  await requestFullscreen();
  dom.welcome.classList.add('hide');dom.main.classList.add('visible');
  renderMain();
});
dom.nameInput.addEventListener('keydown',(e)=>{if(e.key==='Enter')dom.startBtn.click();});
document.addEventListener('keydown',(e)=>{
  if(e.key==='Enter'&&dom.nextBtn.classList.contains('visible'))handleNext();
  if(e.key==='Escape')document.querySelectorAll('.modal-overlay.active').forEach(m=>m.classList.remove('active'));
  if((e.key==='h'||e.key==='H'||e.key==='ҳ'||e.key==='Ҳ')&&dom.focus.classList.contains('active'))showHint();
  if((e.key==='s'||e.key==='S'||e.key==='ы'||e.key==='Ы')&&dom.focus.classList.contains('active'))speakWord();
  if((e.key==='t'||e.key==='T'||e.key==='е'||e.key==='Е')&&dom.focus.classList.contains('active'))toggleTimer();
  if(e.key==='?'||(e.key==='/'&&e.shiftKey)){const m=document.getElementById('shortcutsModal');if(m)m.classList.toggle('active');}
});
document.querySelectorAll('.modal-overlay').forEach(m=>m.addEventListener('click',(e)=>{if(e.target===m)m.classList.remove('active');},{passive:true}));

/* PWA */
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{});});}

init();