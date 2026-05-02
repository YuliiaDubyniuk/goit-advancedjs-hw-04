import{a as y,S as h,i as l}from"./assets/vendor-VVWBAj3V.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=a(o);fetch(o.href,r)}})();async function p(t,e){const a={key:"38922427-a1320c38255791562f8d90b5f",q:t,page:e,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0},{data:n}=await y.get("https://pixabay.com/api",{params:a});return n}const g=t=>t.map(e=>`<li class="gallery-item">
  <a class="gallery-link" href=${e.largeImageURL}>
    <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}"/>
  </a>
  <ul class="img-info-list">
    <li class="img-info-item">
      <p class="info-type">Likes</p>
      <p class="img-info">${e.likes}</p>
    </li>
    <li class="img-info-item">
      <p class="info-type">Views</p>
      <p class="img-info">${e.views}</p>
    </li>
    <li class="img-info-item">
      <p class="info-type">Comments</p>
      <p class="img-info">${e.comments}</p>
    </li>
    <li class="img-info-item">
      <p class="info-type">Downloads</p>
      <p class="img-info">${e.downloads}</p>
    </li>
  </ul>
</li>`).join(""),L=new h(".gallery a",{captionsData:"alt",captionDelay:250}),w=t=>{t.innerHtml=""},b=t=>{t.classList.add("is-active")},v=t=>{t.classList.remove("is-active")},B=t=>{t.classList.remove("is-hidden")},u=t=>{t.classList.add("is-hidden")},s={searchForm:document.querySelector(".js-form"),galleryList:document.querySelector(".js-gallery"),loader:document.querySelector(".js-loader"),loadMoreBtn:document.querySelector(".js-load-more-btn")};let i=1,m=0,c="";const M=15,S=async t=>{try{t.preventDefault(),u(s.loadMoreBtn);const{target:e}=t;if(c=e.elements["search-text"].value.trim(),!c){l.error({message:"Search field cannot be empty. Please enter a keyword.",position:"topRight"});return}w(s.galleryList),b(s.loader),i=1;const a=await p(c,i);if(a.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"});return}m=Math.ceil(a.totalHits/M),m>1&&(B(s.loadMoreBtn),s.loadMoreBtn.addEventListener("click",f)),s.galleryList.innerHTML=g(a.hits),L.refresh()}catch(e){console.log(e),l.warning({message:"Oops! Something went wrong. Please, try again!",position:"topRight"})}finally{v(s.loader),t.target.reset()}},f=async t=>{try{i++;const e=await p(c,i);s.galleryList.insertAdjacentHTML("beforeend",g(e.hits)),P(),i===m&&(u(s.loadMoreBtn),s.loadMoreBtn.removeEventListener("click",f),l.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.log(e)}};s.searchForm.addEventListener("submit",S);const P=()=>{const t=document.querySelector(".gallery-item");if(t){const{height:e}=t.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}};
//# sourceMappingURL=index.js.map
