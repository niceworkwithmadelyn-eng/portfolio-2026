# Portfolio website: edit, preview and deploy

A static portfolio site for a graphic designer (branding, visual identity, packaging, editorial). It is plain HTML, CSS and a few lines of vanilla JavaScript. There is no database, no backend, no build step, no paid service and no third-party scripts or fonts.

Everything in the site is a placeholder. Names, text, contact details and images are marked with `[square brackets]`, `yourdomain.com`, `your-username` or `YOUR-SITE.pages.dev` so you can find and replace them. No clients, awards, testimonials or results have been invented.

---

## 1. Folder structure

```
portfolio/
├── index.html               Home: introduction, selected projects, short About, contact links
├── work.html                Work: list of all projects
├── about.html               About
├── contact.html             Contact (email and social links; there is deliberately no form)
├── 404.html                 "Page not found" page (Cloudflare Pages serves it automatically)
├── projects/
│   ├── project-one.html     Project page (branding and visual identity)
│   ├── project-two.html     Project page (packaging)
│   └── project-three.html   Project page (editorial)
├── assets/
│   ├── css/styles.css       All styles. Colours and fonts are set at the top.
│   ├── js/main.js           Keeps the footer year current. Nothing else.
│   └── img/
│       ├── favicon.svg
│       ├── portrait.svg                 Placeholder portrait
│       ├── og-default.png               Social-sharing image (1200 x 630)
│       ├── og-project-one.png (etc.)    Social-sharing image per project
│       └── project-one/ (and -two, -three)
│           cover, thumb, logo, detail, app-1..3, gal-1..3   Placeholder images
├── _headers                 Cloudflare Pages security and caching headers
├── robots.txt
├── sitemap.xml
└── README.md
```

Every page is its own URL. Internal links and assets use relative paths (`../` from inside `projects/`), so the site works from any folder, any domain, or straight from your computer.

The one exception is `404.html`, which uses root-relative paths (`/assets/...`). Cloudflare shows that page for any missing address, however deep, so plain relative paths would break there. It displays correctly once deployed, but not when opened as a local file.

---

## 2. Preview on your computer

**Quickest:** double-click `index.html`. It opens in your browser and all links work.

**Closer to the real thing** (needs Python, which is on macOS and most Linux systems; on Windows install it from python.org):

