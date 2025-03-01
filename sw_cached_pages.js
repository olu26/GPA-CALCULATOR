const cacheName = "v1";

const cacheAssets = [
  "index.html",
  "contact.html",
  "style.css",
  "app.js",
  "/pics/baumini.png",
];


const text = "Let's begin.";
let index = 0;
const typewriter = document.getElementById("typewriter");
const startBtn = document.getElementById("startBtn");

function type() {
  if (index < text.length) {
    typewriter.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 100); // Delay between each character
  } else {
    // Loop the animation back and forth
    setTimeout(() => {
      typewriter.innerHTML = ""; // Clear the text
      index = 0; // Reset index to start over
      type(); // Restart typing animation
    }, 3000); // Wait for 1 second before restarting
  }
}

window.onload = type;

// Call Install Event
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
