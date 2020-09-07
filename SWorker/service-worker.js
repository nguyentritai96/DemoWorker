console.log('ActiveServiceWorker');

//--- Cache static
self.addEventListener('install', async (e) => {
  // Tiến trình installation chỉ được trigger khi file sw.js không tồn tại hoặc được update
  console.log('sw installed');

  let cache = await caches.open('pwa-static');

  cache.addAll([
    './',
    './images/still_life_medium.jpg',
    './pages/404.html',
    './pages/offline.html',
    './style/main.css'
  ])
})

self.addEventListener('activate', () => {
  // Đây là sự kiện được trigger khi sự kiện "install" kết thúc. 
  // Đây là nơi lý tưởng để xóa những nội dung được cache nếu chúng có phiên bản mới hơn
  console.log('sw activated')
})



//--- Fetch Event
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req))
  } else {
    e.respondWith(networkFirst(req))
  }
})

const cacheFirst = async (req) => {
  return await caches.match(req) || fetch(req);
}

const networkFirst = async (req) => {
  const cache = caches.open('pwa-dynamic');

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}


//--- Background Sync: Chạy ngầm để gửi mail, content sẽ lưu vào IndexedDB
// Ví dụ bằng nút Sync


//--- Push Event
self.addEventListener('push', event => {
  // Push vào ô push của SW: {"method": "pushMessage", "message": "Message is"}
  if (event && event.data) {
    const data = event.data.json();
    if (data.method === 'pushMessage') {
      event.waitUntil(self.registration.showNotification('Test app', {
        body: data.message + ' Hello world'
      }))
    }
  }
})