```
cd portfolio
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Press `Ctrl+C` in the terminal to stop.

---

## 3. Replace the placeholders

Search all files for these markers (any text editor's "Find in files" works):

| Search for | Replace with |
| --- | --- |
| `[Your Name]` | Your name (appears in headers, titles, footers and metadata) |
| `hello@yourdomain.com` | Your email address |
| `behance.net/your-username` | Your Behance profile URL |
| `linkedin.com/in/your-username` | Your LinkedIn profile URL |
| `YOUR-SITE.pages.dev` | Your real site address (see step 6 below) |
| `[` (opening square bracket) | Every remaining placeholder: biography, project text, captions, years, colours |

Also edit the `<title>` and `<meta name="description">` of every page. They are what appear in browser tabs and search results.

Only publish claims you can stand behind. Leave out anything (clients, outcomes, awards) that is not true or that you do not have permission to share.

---

## 4. Add your images

### Replace a placeholder

Every placeholder image is an `.svg` file in `assets/img/`. To replace one:

1. Export your image (see the size guide below) and save it in the same folder.
2. In the HTML, change the file name in `src="..."` (for example `cover.svg` to `cover.webp`).
3. Update `width` and `height` to your image's real pixel size. This stops the page jumping while images load.
4. Rewrite the `alt` text (see below).

### Recommended formats and sizes

| Use | Format | Suggested size |
| --- | --- | --- |
| Project cover | WebP or JPG | 2400 px wide, 16:9 |
| Gallery images | WebP or JPG | 1600 to 2000 px wide |
| Home thumbnails | WebP or JPG | 1200 x 1500 px (4:5) |
| Portrait | WebP or JPG | 1200 x 1500 px |
| Logos and flat vector work | SVG or PNG | any |
| Social-sharing image | **PNG or JPG** (not SVG, not WebP) | 1200 x 630 px |

Aim for under 300 KB per image where you can. Free tools such as Squoosh (squoosh.app) work in the browser and do not upload your files.

Images already use `loading="lazy"` and `decoding="async"`, and the project cover loads first (`fetchpriority="high"`). Keep that pattern on new images, except for the single largest image at the top of a page.

### Alt text

Write what the image shows, in one or two sentences, for someone who cannot see it. For example: "Wordmark in dark plum on an off-white label, shown on a glass jar." Do not start with "image of". If an image is purely decorative, use `alt=""`.

Every placeholder currently reads "Placeholder: ... Replace with a description of your image." so it is obvious if one is left behind.

### Work page filter

`work.html` shows projects as a grid with filter buttons (All, Branding, Packaging, Editorial). Each project card has a `data-category` value, for example `data-category="packaging"`. A project can have several types separated by spaces (`data-category="branding packaging"`). To add or rename a filter, change the matching `data-filter` button and the `data-category` values so they use the same word. Without JavaScript the buttons are hidden and every project is shown. A link such as `work.html#packaging` opens the page already filtered.

### Social-sharing images

Replace `assets/img/og-default.png` and the three `og-project-*.png` files with your own 1200 x 630 PNG or JPG. If you change the file type, update the `og:image` line in the matching HTML file.

---

## 5. Add, rename or remove a project

**Add a project**

1. Duplicate `projects/project-three.html` and rename it, for example `projects/my-new-project.html`. Use lowercase words separated by hyphens. This becomes the URL.
2. Duplicate the image folder `assets/img/project-three/` under a new name and point the new page's images at it.
3. Edit the page's title, text, `canonical`, `og:url` and `og:image`.
4. Add a card to `index.html` (Selected work) and a row to `work.html`.
5. Fix the previous/next links at the bottom of the neighbouring project pages so the order is a loop: each page's "Previous" and "Next" should point at the pages on either side of it.
6. Add the new URL to `sitemap.xml`.

**Rename a project:** rename the file, then search all files for the old file name and update every link, plus `sitemap.xml`.

**Remove a project:** delete its page and image folder, remove its card and row from `index.html` and `work.html`, remove it from `sitemap.xml`, and repair the previous/next links of its neighbours.

The home page shows three featured projects in a staggered layout (`featured__item--a`, `--b`, `--c`). To show a different number, copy or delete one of those blocks.

---

## 6. Optional customisation

### Colours

At the top of `assets/css/styles.css`, the `:root` block holds the palette:

```
--bg      page background
--wash    image frames and the contact band
--ink     main text
--muted   secondary text
--line    hairlines
--plum    accent for links, hover and focus
--mauve, --sage   decorative accents (not used for text)
```

If you change the text colours, keep enough contrast against the background (WebAIM's contrast checker is free). The default text colours meet WCAG AA.

### Changing fonts

The site uses system fonts, so nothing is downloaded. To use your own font, put a licensed `.woff2` file in `assets/fonts/` and add this above the `:root` block in `styles.css`:

```css
@font-face {
  font-family: "My Font";
  src: url("../fonts/my-font.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Then put `"My Font"` first in `--serif` or `--sans`. Only use fonts you are licensed to host on the web.

### Colour swatches and type specimens

On project pages the colour swatches use `style="--swatch: #d9c6cd;"`. Change the hex value, the name and the role text. The "Aa" type specimens use system fonts as stand-ins; replace the caption with your typefaces, and if you host those fonts yourself, add a class that applies them.

### Contact: why there is no form

A form needs somewhere to send its data, which means a backend or a paid service. This site uses a plain `mailto:` link instead. If you want a form later, choose a service you trust and follow its instructions, and add it deliberately rather than leaving an unconnected form on the page.

---

## 7. Accessibility checklist (already built in)

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, a logical heading order.
- "Skip to main content" link, the first Tab stop on every page.
- Visible focus outline on every link.
- Current page marked with `aria-current` in the navigation.
- Descriptive `alt` text pattern on every image.
- External links open in a new tab and say so for screen-reader users.
- Responsive layout for phones, tablets and desktops; text scales with the browser's font size.
- `prefers-reduced-motion` respected. The site uses no animation of its own.
- Works with JavaScript turned off.

When you add content, keep one `h1` per page, keep headings in order, and give every image `alt` text.

---

## 8. Deploy free on Cloudflare Pages

You need a free Cloudflare account (<https://dash.cloudflare.com/sign-up>). Cloudflare's dashboard wording changes from time to time, so if a label differs slightly, look for the closest match. Cloudflare's own guide is at <https://developers.cloudflare.com/pages/>.

### Option A: drag and drop (no Git needed)

1. Finish editing and previewing the site.
2. Log in to the Cloudflare dashboard and open **Workers & Pages** in the left menu.
3. Click **Create**, choose the **Pages** tab, and choose **Upload assets** (sometimes shown as "Direct Upload").
4. Enter a **project name**. This becomes your address: `project-name.pages.dev`. Use lowercase letters, numbers and hyphens.
5. Click **Create project**.
6. Upload the **contents of the `portfolio` folder** (so that `index.html` is at the top level), either by dragging the folder in or by choosing **Upload folder**. If you have a `.zip` of the site, you can upload that instead. Make sure `index.html` is not buried inside an extra subfolder.
7. Click **Deploy site**. When it finishes, Cloudflare shows your live address.
8. Open the address and click through every page.

To update the site later, open the project in **Workers & Pages**, create a **new deployment**, and upload the changed folder again.

### Option B: connect a GitHub repository (updates deploy automatically)

1. Create a free GitHub account and a new repository, then upload the contents of the `portfolio` folder to it (the web page's **Add file > Upload files** works).
2. In Cloudflare, open **Workers & Pages**, click **Create**, choose the **Pages** tab, then **Connect to Git** (or "Import an existing Git repository").
3. Authorise Cloudflare to read your GitHub account, and select the repository.
4. On the build settings screen set:
   - **Framework preset:** None
   - **Build command:** leave empty
   - **Build output directory:** leave empty, or `/`
5. Click **Save and Deploy**.
6. From then on, every change you commit to the repository is published automatically.

### After your first deployment (important)

Your live address is now known, so replace the placeholder `YOUR-SITE.pages.dev` everywhere with it (for example `https://project-name.pages.dev`):

- the `canonical` link, `og:url` and `og:image` lines in every HTML file (`og:image` must be a full `https://` address for social previews to work)
- `sitemap.xml`
- the `Sitemap:` line in `robots.txt`

Then deploy again.

Test sharing: paste a page address into a social-preview checker, or into a chat app, to see the title, description and image. Some platforms cache previews, so a change can take a while to show.

### Optional: use your own domain

In your Pages project, open **Custom domains**, click **Set up a custom domain**, and follow the prompts. If your domain's DNS is managed at Cloudflare this is nearly automatic; otherwise Cloudflare tells you which DNS record to add at your registrar. A domain name is the one thing that costs money. The `.pages.dev` address is free. After adding a domain, update the addresses described above.

### Good to know

- **Clean URLs:** Cloudflare Pages serves `about.html` at `/about` and redirects `/about.html` to it. Links written with `.html` still work.
- **404 page:** `404.html` is shown automatically for missing addresses.
- **Headers:** `_headers` adds basic security headers and a one-day cache for `assets/`. If you replace an image and keep the same file name, it can take up to a day to refresh for repeat visitors; use a new file name to see changes immediately.
- **Free plan limits:** at the time of writing, static sites on the free plan have generous limits on requests and bandwidth, a cap on files per site, and a maximum size for each file. Check Cloudflare's current "Limits" page if you are building a very large site.
- **Privacy:** the site loads no analytics, fonts or scripts from other companies.

---

## 9. Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| Page is unstyled after deploying | `index.html` was uploaded inside an extra folder. Redeploy with `index.html` at the top level. |
| An image is missing | The `src` file name or capitalisation does not match the file on disk. Names are case-sensitive on the web. |
| Social preview shows no image | `og:image` still has `YOUR-SITE.pages.dev`, or points to an SVG or WebP. Use a full address and a PNG or JPG. |
| An old image still shows | Browser or Cloudflare cache. Use a new file name, or hard-refresh. |
| Link to a project gives a 404 | The file was renamed but a link was not updated. Search for the old name. |
