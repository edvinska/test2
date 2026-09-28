// Content remains visible without JavaScript or when motion is reduced.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
let motionEnabled=!motionPreference.matches;
const motionToggle=document.createElement('button');
motionToggle.type='button';motionToggle.className='motion-toggle';
document.querySelector('.hero-heading').append(motionToggle);
function syncMotion(){
 document.documentElement.dataset.motion=motionEnabled?'on':'off';
 motionToggle.textContent=motionEnabled?'Animaatiot päällä · pysäytä':'Animaatiot pois · käynnistä';
 motionToggle.setAttribute('aria-pressed',String(motionEnabled));setupReveals();
}
motionToggle.addEventListener('click',()=>{motionEnabled=!motionEnabled;syncMotion()});
function setupReveals(){
 revealObserver?.disconnect();
 document.querySelectorAll('.motion-reveal').forEach(el=>el.classList.remove('is-waiting','is-visible'));
 if(!motionEnabled||!('IntersectionObserver' in window))return;
 revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('is-waiting');entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}});
 },{threshold:0.08});
 document.querySelectorAll('.section-head,.service,.about-grid>div,.principles article,.booking-grid>div,.faq>div,.location>div').forEach((el)=>{
  el.classList.add('motion-reveal');
  if(el.getBoundingClientRect().top<innerHeight)return;
  el.classList.add('is-waiting');
  if(el.classList.contains('service'))el.style.setProperty('--reveal-delay',`${Array.from(el.parentElement.children).indexOf(el)%4*65}ms`);
  revealObserver.observe(el);
 });
}
syncMotion();motionPreference.addEventListener('change',()=>{motionEnabled=!motionPreference.matches;syncMotion()});
document.addEventListener('focusin',event=>{event.target.closest('.is-waiting')?.classList.remove('is-waiting')});
