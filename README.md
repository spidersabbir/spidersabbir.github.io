# Personal Portfolio — GitHub Pages

A production-ready, ultra-minimalist personal portfolio.
No build steps. No frameworks. Pure HTML, CSS, and JavaScript.

---

## Folder Structure

```
your-repo/
├── index.html              ← Home page (hero + featured work)
├── about.html              ← About Me (portrait, bio, skills, timeline)
├── portfolio.html          ← Full Work showcase (grid + filter)
├── style.css               ← All styles, variables, animations
├── script.js               ← Scroll behavior, fade-ins, filter, parallax
├── README.md
└── assets/
    └── images/
        ├── profile-hero.jpg    ← Hero portrait (index.html) — portrait orientation recommended
        ├── profile-about.jpg   ← About page portrait — portrait/square recommended
        ├── project-1.jpg       ← Featured + portfolio project image
        ├── project-2.jpg
        ├── project-3.jpg
        ├── project-4.jpg
        ├── project-5.jpg
        ├── project-6.jpg
        ├── project-7.jpg
        ├── project-8.jpg
        ├── project-9.jpg
        └── resume.pdf          ← Optional: your résumé (linked from about.html)
```

---

## Deploying to GitHub Pages

1. Create a new repository named `yourusername.github.io` (for root URL)
   or any name like `portfolio` (for `yourusername.github.io/portfolio`).
2. Push all files to the `main` branch.
3. Go to **Settings → Pages → Source** and select `main` / `root`.
4. Your site will be live at `https://yourusername.github.io` within a minute.

---

## Customizing Content

### Step 1 — Replace placeholder text
Search all `.html` files for `Your Name` and replace with your name.
Replace `hello@yourdomain.com` with your real email.

### Step 2 — Add your images

All images go in `assets/images/`. The CSS uses `object-fit: cover` on
every image, so you **do not need to resize or crop** — just drop them in.
Recommended minimum dimensions:

| File                | Use                         | Min Width | Tip                         |
|---------------------|-----------------------------|-----------|------------------------------|
| `profile-hero.jpg`  | Home page hero              | 1200px    | Portrait orientation         |
| `profile-about.jpg` | About page sticky portrait  | 800px     | Portrait or square           |
| `project-N.jpg`     | Project thumbnails          | 800px     | Landscape (16:9 or 4:3)      |

### Step 3 — Edit your bio & projects

- **index.html**: Update hero headline, intro paragraph, and 3 featured project cards.
- **about.html**: Replace biography paragraphs, skills, and timeline entries.
- **portfolio.html**: Add/remove `<article class="portfolio-item">` blocks. Set `data-category` to one of: `brand` | `web` | `dev` | `print`.

### Step 4 — Add more portfolio items

Copy any `<article class="portfolio-item ...">` block in `portfolio.html`
and paste it at the end of the `.portfolio-grid`. The grid layout cycles
automatically — no CSS changes needed.

### Step 5 — Change accent color

Open `style.css` and find:

```css
--accent: #c8a96e;
```

Replace `#c8a96e` with any hex color you like. Everything accent-colored
(hover states, section labels, CTA button) will update automatically.

---

## Typography

Fonts are loaded via Google Fonts (no install needed):
- **Display / Headings**: Cormorant Garamond — editorial, elegant serif
- **Body / UI**: DM Sans — clean, legible geometric sans-serif

To change fonts, replace the `@import` URL at the top of `style.css`
and update the `--font-display` and `--font-body` variables.

---

## Sections Quick Reference

| Page             | Sections                                         |
|------------------|--------------------------------------------------|
| `index.html`     | Nav, Hero, Featured Work (3 cards), Footer       |
| `about.html`     | Nav, Portrait + Bio, Skills Grid, Timeline, Footer |
| `portfolio.html` | Nav, Hero, Filter Tabs, 9-item Grid, CTA, Footer |

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
No polyfills needed. JavaScript gracefully degrades if disabled.
