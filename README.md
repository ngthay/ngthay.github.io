# Eang Eng Thay – Portfolio

Static portfolio website for a civil / structural design engineer. Plain HTML, CSS and JavaScript, no build step.

## Files

```
index.html
style.css
script.js
assets/
  profile.jpg              <- add your portrait (4:5 ratio works best)
  Eang-Eng-Thay-CV.pdf     <- add your CV for the Download button
  (optional) project photos
```

## Publish on GitHub Pages

1. Create a new repository, e.g. `eangengthay.github.io` (or any name).
2. Upload all files, including the `assets` folder.
3. Go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Your site goes live at `https://<username>.github.io/` (or `/<repo-name>/`) within a minute or two.

## Customise

- **Project photos:** in `index.html`, replace `<div class="project__img ph">…</div>` with
  `<div class="project__img" style="background-image:url('assets/project1.jpg')"></div>`.
- **Colours:** edit the variables at the top of `style.css` (`--accent` is the orange).
- **Facebook link:** replace the placeholder URL in the Contact section with your profile link.
- **Skill levels:** change the `data-level` values (0–100) in the Skills section.
