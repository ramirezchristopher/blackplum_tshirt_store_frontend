// cache on demand strategy

var CACHE_NAME = "bpa-cache";

self.addEventListener("fetch", event => {
  
  var requestURL = new URL(event.request.url);
  
  if(requestURL.host === "googletagmanager.com" || requestURL.host === "google-analytics.com" || requestURL.host === "connect.facebook.net") {
    
    event.respondWith(fetch(event.request));
  }
  else if(requestURL.pathname.startsWith("/order")) {
    
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            
            return fetch(event.request).then(networkResponse => {
              
              cache.put(event.request, networkResponse.clone());
              
              return networkResponse;
            })
            .catch(() => {
              
              return caches.match(event.request);
            });
        })
    );
  }
  else {
    event.respondWith(
              
      caches.open(CACHE_NAME)
        .then(cache => {
  
          return cache.match(event.request).then(cachedResponse => {

                return cachedResponse || fetch(event.request).then(networkResponse => {
                    
                    if(event.request.method == "GET") {
                    
                      cache.put(event.request, networkResponse.clone());
                    }

                    return networkResponse;
                });
            });
        })
    );
  }
});
