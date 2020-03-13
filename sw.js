importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
    console.log(`Bien! Workbox is loaded 🎉`);

    //buscar los javascripts en la red pero si no los encuentra, usar los del cache
    workbox.routing.registerRoute( new RegExp('.*\.js'), workbox.strategies.networkFirst());

    //Usar el cache pero actualizar en background tan rápido como se pueda
    workbox.routing.registerRoute(/.*\.css/, workbox.strategies.staleWhileRevalidate({  cacheName: 'css-cache',} ));

   //Almacenar hasta 20 imágenes por una semana
   workbox.routing.registerRoute( /.*\.(?:png|jpg|jpeg|svg|gif|code_image)/,
     // Use the cache if it's available
     workbox.strategies.cacheFirst({ cacheName: 'image-cache', plugins: [new workbox.expiration.Plugin({maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60, }) ], }) );

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

