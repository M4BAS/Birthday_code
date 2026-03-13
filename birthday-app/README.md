# 🎂 Happy Birthday Chinenye!

A beautiful interactive birthday experience with:
- ✨ 3-2-1 countdown with glowing animations
- 🎉 Word-by-word slideshow: HAPPY → BIRTHDAY → TO → CHINENYE
- ❤️ Big heart reveal with confetti explosion
- 🎸 Animated guitar player sticker
- 📸 Swipeable photo card gallery
- 💗 Heart-shaped photo mosaic animation

---

## 🚀 Deploy to Vercel

### Step 1 — Add Chinenye's Photos

1. Inside the `public/` folder, create a folder called `photos/`
2. Add exactly **4 photos** named:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`

```
public/
  photos/
    photo1.jpg
    photo2.jpg
    photo3.jpg
    photo4.jpg
```

> **Tip:** Portrait-oriented photos (taller than wide) look best in the card gallery.

---

### Step 2 — Customize Captions (optional)

Open `src/components/PhotoCardScreen.jsx` and edit the `PHOTOS` array:

```js
const PHOTOS = [
  { src: '/photos/photo1.jpg', caption: '✨ So beautiful ✨' },
  { src: '/photos/photo2.jpg', caption: '💖 Always shining 💖' },
  ...
];
```

Change the `caption` text to personal messages for each photo.

---

### Step 3 — Deploy

**Option A: Vercel CLI**
```bash
npm install
npm run build
npx vercel --prod
```

**Option B: GitHub + Vercel Dashboard**
1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — just click Deploy!

---

### Step 4 — Generate QR Code

Once deployed, you'll get a URL like `https://chinenye-birthday.vercel.app`

Generate a QR code at:
- [qr-code-generator.com](https://www.qr-code-generator.com)
- [qrcode-monkey.com](https://www.qrcode-monkey.com) (customizable with colors/logo)

Print it on a card, birthday cake topper, or gift tag! 🎀

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
birthday-app/
├── public/
│   └── photos/          ← PUT CHINENYE'S PHOTOS HERE
│       ├── photo1.jpg
│       ├── photo2.jpg
│       ├── photo3.jpg
│       └── photo4.jpg
├── src/
│   ├── components/
│   │   ├── CountdownScreen.jsx   (3-2-1 countdown)
│   │   ├── WordSlideshow.jsx     (HAPPY BIRTHDAY TO CHINENYE)
│   │   ├── HeartScreen.jsx       (heart reveal + confetti)
│   │   ├── GuitarScreen.jsx      (animated guitar player)
│   │   ├── PhotoCardScreen.jsx   (swipeable photo gallery)
│   │   ├── HeartMosaicScreen.jsx (heart made from photos)
│   │   ├── Particles.jsx         (floating particles)
│   │   └── Confetti.jsx          (confetti explosion)
│   ├── App.jsx                   (main orchestrator)
│   ├── index.css                 (global styles + animations)
│   └── main.jsx                  (entry point)
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

Made with 💕 for Chinenye's special day!
