# Sabbir Shikder — Personal Website

A modern, minimalist, timeless personal site for sharing photos and the stories
behind them. No frameworks, no build step — just HTML, CSS, and a little
JavaScript. It runs perfectly on GitHub Pages.

Live site: **https://spidersabbir.github.io**

---

## ✨ How to post a new photo (the easy part)

You only ever touch **one file: `posts.js`**.

1. Put your photo inside the **`assets/images/`** folder
   (any size or shape — the layout adjusts automatically).
2. Open **`posts.js`**.
3. Copy one block and paste it at the **top** of the list (newest first):

   ```js
   {
     image: "assets/images/my-new-photo.jpg",
     caption: "A short, personal caption.",
     date: "May 2026",          // optional — use "" to hide
     location: "Dhaka",          // optional — use "" to hide
   },
   ```

4. Change the four values to match your photo.
5. Save and publish. Your photo appears on the **Gallery** page and in the
   **Latest moments** section of the home page — automatically.

That's it. You never have to edit the page layout.

---

## 📄 Pages

| File           | What it is                                                        |
|----------------|-------------------------------------------------------------------|
| `index.html`   | Home — welcome, latest 3 photos, short about, contact             |
| `gallery.html` | The full photo feed (all photos, newest first, click to enlarge)  |
| `about.html`   | About you — portrait, short bio, quick facts                      |
| `posts.js`     | **Your photos + captions** (the only file you edit regularly)     |
| `style.css`    | All styling and the design system                                 |
| `script.js`    | Gallery rendering, lightbox, menu, animations (no need to edit)   |

---

## 🖼️ Recommended images

Place all images in `assets/images/`.

| File              | Used for                | Tip                                  |
|-------------------|-------------------------|--------------------------------------|
| `portrait.jpg`    | About page + home photo | A clear portrait of you              |
| `photo-1.jpg` …   | Gallery photos          | Any orientation; ~1200px wide is great |

If an image is missing, the site shows a tidy placeholder instead of breaking,
so it always looks intentional.

---

## 🎨 Make it yours

- **Your name / links:** the name appears in the nav, footer, and titles.
  The Facebook link points to your profile. Update the email (`hello@example.com`)
  in `index.html`, `gallery.html`, and `about.html` to a real address if you want one.
- **Your bio:** edit the text in `about.html`.
- **Accent colour:** open `style.css` and change `--accent: #a9774f;` to any colour.
  Everything accented updates at once.
- **Fonts:** Fraunces (headings) + Inter (text), loaded free from Google Fonts.

---

## 🚀 Publishing on GitHub Pages

This repo is named `spidersabbir.github.io`, so GitHub Pages serves it at the
root automatically:

1. Commit and push your changes to the `main` branch.
2. In the repo: **Settings → Pages → Source → `main` / root** (if not already set).
3. Your site is live at **https://spidersabbir.github.io** within a minute.

---

Built with care — simple to run, simple to grow.
