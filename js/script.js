document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"})));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

const weddingDate=new Date("2026-10-29T19:40:00+05:30").getTime();
function updateCountdown(){
  const r=Math.max(0,weddingDate-Date.now());
  document.getElementById("days").textContent=String(Math.floor(r/86400000)).padStart(2,"0");
  document.getElementById("hours").textContent=String(Math.floor(r/3600000)%24).padStart(2,"0");
  document.getElementById("minutes").textContent=String(Math.floor(r/60000)%60).padStart(2,"0");
  document.getElementById("seconds").textContent=String(Math.floor(r/1000)%60).padStart(2,"0");
}
updateCountdown();setInterval(updateCountdown,1000);
// Background Music
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

bgMusic.volume = 0.45;

function startMusic(){
    bgMusic.play().then(()=>{
        musicToggle.textContent = "♪ Music On";
        musicToggle.setAttribute("aria-label","Turn music off");
    }).catch(()=>{
        // Browser blocked autoplay; music will start after user interaction
    });
}

// Try autoplay when the page opens
startMusic();

// Start music after the first user interaction if autoplay was blocked
["click","touchstart","scroll"].forEach(event=>{
    document.addEventListener(event,()=>{
        if(bgMusic.paused){
            startMusic();
        }
    },{once:true});
});

// Music On / Off button
musicToggle.addEventListener("click",()=>{
    if(bgMusic.paused){
        startMusic();
    }else{
        bgMusic.pause();
        musicToggle.textContent = "♪ Music Off";
        musicToggle.setAttribute("aria-label","Turn music on");
    }
});