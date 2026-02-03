# The Cozy Crime Chronicles

A fan website celebrating classic cozy mystery TV shows like Columbo, Murder She Wrote, and Midsomer Murders.

## Files Included

- `index.html` - Home page with show introductions
- `episodes.html` - Filterable episode guide
- `about.html` - About page
- `contact.html` - Contact form page
- `styles.css` - All styling for the website
- `script.js` - Navigation and common functionality
- `episodes.js` - Episode loading and filtering
- `episodes-data.json` - Episode data (you can add more!)

## Features

### Navigation
- Responsive navigation bar that works on mobile and desktop
- Active page highlighting
- Smooth mobile menu toggle

### Episode Guide
- Filter episodes by show
- Search episodes by title, description, or show name
- Direct links to IMDb and Wikipedia
- Easy to add more episodes by editing the JSON file

### Contact Form
- Currently set up as a demonstration
- To make it functional, integrate with:
  - **Formspree** (easiest): https://formspree.io/
  - **Netlify Forms**: https://www.netlify.com/products/forms/
  - **EmailJS**: https://www.emailjs.com/

## How to Host on GitHub Pages

1. **Create a GitHub account** at github.com

2. **Create a new repository**:
   - Name it `cozy-mysteries` (or `yourusername.github.io` for a personal site)
   - Make it public
   - Don't add README (we have one)

3. **Upload files**:
   - Click "uploading an existing file"
   - Drag all the files from this folder
   - Commit the changes

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select "main" branch as source
   - Save

5. **Your site will be live at**:
   - `https://yourusername.github.io/cozy-mysteries/`

## How to Add More Episodes

Edit the `episodes-data.json` file and add new entries following this format:

```json
{
  "show": "columbo",
  "showName": "Columbo",
  "season": 1,
  "episode": 3,
  "title": "Episode Title Here",
  "year": 1971,
  "description": "Brief description of the episode plot.",
  "links": {
    "imdb": "https://www.imdb.com/title/...",
    "wiki": "https://en.wikipedia.org/wiki/...",
    "streaming": "https://example.com/watch" (optional)
  }
}
```

**Show codes:**
- `columbo` - For Columbo episodes
- `murder-she-wrote` - For Murder, She Wrote episodes
- `midsomer-murders` - For Midsomer Murders episodes

## Customization Ideas

### Add More Shows
1. Edit `index.html` to add a new show card
2. Add episodes to `episodes-data.json` with a new show code
3. Update the filter dropdown in `episodes.html`

### Change Colors
Edit the `:root` section in `styles.css`:
```css
:root {
    --cream: #f4f1e8;
    --burgundy: #8b3a3a;
    --deep-green: #2d4a3e;
    --gold: #c9a961;
    /* etc. */
}
```

### Add a Blog
Create a new `blog.html` page following the same structure as the other pages.

### Add Social Media Links
Add them to the footer in each HTML file.

## Making the Contact Form Work

### Option 1: Formspree (Recommended)
1. Sign up at https://formspree.io/
2. Get your form endpoint
3. In `contact.html`, change the form action:
   ```html
   <form action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```

### Option 2: Netlify Forms
If hosting on Netlify instead of GitHub Pages:
1. Add `netlify` attribute to the form:
   ```html
   <form netlify name="contact" method="POST">
   ```

### Option 3: EmailJS
1. Sign up at https://www.emailjs.com/
2. Follow their JavaScript integration guide
3. Replace the current form submission handler

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers

## Credits

Website design and code created for cozy mystery enthusiasts.
Fonts from Google Fonts (Crimson Pro, Spectral, Courier Prime).

## License

Feel free to modify and customize this website for your personal use!

---

Happy sleuthing! 🔍
