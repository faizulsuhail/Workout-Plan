# Training — iPhone app (PWA)

Your 20-Week Training Plan as an installable iPhone web app. It works offline and opens full screen from the Home Screen.

## What's in the folder

| File | Purpose |
|---|---|
| `index.html` | The app |
| `manifest.webmanifest` | App name, icons, standalone display, colors |
| `sw.js` | Service worker: caches the app for offline use |
| `icons/apple-touch-icon.png` | 180×180 Home Screen icon for iPhone |
| `icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Icons for other platforms |
| `splash/` | Launch screens for current iPhone sizes, light and dark |
| `fonts/` | Fonts stored with the app, so it looks right offline |

## Put it online (needs HTTPS)

iPhone only runs a service worker on a secure (https) site. Upload the **whole folder** to any static host:

- **Netlify:** go to app.netlify.com/drop and drag the `pwa` folder in.
- **Cloudflare Pages:** Create project → Direct Upload → upload the folder.
- **GitHub Pages:** push the folder's contents to a repo and turn on Pages.

Keep the folder structure as is. The app works from a sub-path (for example `/training/`).

## Install on iPhone

1. Open the site in **Safari**.
2. Tap **Share**, then **Add to Home Screen**, then **Add**.
3. Open **Training** from the Home Screen. After the first launch it works offline.

## Your log

The workout log is stored on the iPhone, inside the installed app. Use **Plan → Backup → Export log** now and then to save a copy to Files or iCloud Drive. **Import log** restores it on a new phone.

## Updating the app

After you change any file, edit `sw.js` and bump `VERSION` (for example `training20-v2`), then upload again. The installed app shows an **Update** button the next time it opens.

## iPhone notes

- Timer sounds follow the ring/silent switch. Turn silent mode off to hear the beeps.
- The app keeps the screen awake while a timer runs. If the phone locks, the timer catches up when you return.
