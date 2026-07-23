const CACHE_NAME="take-turns-v4";
const ASSETS=[
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./word-shaker/word-shaker.html",
  "./imposter/imposter.html",
  "./categories/categories.html",
  "./same-page/same-page.html",
  "./greenlight/greenlight.html",
  "./petty-court/petty-court.html",
  "./talk-amongst-yourselves/talk-amongst-yourselves.html",
  "./would-you-rather/would-you-rather.html",
  "./name-the-list/name-the-list.html",
  "./screenshots/launcher.jpg",
  "./screenshots/launcher-mobile.jpg",
  "./screenshots/word-shaker.jpg",
  "./screenshots/imposter.jpg",
  "./screenshots/categories.jpg",
  "./screenshots/same-page.jpg",
  "./screenshots/greenlight.jpg",
  "./screenshots/petty-court.jpg",
  "./screenshots/talk-amongst-yourselves.jpg",
  "./screenshots/would-you-rather.jpg",
  "./screenshots/name-the-list.jpg"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.status===200){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>event.request.mode==="navigate"?caches.match("./index.html"):undefined)));
});
