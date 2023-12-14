import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import {ExpirationPlugin} from 'workbox-expiration'

declare const self: ServiceWorkerGlobalScope

/** 
* Takes in an array describing which urls we would like cached, along
* with revision information to keep track of whether what's already
* cached is up to date, the array is called precache manifest
* self.__WB_MANIFEST the placeholder provided instead of a list 
* which will be replace during the build process with a up-to-date
* precache manifest
*/
precacheAndRoute(self.__WB_MANIFEST)

const MAX_AGE_SECONDS = 30 * 24 * 60 * 60;
const MAX_ENTRIES = 60;
const NETWORK_TIMEOUT_SECONDS = 3

const cacheNamePage = 'pages'
const matchCallbackPage = ({request}) => request.mode === 'navigate'


// Page Cache 
// https://developer.chrome.com/docs/workbox/modules/workbox-recipes#page_cache
registerRoute(
    matchCallbackPage,
    new NetworkFirst({
        networkTimeoutSeconds: NETWORK_TIMEOUT_SECONDS, 
        cacheName:cacheNamePage, 
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
)

// Image Cache 
// https://developer.chrome.com/docs/workbox/modules/workbox-recipes#image_cache
const cacheNameImage = 'images';
const matchCallbackImage = ({request}) => request.destination === 'image';

registerRoute(
    matchCallbackImage,
  new CacheFirst({
    cacheName: cacheNameImage,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: MAX_ENTRIES,
        maxAgeSeconds: MAX_AGE_SECONDS,
      }),
    ],
  })
);

registerRoute(
    ({url}) => url.origin === 'https://random-word-api.herokuapp.com',
    new NetworkFirst({
        cacheName: 'api-reponses',
    })
)

// @ts-ignore
self.skipWaiting()

// Cleaning outdated Caches
cleanupOutdatedCaches()
