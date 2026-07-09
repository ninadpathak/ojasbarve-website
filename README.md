# ojasbarve.com

Personal website for Dr Ojas Barve, EdD. Plain static HTML/CSS/JS, no build step, no dependencies.

## Structure

```
index.html        Home
about.html        About: story, education, languages, certifications, awards, publications
experience.html   Career accordion + academic appointments
contact.html      Contact cards, socials, mailto form
404.html          Not-found page (Cloudflare Pages picks this up automatically)
assets/
  css/style.css   All styles (Fraunces + Hanken Grotesk, ink/paper palette, rust accent)
  js/main.js      Nav, typewriter, scroll reveals, counters, accordion, mailto form
  img/            Hero photo (pulled from the old site) + favicon
```

## Run locally

```
python3 -m http.server 8741
# open http://localhost:8741
```

## Deploy to Cloudflare Pages

Direct upload:

```
npx wrangler pages deploy . --project-name ojasbarve
```

Or in the Cloudflare dashboard: Workers & Pages → Create → Pages → upload this folder.
No build command, no output directory setting; the repo root is the site.

Weight: ~150 KB total plus two Google Fonts families. Everything else is inline SVG and vanilla JS.
