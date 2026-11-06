const viewer=document.querySelector('#image-viewer');
const fullImage=document.querySelector('#full-image');
document.querySelectorAll('[data-full]').forEach(button=>button.addEventListener('click',()=>{
  fullImage.src=button.dataset.full;
  fullImage.alt=button.dataset.label;
  document.querySelector('#viewer-title').textContent=button.dataset.label;
  viewer.showModal();
}));
document.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
